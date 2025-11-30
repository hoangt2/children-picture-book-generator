# Prompts for Finnish Story Generator

# Global variable for image style guide
IMAGE_STYLE_GUIDE = """
Illustration style: childrens book illustration, soft watercolor style, pastel colors, white background, dreamy texture
IMPORTANT: Do NOT include any text, words, letters, or numbers in the image.
"""

def update_style_guide(new_style_prompt):
    """Updates the global image style guide dynamically."""
    global IMAGE_STYLE_GUIDE
    IMAGE_STYLE_GUIDE = f"""
Illustration style: {new_style_prompt}
IMPORTANT: Do NOT include any text, words, letters, or numbers in the image.
"""

def get_age_constraints(age):
    """
    Determines age-appropriate constraints for story generation.
    """
    if age <= 1:
        constraints = """
**AGE:** 0-1 years old (Babies)
**LANGUAGE COMPLEXITY:**
- Single words only (e.g., "Ball", "Cat", "Mama")
- 1 word per sentence
- Present tense only
- Very basic vocabulary (mama, dada, ball, cat, dog)
- Heavy repetition
**THEMES:** Sounds, textures, colors, basic objects
"""
    elif age <= 3:
        constraints = """
**AGE:** 2-3 years old (Toddlers)
**LANGUAGE COMPLEXITY:**
- Very simple, 2-3 word phrases
- 2-3 words per sentence maximum
- Present tense only
- Basic vocabulary (animals, colors, family, simple objects)
- Heavy repetition of patterns
**THEMES:** Daily routines, simple actions, colors, shapes, peek-a-boo
"""
    elif age <= 5:
        constraints = """
**AGE:** 4-5 years old (Preschool)
**LANGUAGE COMPLEXITY:**
- Simple sentences
- 3-5 words per sentence
- Present tense primarily
- Basic vocabulary (animals, colors, family, everyday objects)
- Repetitive patterns
**THEMES:** Friendship, sharing, emotions, daily routines
"""
    elif age <= 7:
        constraints = """
**AGE:** 6-7 years old (Early Elementary)
**LANGUAGE COMPLEXITY:**
- Simple sentences with some variety
- 5-7 words per sentence
- Present and simple past tense
- Expanded vocabulary (nature, school, activities)
- Some descriptive words
**THEMES:** School, friendship, problem-solving, adventure
"""
    elif age <= 9:
        constraints = """
**AGE:** 8-9 years old (Elementary)
**LANGUAGE COMPLEXITY:**
- Varied sentence structures
- 6-9 words per sentence
- Multiple tenses (past, present)
- Broader vocabulary (hobbies, emotions, nature)
- Descriptive language
**THEMES:** Adventure, challenges, teamwork, nature exploration
"""
    else:  # 10-12
        constraints = """
**AGE:** 10-12 years old (Pre-teen)
**LANGUAGE COMPLEXITY:**
- Complex sentences with compound structures
- 8-12 words per sentence
- All tenses (past, present, future)
- Rich vocabulary including abstract concepts
- Dialogue and descriptive language
**THEMES:** Personal growth, independence, moral lessons, imagination
"""
    return constraints

def get_story_prompt(target_language, age, story_params):
    
    # Get age-appropriate constraints (Age + 3 for reading level)
    reading_age = age + 3
    constraints = get_age_constraints(reading_age)
    
    # Extract details from story_params
    hero = story_params.get('hero', {})
    sidekick = story_params.get('sidekick', {})
    theme = story_params.get('theme', {})
    setting = story_params.get('setting', {})
    
    # Construct Hero Description
    hero_desc = ""
    hero_name = ""
    if hero.get('type') == 'human':
        d = hero.get('details', {})
        hero_name = d.get('name', '')
        gender = d.get('gender', 'child').lower()
        race = d.get('race', '')
        race_desc = f"{race} " if race else ""
        hero_desc = f"a {age}-year-old {race_desc}{gender} with {d.get('skinTone', 'medium')} skin, {d.get('hairColor', 'brown')} {d.get('hairStyle', 'short')} hair"
        if d.get('accessories') and d.get('accessories') != 'None':
            hero_desc += f", wearing {d.get('accessories')}"
        if hero_name:
            hero_desc = f"{hero_name}, {hero_desc}"
    else:
        # Animal
        d = hero.get('details', {})
        hero_name = d.get('name', '')
        animal_type = d.get('animal', 'animal')
        hero_desc = f"a cute {animal_type}"
        if hero_name:
            hero_desc = f"{hero_name}, {hero_desc}"

    # Construct Sidekick Description
    sidekick_desc = ""
    if sidekick and sidekick.get('id') != 'none':
        sidekick_desc = f"Sidekick: {sidekick.get('prompt', '')}"
    
    # Construct Theme/Setting
    theme_prompt = theme.get('prompt', 'a fun adventure') if theme else 'a fun adventure'
    setting_prompt = setting.get('prompt', 'a magical place') if setting else 'a magical place'

    return f"""
You are a children's book author specializing in stories for young children in {target_language}.
Your goal is to generate a heartwarming, simple, and engaging story.

{constraints}

**STORY CONFIGURATION:**
- Hero: {hero_desc}
- {sidekick_desc}
- Setting: {setting_prompt}
- Theme/Plot: {theme_prompt}

**GENERAL CONSTRAINTS:**
1.  **Tone:** Warm, gentle, educational, positive, and happy.
2.  **Themes:** Follow the configured theme above.
3.  **Ending:** Always a happy and comforting ending.

**CULTURAL RELEVANCE (VERY IMPORTANT):**
- **Characters:** Should reflect the culture of people who speak {target_language}, but strictly follow the configured Hero and Setting above.
- **Names:** {"Use the hero name: " + hero_name if hero_name else "Use culturally appropriate names for the target language."}
- **Setting:** Use the configured setting: {setting_prompt}
- **Cultural Elements:** Include subtle cultural elements (food, traditions, clothing) when natural to the story.

**STRUCTURE:**
- **Length:** Exactly 8 pages.
- **Format:** Return ONLY a valid JSON object.

**CRITICAL INSTRUCTION: VISUAL CONSISTENCY**
- You MUST define the main character in the `characters` list.
- **IMPORTANT**: In every `image_description`, you MUST repeat the **FULL VISUAL DESCRIPTION** of the hero: {hero_desc}
    - BAD: "Hero is playing."
    - GOOD: "{hero_desc} is playing happily in {setting_prompt}."

**JSON Structure:**
{{
  "title_target": "Title in {target_language}",
  "characters": [
    {{
      "name": "Name",
      "description": "Detailed visual description matching: {hero_desc}"
    }}
  ],
  "pages": [
    {{
      "page_number": 1,
      "type": "cover",
      "text_target": "Title of the story in {target_language}",
      "image_description": "Visual description for the cover. Hero: {hero_desc}. Setting: {setting_prompt}. INCLUDE FULL CHARACTER DETAILS."
    }},
    {{
      "page_number": 2,
      "type": "story",
      "text_target": "Story text in {target_language}",
      "image_description": "Scene description. Hero: {hero_desc}. Setting: {setting_prompt}. Action: [describe what's happening]."
    }}
  ]
}}
"""

IMAGE_STYLE_GUIDE = """
Illustration style: Children's book illustration. Soft, pastel colors. Whimsical, cute, and charming.
The style should be like a high-quality modern picture book (e.g., watercolor or soft digital art).
Characters should have large expressive eyes and friendly faces.
Backgrounds should be dreamy but simple enough not to clutter the scene.
IMPORTANT: Do NOT include any text, words, letters, or numbers in the image.
"""
