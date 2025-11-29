from PIL import Image, ImageDraw, ImageFont
import textwrap
import os

def create_story_card(image_path, target_text, output_path):
    """
    Composites a square image and text into a square card.
    """
    # Constants for square format
    CANVAS_SIZE = 1080  # Square canvas
    MARGIN = 50         # Margin around the edge
    CONTENT_SIZE = CANVAS_SIZE - (2 * MARGIN)
    
    # Layout definition
    IMAGE_HEIGHT = int(CONTENT_SIZE * 0.75)
    TEXT_HEIGHT = CONTENT_SIZE - IMAGE_HEIGHT - 20 # 20px gap
    
    BG_COLOR = "#FFFFFF"
    TEXT_COLOR = "#000000"
    PADDING = 20
    
    # Create square canvas
    canvas = Image.new("RGB", (CANVAS_SIZE, CANVAS_SIZE), BG_COLOR)
    draw = ImageDraw.Draw(canvas)
    
    # Load and resize image to fill top portion within margins
    try:
        img = Image.open(image_path)
        
        # Resize to fit within the target area (CONTENT_SIZE x IMAGE_HEIGHT) without cropping
        # Use ImageOps.contain logic manually or just calculate ratios
        img_ratio = img.width / img.height
        target_ratio = CONTENT_SIZE / IMAGE_HEIGHT
        
        if img_ratio > target_ratio:
            # Image is wider relative to target, fit to width
            new_width = CONTENT_SIZE
            new_height = int(CONTENT_SIZE / img_ratio)
        else:
            # Image is taller relative to target, fit to height
            new_height = IMAGE_HEIGHT
            new_width = int(IMAGE_HEIGHT * img_ratio)
            
        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Calculate position to center the image
        x_offset = MARGIN + (CONTENT_SIZE - new_width) // 2
        y_offset = MARGIN + (IMAGE_HEIGHT - new_height) // 2
        
        # Paste at calculated position
        canvas.paste(img, (x_offset, y_offset))
    except Exception as e:
        print(f"Error loading image {image_path}: {e}")
        return

    # Font setup
    font_size = 55 # Slightly smaller to fit text area
    font = None

    # Try to find a nice font
    font_candidates = [
        "fonts/Andika-Bold.ttf",
        "fonts/Andika-Regular.ttf",
        "arialbd.ttf", 
        "Arial Bold", 
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/Library/Fonts/Arial Bold.ttf"
    ]

    for font_name in font_candidates:
        try:
            font = ImageFont.truetype(font_name, font_size)
            break
        except:
            continue
    if not font:
        font = ImageFont.load_default()

    # Calculate text area
    text_y_start = MARGIN + IMAGE_HEIGHT + 20 # Start below image with gap
    max_width = CONTENT_SIZE - (2 * PADDING)
    
    # Helper to wrap text and calculate height
    def get_wrapped_text(text, font, max_width):
        return textwrap.wrap(text, width=int(max_width / (font.size * 0.5)))

    lines = get_wrapped_text(target_text, font, max_width)
    
    # Check if text fits, reduce font size if needed
    while len(lines) * (font.size + 10) > TEXT_HEIGHT and font_size > 30:
        font_size -= 5
        try:
            font = ImageFont.truetype(font.path, font_size)
        except:
            font = ImageFont.load_default()
        lines = get_wrapped_text(target_text, font, max_width)

    # Calculate total text height to center vertically in text area
    total_text_height = len(lines) * (font.size + 10)
    vertical_offset = (TEXT_HEIGHT - total_text_height) // 2
    
    current_y = text_y_start + vertical_offset
    
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        line_width = bbox[2] - bbox[0]
        line_height = bbox[3] - bbox[1]
        
        # Center horizontally within margins
        x = MARGIN + (CONTENT_SIZE - line_width) / 2
        draw.text((x, current_y), line, font=font, fill=TEXT_COLOR)
        current_y += font.size + 10

    # Save
    canvas.save(output_path)
    print(f"Saved story card to {output_path}")

if __name__ == "__main__":
    # Test
    create_story_card("test_image.png", "Tämä on testi.", "test_card.png")
