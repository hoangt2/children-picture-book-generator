# Finnish Story Book Generator

An AI-powered tool that generates illustrated Finnish language learning stories with adjustable difficulty levels.

## Features

- 🎨 **AI-Generated Stories**: Creates unique 8-page stories set in real Finnish cities
- 📚 **Multiple Difficulty Levels**: Beginner (A1-A2), Intermediate (B1-B2), Advanced (C1-C2)
- 👥 **Multi-Character Support**: Randomly generates 1-3 main characters per story
- 🖼️ **Illustrated Pages**: Modern flat illustration style with character consistency
- 📱 **Story Cards**: Bilingual (Finnish/English) cards optimized for mobile viewing
- 📄 **PDF Export**: Automatically compiles stories into printable PDF books
- 🌐 **Web Interface**: Beautiful dark-mode UI with real-time progress tracking

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kielo-story-book-generator
```

2. Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up your Google API key:
Create a `.env` file in the project root:
```
GOOGLE_API_KEY=your_api_key_here
```

## Frontend Development

The web interface is built with React and Vite. There are **two ways** to run the frontend:

### Option 1: Standalone Development (Recommended for Frontend Work)

Use this when actively developing the frontend with hot-reload:

1. Start the Flask backend:
```bash
python app.py
```

2. In a separate terminal, navigate to the frontend directory and start the dev server:
```bash
cd frontend
npm run dev
```

3. Open `http://localhost:5173` in your browser

The Vite dev server will automatically reload when you make changes, and proxy API requests to the Flask backend at `http://localhost:5001`.

### Option 2: Flask Integration (Production-like)

Use this to test the production build or when you're done with frontend changes:

1. Navigate to the frontend directory and build:
```bash
cd frontend
npm run build
```

2. Start the Flask backend:
```bash
cd ..
python app.py
```

3. Open `http://localhost:5001` in your browser

**Important**: After making frontend changes, you must rebuild (`npm run build`) for them to appear when running through Flask.

### Initial Setup

If you haven't installed dependencies yet:

```bash
cd frontend
npm install
```

### Other Commands

- **Lint code**: `npm run lint`
- **Preview production build**: `npm run preview`

## Usage

### Web Interface (Recommended)

1. Start the Flask server:
```bash
python app.py
```

2. Open your browser to `http://localhost:5000`

3. Select your desired difficulty level

4. Click "Generate New Story"

5. View the generated story and download the PDF

### Command Line

Generate a story directly from the command line:

```bash
# Default (Beginner level)
python story_generator.py

# Specify difficulty level
python story_generator.py --level Intermediate

# Custom output directory
python story_generator.py --output_dir my_stories --level Advanced
```

### Clean Up

Remove generated files:
```bash
python cleanup.py
```

## Output Structure

```
output/
├── images/           # Generated page images
│   ├── character_model_*.png
│   └── page_*.png
├── cards/            # Composited story cards (image + text)
│   └── story_card_*.png
├── data/             # Story metadata
│   └── story.json
└── story.pdf         # Final compiled PDF
```

## Language Levels

### Beginner (A1-A2)
- Simple SVO sentence structure
- Present and simple past tense
- Basic cases (Nominative, Partitive, Illative, Inessive)
- Common everyday vocabulary
- 5-10 words per sentence

### Intermediate (B1-B2)
- Compound sentences with subordinate clauses
- Perfect tenses and conditional mood
- Extended case usage (Elative, Adessive, Ablative, Allative, Essive)
- Broader vocabulary including abstract concepts
- 8-15 words per sentence

### Advanced (C1-C2)
- Complex sentences with multiple clauses
- All tenses and moods (potential, imperative)
- All 15 Finnish cases
- Rich vocabulary with idioms and literary expressions
- 10-20 words per sentence

## Technical Stack

- **AI Models**: Google Gemini 2.0 Flash (text), Gemini 2.5 Flash Image (illustrations)
- **Backend**: Python, Flask
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Image Processing**: Pillow (PIL)

## Project Structure

```
kielo-story-book-generator/
├── app.py                 # Flask web application
├── story_generator.py     # Core story generation logic
├── image_composer.py      # Story card composition
├── pdf_generator.py       # PDF compilation
├── prompts.py             # AI prompts for different levels
├── cleanup.py             # Utility to clean output
├── requirements.txt       # Python dependencies
├── templates/             # HTML templates
│   └── index.html
└── static/                # CSS and JavaScript
    ├── style.css
    └── app.js
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.