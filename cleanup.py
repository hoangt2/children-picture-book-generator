import shutil
import os
import argparse

def cleanup(output_dir="output"):
    """Removes the output directory and all its contents."""
    if os.path.exists(output_dir):
        try:
            # List character models before cleanup for debugging
            images_dir = os.path.join(output_dir, "images")
            if os.path.exists(images_dir):
                char_models = [f for f in os.listdir(images_dir) if f.startswith("character_model_")]
                if char_models:
                    print(f"Cleaning up {len(char_models)} character model(s): {', '.join(char_models)}")
            
            shutil.rmtree(output_dir)
            print(f"Successfully removed '{output_dir}' and all its contents.")
        except Exception as e:
            print(f"Error removing '{output_dir}': {e}")
    else:
        print(f"Directory '{output_dir}' does not exist.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Cleanup output directory")
    parser.add_argument("--dir", default="output", help="Directory to clean up")
    args = parser.parse_args()
    
    cleanup(args.dir)
