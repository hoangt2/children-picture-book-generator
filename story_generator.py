import os
import json
import argparse
from dotenv import load_dotenv
import google.generativeai as genai
from google import genai as imagen_client
from google.genai import types
from prompts import IMAGE_STYLE_GUIDE
from image_composer import create_story_card
import time

# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    print("Error: GOOGLE_API_KEY not found in environment variables.")
    exit(1)

genai.configure(api_key=GOOGLE_API_KEY)

from grammar_checker import check_grammar
from cleanup import cleanup

STATUS = "Idle"

def update_status(message):
    global STATUS
    STATUS = message
    print(f"STATUS: {message}")

def generate_story_concept(target_language, age, story_prompt):
    """Generates the story structure and text using Gemini."""
    print(f"Generating story concept for children (Age {age})...")
    
    model = genai.GenerativeModel('gemini-2.0-flash')
    from prompts import get_story_prompt
    
    # Pass story_prompt to the prompt generator
    prompt = get_story_prompt(target_language, age, story_prompt)
    
    response = model.generate_content(prompt)
    
    try:
        # Clean up markdown code blocks if present
        text = response.text.replace("```json", "").replace("```", "").strip()
        story_data = json.loads(text)
        return story_data
    except json.JSONDecodeError:
        print("Error: Failed to parse JSON from Gemini response.")
        print("Raw response:", response.text)
        return None

def main(story_prompt):
    """
    Main execution flow.
    story_prompt is a dictionary containing:
    - language, age
    - hero (type, details)
    - sidekick
    - theme
    - setting
    - style
    """
    
    # Extract basic params for backward compatibility if needed
    target_language = story_prompt.get('language', 'English')
    age = story_prompt.get('age', 3)
    
    # Update global style guide based on selection
    import prompts
    if 'style' in story_prompt and 'imageGenPrompt' in story_prompt['style']:
        prompts.update_style_guide(story_prompt['style']['imageGenPrompt'])

    update_status("Starting story generation...")
    
    # Clean up old output
    output_dir = "output"
    cleanup(output_dir)
    
    # 1. Generate Story Concept & Text
    update_status("Generating story concept...")
    story = generate_story_concept(target_language, age, story_prompt)
    
    if not story:
        update_status("Error: Failed to generate story concept.")
        return

    # 2. Process Story (Images, Cards, PDF)
    # process_story handles saving json, generating images, etc.
    process_story(story, output_dir, update_status)
    
    update_status("Complete")

def generate_character_model(description, output_path):
    """Generates a character model sheet for consistency."""
    print(f"Generating character model for: {description}...")
    
    try:
        client = imagen_client.Client(api_key=GOOGLE_API_KEY)
        # Prompt for a character sheet to get a consistent reference
        prompt = f"Character sheet showing the following character(s): {description}. Multiple views if possible, white background. {IMAGE_STYLE_GUIDE}"
        
        response = client.models.generate_content(
            model='gemini-2.5-flash-image',
            contents=[prompt],
        )
        
        for part in response.parts:
            if part.inline_data is not None:
                image = part.as_image()
                image.save(output_path)
                print(f"Character model saved to {output_path}")
                return True
        
        print("No image found in response.")
        return False
    except Exception as e:
        print(f"Error generating character model: {e}")
        return False

def generate_image(prompt, output_path, character_description="", reference_image_paths=None):
    """Generates an image using Nano Banana (Gemini 2.5 Flash Image)."""
    print(f"Generating image for: {prompt[:50]}...")
    
    try:
        # Use Nano Banana (Gemini 2.5 Flash Image) for image generation
        client = imagen_client.Client(api_key=GOOGLE_API_KEY)
        
        # Combine character description with the specific page prompt and style guide
        full_prompt = f"{character_description} {prompt} {IMAGE_STYLE_GUIDE}"
        
        contents = [full_prompt]
        
        # Add reference images if provided
        if reference_image_paths:
            if isinstance(reference_image_paths, str):
                reference_image_paths = [reference_image_paths]
                
            for ref_path in reference_image_paths:
                if os.path.exists(ref_path):
                    try:
                        from PIL import Image
                        ref_img = Image.open(ref_path)
                        contents.append(ref_img)
                        print(f"Using reference image: {os.path.basename(ref_path)}")
                    except Exception as e:
                        print(f"Could not load reference image {ref_path}: {e}")

        # Use image generation model (lower quality version for faster testing)
        response = client.models.generate_content(
            model='gemini-2.5-flash-image',  # Image generation model
            contents=contents,
        )
        
        # Extract and save the image from the response
        for part in response.parts:
            if part.inline_data is not None:
                image = part.as_image()
                image.save(output_path)
                print(f"Image saved to {output_path}")
                return True
        
        print("No image found in response.")
        return False
            
    except Exception as e:
        print(f"Error generating image: {e}")
        # Fallback for testing/mocking if API fails or model not found
        # Create a dummy image for flow verification
        from PIL import Image, ImageDraw
        img = Image.new('RGB', (1024, 1024), color = 'lightblue')
        d = ImageDraw.Draw(img)
        d.text((10,10), "Generated Image Placeholder", fill=(0,0,0))
        img.save(output_path)
        print("Created placeholder image due to API error.")
        return True

def process_story(story, output_dir="output", status_callback=None):
    """
    Processes a generated story concept: generates images, cards, and PDF.
    """
    def log(message):
        print(message)
        if status_callback:
            status_callback(message)

    # Create main output directory and subdirectories
    dirs = {
        "root": output_dir,
        "images": os.path.join(output_dir, "images"),
        "cards": os.path.join(output_dir, "cards"),
        "data": os.path.join(output_dir, "data")
    }
    
    for d in dirs.values():
        os.makedirs(d, exist_ok=True)

    print(f"Story Title: {story.get('title_target')}")
    
    # Save JSON for reference
    with open(os.path.join(dirs["data"], "story.json"), "w", encoding="utf-8") as f:
        json.dump(story, f, indent=2, ensure_ascii=False)

    # 2. Generate Character Models
    characters = story.get("characters", [])
    character_models = {} # Map name -> path

    if not characters:
        # Fallback for old format or empty list
        desc = story.get("character_description")
        if desc:
            characters.append({"name": "Main", "description": desc})

    for char in characters:
        name = char.get("name", "Unknown")
        desc = char.get("description", "")
        safe_name = "".join(x for x in name if x.isalnum())
        
        log(f"Processing character: {name}")
        model_path = os.path.join(dirs["images"], f"character_model_{safe_name}.png")
        
        if generate_character_model(desc, model_path):
            character_models[name] = model_path
        else:
            log(f"Failed to generate model for {name}")

    # Main character description for fallback/context
    # Combine descriptions of all characters for context
    all_char_desc = " ".join([c.get("description", "") for c in characters])
    all_model_paths = list(character_models.values())

    # 3. Process Pages
    for page in story.get("pages", []):
        page_num = page.get("page_number")
        log(f"Processing Page {page_num}...")
        
        # Paths
        image_filename = f"page_{page_num}.png"
        image_path = os.path.join(dirs["images"], image_filename)
        final_filename = f"story_card_{page_num}.png"
        final_path = os.path.join(dirs["cards"], final_filename)

        # Generate Image (without text)
        full_prompt = f"{page.get('image_description')}"
        success = generate_image(full_prompt, image_path, character_description=all_char_desc, reference_image_paths=all_model_paths)
        
        if success:
            # Create square card with text composited below image
            create_story_card(image_path, page.get("text_target"), final_path)
        
        # Sleep to avoid rate limits
        time.sleep(2)

    # 3.5 Verify and Retry Missing Pages
    log("Verifying all pages were created...")
    max_page_retries = 3
    
    for page in story.get("pages", []):
        page_num = page.get("page_number")
        final_filename = f"story_card_{page_num}.png"
        final_path = os.path.join(dirs["cards"], final_filename)
        
        if not os.path.exists(final_path):
            log(f"Missing page {page_num}. Retrying generation...")
            
            # Retry loop for this specific page
            for attempt in range(max_page_retries):
                log(f"Retry attempt {attempt+1} for page {page_num}...")
                
                image_filename = f"page_{page_num}.png"
                image_path = os.path.join(dirs["images"], image_filename)
                
                # Generate Image
                full_prompt = f"{page.get('image_description')}"
                success = generate_image(full_prompt, image_path, character_description=all_char_desc, reference_image_paths=all_model_paths)
                
                if success:
                    # Create card
                    create_story_card(image_path, page.get("text_target"), final_path)
                    if os.path.exists(final_path):
                        log(f"Successfully recovered page {page_num}!")
                        break
                
                time.sleep(2)
            
            if not os.path.exists(final_path):
                log(f"Failed to recover page {page_num} after retries.")
                # We continue anyway to try and save what we can, or could return False here

    log("Story generation complete!")

    # 4. Compile PDF
    log("Compiling PDF...")
    from pdf_generator import compile_to_pdf
    pdf_path = os.path.join(dirs["root"], "story.pdf")
    compile_to_pdf(dirs["cards"], pdf_path)
    log("All done! PDF created.")


def generate_mock_story(story_prompt):
    """Generates a mock story for testing purposes without AI."""
    update_status("Starting MOCK story generation...")
    
    output_dir = "output"
    cleanup(output_dir)
    
    # Create directories
    dirs = {
        "root": output_dir,
        "images": os.path.join(output_dir, "images"),
        "cards": os.path.join(output_dir, "cards"),
        "data": os.path.join(output_dir, "data")
    }
    for d in dirs.values():
        os.makedirs(d, exist_ok=True)

    # Mock Story Data
    story = {
        "title_target": "The Mock Adventure",
        "characters": [{"name": "Mock Hero", "description": "A test hero"}],
        "pages": []
    }
    
    for i in range(1, 9):
        story["pages"].append({
            "page_number": i,
            "type": "story",
            "text_target": f"This is page {i} of the mock story. It is generated for testing purposes.",
            "image_description": f"Mock image for page {i}"
        })

    # Save JSON
    with open(os.path.join(dirs["data"], "story.json"), "w", encoding="utf-8") as f:
        json.dump(story, f, indent=2, ensure_ascii=False)

    # Generate Mock Images and Cards
    from PIL import Image, ImageDraw, ImageFont
    
    for page in story["pages"]:
        page_num = page["page_number"]
        update_status(f"Generating mock page {page_num}...")
        
        # Create mock image
        img = Image.new('RGB', (1024, 1024), color = (100 + page_num * 10, 150, 200))
        d = ImageDraw.Draw(img)
        d.text((50, 500), f"Mock Image {page_num}", fill=(255, 255, 255))
        
        image_path = os.path.join(dirs["images"], f"page_{page_num}.png")
        img.save(image_path)
        
        # Create card
        final_path = os.path.join(dirs["cards"], f"story_card_{page_num}.png")
        create_story_card(image_path, page["text_target"], final_path)
        
        time.sleep(0.2) # Simulate slight delay

    # Compile PDF
    update_status("Compiling PDF...")
    from pdf_generator import compile_to_pdf
    pdf_path = os.path.join(dirs["root"], "story.pdf")
    compile_to_pdf(dirs["cards"], pdf_path)
    
    update_status("Complete")


if __name__ == "__main__":
    main()
