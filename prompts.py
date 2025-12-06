# Prompts for Finnish Story Generator

# Global variable for image style guide
IMAGE_STYLE_GUIDE = """
Illustration style: childrens book illustration, soft watercolor style, pastel colors, white background, dreamy texture
IMPORTANT: Do NOT include any text, words, letters, or numbers in the image.
ABSOLUTELY NO EXTRA CHARACTERS: Only generate the EXACT characters mentioned in the prompt. Do NOT add random people, children, adults, or bystanders in the background or foreground. If only one person is described, show ONLY one person!
"""

def update_style_guide(new_style_prompt):
    """Updates the global image style guide dynamically."""
    global IMAGE_STYLE_GUIDE
    IMAGE_STYLE_GUIDE = f"""
CRITICAL: You MUST follow this exact art style for ALL images:
{new_style_prompt}

IMPORTANT REQUIREMENTS:
- Do NOT include any text, words, letters, or numbers in the image
- STRICTLY adhere to the style specified above
- The visual style is MANDATORY and must be clearly visible
- **ABSOLUTELY NO EXTRA CHARACTERS**: Only generate the EXACT characters mentioned in the prompt. Do NOT add random people, children, adults, or bystanders in the background or foreground. If only one person is described, show ONLY one person!
"""
    print(f"Updated IMAGE_STYLE_GUIDE to:\n{IMAGE_STYLE_GUIDE}")

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
    hero_outfit = ""
    
    if hero.get('type') == 'human':
        # Frontend structure: hero.gender, hero.name, hero.traits.{skinTone, hairColor, hairStyle, accessories}
        hero_name = hero.get('name', '')
        gender = hero.get('gender', 'child').lower()
        
        # Get traits from hero.traits or hero.details (for backward compatibility)
        traits = hero.get('traits', hero.get('details', {}))
        
        # Build description
        skin_tone = traits.get('skinTone', 'medium')
        hair_color = traits.get('hairColor', 'brown')
        hair_style = traits.get('hairStyle', 'short')
        
        hero_desc = f"a {age}-year-old {gender} with {skin_tone} skin, {hair_color} {hair_style} hair"
        
        accessories = traits.get('accessories')
        if accessories and accessories != 'None':
            hero_outfit = f"wearing {accessories}"
            hero_desc += f", {hero_outfit}"
        else:
            hero_outfit = "wearing simple, colorful clothing (t-shirt and shorts/pants)"
            hero_desc += f", {hero_outfit}"
        
        if hero_name:
            hero_desc = f"{hero_name}, {hero_desc}"
    else:
        # Animal
        hero_name = hero.get('name', '')
        animal_archetype = hero.get('animalArchetype', {})
        animal_type = animal_archetype.get('id', 'animal') if animal_archetype else 'animal'
        hero_desc = f"a cute {animal_type}"
        hero_outfit = "natural fur/skin (no human clothes unless specified)"
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

**CRITICAL INSTRUCTION: CHARACTER DEFINITION**
- You MUST define ALL recurring characters (appears in 2+ pages) in the `characters` list.
- **MANDATORY RULE:** ONLY the MAIN HERO and explicitly chosen SIDEKICK (if configured) should appear.
- **STRICTLY FORBIDDEN:** DO NOT add parents, grandparents, grandmothers, grandfathers, siblings, cousins, aunts, uncles, neighbors, random adults, or ANY family members UNLESS the story theme EXPLICITLY MENTIONS them in the theme name or description.
- **EXAMPLES OF FORBIDDEN ADDITIONS:**
  * "Kite Dreams" theme → ONLY the hero flying the kite (NO random old people watching!)
  * "Summer Rain" theme → ONLY the hero enjoying rain (NO grandmother with umbrella!)
  * "Space Adventure" theme → ONLY the hero in space (NO parents saying goodbye!)
- **ALLOWED EXCEPTIONS (theme explicitly requires them):**
  * "Grandma's Stories" theme → Grandmother IS required
  * "Visiting grandparents in countryside" → Grandparents ARE required
  * "New baby sibling" → Parents/baby ARE required
- The hero can be ALONE! That's completely fine and often better!
- Each character needs a detailed visual description for consistency.

**CHARACTER VISUAL DISTINCTIVENESS (VERY IMPORTANT):**
- Each character MUST have CLEARLY DIFFERENT clothing colors/styles from others.
- If hero wears BLUE, other characters should wear RED, GREEN, YELLOW - NOT blue!
- Animals (cats, dogs, etc.) must be described as REALISTIC ANIMALS, not cartoon humanoids. Example: "an orange tabby cat walking on four legs" NOT "a cat wearing clothes"
- Label characters clearly in descriptions: "An (the main hero in blue) is talking to Minh (the bully in red shirt)"

- **IMPORTANT**: In every `image_description`, you MUST repeat the **FULL VISUAL DESCRIPTION** of ALL characters appearing in that scene.
    - BAD: "Hero is playing with grandmother."
    - GOOD: "{hero_desc} is playing happily with grandmother (elderly woman with silver hair in a bun, wearing traditional clothing, kind smile)."

**CINEMATIC & DYNAMIC ILLUSTRATIONS (CRITICAL - READ CAREFULLY):**

**ABSOLUTELY FORBIDDEN - STIFF POSES:**
- NEVER describe characters "standing side by side" or "standing together"
- NEVER describe characters in a lineup facing the camera
- NEVER describe characters in static, posed positions like a photo
- These create BORING, LIFELESS illustrations!

**REQUIRED - ACTION-BASED SCENES:**
- Every image_description MUST include an ACTION VERB: running, jumping, reaching, hugging, climbing, laughing, playing, etc.
- Characters should be DOING something, not just existing in the scene
- Show INTERACTION: characters looking at each other, touching, helping, playing together
- Use DYNAMIC body language: leaning forward, arms outstretched, mid-motion poses

**VARIED CAMERA ANGLES (one per page, vary them):**
- Close-up on face showing emotion
- Bird's eye view (looking down from above)
- Low angle (looking up at character)
- Over-the-shoulder shot
- Wide establishing shot

**OUTFIT CONSISTENCY:**
- The hero MUST wear the same {hero_outfit} in every image
- Do not change clothing colors or styles between pages

**EXAMPLE GOOD vs BAD:**
- BAD: "An and his dog standing by the tree"
- GOOD: "Close-up of An hugging his golden puppy tightly, both with joyful expressions, under the shade of the big tree"
- BAD: "An and Hung standing together"  
- GOOD: "An reaching out to help Hung up from the ground, while the puppy wags its tail excitedly"

**SIZE & PROPORTIONS (STRICT RULES):**
- **Adults vs Children**: Adults MUST be significantly taller and larger than children (children reach adult's waist/chest).
- **Siblings**: Older characters must look taller and more mature than younger characters.
- **Humans vs Animals**: Maintain realistic size ratios (e.g., a cat is small, a horse is big) unless it's a giant fantasy creature.
- **Object Scale**: Items must be proportional to characters (e.g., a pencil fits in a hand, a backpack fits on a back).

**JSON Structure:**
{{
  "title_target": "Title in {{target_language}}",
  "characters": [
    {{
      "name": "Main Hero Name",
      "description": "Detailed visual description matching: {hero_desc}"
    }},
    {{
      "name": "Secondary Character Name (if any recurring characters)",
      "description": "Detailed visual description (age, appearance, clothing, distinguishing features)"
    }}
  ],
  "pages": [
    {{
      "page_number": 1,
      "type": "cover",
      "text_target": "Title of the story in {{target_language}}",
      "image_description": "Visual description for the cover. Hero: {hero_desc}. Setting: {setting_prompt}. INCLUDE FULL CHARACTER DETAILS."
    }},
    {{
      "page_number": 2,
      "type": "story",
      "text_target": "Story text in {{target_language}}",
      "image_description": "Scene description. Include FULL visual details of ALL characters in this scene. Hero: {hero_desc}. Setting: {setting_prompt}. Action: [describe what's happening]."
    }}
  ]
}}
"""
