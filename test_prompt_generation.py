import sys
import os

# Add current directory to path so we can import prompts
sys.path.append(os.getcwd())

from prompts import get_story_prompt

def test_prompt():
    target_language = "English"
    age = 5
    story_params = {
        "hero": {
            "type": "human",
            "name": "Lily",
            "gender": "girl",
            "traits": {
                "skinTone": "light",
                "hairColor": "blonde",
                "hairStyle": "long braided",
                "accessories": "a red backpack"
            }
        },
        "sidekick": {
            "id": "cat",
            "prompt": "a small white cat"
        },
        "theme": {
            "prompt": "first day of school"
        },
        "setting": {
            "prompt": "a colorful classroom"
        }
    }

    prompt = get_story_prompt(target_language, age, story_params)
    print("--- GENERATED PROMPT ---")
    print(prompt)
    print("------------------------")

if __name__ == "__main__":
    test_prompt()
