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
                { id: 'bravery', labelKey: 'theme_bravery', descKey: 'desc_bravery', prompt: 'a story about finding courage when scared of the dark', type: 'realistic' },
                { id: 'anger', labelKey: 'theme_anger', descKey: 'desc_anger', prompt: 'a story about calming down when things go wrong', type: 'realistic' },
                { id: 'sadness', labelKey: 'theme_sadness', descKey: 'desc_sadness', prompt: 'a story about losing a toy and processing sadness', type: 'realistic' }
            ]
        },
        {
            categoryKey: 'cat_social',
            options: [
                { id: 'sharing', labelKey: 'theme_sharing', descKey: 'desc_sharing', prompt: 'a story about sharing toys with a new friend', type: 'realistic' },
                { id: 'bullying', labelKey: 'theme_bullying', descKey: 'desc_bullying', prompt: 'a story about kindness and stopping a bully', type: 'realistic' },
                { id: 'apology', labelKey: 'theme_apology', descKey: 'desc_apology', prompt: 'a story about making a mistake and fixing it', type: 'realistic' }
            ]
        },
        {
            categoryKey: 'cat_routine',
            options: [
                { id: 'bedtime', labelKey: 'theme_bedtime', descKey: 'desc_bedtime', prompt: 'a calming story about getting ready to sleep', type: 'realistic' },
                { id: 'potty', labelKey: 'theme_potty', descKey: 'desc_potty', prompt: 'an encouraging story about using the potty', type: 'realistic' },
                { id: 'school', labelKey: 'theme_school', descKey: 'desc_school', prompt: 'a story about the excitement of the first day of school', type: 'realistic' }
            ]
        },
        {
            categoryKey: 'cat_adventure',
            options: [
                { id: 'space', labelKey: 'theme_space', descKey: 'desc_space', prompt: 'a sci-fi adventure visiting the moon', type: 'fantasy' },
                { id: 'treasure', labelKey: 'theme_treasure', descKey: 'desc_treasure', prompt: 'an adventure map quest to find a hidden chest', type: 'fantasy' },
                { id: 'magic', labelKey: 'theme_magic', descKey: 'desc_magic', prompt: 'discovering a magical ability for one day', type: 'fantasy' },
                { id: 'moon_palace', labelKey: 'theme_moon_palace', descKey: 'desc_moon_palace', prompt: 'journey to the moon palace to meet Chang\'e and the woodcutter Cuội', type: 'fantasy', languages: ['vi'] },
                { id: 'water_palace', labelKey: 'theme_water_palace', descKey: 'desc_water_palace', prompt: 'lost in the underwater dragon palace visiting the Dragon King', type: 'fantasy', languages: ['vi'] },
                { id: 'magic_buffalo', labelKey: 'theme_magic_buffalo', descKey: 'desc_magic_buffalo', prompt: 'soar over shimmering golden rice fields with a flying water buffalo', type: 'fantasy', languages: ['vi'] },
                { id: 'lotus_pond', labelKey: 'theme_lotus_pond', descKey: 'desc_lotus_pond', prompt: 'shrink to a tiny size to explore the insect world and sleep on a giant green lotus leaf', type: 'fantasy', languages: ['vi'] },
                { id: 'bronze_drum', labelKey: 'theme_bronze_drum', descKey: 'desc_bronze_drum', prompt: 'find the magical bronze drum and use its rhythm to summon rain for the thirsty forest', type: 'fantasy', languages: ['vi'] },
                { id: 'carp_dragon', labelKey: 'theme_carp_dragon', descKey: 'desc_carp_dragon', prompt: 'guide and power up the little carp to jump over the waterfall and transform into a dragon', type: 'fantasy', languages: ['vi'] }
            ]
        },
        {
            categoryKey: 'cat_culture',
            options: [
                { id: 'mid_autumn', labelKey: 'theme_mid_autumn', descKey: 'desc_mid_autumn', prompt: 'celebrating Mid-Autumn Festival with lanterns and mooncakes', type: 'realistic', languages: ['vi'] },
                { id: 'countryside', labelKey: 'theme_countryside', descKey: 'desc_countryside', prompt: 'visiting grandparents in the countryside with garden, fish pond and farm animals', type: 'realistic', languages: ['vi'] },
                { id: 'tet', labelKey: 'theme_tet', descKey: 'desc_tet', prompt: 'shopping for Tet festival and admiring spring flowers at the market', type: 'realistic', languages: ['vi'] },
                { id: 'banh_chung', labelKey: 'theme_banh_chung', descKey: 'desc_banh_chung', prompt: 'the legend of Banh Chung, a story about filial piety and the meaning of the Tet cake', type: 'realistic', languages: ['vi'] },
                { id: 'kitchen_gods', labelKey: 'theme_kitchen_gods', descKey: 'desc_kitchen_gods', prompt: 'the magical story of the carp turning into a dragon to take the Kitchen Gods to heaven', type: 'realistic', languages: ['vi'] },
                { id: 'lion_dance', labelKey: 'theme_lion_dance', descKey: 'desc_lion_dance', prompt: 'the excitement, bravery, and luck that the Lion Dance brings to the festival', type: 'realistic', languages: ['vi'] }
            ]
        },
        {
            categoryKey: 'cat_childhood',
            options: [
                { id: 'kite_dreams', labelKey: 'theme_kite_dreams', descKey: 'desc_kite_dreams', prompt: 'running freely in the fields and sending dreams up with the kite', type: 'realistic', languages: ['vi'] },
                { id: 'firefly_night', labelKey: 'theme_firefly_night', descKey: 'desc_firefly_night', prompt: 'exploring the sparkling beauty of nature at night with fireflies', type: 'realistic', languages: ['vi'] },
                { id: 'summer_rain', labelKey: 'theme_summer_rain', descKey: 'desc_summer_rain', prompt: 'the innocent and cooling joy under a summer shower', type: 'realistic', languages: ['vi'] }
            ]
        },
        {
            categoryKey: 'cat_family',
            options: [
                { id: 'reunion_dinner', labelKey: 'theme_reunion_dinner', descKey: 'desc_reunion_dinner', prompt: 'the simple happiness of cooking and eating dinner together as a family', type: 'realistic', languages: ['vi'] },
                { id: 'grandma_stories', labelKey: 'theme_grandma_stories', descKey: 'desc_grandma_stories', prompt: 'meaningful lessons from grandma\'s treasure trove of fairy tales', type: 'realistic', languages: ['vi'] },
                { id: 'caring_family', labelKey: 'theme_caring_family', descKey: 'desc_caring_family', prompt: 'learning love and empathy when parents or grandparents are sick', type: 'realistic', languages: ['vi'] }
            ]
        },
        {
            categoryKey: 'cat_special',
            options: [
                { id: 'memorable_birthday', labelKey: 'theme_memorable_birthday', descKey: 'desc_memorable_birthday', prompt: 'the joy of turning a new age with friends and well-wishes', type: 'realistic', languages: ['vi'] },
                { id: 'new_baby', labelKey: 'theme_new_baby', descKey: 'desc_new_baby', prompt: 'learning to be a big sibling and sharing love with the new family member', type: 'realistic', languages: ['vi'] },
                { id: 'first_beach', labelKey: 'theme_first_beach', descKey: 'desc_first_beach', prompt: 'the excitement of seeing the blue sea and white sand for the first time', type: 'realistic', languages: ['vi'] }
            ]
        }
    ],
    settings: [
        { id: 'none', labelKey: 'setting_none', descKey: 'desc_none', prompt: 'let the AI choose the setting based on the story theme' },
        { id: 'bedroom', labelKey: 'setting_bedroom', descKey: 'desc_bedroom', prompt: 'a messy but cozy child\'s bedroom with toys everywhere', type: 'realistic' },
        { id: 'city', labelKey: 'setting_city', descKey: 'desc_city', prompt: 'a colorful city street with tall buildings and cars', type: 'realistic' },
        { id: 'farm', labelKey: 'setting_farm', descKey: 'desc_farm', prompt: 'a rustic red barn with rolling green hills', type: 'realistic' },
        { id: 'village', labelKey: 'setting_village', descKey: 'desc_village', prompt: 'a peaceful Vietnamese village with red-tiled roofs, bamboo hedges and water buffaloes', type: 'realistic', languages: ['vi'] },
        { id: 'old_town', labelKey: 'setting_old_town', descKey: 'desc_old_town', prompt: 'a bustling old town street with colorful glowing lanterns like Hoi An', type: 'realistic', languages: ['vi'] },
        { id: 'forest', labelKey: 'setting_forest', descKey: 'desc_forest', prompt: 'a lush green magical forest with giant mushrooms and sunbeams', type: 'fantasy' },
        { id: 'ocean', labelKey: 'setting_ocean', descKey: 'desc_ocean', prompt: 'a bright blue underwater coral reef with bubbles', type: 'fantasy' },
        { id: 'castle', labelKey: 'setting_castle', descKey: 'desc_castle', prompt: 'a magical castle floating on white fluffy clouds', type: 'fantasy' },
        { id: 'sky_palace', labelKey: 'setting_sky_palace', descKey: 'desc_sky_palace', prompt: 'a celestial palace in the clouds where fairies live', type: 'fantasy', languages: ['vi'] },
        { id: 'bamboo_forest', labelKey: 'setting_bamboo_forest', descKey: 'desc_bamboo_forest', prompt: 'a mystical bamboo forest from Vietnamese fairy tales', type: 'fantasy', languages: ['vi'] }
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
    ],
    genres: [
        { id: 'realistic', labelKey: 'genre_realistic', descKey: 'genre_realistic_desc', icon: '🏠' },
        { id: 'fantasy', labelKey: 'genre_fantasy', descKey: 'genre_fantasy_desc', icon: '🪄' }
    ]
};
