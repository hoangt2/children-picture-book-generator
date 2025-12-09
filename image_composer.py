from PIL import Image, ImageDraw, ImageFont
import textwrap
import numpy as np
import os
import base64
import io
from google import genai

# Initialize Gemini client
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")


def get_ai_text_placement(image_path):
    """
    Uses Gemini Vision to analyze the image and find the optimal text placement.
    Returns: (position_name, relative_coords) or (None, None) if failed.
    """
    try:
        client = genai.Client(api_key=GOOGLE_API_KEY)
        
        # Load image as PIL Image
        from PIL import Image as PILImage
        pil_image = PILImage.open(image_path)
        
        # Create prompt for AI
        prompt = """Analyze this children's book illustration and find the BEST location for a text box.

⚠️ CRITICAL PRIORITY: DO NOT cover important objects! ⚠️

AVOID placing text over:
- Characters (people, animals)
- Important objects (toys, kites, balloons, food, etc.)
- Character faces or hands
- Key story elements mentioned in the illustration

PREFER placing text in:
1. Empty sky or clouds (TOP positions usually best)
2. Plain grass or ground (BOTTOM positions)
3. Solid color walls or backgrounds (SIDE positions)
4. Any area with NO important visual elements

Return TWO lines in this exact format:
POSITION: [top-left|top-center|top-right|middle-left|middle-right|bottom-left|bottom-center|bottom-right]
SPACE: [small|medium|large]

- SMALL: Limited empty area, keep text box narrow (30-40% width)
- MEDIUM: Moderate empty area, medium text box (45-55% width)
- LARGE: Lots of empty area, wider text box okay (60-70% width)

Choose the position where text would be most readable and LEAST obstructive to important visual elements."""

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[pil_image, prompt]
        )
        
        result = response.text.strip().lower()
        print(f"AI text placement response: {result}")
        
        # Parse response for position and space
        position_name = None
        space_size = 'medium'  # default
        
        # Extract space size
        if 'space:' in result:
            if 'small' in result:
                space_size = 'small'
            elif 'large' in result:
                space_size = 'large'
            else:
                space_size = 'medium'
        
        # Parse position
        position_map = {
            'top-left': (0.22, 0.15),
            'top-center': (0.5, 0.15),
            'top-right': (0.78, 0.15),
            'middle-left': (0.2, 0.5),
            'middle-right': (0.8, 0.5),
            'bottom-left': (0.22, 0.82),
            'bottom-center': (0.5, 0.85),
            'bottom-right': (0.78, 0.82),
        }
        
        for key, coords in position_map.items():
            if key in result:
                position_name = key
                print(f"Detected position: {position_name}, space: {space_size}")
                return position_name, coords, space_size
        
        # Default to top-center if can't parse
        return 'top-center', (0.5, 0.15), space_size
        
    except Exception as e:
        print(f"AI placement failed: {e}, using fallback")
        return None, None, 'medium'


def find_best_text_region_variance(img):
    """
    Fallback: Uses variance analysis to find uniform regions.
    """
    width, height = img.size
    img_array = np.array(img.convert('RGB'))
    
    regions = {
        'top-left': (int(width * 0.22), int(height * 0.15)),
        'top-center': (int(width * 0.5), int(height * 0.15)),
        'top-right': (int(width * 0.78), int(height * 0.15)),
        'middle-left': (int(width * 0.2), int(height * 0.5)),
        'middle-right': (int(width * 0.8), int(height * 0.5)),
        'bottom-left': (int(width * 0.22), int(height * 0.82)),
        'bottom-center': (int(width * 0.5), int(height * 0.85)),
        'bottom-right': (int(width * 0.78), int(height * 0.82)),
    }
    
    sample_size = int(width * 0.25)
    best_position = 'top-center'
    lowest_variance = float('inf')
    
    for position, (cx, cy) in regions.items():
        x1 = max(0, cx - sample_size // 2)
        y1 = max(0, cy - sample_size // 2)
        x2 = min(width, cx + sample_size // 2)
        y2 = min(height, cy + sample_size // 2)
        
        region = img_array[y1:y2, x1:x2, :]
        variance = np.var(region)
        
        if variance < lowest_variance:
            lowest_variance = variance
            best_position = position
    
    cx, cy = regions[best_position]
    return best_position, (cx / width, cy / height), 'medium'  # Return medium as default space


def draw_rounded_rectangle(draw, xy, radius, fill):
    """Draw a rounded rectangle."""
    x1, y1, x2, y2 = xy
    draw.rectangle([x1 + radius, y1, x2 - radius, y2], fill=fill)
    draw.rectangle([x1, y1 + radius, x2, y2 - radius], fill=fill)
    draw.ellipse([x1, y1, x1 + 2*radius, y1 + 2*radius], fill=fill)
    draw.ellipse([x2 - 2*radius, y1, x2, y1 + 2*radius], fill=fill)
    draw.ellipse([x1, y2 - 2*radius, x1 + 2*radius, y2], fill=fill)
    draw.ellipse([x2 - 2*radius, y2 - 2*radius, x2, y2], fill=fill)


def create_story_card(image_path, target_text, output_path):
    """
    Creates a story card with AI-detected optimal text placement.
    Text box is sized to avoid breaking poem lines.
    """
    TARGET_SIZE = 1080
    BOX_PADDING = 25
    CORNER_RADIUS = 20
    OVERLAY_OPACITY = 160  # Reduced from 210 for more transparency
    MIN_FONT_SIZE = 16  # Never go below 16pt for readability
    MAX_FONT_SIZE = 24  # Sweet spot for picture books is 18-24pt
    
    # Load and resize image
    try:
        img = Image.open(image_path).convert('RGBA')
        
        img_ratio = img.width / img.height
        if img_ratio > 1:
            new_height = TARGET_SIZE
            new_width = int(TARGET_SIZE * img_ratio)
        else:
            new_width = TARGET_SIZE
            new_height = int(TARGET_SIZE / img_ratio)
        
        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        left = (new_width - TARGET_SIZE) // 2
        top = (new_height - TARGET_SIZE) // 2
        img = img.crop((left, top, left + TARGET_SIZE, top + TARGET_SIZE))
        
    except Exception as e:
        print(f"Error loading image {image_path}: {e}")
        return False
    
    # Try AI placement first, fallback to variance
    position, rel_coords, space_size = get_ai_text_placement(image_path)
    if rel_coords is None:
        position, rel_coords, space_size = find_best_text_region_variance(img)
    
    cx = int(rel_coords[0] * TARGET_SIZE)
    cy = int(rel_coords[1] * TARGET_SIZE)
    print(f"Text placement: {position} at ({cx}, {cy})")
    
    # Font setup
    font = None
    font_candidates = [
        "fonts/Andika-Bold.ttf",
        "fonts/Andika-Regular.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/Library/Fonts/Arial Bold.ttf",
    ]
    
    for font_name in font_candidates:
        try:
            font = ImageFont.truetype(font_name, MAX_FONT_SIZE)
            break
        except:
            continue
    if not font:
        font = ImageFont.load_default()
    
    # Determine if this is a poem (has newlines) or normal text
    is_poem = '\n' in target_text and len(target_text.split('\n')) > 1
    
    font_size = 24  # Default to 24pt (picture book standard)
    temp_draw = ImageDraw.Draw(Image.new('RGB', (1, 1)))
    
    # Adaptive width based on available space
    width_ratios = {
        'small': 0.35,   # 35% for limited space
        'medium': 0.50,  # 50% for moderate space  
        'large': 0.65    # 65% for lots of space
    }
    max_allowed_width = int(TARGET_SIZE * width_ratios.get(space_size, 0.50))
    print(f"Text box width: {space_size} space = {width_ratios.get(space_size, 0.50)*100}% of image")
    
    def wrap_text(text, font, max_width):
        """Wrap text to fit within max_width."""
        words = text.split()
        lines = []
        current_line = []
        
        for word in words:
            test_line = ' '.join(current_line + [word])
            bbox = temp_draw.textbbox((0, 0), test_line, font=font)
            if bbox[2] - bbox[0] <= max_width:
                current_line.append(word)
            else:
                if current_line:
                    lines.append(' '.join(current_line))
                current_line = [word]
        
        if current_line:
            lines.append(' '.join(current_line))
        
        return lines
    
    if is_poem:
        # For poems: keep each line intact, reduce font if needed
        lines = [line for line in target_text.split('\n') if line.strip()]
        
        while font_size >= MIN_FONT_SIZE:
            try:
                font = ImageFont.truetype(font.path, font_size)
            except:
                pass
            
            max_line_width = 0
            for line in lines:
                bbox = temp_draw.textbbox((0, 0), line, font=font)
                max_line_width = max(max_line_width, bbox[2] - bbox[0])
            
            if max_line_width <= max_allowed_width:
                break
            font_size -= 2
    else:
        # For normal text: wrap to fit width
        while font_size >= MIN_FONT_SIZE:
            try:
                font = ImageFont.truetype(font.path, font_size)
            except:
                pass
            
            lines = wrap_text(target_text, font, max_allowed_width)
            
            # Check if text fits vertically too
            line_spacing = 8
            total_height = len(lines) * (font_size + line_spacing)
            max_allowed_height = int(TARGET_SIZE * 0.35)
            
            if total_height <= max_allowed_height:
                break
            font_size -= 2
    
    # Calculate box dimensions
    line_spacing = 8
    total_text_height = len(lines) * (font_size + line_spacing)
    
    max_line_width = 0
    for line in lines:
        bbox = temp_draw.textbbox((0, 0), line, font=font)
        max_line_width = max(max_line_width, bbox[2] - bbox[0])
    
    box_width = max_line_width + (2 * BOX_PADDING)
    box_height = total_text_height + (2 * BOX_PADDING)
    
    # Position box centered at detected location
    box_x = cx - box_width // 2
    box_y = cy - box_height // 2
    
    # Keep within bounds
    margin = 20
    box_x = max(margin, min(box_x, TARGET_SIZE - box_width - margin))
    box_y = max(margin, min(box_y, TARGET_SIZE - box_height - margin))
    
    # Draw overlay
    overlay = Image.new('RGBA', (TARGET_SIZE, TARGET_SIZE), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    
    box_color = (255, 255, 255, OVERLAY_OPACITY)
    draw_rounded_rectangle(
        overlay_draw,
        (box_x, box_y, box_x + box_width, box_y + box_height),
        CORNER_RADIUS,
        box_color
    )
    
    img = Image.alpha_composite(img, overlay)
    canvas = img.convert('RGB')
    draw = ImageDraw.Draw(canvas)
    
    # Draw text
    text_color = "#333333"
    text_y = box_y + BOX_PADDING
    
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        line_width = bbox[2] - bbox[0]
        x = box_x + (box_width - line_width) // 2
        draw.text((x, text_y), line, font=font, fill=text_color)
        text_y += font_size + line_spacing
    
    canvas.save(output_path, quality=95)
    print(f"Saved: {output_path} (text at {position}, font {font_size}px)")
    return True


if __name__ == "__main__":
    create_story_card("test.png", "Dòng một\nDòng hai", "test_card.png")
