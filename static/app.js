// Configuration Options
const bookConfigOptions = {
    // MENU 1: WHO IS THE HERO?
    hero: {
        types: [
            { id: 'human', label: 'A Child (Human)' },
            { id: 'animal', label: 'An Animal' }
        ],
        // If Human is selected
        humanTraits: {
            gender: ['Boy', 'Girl'],
            race: ['Asian', 'Black/African', 'Hispanic/Latino', 'White/Caucasian', 'Middle Eastern', 'Mixed Race'],
            skinTone: ['Light', 'Medium', 'Tan', 'Deep', 'Dark'],
            hairStyle: ['Short & Straight', 'Short & Curly', 'Long & Straight', 'Long & Wavy', 'Braids', 'Bald/Baby'],
            hairColor: ['Black', 'Brown', 'Blonde', 'Red', 'Fantasy Blue', 'Fantasy Pink'],
            accessories: ['None', 'Glasses', 'Hearing Aid', 'Superhero Cape', 'Crown', 'Cowboy Hat']
        },
        // If Animal is selected (Archetypes)
        animalArchetypes: [
            { id: 'bear', label: 'Bear', trait: 'Brave & Cuddly' },
            { id: 'rabbit', label: 'Rabbit', trait: 'Fast & Shy' },
            { id: 'fox', label: 'Fox', trait: 'Clever & Tricky' },
            { id: 'lion', label: 'Lion', trait: 'Loud & Proud' },
            { id: 'owl', label: 'Owl', trait: 'Wise & Observant' },
            { id: 'dinosaur', label: 'Dinosaur', trait: 'Big & Friendly' }
        ]
    },

    // MENU 2: THE SIDEKICK
    sidekick: [
        { id: 'none', label: 'No Sidekick (Solo Adventure)', prompt: 'solitary hero' },
        { id: 'pet_dog', label: 'Pet Dog', prompt: 'accompanied by a playful golden retriever puppy' },
        { id: 'pet_cat', label: 'Pet Cat', prompt: 'accompanied by a lazy orange tabby cat' },
        { id: 'robot', label: 'Tiny Robot', prompt: 'accompanied by a small, floating, friendly robot' },
        { id: 'fairy', label: 'Glow Fairy', prompt: 'accompanied by a tiny glowing magical fairy' },
        { id: 'stuffed_animal', label: 'Favorite Teddy Bear', prompt: 'holding a teddy bear that comes to life in their imagination' }
    ],

    // MENU 3: THE MISSION (THEME)
    themes: [
        {
            category: 'Emotional Growth',
            options: [
                { id: 'bravery', label: 'Overcoming Fear', prompt: 'a story about finding courage when scared of the dark' },
                { id: 'anger', label: 'Managing Anger', prompt: 'a story about calming down when things go wrong' },
                { id: 'sadness', label: 'It’s Okay to be Sad', prompt: 'a story about losing a toy and processing sadness' }
            ]
        },
        {
            category: 'Social Skills',
            options: [
                { id: 'sharing', label: 'Learning to Share', prompt: 'a story about sharing toys with a new friend' },
                { id: 'bullying', label: 'Standing Up for Others', prompt: 'a story about kindness and stopping a bully' },
                { id: 'apology', label: 'Saying Sorry', prompt: 'a story about making a mistake and fixing it' }
            ]
        },
        {
            category: 'Daily Routines (Toddlers)',
            options: [
                { id: 'bedtime', label: 'Bedtime Routine', prompt: 'a calming story about getting ready to sleep' },
                { id: 'potty', label: 'Potty Training', prompt: 'an encouraging story about using the potty' },
                { id: 'school', label: 'First Day of School', prompt: 'a story about the excitement of the first day of school' }
            ]
        },
        {
            category: 'Imagination & Adventure',
            options: [
                { id: 'space', label: 'Blast Off to Space', prompt: 'a sci-fi adventure visiting the moon' },
                { id: 'treasure', label: 'Hidden Treasure', prompt: 'an adventure map quest to find a hidden chest' },
                { id: 'magic', label: 'Magic Powers', prompt: 'discovering a magical ability for one day' }
            ]
        }
    ],

    // MENU 4: SETTING (WHERE?)
    settings: [
        { id: 'forest', label: 'Whimsical Forest', prompt: 'a lush green forest with giant mushrooms and sunbeams' },
        { id: 'city', label: 'Busy City', prompt: 'a colorful city street with tall buildings and cars' },
        { id: 'ocean', label: 'Underwater Reef', prompt: 'a bright blue underwater coral reef with bubbles' },
        { id: 'castle', label: 'Cloud Castle', prompt: 'a magical castle floating on white fluffy clouds' },
        { id: 'bedroom', label: 'Cozy Bedroom', prompt: 'a messy but cozy child\'s bedroom with toys everywhere' },
        { id: 'farm', label: 'Sunny Farm', prompt: 'a rustic red barn with rolling green hills' }
    ],

    // MENU 5: ART STYLE (VISUAL VIBE)
    artStyles: [
        {
            id: 'watercolor',
            label: 'Soft Watercolor',
            imageGenPrompt: 'childrens book illustration, soft watercolor style, pastel colors, white background, dreamy texture'
        },
        {
            id: 'vector',
            label: 'Modern Vector',
            imageGenPrompt: 'flat vector art, bright bold colors, clean lines, geometric shapes, educational style, minimal detail'
        },
        {
            id: 'crayon',
            label: 'Crayon Drawing',
            imageGenPrompt: 'childlike crayon drawing style, textured wax finish, rough edges, innocent and playful, white paper background'
        },
        {
            id: 'pixar',
            label: '3D Cartoon',
            imageGenPrompt: '3D render, Pixar style, cute, high fidelity, octane render, bright studio lighting, soft round shapes'
        },
        {
            id: 'collage',
            label: 'Paper Collage',
            imageGenPrompt: 'cut paper collage style, Eric Carle inspired, textured paper, layered look, mixed media'
        }
    ]
};

// State Management
let currentStep = 1;
let wizardState = {
    hero: {
        type: 'human',
        details: {
            name: 'Linh',
            gender: 'Boy',
            race: 'Asian',
            skinTone: 'Tan',
            hairStyle: 'Short & Straight',
            hairColor: 'Black',
            accessories: 'None'
        }
    },
    sidekick: bookConfigOptions.sidekick.find(s => s.id === 'pet_dog'),
    theme: bookConfigOptions.themes[0].options.find(t => t.id === 'bravery'),
    setting: bookConfigOptions.settings.find(s => s.id === 'forest'),
    // Default to watercolor style (no longer selectable by user)
    style: {
        id: 'watercolor',
        label: 'Soft Watercolor',
        imageGenPrompt: 'childrens book illustration, soft watercolor style, pastel colors, white background, dreamy texture'
    },
    language: 'Vietnamese',
    age: 6
};

let isGenerating = false;
let currentStory = null;
let currentPageIndex = 0;
let storyArchived = false; // Track if current story has been archived

// Warn user before leaving page if story is not saved
window.addEventListener('beforeunload', (e) => {
    // Only warn if there's a story displayed and it hasn't been archived
    if (currentStory && !storyArchived) {
        e.preventDefault();
        e.returnValue = ''; // Modern browsers require this
        return ''; // Some browsers show this message
    }
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderStep(1);
});

function renderStep(step) {
    const content = document.getElementById('wizardContent');
    content.innerHTML = ''; // Clear current content

    // Update stepper UI
    document.querySelectorAll('.step').forEach(el => {
        el.classList.toggle('active', parseInt(el.dataset.step) === step);
    });

    // Update buttons (step 5 is now the final step)
    document.getElementById('backBtn').classList.toggle('hidden', step === 1);
    document.getElementById('nextBtn').classList.toggle('hidden', step === 5);
    document.getElementById('generateBtn').classList.toggle('hidden', step !== 5);

    switch (step) {
        case 1: renderSetupStep(content); break;
        case 2: renderHeroStep(content); break;
        case 3: renderSidekickStep(content); break;
        case 4: renderMissionStep(content); break;
        case 5: renderSettingStep(content); break;
    }
}

function nextStep() {
    if (currentStep < 5) {
        currentStep++;
        renderStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        renderStep(currentStep);
    }
}

// --- Step Renderers ---

function renderSetupStep(container) {
    // Clear container first to prevent duplication
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'section-title';
    title.innerText = 'Let\'s Get Started!';
    container.appendChild(title);

    const setupForm = document.createElement('div');
    setupForm.innerHTML = `
        <div class="form-group">
            <label>Child's Age</label>
            <select id="ageSelect">
                ${[...Array(13).keys()].map(i => `<option value="${i}" ${i === wizardState.age ? 'selected' : ''}>${i} years old</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label>Language</label>
            <select id="languageSelect">
                <option value="English" ${wizardState.language === 'English' ? 'selected' : ''}>English 🇬🇧</option>
                <option value="Vietnamese" ${wizardState.language === 'Vietnamese' ? 'selected' : ''}>Vietnamese 🇻🇳</option>
                <option value="Finnish" ${wizardState.language === 'Finnish' ? 'selected' : ''}>Finnish 🇫🇮</option>
                <option value="Spanish" ${wizardState.language === 'Spanish' ? 'selected' : ''}>Spanish 🇪🇸</option>
                <option value="French" ${wizardState.language === 'French' ? 'selected' : ''}>French 🇫🇷</option>
                <option value="German" ${wizardState.language === 'German' ? 'selected' : ''}>German 🇩🇪</option>
                <option value="Italian" ${wizardState.language === 'Italian' ? 'selected' : ''}>Italian 🇮🇹</option>
                <option value="Swedish" ${wizardState.language === 'Swedish' ? 'selected' : ''}>Swedish 🇸🇪</option>
            </select>
        </div>
    `;
    container.appendChild(setupForm);

    // Bind listeners
    setTimeout(() => {
        document.getElementById('ageSelect').onchange = (e) => wizardState.age = parseInt(e.target.value);
        document.getElementById('languageSelect').onchange = (e) => wizardState.language = e.target.value;
    }, 0);
}

function renderHeroStep(container) {
    // Clear container first to prevent duplication
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'section-title';
    title.innerText = 'Who is the hero?';
    container.appendChild(title);

    // Hero Type Selection
    const typeGrid = document.createElement('div');
    typeGrid.className = 'options-grid';

    bookConfigOptions.hero.types.forEach(type => {
        const card = createOptionCard(type.label, '', type.id === wizardState.hero.type, () => {
            wizardState.hero.type = type.id;
            renderHeroStep(container); // Re-render to show/hide details
        });
        typeGrid.appendChild(card);
    });
    container.appendChild(typeGrid);

    // Conditional Details
    const detailsContainer = document.createElement('div');
    detailsContainer.style.marginTop = '2rem';

    // Helper to create text input
    const createTextInput = (label, key, placeholder = '') => {
        const group = document.createElement('div');
        group.className = 'form-group';
        group.innerHTML = `<label>${label}</label>`;
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = placeholder;
        input.value = wizardState.hero.details[key] || '';
        input.onchange = (e) => wizardState.hero.details[key] = e.target.value;
        group.appendChild(input);
        return group;
    };

    if (wizardState.hero.type === 'human') {
        detailsContainer.innerHTML = '<h3>Customize Appearance</h3>';

        // Add name input first
        detailsContainer.appendChild(createTextInput('Hero Name', 'name', 'e.g., Emma, Liam, etc.'));

        // Helper to create dropdowns
        const createSelect = (label, options, key) => {
            const group = document.createElement('div');
            group.className = 'form-group';
            group.innerHTML = `<label>${label}</label>`;
            const select = document.createElement('select');
            options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt;
                option.innerText = opt;
                if (wizardState.hero.details[key] === opt) option.selected = true;
                select.appendChild(option);
            });
            select.onchange = (e) => wizardState.hero.details[key] = e.target.value;
            // Set default if empty
            if (!wizardState.hero.details[key]) wizardState.hero.details[key] = options[0];

            group.appendChild(select);
            return group;
        };

        detailsContainer.appendChild(createSelect('Gender', bookConfigOptions.hero.humanTraits.gender, 'gender'));
        detailsContainer.appendChild(createSelect('Race/Ethnicity', bookConfigOptions.hero.humanTraits.race, 'race'));
        detailsContainer.appendChild(createSelect('Skin Tone', bookConfigOptions.hero.humanTraits.skinTone, 'skinTone'));
        detailsContainer.appendChild(createSelect('Hair Style', bookConfigOptions.hero.humanTraits.hairStyle, 'hairStyle'));
        detailsContainer.appendChild(createSelect('Hair Color', bookConfigOptions.hero.humanTraits.hairColor, 'hairColor'));
        detailsContainer.appendChild(createSelect('Accessories', bookConfigOptions.hero.humanTraits.accessories, 'accessories'));

    } else {
        detailsContainer.innerHTML = '<h3>Choose Animal</h3>';

        // Add name input first
        const nameInput = createTextInput('Hero Name', 'name', 'e.g., Benny, Luna, etc.');
        detailsContainer.appendChild(nameInput);

        const animalGrid = document.createElement('div');
        animalGrid.className = 'options-grid';

        bookConfigOptions.hero.animalArchetypes.forEach(animal => {
            const card = createOptionCard(animal.label, animal.trait, animal.id === wizardState.hero.details.animal, () => {
                wizardState.hero.details.animal = animal.id;
                renderHeroStep(container);
            });
            animalGrid.appendChild(card);
        });

        // Set default animal if not set
        if (!wizardState.hero.details.animal) wizardState.hero.details.animal = bookConfigOptions.hero.animalArchetypes[0].id;

        detailsContainer.appendChild(animalGrid);
    }

    container.appendChild(detailsContainer);
}

function renderSidekickStep(container) {
    // Clear container first to prevent duplication
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'section-title';
    title.innerText = 'Choose a Sidekick';
    container.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'options-grid';

    bookConfigOptions.sidekick.forEach(opt => {
        const card = createOptionCard(opt.label, '', opt.id === (wizardState.sidekick?.id), () => {
            wizardState.sidekick = opt;
            renderSidekickStep(container);
        });
        grid.appendChild(card);
    });
    container.appendChild(grid);
}

function renderMissionStep(container) {
    // Clear container first to prevent duplication
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'section-title';
    title.innerText = 'What is the Mission?';
    container.appendChild(title);

    bookConfigOptions.themes.forEach(cat => {
        const catTitle = document.createElement('h3');
        catTitle.innerText = cat.category;
        catTitle.style.marginTop = '1.5rem';
        container.appendChild(catTitle);

        const grid = document.createElement('div');
        grid.className = 'options-grid';

        cat.options.forEach(opt => {
            const card = createOptionCard(opt.label, opt.prompt, opt.id === (wizardState.theme?.id), () => {
                wizardState.theme = opt;
                renderMissionStep(container);
            });
            grid.appendChild(card);
        });
        container.appendChild(grid);
    });
}

function renderSettingStep(container) {
    // Clear container first to prevent duplication
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'section-title';
    title.innerText = 'Where does it take place?';
    container.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'options-grid';

    bookConfigOptions.settings.forEach(opt => {
        const card = createOptionCard(opt.label, opt.prompt, opt.id === (wizardState.setting?.id), () => {
            wizardState.setting = opt;
            renderSettingStep(container);
        });
        grid.appendChild(card);
    });
    container.appendChild(grid);
}

function renderStyleStep(container) {
    // Clear container first to prevent duplication
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'section-title';
    title.innerText = 'Choose Art Style';
    container.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'options-grid';

    bookConfigOptions.artStyles.forEach(opt => {
        const card = createOptionCard(opt.label, '', opt.id === (wizardState.style?.id), () => {
            wizardState.style = opt;
            renderStyleStep(container);
        });
        grid.appendChild(card);
    });
    container.appendChild(grid);
}

function createOptionCard(label, desc, isSelected, onClick) {
    const card = document.createElement('div');
    card.className = `option-card ${isSelected ? 'selected' : ''}`;
    card.onclick = onClick;

    card.innerHTML = `
        <span class="option-label">${label}</span>
        ${desc ? `<div class="option-desc">${desc}</div>` : ''}
    `;
    return card;
}

// --- Generation Logic ---

function startGeneration() {
    if (isGenerating) return;

    // Validation (style is now set by default)
    if (!wizardState.theme || !wizardState.setting) {
        alert("Please complete all steps!");
        return;
    }

    const btn = document.getElementById('generateBtn');
    const progress = document.getElementById('progressContainer');
    const bookContainer = document.getElementById('bookContainer');
    const wizardContainer = document.querySelector('.wizard-container');
    const downloadSection = document.getElementById('downloadSection');

    btn.disabled = true;
    isGenerating = true;
    progress.classList.remove('hidden');
    bookContainer.classList.add('hidden');
    downloadSection.classList.add('hidden');

    // Construct final prompt object
    const storyPrompt = {
        language: wizardState.language,
        age: wizardState.age,
        hero: wizardState.hero,
        sidekick: wizardState.sidekick,
        theme: wizardState.theme,
        setting: wizardState.setting,
        style: wizardState.style,
        test_mode: document.getElementById('testModeToggle').checked
    };

    fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storyPrompt)
    })
        .then(response => response.json())
        .then(data => {
            pollStatus();
        })
        .catch(err => {
            console.error(err);
            btn.disabled = false;
            isGenerating = false;
        });
}

function pollStatus() {
    const logMessage = document.getElementById('logMessage');
    const progressFill = document.querySelector('.progress-fill');
    const totalPages = 8; // Total number of pages in a story

    console.log("pollStatus() called");

    const interval = setInterval(() => {
        console.log("Polling status from /api/status...");
        fetch('/api/status')
            .then(response => response.json())
            .then(data => {
                console.log("Status update:", data.status); // Debug log

                let percent = 0;
                let displayMessage = data.status;

                // Parse status and calculate progress
                if (data.status.includes("Starting") || data.status.includes("starting")) {
                    percent = 5;
                    displayMessage = "Starting story generation...";
                } else if (data.status.includes("story concept") || data.status.includes("Generating story")) {
                    percent = 10;
                    displayMessage = "Creating story concept...";
                } else if (data.status.includes("Processing character") || data.status.includes("character")) {
                    percent = 15;
                    displayMessage = "Generating character models...";
                } else if (data.status.toLowerCase().includes("page")) {
                    // Extract page number from status message (case insensitive)
                    const match = data.status.match(/page (\d+)/i);
                    if (match) {
                        const pageNum = parseInt(match[1]);
                        // Calculate progress: 20% for setup, 70% for pages (8.75% per page), 10% for PDF
                        percent = 20 + ((pageNum) / totalPages) * 70;
                        displayMessage = `Creating page ${pageNum}/${totalPages}...`;
                    } else {
                        percent = 30;
                    }
                } else if (data.status.includes("Verifying") || data.status.includes("verifying")) {
                    percent = 92;
                    displayMessage = "Verifying all pages...";
                } else if (data.status.includes("Compiling") || data.status.includes("PDF")) {
                    percent = 95;
                    displayMessage = "Compiling PDF...";
                } else if (data.status === "Complete") {
                    percent = 100;
                    displayMessage = "Complete!";
                } else {
                    // Fallback for unmatched statuses
                    console.warn("Unmatched status:", data.status);
                    percent = 5;
                    displayMessage = data.status;
                }

                console.log("Setting progress:", percent + "%", displayMessage);
                logMessage.innerText = displayMessage;
                progressFill.style.width = percent + '%';

                if (data.status === "Complete" || data.status.startsWith("Error")) {
                    clearInterval(interval);
                    isGenerating = false;
                    document.getElementById('generateBtn').disabled = false;

                    if (data.status === "Complete") {
                        // Hide wizard and progress
                        document.querySelector('.wizard-container').classList.add('hidden');
                        document.getElementById('progressContainer').classList.add('hidden');

                        loadStory();
                    }
                }
            });
    }, 1000);
}

function loadStory() {
    console.log("Loading story...");
    fetch('/api/story')
        .then(response => response.json())
        .then(story => {
            console.log("Story loaded:", story);
            currentStory = story;
            currentPageIndex = 0;
            storyArchived = false; // Reset flag for new story

            const container = document.getElementById('bookContainer');
            if (!container) {
                console.error("Book container not found!");
                return;
            }
            container.classList.remove('hidden');
            console.log("Book container shown");

            document.getElementById('downloadSection').classList.remove('hidden');

            // Update total pages
            document.getElementById('totalPages').innerText = story.pages.length;

            // Show first page
            renderPage(0);

            // Scroll to book
            container.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(err => console.error("Error loading story:", err));
}

function renderPage(index) {
    const container = document.getElementById('currentPageContainer');
    const pageNum = document.getElementById('pageNum');
    const totalPages = document.getElementById('totalPages');

    if (!currentStory || !currentStory.pages) return;

    const page = currentStory.pages[index];
    const timestamp = new Date().getTime(); // Cache buster

    container.innerHTML = `
        <div class="page-image-wrapper" style="position: relative; display: inline-block;">
            <img src="/output/cards/story_card_${page.page_number}.png?t=${timestamp}" alt="Page ${page.page_number}" class="story-card-img">
            <button onclick="regenerateImage(${page.page_number})" class="regenerate-btn" title="Regenerate Image">
                🔄 Regenerate Image
            </button>
        </div>
    `;

    pageNum.innerText = index + 1;
    totalPages.innerText = currentStory.pages.length;

    // Update buttons
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === currentStory.pages.length - 1;
}

function regenerateImage(pageNumber) {
    if (!confirm('Are you sure you want to regenerate this image? It will replace the current one.')) return;

    const btn = document.querySelector('.regenerate-btn');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '🔄 Regenerating...';
    }

    fetch('/api/regenerate_page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page_number: pageNumber })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Reload the page to show new image
                // Add a small delay to ensure file system update is caught
                setTimeout(() => {
                    renderPage(currentPageIndex);
                }, 500);
            } else {
                alert('Error: ' + (data.error || 'Unknown error'));
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = '🔄 Regenerate Image';
                }
            }
        })
        .catch(err => {
            console.error(err);
            alert('Failed to regenerate image');
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '🔄 Regenerate Image';
            }
        });
}

function prevPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        renderPage(currentPageIndex);
    }
}

function nextPage() {
    if (currentStory && currentPageIndex < currentStory.pages.length - 1) {
        currentPageIndex++;
        renderPage(currentPageIndex);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (document.getElementById('bookContainer').classList.contains('hidden')) return;

    if (e.key === 'ArrowLeft') {
        prevPage();
    } else if (e.key === 'ArrowRight') {
        nextPage();
    }
});

function archiveStory() {
    fetch('/api/archive', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error archiving story: ' + data.error);
            } else {
                storyArchived = true; // Mark story as archived
                alert('Story saved to archive!');
            }
        })
        .catch(err => {
            console.error(err);
            alert('Failed to connect to server.');
        });
}

function startOver() {
    // Hide book and download sections
    document.getElementById('bookContainer').classList.add('hidden');
    document.getElementById('downloadSection').classList.add('hidden');

    // Show wizard and reset to step 1
    document.querySelector('.wizard-container').classList.remove('hidden');
    currentStep = 1;
    renderStep(1);

    // Reset story state
    currentStory = null;
    storyArchived = false;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
