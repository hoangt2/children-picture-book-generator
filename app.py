from flask import Flask, render_template, jsonify, send_from_directory, request, send_file
import threading
import os
import json
import time
from story_generator import main as generate_story_main, generate_mock_story, regenerate_page

# Point Flask to the React build directory
app = Flask(__name__, 
            static_folder='frontend/dist/assets',
            static_url_path='/assets')

# Global state for the generation process
generation_state = {
    "is_generating": False,
    "status": "Ready",
    "logs": []
}

def run_generation(story_prompt):
    """Runs the story generation in a separate thread."""
    global generation_state
    generation_state["is_generating"] = True
    generation_state["status"] = "Starting..."
    generation_state["logs"] = []
    
    # Reset the global STATUS to prevent showing stale "Complete" from previous run
    from story_generator import update_status
    update_status("Starting...")
    
    # Clean up old output BEFORE starting generation to prevent old character models from appearing
    from cleanup import cleanup
    cleanup("output")

    try:
        # Check for test mode
        if story_prompt.get("test_mode"):
            generate_mock_story(story_prompt)
        else:
            # Pass the story_prompt to the generator
            generate_story_main(story_prompt)
        
        generation_state["status"] = "Complete"
    except Exception as e:
        generation_state["status"] = f"Error: {str(e)}"
        generation_state["logs"].append(f"Error: {str(e)}")
    finally:
        generation_state["is_generating"] = False


@app.route('/')
def index():
    """Serve the React app."""
    return send_file(os.path.join(os.getcwd(), 'frontend/dist/index.html'))

@app.route('/api/generate', methods=['POST'])
def start_generation():
    global generation_state
    if generation_state["is_generating"]:
        return jsonify({"error": "Already generating"}), 400
    
    data = request.get_json() or {}
    
    thread = threading.Thread(target=run_generation, args=(data,))
    thread.start()
    
    return jsonify({"status": "started", "message": "Generation started"})

@app.route('/api/status')
def get_status():
    # Import STATUS from story_generator to get real-time updates
    from story_generator import STATUS
    return jsonify({"status": STATUS, "is_generating": generation_state["is_generating"]})

@app.route('/api/story')
def get_story():
    # Return the story.json content
    try:
        with open("output/data/story.json", "r", encoding="utf-8") as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/generate_story', methods=['POST'])
def generate_story_api():
    """Generate a story from React frontend data."""
    global generation_state
    
    if generation_state["is_generating"]:
        return jsonify({"error": "Already generating"}), 400
    
    try:
        data = request.get_json() or {}
        
        # Start generation in a thread
        thread = threading.Thread(target=run_generation, args=(data,))
        thread.start()
        
        # Wait for generation to complete (or timeout after 5 minutes)
        timeout = 300  # 5 minutes
        start_time = time.time()
        while generation_state["is_generating"] and (time.time() - start_time) < timeout:
            time.sleep(0.5)
        
        # Check if generation completed successfully
        if generation_state["status"] == "Complete":
            # Load and return the generated story
            with open("output/data/story.json", "r", encoding="utf-8") as f:
                story_data = json.load(f)
            return jsonify({"status": "success", "story": story_data})
        else:
            return jsonify({"error": generation_state["status"]}), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
 
@app.route('/api/regenerate_page', methods=['POST'])
def regenerate_page_endpoint():
    data = request.get_json()
    page_number = data.get('page_number')
    fix_prompt = data.get('fix_prompt', '')
    
    if not page_number:
        return jsonify({"error": "Page number is required"}), 400
        
    try:
        success = regenerate_page(page_number, fix_prompt=fix_prompt)
        if success:
            return jsonify({"status": "success", "message": f"Page {page_number} regenerated"})
        else:
            return jsonify({"error": "Failed to regenerate page"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/output/<path:filename>')
def serve_output(filename):
    return send_from_directory('output', filename)

import shutil
import datetime

@app.route('/api/archive', methods=['POST'])
def archive_story():
    try:
        # Load story data to get title
        with open("output/data/story.json", "r", encoding="utf-8") as f:
            data = json.load(f)
        
        title = data.get("title_target", "Untitled")
        safe_title = "".join(x for x in title if x.isalnum() or x in (' ', '-', '_')).strip().replace(' ', '_')
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        
        archive_name = f"{timestamp}_{safe_title}"
        archive_path = os.path.join("archives", archive_name)
        
        # Create archive directory structure
        os.makedirs(os.path.join(archive_path, "data"), exist_ok=True)
        
        # Copy specific files/directories only
        # 1. Copy cards directory
        if os.path.exists("output/cards"):
            shutil.copytree("output/cards", os.path.join(archive_path, "cards"))
        
        # 2. Copy images directory
        if os.path.exists("output/images"):
            shutil.copytree("output/images", os.path.join(archive_path, "images"))
        
        # 3. Copy story.json
        if os.path.exists("output/data/story.json"):
            shutil.copy2("output/data/story.json", os.path.join(archive_path, "data", "story.json"))
        
        # 4. Copy story.pdf
        if os.path.exists("output/story.pdf"):
            shutil.copy2("output/story.pdf", os.path.join(archive_path, "story.pdf"))
        
        return jsonify({"message": "Story archived successfully", "path": archive_path})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
