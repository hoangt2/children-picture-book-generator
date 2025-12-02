// Translations
const translations = {
    en: {
        appTitle: "Children's Story Book Generator",
        appSubtitle: "Create magical stories for children aged 3-6 with AI.",
        testMode: "Test Mode",
        step1: "1. Setup",
        step2: "2. Hero",
        step3: "3. Sidekick",
        step4: "4. Mission",
        step5: "5. Setting",
        backBtn: "Back",
        nextBtn: "Next",
        createStoryBtn: "Create Story",
        creatingStory: "Creating Your Story...",
        page: "Page",
        of: "of",
        createAnotherBtn: "Create Another Story",
        downloadPdf: "Download PDF Book",
        saveArchive: "Save to Archive",

        // Section Titles
        setupTitle: "Let's Get Started!",
        heroTitle: "Who is the hero?",
        sidekickTitle: "Choose a Sidekick",
        missionTitle: "What is the Mission?",
        settingTitle: "Where does it take place?",
        styleTitle: "Choose Art Style",

        // Form Labels
        childAge: "Child's Age",
        heroName: "Hero Name",
        heroNamePlaceholder: "e.g., Emma, Liam, etc.",
        animalNamePlaceholder: "e.g., Benny, Luna, etc.",
        customizeAppearance: "Customize Appearance",
        chooseAnimal: "Choose Animal",

        // Traits Labels
        gender: "Gender",
        race: "Race/Ethnicity",
        skinTone: "Skin Tone",
        hairStyle: "Hair Style",
        hairColor: "Hair Color",
        accessories: "Accessories",

        // Options (Keys match IDs)
        hero_human: "A Child (Human)",
        hero_animal: "An Animal",

        // Animal Archetypes
        animal_bear: "Bear",
        animal_rabbit: "Rabbit",
        animal_fox: "Fox",
        animal_lion: "Lion",
        animal_owl: "Owl",
        animal_dinosaur: "Dinosaur",

        // Animal Traits
        trait_bear: "Brave & Cuddly",
        trait_rabbit: "Fast & Shy",
        trait_fox: "Clever & Tricky",
        trait_lion: "Loud & Proud",
        trait_owl: "Wise & Observant",
        trait_dinosaur: "Big & Friendly",

        // Sidekicks
        sidekick_none: "No Sidekick (Solo Adventure)",
        sidekick_pet_dog: "Pet Dog",
        sidekick_pet_cat: "Pet Cat",
        sidekick_robot: "Tiny Robot",
        sidekick_fairy: "Glow Fairy",
        sidekick_stuffed_animal: "Favorite Teddy Bear",

        // Themes Categories
        cat_emotional: "Emotional Growth",
        cat_social: "Social Skills",
        cat_routine: "Daily Routines (Toddlers)",
        cat_adventure: "Imagination & Adventure",

        // Themes
        theme_bravery: "Overcoming Fear",
        theme_anger: "Managing Anger",
        theme_sadness: "It’s Okay to be Sad",
        theme_sharing: "Learning to Share",
        theme_bullying: "Standing Up for Others",
        theme_apology: "Saying Sorry",
        theme_bedtime: "Bedtime Routine",
        theme_potty: "Potty Training",
        theme_school: "First Day of School",
        theme_space: "Blast Off to Space",
        theme_treasure: "Hidden Treasure",
        theme_magic: "Magic Powers",

        // Settings
        setting_forest: "Whimsical Forest",
        setting_city: "Busy City",
        setting_ocean: "Underwater Reef",
        setting_castle: "Cloud Castle",
        setting_bedroom: "Cozy Bedroom",
        setting_farm: "Sunny Farm",

        // Themes Descriptions
        desc_bravery: "a story about finding courage when scared of the dark",
        desc_anger: "a story about calming down when things go wrong",
        desc_sadness: "a story about losing a toy and processing sadness",
        desc_sharing: "a story about sharing toys with a new friend",
        desc_bullying: "a story about kindness and stopping a bully",
        desc_apology: "a story about making a mistake and fixing it",
        desc_bedtime: "a calming story about getting ready to sleep",
        desc_potty: "an encouraging story about using the potty",
        desc_school: "a story about the excitement of the first day of school",
        desc_space: "a sci-fi adventure visiting the moon",
        desc_treasure: "an adventure map quest to find a hidden chest",
        desc_magic: "discovering a magical ability for one day",

        // Settings Descriptions
        desc_forest: "a lush green forest with giant mushrooms and sunbeams",
        desc_city: "a colorful city street with tall buildings and cars",
        desc_ocean: "a bright blue underwater coral reef with bubbles",
        desc_castle: "a magical castle floating on white fluffy clouds",
        desc_bedroom: "a messy but cozy child's bedroom with toys everywhere",
        desc_farm: "a rustic red barn with rolling green hills",

        // Human Traits
        trait_boy: "Boy",
        trait_girl: "Girl",
        trait_asian: "Asian",
        trait_black: "Black/African",
        trait_hispanic: "Hispanic/Latino",
        trait_white: "White/Caucasian",
        trait_middle_eastern: "Middle Eastern",
        trait_mixed: "Mixed Race",
        trait_light: "Light",
        trait_medium: "Medium",
        trait_tan: "Tan",
        trait_deep: "Deep",
        trait_dark: "Dark",
        trait_short_straight: "Short & Straight",
        trait_short_curly: "Short & Curly",
        trait_long_straight: "Long & Straight",
        trait_long_wavy: "Long & Wavy",
        trait_braids: "Braids",
        trait_bald: "Bald/Baby",
        trait_black_hair: "Black",
        trait_brown: "Brown",
        trait_blonde: "Blonde",
        trait_red: "Red",
        trait_blue: "Fantasy Blue",
        trait_pink: "Fantasy Pink",
        trait_none: "None",
        trait_glasses: "Glasses",
        trait_hearing_aid: "Hearing Aid",
        trait_cape: "Superhero Cape",
        trait_crown: "Crown",
        trait_cowboy_hat: "Cowboy Hat",

        // Styles
        style_watercolor: "Soft Watercolor",
        style_vector: "Modern Vector",
        style_crayon: "Crayon Drawing",
        style_pixar: "3D Cartoon",
        style_collage: "Paper Collage",

        // Status Messages
        status_starting: "Starting story generation...",
        status_concept: "Creating story concept...",
        status_character: "Generating character models...",
        status_page: "Creating page {n}/{total}...",
        status_verifying: "Verifying all pages...",
        status_compiling: "Compiling PDF...",
        status_complete: "Complete!",

        // Alerts/Confirms
        alert_complete_steps: "Please complete all steps!",
        confirm_regenerate: "Are you sure you want to regenerate this image? It will replace the current one.",
        regenerating: "🔄 Regenerating...",
        regenerate_btn: "🔄 Regenerate Image",
        archived_success: "Story saved to archive!",
        error_archive: "Error archiving story: ",
        error_connect: "Failed to connect to server."
    },
    vi: {
        appTitle: "Trình Tạo Truyện Tranh Cho Bé",
        appSubtitle: "Tạo những câu chuyện kỳ diệu cho bé 3-6 tuổi bằng AI.",
        testMode: "Chế độ Thử nghiệm",
        step1: "1. Cài đặt",
        step2: "2. Nhân vật",
        step3: "3. Bạn đồng hành",
        step4: "4. Nhiệm vụ",
        step5: "5. Bối cảnh",
        backBtn: "Quay lại",
        nextBtn: "Tiếp theo",
        createStoryBtn: "Tạo Truyện",
        creatingStory: "Đang Tạo Truyện...",
        page: "Trang",
        of: "của",
        createAnotherBtn: "Tạo Truyện Khác",
        downloadPdf: "Tải Sách PDF",
        saveArchive: "Lưu vào Kho",

        // Section Titles
        setupTitle: "Hãy bắt đầu nào!",
        heroTitle: "Ai là nhân vật chính?",
        sidekickTitle: "Chọn bạn đồng hành",
        missionTitle: "Nhiệm vụ là gì?",
        settingTitle: "Câu chuyện diễn ra ở đâu?",
        styleTitle: "Chọn phong cách vẽ",

        // Form Labels
        childAge: "Tuổi của bé",
        heroName: "Tên nhân vật",
        heroNamePlaceholder: "Ví dụ: Linh, Nam, v.v.",
        animalNamePlaceholder: "Ví dụ: Misa, Lu, v.v.",
        customizeAppearance: "Tùy chỉnh ngoại hình",
        chooseAnimal: "Chọn con vật",

        // Traits Labels
        gender: "Giới tính",
        race: "Chủng tộc",
        skinTone: "Màu da",
        hairStyle: "Kiểu tóc",
        hairColor: "Màu tóc",
        accessories: "Phụ kiện",

        // Options
        hero_human: "Một đứa trẻ (Người)",
        hero_animal: "Một con vật",

        // Animal Archetypes
        animal_bear: "Gấu",
        animal_rabbit: "Thỏ",
        animal_fox: "Cáo",
        animal_lion: "Sư tử",
        animal_owl: "Cú",
        animal_dinosaur: "Khủng long",

        // Animal Traits
        trait_bear: "Dũng cảm & Đáng yêu",
        trait_rabbit: "Nhanh nhẹn & Nhút nhát",
        trait_fox: "Thông minh & Tinh ranh",
        trait_lion: "To tiếng & Kiêu hãnh",
        trait_owl: "Thông thái & Tinh tường",
        trait_dinosaur: "To lớn & Thân thiện",

        // Sidekicks
        sidekick_none: "Không có (Phiêu lưu một mình)",
        sidekick_pet_dog: "Chó cưng",
        sidekick_pet_cat: "Mèo cưng",
        sidekick_robot: "Robot nhỏ",
        sidekick_fairy: "Tiên nữ phát sáng",
        sidekick_stuffed_animal: "Gấu bông yêu thích",

        // Themes Categories
        cat_emotional: "Phát triển cảm xúc",
        cat_social: "Kỹ năng xã hội",
        cat_routine: "Thói quen hàng ngày",
        cat_adventure: "Trí tưởng tượng & Phiêu lưu",

        // Themes
        theme_bravery: "Vượt qua nỗi sợ",
        theme_anger: "Kiểm soát cơn giận",
        theme_sadness: "Buồn cũng không sao",
        theme_sharing: "Học cách chia sẻ",
        theme_bullying: "Bảo vệ người khác",
        theme_apology: "Nói lời xin lỗi",
        theme_bedtime: "Giờ đi ngủ",
        theme_potty: "Tập đi vệ sinh",
        theme_school: "Ngày đầu đi học",
        theme_space: "Bay vào vũ trụ",
        theme_treasure: "Kho báu ẩn giấu",
        theme_magic: "Phép thuật",

        // Themes Descriptions
        desc_bravery: "Câu chuyện về lòng dũng cảm khi sợ bóng tối",
        desc_anger: "Câu chuyện về cách bình tĩnh khi gặp chuyện không vui",
        desc_sadness: "Câu chuyện về việc mất đồ chơi và nỗi buồn",
        desc_sharing: "Câu chuyện về việc chia sẻ đồ chơi với bạn mới",
        desc_bullying: "Câu chuyện về lòng tốt và ngăn chặn bắt nát",
        desc_apology: "Câu chuyện về việc mắc lỗi và sửa sai",
        desc_bedtime: "Câu chuyện nhẹ nhàng để chuẩn bị đi ngủ",
        desc_potty: "Câu chuyện khích lệ bé tập đi vệ sinh",
        desc_school: "Câu chuyện về niềm vui ngày đầu đến trường",
        desc_space: "Cuộc phiêu lưu giả tưởng đến mặt trăng",
        desc_treasure: "Hành trình tìm kiếm kho báu bí ẩn",
        desc_magic: "Khám phá phép thuật trong một ngày",

        // Settings
        setting_forest: "Khu rừng kỳ diệu",
        setting_city: "Thành phố nhộn nhịp",
        setting_ocean: "Rạn san hô dưới nước",
        setting_castle: "Lâu đài trên mây",
        setting_bedroom: "Phòng ngủ ấm cúng",
        setting_farm: "Nông trại đầy nắng",

        // Settings Descriptions
        desc_forest: "Khu rừng xanh mát với nấm khổng lồ và tia nắng",
        desc_city: "Đường phố đầy màu sắc với nhà cao tầng và xe cộ",
        desc_ocean: "Rạn san hô xanh biếc với những bong bóng nước",
        desc_castle: "Lâu đài phép thuật trôi trên những đám mây trắng",
        desc_bedroom: "Phòng ngủ bừa bộn nhưng ấm áp với đồ chơi khắp nơi",
        desc_farm: "Nhà kho đỏ mộc mạc trên đồi cỏ xanh",

        // Human Traits
        trait_boy: "Bé trai",
        trait_girl: "Bé gái",
        trait_asian: "Châu Á",
        trait_black: "Da đen/Châu Phi",
        trait_hispanic: "Mỹ Latinh",
        trait_white: "Da trắng",
        trait_middle_eastern: "Trung Đông",
        trait_mixed: "Lai",
        trait_light: "Sáng",
        trait_medium: "Trung bình",
        trait_tan: "Ngăm",
        trait_deep: "Sẫm",
        trait_dark: "Tối",
        trait_short_straight: "Ngắn & Thẳng",
        trait_short_curly: "Ngắn & Xoăn",
        trait_long_straight: "Dài & Thẳng",
        trait_long_wavy: "Dài & Gợn sóng",
        trait_braids: "Tết tóc",
        trait_bald: "Trọc/Em bé",
        trait_black_hair: "Đen",
        trait_brown: "Nâu",
        trait_blonde: "Vàng",
        trait_red: "Đỏ",
        trait_blue: "Xanh dương ảo diệu",
        trait_pink: "Hồng ảo diệu",
        trait_none: "Không có",
        trait_glasses: "Kính",
        trait_hearing_aid: "Máy trợ thính",
        trait_cape: "Áo choàng siêu anh hùng",
        trait_crown: "Vương miện",
        trait_cowboy_hat: "Mũ cao bồi",

        // Styles
        style_watercolor: "Màu nước nhẹ nhàng",
        style_vector: "Vector hiện đại",
        style_crayon: "Vẽ sáp màu",
        style_pixar: "Hoạt hình 3D",
        style_collage: "Cắt dán giấy",

        // Status Messages
        status_starting: "Đang bắt đầu tạo truyện...",
        status_concept: "Đang lên ý tưởng câu chuyện...",
        status_character: "Đang tạo hình nhân vật...",
        status_page: "Đang tạo trang {n}/{total}...",
        status_verifying: "Đang kiểm tra các trang...",
        status_compiling: "Đang đóng gói PDF...",
        status_complete: "Hoàn tất!",

        // Alerts/Confirms
        alert_complete_steps: "Vui lòng hoàn thành tất cả các bước!",
        confirm_regenerate: "Bạn có chắc muốn tạo lại ảnh này không? Ảnh hiện tại sẽ bị thay thế.",
        regenerating: "🔄 Đang tạo lại...",
        regenerate_btn: "🔄 Tạo lại ảnh",
        archived_success: "Đã lưu truyện vào kho lưu trữ!",
        error_archive: "Lỗi khi lưu trữ truyện: ",
        error_connect: "Không thể kết nối đến máy chủ."
    }
};

// Configuration Options
const bookConfigOptions = {
    hero: {
        types: [
            { id: 'human', labelKey: 'hero_human' },
            { id: 'animal', labelKey: 'hero_animal' }
        ],
        humanTraits: {
            gender: [
                { value: 'Boy', labelKey: 'trait_boy' },
                { value: 'Girl', labelKey: 'trait_girl' }
            ],
            race: [
                { value: 'Asian', labelKey: 'trait_asian' },
                { value: 'Black/African', labelKey: 'trait_black' },
                { value: 'Hispanic/Latino', labelKey: 'trait_hispanic' },
                { value: 'White/Caucasian', labelKey: 'trait_white' },
                { value: 'Middle Eastern', labelKey: 'trait_middle_eastern' },
                { value: 'Mixed Race', labelKey: 'trait_mixed' }
            ],
            skinTone: [
                { value: 'Light', labelKey: 'trait_light' },
                { value: 'Medium', labelKey: 'trait_medium' },
                { value: 'Tan', labelKey: 'trait_tan' },
                { value: 'Deep', labelKey: 'trait_deep' },
                { value: 'Dark', labelKey: 'trait_dark' }
            ],
            hairStyle: [
                { value: 'Short & Straight', labelKey: 'trait_short_straight' },
                { value: 'Short & Curly', labelKey: 'trait_short_curly' },
                { value: 'Long & Straight', labelKey: 'trait_long_straight' },
                { value: 'Long & Wavy', labelKey: 'trait_long_wavy' },
                { value: 'Braids', labelKey: 'trait_braids' },
                { value: 'Bald/Baby', labelKey: 'trait_bald' }
            ],
            hairColor: [
                { value: 'Black', labelKey: 'trait_black_hair' },
                { value: 'Brown', labelKey: 'trait_brown' },
                { value: 'Blonde', labelKey: 'trait_blonde' },
                { value: 'Red', labelKey: 'trait_red' },
                { value: 'Fantasy Blue', labelKey: 'trait_blue' },
                { value: 'Fantasy Pink', labelKey: 'trait_pink' }
            ],
            accessories: [
                { value: 'None', labelKey: 'trait_none' },
                { value: 'Glasses', labelKey: 'trait_glasses' },
                { value: 'Hearing Aid', labelKey: 'trait_hearing_aid' },
                { value: 'Superhero Cape', labelKey: 'trait_cape' },
                { value: 'Crown', labelKey: 'trait_crown' },
                { value: 'Cowboy Hat', labelKey: 'trait_cowboy_hat' }
            ]
        },
        animalArchetypes: [
            { id: 'bear', labelKey: 'animal_bear', traitKey: 'trait_bear' },
            { id: 'rabbit', labelKey: 'animal_rabbit', traitKey: 'trait_rabbit' },
            { id: 'fox', labelKey: 'animal_fox', traitKey: 'trait_fox' },
            { id: 'lion', labelKey: 'animal_lion', traitKey: 'trait_lion' },
            { id: 'owl', labelKey: 'animal_owl', traitKey: 'trait_owl' },
            { id: 'dinosaur', labelKey: 'animal_dinosaur', traitKey: 'trait_dinosaur' }
        ]
    },
    sidekick: [
        { id: 'none', labelKey: 'sidekick_none', prompt: 'solitary hero' },
        { id: 'pet_dog', labelKey: 'sidekick_pet_dog', prompt: 'accompanied by a playful golden retriever puppy' },
        { id: 'pet_cat', labelKey: 'sidekick_pet_cat', prompt: 'accompanied by a lazy orange tabby cat' },
        { id: 'robot', labelKey: 'sidekick_robot', prompt: 'accompanied by a small, floating, friendly robot' },
        { id: 'fairy', labelKey: 'sidekick_fairy', prompt: 'accompanied by a tiny glowing magical fairy' },
        { id: 'stuffed_animal', labelKey: 'sidekick_stuffed_animal', prompt: 'holding a teddy bear that comes to life in their imagination' }
    ],
    themes: [
        {
            categoryKey: 'cat_emotional',
            options: [
                { id: 'bravery', labelKey: 'theme_bravery', descKey: 'desc_bravery', prompt: 'a story about finding courage when scared of the dark' },
                { id: 'anger', labelKey: 'theme_anger', descKey: 'desc_anger', prompt: 'a story about calming down when things go wrong' },
                { id: 'sadness', labelKey: 'theme_sadness', descKey: 'desc_sadness', prompt: 'a story about losing a toy and processing sadness' }
            ]
        },
        {
            categoryKey: 'cat_social',
            options: [
                { id: 'sharing', labelKey: 'theme_sharing', descKey: 'desc_sharing', prompt: 'a story about sharing toys with a new friend' },
                { id: 'bullying', labelKey: 'theme_bullying', descKey: 'desc_bullying', prompt: 'a story about kindness and stopping a bully' },
                { id: 'apology', labelKey: 'theme_apology', descKey: 'desc_apology', prompt: 'a story about making a mistake and fixing it' }
            ]
        },
        {
            categoryKey: 'cat_routine',
            options: [
                { id: 'bedtime', labelKey: 'theme_bedtime', descKey: 'desc_bedtime', prompt: 'a calming story about getting ready to sleep' },
                { id: 'potty', labelKey: 'theme_potty', descKey: 'desc_potty', prompt: 'an encouraging story about using the potty' },
                { id: 'school', labelKey: 'theme_school', descKey: 'desc_school', prompt: 'a story about the excitement of the first day of school' }
            ]
        },
        {
            categoryKey: 'cat_adventure',
            options: [
                { id: 'space', labelKey: 'theme_space', descKey: 'desc_space', prompt: 'a sci-fi adventure visiting the moon' },
                { id: 'treasure', labelKey: 'theme_treasure', descKey: 'desc_treasure', prompt: 'an adventure map quest to find a hidden chest' },
                { id: 'magic', labelKey: 'theme_magic', descKey: 'desc_magic', prompt: 'discovering a magical ability for one day' }
            ]
        }
    ],
    settings: [
        { id: 'forest', labelKey: 'setting_forest', descKey: 'desc_forest', prompt: 'a lush green forest with giant mushrooms and sunbeams' },
        { id: 'city', labelKey: 'setting_city', descKey: 'desc_city', prompt: 'a colorful city street with tall buildings and cars' },
        { id: 'ocean', labelKey: 'setting_ocean', descKey: 'desc_ocean', prompt: 'a bright blue underwater coral reef with bubbles' },
        { id: 'castle', labelKey: 'setting_castle', descKey: 'desc_castle', prompt: 'a magical castle floating on white fluffy clouds' },
        { id: 'bedroom', labelKey: 'setting_bedroom', descKey: 'desc_bedroom', prompt: 'a messy but cozy child\'s bedroom with toys everywhere' },
        { id: 'farm', labelKey: 'setting_farm', descKey: 'desc_farm', prompt: 'a rustic red barn with rolling green hills' }
    ],
    artStyles: [
        {
            id: 'watercolor',
            labelKey: 'style_watercolor',
            imageGenPrompt: 'childrens book illustration, soft watercolor style, pastel colors, white background, dreamy texture'
        },
        {
            id: 'vector',
            labelKey: 'style_vector',
            imageGenPrompt: 'flat vector art, bright bold colors, clean lines, geometric shapes, educational style, minimal detail'
        },
        {
            id: 'crayon',
            labelKey: 'style_crayon',
            imageGenPrompt: 'childlike crayon drawing style, textured wax finish, rough edges, innocent and playful, white paper background'
        },
        {
            id: 'pixar',
            labelKey: 'style_pixar',
            imageGenPrompt: '3D render, Pixar style, cute, high fidelity, octane render, bright studio lighting, soft round shapes'
        },
        {
            id: 'collage',
            labelKey: 'style_collage',
            imageGenPrompt: 'cut paper collage style, Eric Carle inspired, textured paper, layered look, mixed media'
        }
    ]
};

// State Management
let currentLanguage = 'vi'; // Default
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
    renderStep(1);

    // Bind Language Toggle
    const langToggle = document.getElementById('languageToggle');
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
        const catTitle = document.createElement('h3');
        catTitle.innerText = t(cat.categoryKey);
        catTitle.style.marginTop = '1.5rem';
        container.appendChild(catTitle);

        const grid = document.createElement('div');
        grid.className = 'options-grid';

        cat.options.forEach(opt => {
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

    bookConfigOptions.settings.forEach(opt => {
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
            <button onclick="regenerateImage(${page.page_number})" class="regenerate-btn" title="${t('regenerate_btn')}">
                ${t('regenerate_btn')}
            </button>
        </div>
    `;

    pageNum.innerText = index + 1;
    totalPages.innerText = currentStory.pages.length;

    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === currentStory.pages.length - 1;
}

function regenerateImage(pageNumber) {
    if (!confirm(t('confirm_regenerate'))) return;

    const btn = document.querySelector('.regenerate-btn');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = t('regenerating');
    }

    fetch('/api/regenerate_page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page_number: pageNumber })
    })
        .then(response => response.json())
        .then(data => {
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
            console.error(err);
            alert('Failed to regenerate image');
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = t('regenerate_btn');
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
