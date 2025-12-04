// Translations (Moved to translations.js)

// Configuration Options (Moved to config.js)

// State Management
let currentLanguage = 'vi'; // Default
let currentStep = 1;
let wizardState = {
    hero: {
        type: 'human',
        details: {
            name: 'An',
            gender: 'Boy',
            race: 'Asian',
            skinTone: 'Tan',
            hairStyle: 'Short & Straight',
            hairColor: 'Black',
            accessories: 'None'
        }
    },
    storyGenre: 'realistic',
    sidekick: bookConfigOptions.sidekick.find(s => s.id === 'none'),
    theme: bookConfigOptions.themes[0].options.find(t => t.id === 'bravery'),
    setting: bookConfigOptions.settings.find(s => s.id === 'none'),
    style: {
        id: 'watercolor',
        labelKey: 'style_watercolor',
        imageGenPrompt: 'childrens book illustration, soft watercolor style, pastel colors, white background, dreamy texture'
    },
    age: 6
};

let isGenerating = false;
let currentStory = null;
let currentPageIndex = 0;
let storyArchived = false;

// Helper: Get Translation
function t(key, params = {}) {
    let text = translations[currentLanguage][key] || key;
    for (const [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, v);
    }
    return text;
}

// Helper: Update UI Language
function updateLanguage(lang) {
    currentLanguage = lang;

    // Update static elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    // Re-render current step
    renderStep(currentStep);
}

// Warn user before leaving page if story is not saved
window.addEventListener('beforeunload', (e) => {
    if (currentStory && !storyArchived) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Bind Language Toggle
    const langToggle = document.getElementById('languageToggle');

    // Set initial language based on toggle
    const initialLang = langToggle.checked ? 'vi' : 'en';
    updateLanguage(initialLang);

    langToggle.addEventListener('change', (e) => {
        updateLanguage(e.target.checked ? 'vi' : 'en');
    });
});

function renderStep(step) {
    const content = document.getElementById('wizardContent');
    content.innerHTML = '';

    // Update stepper UI
    document.querySelectorAll('.step').forEach(el => {
        el.classList.toggle('active', parseInt(el.dataset.step) === step);
    });

    // Update buttons
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
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'section-title';
    title.innerText = t('setupTitle');
    container.appendChild(title);

    const setupForm = document.createElement('div');
    setupForm.innerHTML = `
        <div class="form-group">
            <label>${t('childAge')}</label>
            <select id="ageSelect">
                ${[...Array(13).keys()].map(i => `<option value="${i}" ${i === wizardState.age ? 'selected' : ''}>${i} ${currentLanguage === 'vi' ? 'tuổi' : 'years old'}</option>`).join('')}
            </select>
        </div>
    `;
    container.appendChild(setupForm);

    // Genre Selection Section
    const genreSection = document.createElement('div');
    genreSection.style.marginTop = '2rem';

    const genreTitle = document.createElement('h3');
    genreTitle.innerText = t('genreTitle');
    genreSection.appendChild(genreTitle);

    const genreGrid = document.createElement('div');
    genreGrid.className = 'options-grid';

    bookConfigOptions.genres.forEach(genre => {
        const card = createOptionCard(
            `${genre.icon} ${t(genre.labelKey)}`,
            t(genre.descKey),
            genre.id === wizardState.storyGenre,
            () => {
                wizardState.storyGenre = genre.id;
                renderSetupStep(container);
            }
        );
        genreGrid.appendChild(card);
    });

    genreSection.appendChild(genreGrid);
    container.appendChild(genreSection);

    setTimeout(() => {
        document.getElementById('ageSelect').onchange = (e) => wizardState.age = parseInt(e.target.value);
    }, 0);
}

function renderHeroStep(container) {
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'section-title';
    title.innerText = t('heroTitle');
    container.appendChild(title);

    // Hero Type Selection
    const typeGrid = document.createElement('div');
    typeGrid.className = 'options-grid';

    bookConfigOptions.hero.types.forEach(type => {
        const card = createOptionCard(t(type.labelKey), '', type.id === wizardState.hero.type, () => {
            wizardState.hero.type = type.id;
            renderHeroStep(container);
        });
        typeGrid.appendChild(card);
    });
    container.appendChild(typeGrid);

    // Conditional Details
    const detailsContainer = document.createElement('div');
    detailsContainer.style.marginTop = '2rem';

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
        detailsContainer.innerHTML = `<h3>${t('customizeAppearance')}</h3>`;

        detailsContainer.appendChild(createTextInput(t('heroName'), 'name', t('heroNamePlaceholder')));

        const createSelect = (label, options, key) => {
            const group = document.createElement('div');
            group.className = 'form-group';
            group.innerHTML = `<label>${label}</label>`;
            const select = document.createElement('select');
            options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.value;
                option.innerText = t(opt.labelKey);
                if (wizardState.hero.details[key] === opt.value) option.selected = true;
                select.appendChild(option);
            });
            select.onchange = (e) => wizardState.hero.details[key] = e.target.value;
            if (!wizardState.hero.details[key]) wizardState.hero.details[key] = options[0].value;

            group.appendChild(select);
            return group;
        };

        detailsContainer.appendChild(createSelect(t('gender'), bookConfigOptions.hero.humanTraits.gender, 'gender'));
        detailsContainer.appendChild(createSelect(t('race'), bookConfigOptions.hero.humanTraits.race, 'race'));
        detailsContainer.appendChild(createSelect(t('skinTone'), bookConfigOptions.hero.humanTraits.skinTone, 'skinTone'));
        detailsContainer.appendChild(createSelect(t('hairStyle'), bookConfigOptions.hero.humanTraits.hairStyle, 'hairStyle'));
        detailsContainer.appendChild(createSelect(t('hairColor'), bookConfigOptions.hero.humanTraits.hairColor, 'hairColor'));
        detailsContainer.appendChild(createSelect(t('accessories'), bookConfigOptions.hero.humanTraits.accessories, 'accessories'));

    } else {
        detailsContainer.innerHTML = `<h3>${t('chooseAnimal')}</h3>`;

        detailsContainer.appendChild(createTextInput(t('heroName'), 'name', t('animalNamePlaceholder')));

        const animalGrid = document.createElement('div');
        animalGrid.className = 'options-grid';

        bookConfigOptions.hero.animalArchetypes.forEach(animal => {
            const card = createOptionCard(t(animal.labelKey), t(animal.traitKey), animal.id === wizardState.hero.details.animal, () => {
                wizardState.hero.details.animal = animal.id;
                renderHeroStep(container);
            });
            animalGrid.appendChild(card);
        });

        if (!wizardState.hero.details.animal) wizardState.hero.details.animal = bookConfigOptions.hero.animalArchetypes[0].id;

        detailsContainer.appendChild(animalGrid);
    }

    container.appendChild(detailsContainer);
}

function renderSidekickStep(container) {
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'section-title';
    title.innerText = t('sidekickTitle');
    container.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'options-grid';

    bookConfigOptions.sidekick.forEach(opt => {
        const card = createOptionCard(t(opt.labelKey), '', opt.id === (wizardState.sidekick?.id), () => {
            wizardState.sidekick = opt;
            renderSidekickStep(container);
        });
        grid.appendChild(card);
    });
    container.appendChild(grid);
}

function renderMissionStep(container) {
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'section-title';
    title.innerText = t('missionTitle');
    container.appendChild(title);

    bookConfigOptions.themes.forEach(cat => {
        // Filter options by genre AND language
        const filteredOptions = cat.options.filter(opt => {
            // Check genre
            if (opt.type && opt.type !== wizardState.storyGenre) return false;
            // Check language (if specified)
            if (opt.languages && !opt.languages.includes(currentLanguage)) return false;
            return true;
        });

        // Skip category if no options match
        if (filteredOptions.length === 0) return;

        const catTitle = document.createElement('h3');
        catTitle.innerText = t(cat.categoryKey);
        catTitle.style.marginTop = '1.5rem';
        container.appendChild(catTitle);

        const grid = document.createElement('div');
        grid.className = 'options-grid';

        filteredOptions.forEach(opt => {
            const card = createOptionCard(t(opt.labelKey), t(opt.descKey), opt.id === (wizardState.theme?.id), () => {
                wizardState.theme = opt;
                renderMissionStep(container);
            });
            grid.appendChild(card);
        });
        container.appendChild(grid);
    });
}

function renderSettingStep(container) {
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'section-title';
    title.innerText = t('settingTitle');
    container.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'options-grid';

    // Filter settings by genre AND language
    const filteredSettings = bookConfigOptions.settings.filter(opt => {
        // Check genre
        if (opt.type && opt.type !== wizardState.storyGenre) return false;
        // Check language (if specified)
        if (opt.languages && !opt.languages.includes(currentLanguage)) return false;
        return true;
    });

    filteredSettings.forEach(opt => {
        const card = createOptionCard(t(opt.labelKey), t(opt.descKey), opt.id === (wizardState.setting?.id), () => {
            wizardState.setting = opt;
            renderSettingStep(container);
        });
        grid.appendChild(card);
    });
    container.appendChild(grid);
}

function renderStyleStep(container) {
    // Not used in current flow (step 5 is setting), but kept for reference
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

    if (!wizardState.theme || !wizardState.setting) {
        alert(t('alert_complete_steps'));
        return;
    }

    const btn = document.getElementById('generateBtn');
    const progress = document.getElementById('progressContainer');
    const bookContainer = document.getElementById('bookContainer');
    const downloadSection = document.getElementById('downloadSection');

    btn.disabled = true;
    isGenerating = true;
    progress.classList.remove('hidden');
    bookContainer.classList.add('hidden');
    downloadSection.classList.add('hidden');

    // Set initial status immediately
    const logMessage = document.getElementById('logMessage');
    const progressFill = document.querySelector('.progress-fill');
    logMessage.innerText = t('status_starting');
    progressFill.style.width = '5%';

    // Construct final prompt object
    const storyPrompt = {
        language: currentLanguage === 'vi' ? 'Vietnamese' : 'English',
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
    const totalPages = 8;

    const interval = setInterval(() => {
        fetch('/api/status')
            .then(response => response.json())
            .then(data => {
                let percent = 0;
                let displayMessage = data.status;

                // Map status to translated message
                if (data.status.includes("Starting")) {
                    percent = 5;
                    displayMessage = t('status_starting');
                } else if (data.status.includes("story concept")) {
                    percent = 10;
                    displayMessage = t('status_concept');
                } else if (data.status.includes("character")) {
                    percent = 15;
                    displayMessage = t('status_character');
                } else if (data.status.toLowerCase().includes("page")) {
                    const match = data.status.match(/page (\d+)/i);
                    if (match) {
                        const pageNum = parseInt(match[1]);
                        percent = 20 + ((pageNum) / totalPages) * 70;
                        displayMessage = t('status_page', { n: pageNum, total: totalPages });
                    } else {
                        percent = 30;
                    }
                } else if (data.status.includes("Verifying")) {
                    percent = 92;
                    displayMessage = t('status_verifying');
                } else if (data.status.includes("Compiling")) {
                    percent = 95;
                    displayMessage = t('status_compiling');
                } else if (data.status === "Complete") {
                    percent = 100;
                    displayMessage = t('status_complete');
                } else {
                    // Fallback for unmatched statuses
                    percent = 5;
                    displayMessage = t('status_starting');
                }

                logMessage.innerText = displayMessage;
                progressFill.style.width = percent + '%';

                if (data.status === "Complete" || data.status.startsWith("Error")) {
                    clearInterval(interval);
                    isGenerating = false;
                    document.getElementById('generateBtn').disabled = false;

                    if (data.status === "Complete") {
                        document.querySelector('.wizard-container').classList.add('hidden');
                        document.getElementById('progressContainer').classList.add('hidden');
                        loadStory();
                    }
                }
            });
    }, 1000);
}

function loadStory() {
    fetch('/api/story')
        .then(response => response.json())
        .then(story => {
            currentStory = story;
            currentPageIndex = 0;
            storyArchived = false;

            const container = document.getElementById('bookContainer');
            if (!container) return;
            container.classList.remove('hidden');

            document.getElementById('downloadSection').classList.remove('hidden');
            document.getElementById('totalPages').innerText = story.pages.length;

            renderPage(0);
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
    const timestamp = new Date().getTime();

    container.innerHTML = `
        <div class="page-image-wrapper" style="position: relative; display: inline-block;">
            <img src="/output/cards/story_card_${page.page_number}.png?t=${timestamp}" alt="Page ${page.page_number}" class="story-card-img">
            <button type="button" onclick="regenerateImage(${page.page_number}, this)" class="regenerate-btn" title="${t('regenerate_btn')}">
                ${t('regenerate_btn')}
            </button>
        </div>
    `;

    pageNum.innerText = index + 1;
    totalPages.innerText = currentStory.pages.length;

    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === currentStory.pages.length - 1;
}

function regenerateImage(pageNumber, btnElement) {
    console.log("Regenerating page:", pageNumber);
    try {
        if (!confirm(t('confirm_regenerate'))) return;

        const btn = btnElement || document.querySelector('.regenerate-btn');
        if (btn) {
            console.log("Button found, updating UI...");
            btn.disabled = true;
            btn.innerHTML = t('regenerating');
        } else {
            console.error("Regenerate button not found!");
        }

        fetch('/api/regenerate_page', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page_number: pageNumber })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Regeneration response:", data);
                if (data.status === 'success') {
                    setTimeout(() => {
                        renderPage(currentPageIndex);
                    }, 500);
                } else {
                    alert('Error: ' + (data.error || 'Unknown error'));
                    if (btn) {
                        btn.disabled = false;
                        btn.innerHTML = t('regenerate_btn');
                    }
                }
            })
            .catch(err => {
                console.error("Regeneration error:", err);
                alert('Failed to regenerate image: ' + err.message);
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = t('regenerate_btn');
                }
            });
    } catch (e) {
        console.error("Error in regenerateImage:", e);
        alert("An error occurred: " + e.message);
    }
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
                alert(t('error_archive') + data.error);
            } else {
                storyArchived = true;
                alert(t('archived_success'));
            }
        })
        .catch(err => {
            console.error(err);
            alert(t('error_connect'));
        });
}

function startOver() {
    document.getElementById('bookContainer').classList.add('hidden');
    document.getElementById('downloadSection').classList.add('hidden');

    document.querySelector('.wizard-container').classList.remove('hidden');
    currentStep = 1;
    renderStep(1);

    currentStory = null;
    storyArchived = false;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}
