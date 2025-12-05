import React from 'react';
import { useWizard } from '../../contexts/WizardContext';
import { useTranslation } from '../../hooks/useTranslation';
import { bookConfigOptions } from '../../constants/config';
import { motion } from 'framer-motion';
import { User, Cat, Smile, Heart } from 'lucide-react';

const Step2Hero = () => {
    const { storyData, updateStoryData } = useWizard();
    const { t } = useTranslation();

    const updateHero = (key, value) => {
        updateStoryData('hero', { ...storyData.hero, [key]: value });
    };

    const updateTraits = (key, value) => {
        updateStoryData('hero', {
            ...storyData.hero,
            traits: { ...storyData.hero.traits, [key]: value }
        });
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-magic-text mb-2">{t('heroTitle')}</h2>
                <p className="text-gray-500">{t('step2')}</p>
            </div>

            {/* Character Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookConfigOptions.hero.types.map((type) => (
                    <motion.button
                        key={type.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => updateHero('type', type.id)}
                        className={`
                            relative p-8 rounded-3xl border-2 flex flex-col items-center gap-4 transition-all
                            ${storyData.hero.type === type.id
                                ? 'border-magic-primary bg-magic-primary/5 shadow-magic ring-4 ring-magic-primary/20'
                                : 'border-gray-200 hover:border-magic-primary/50 hover:bg-gray-50'}
                        `}
                    >
                        <div className={`
                            w-24 h-24 rounded-full flex items-center justify-center
                            ${storyData.hero.type === type.id ? 'bg-magic-primary text-white' : 'bg-gray-100 text-gray-400'}
                        `}>
                            {type.id === 'human' ? <User size={48} /> : <Cat size={48} />}
                        </div>
                        <span className="text-xl font-bold text-magic-text">{t(type.labelKey)}</span>
                    </motion.button>
                ))}
            </div>

            {/* Name Input */}
            <div className="max-w-md mx-auto">
                <label className="block text-lg font-bold text-magic-text mb-2">
                    {t('heroName')}
                </label>
                <input
                    type="text"
                    value={storyData.hero.name}
                    onChange={(e) => updateHero('name', e.target.value)}
                    placeholder={storyData.hero.type === 'human' ? t('heroNamePlaceholder') : t('animalNamePlaceholder')}
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-magic-primary focus:ring-4 focus:ring-magic-primary/20 outline-none text-lg transition-all"
                />
            </div>

            {/* Human Customization */}
            {storyData.hero.type === 'human' && (
                <div className="space-y-6 animate-fadeIn">
                    <h3 className="text-xl font-bold text-magic-text border-b pb-2">{t('customizeAppearance')}</h3>

                    {/* Gender */}
                    <div>
                        <label className="block font-bold text-gray-700 mb-3">{t('gender')}</label>
                        <div className="flex gap-4">
                            {bookConfigOptions.hero.humanTraits.gender.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => updateHero('gender', opt.value)}
                                    className={`
                                        px-6 py-3 rounded-xl border-2 font-bold flex items-center gap-2 transition-all
                                        ${storyData.hero.gender === opt.value
                                            ? 'border-magic-secondary bg-magic-secondary/20 text-magic-text'
                                            : 'border-gray-200 hover:bg-gray-50'}
                                    `}
                                >
                                    {opt.value === 'Boy' ? '👦' : '👧'} {t(opt.labelKey)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Visual Grids for Traits */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Skin Tone */}
                        <div>
                            <label className="block font-bold text-gray-700 mb-3">{t('skinTone')}</label>
                            <div className="flex flex-wrap gap-3">
                                {bookConfigOptions.hero.humanTraits.skinTone.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => updateTraits('skinTone', opt.value)}
                                        title={t(opt.labelKey)}
                                        className={`
                                            w-12 h-12 rounded-full border-2 transition-all transform hover:scale-110
                                            ${storyData.hero.traits.skinTone === opt.value ? 'ring-4 ring-magic-primary/30 border-magic-primary scale-110' : 'border-gray-200'}
                                        `}
                                        style={{ backgroundColor: getSkinColor(opt.value) }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Hair Color */}
                        <div>
                            <label className="block font-bold text-gray-700 mb-3">{t('hairColor')}</label>
                            <div className="flex flex-wrap gap-3">
                                {bookConfigOptions.hero.humanTraits.hairColor.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => updateTraits('hairColor', opt.value)}
                                        title={t(opt.labelKey)}
                                        className={`
                                            w-12 h-12 rounded-full border-2 transition-all transform hover:scale-110
                                            ${storyData.hero.traits.hairColor === opt.value ? 'ring-4 ring-magic-primary/30 border-magic-primary scale-110' : 'border-gray-200'}
                                        `}
                                        style={{ backgroundColor: getHairColor(opt.value) }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Other Traits (Dropdowns converted to pills for now) */}
                    {['hairStyle', 'accessories'].map((trait) => (
                        <div key={trait}>
                            <label className="block font-bold text-gray-700 mb-3">{t(trait)}</label>
                            <div className="flex flex-wrap gap-2">
                                {bookConfigOptions.hero.humanTraits[trait].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => updateTraits(trait, opt.value)}
                                        className={`
                                            px-4 py-2 rounded-lg text-sm font-medium transition-all
                                            ${storyData.hero.traits[trait] === opt.value
                                                ? 'bg-magic-accent text-white shadow-md'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                                        `}
                                    >
                                        {t(opt.labelKey)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Animal Customization */}
            {storyData.hero.type === 'animal' && (
                <div className="space-y-6 animate-fadeIn">
                    <h3 className="text-xl font-bold text-magic-text border-b pb-2">{t('chooseAnimal')}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {bookConfigOptions.hero.animalArchetypes.map((animal) => (
                            <motion.button
                                key={animal.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateHero('animalArchetype', animal)}
                                className={`
                                    p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all
                                    ${storyData.hero.animalArchetype?.id === animal.id
                                        ? 'border-magic-secondary bg-magic-secondary/10 shadow-md'
                                        : 'border-gray-200 hover:border-magic-secondary/50'}
                                `}
                            >
                                <span className="text-3xl">
                                    {animal.id === 'bear' && '🐻'}
                                    {animal.id === 'rabbit' && '🐰'}
                                    {animal.id === 'fox' && '🦊'}
                                    {animal.id === 'lion' && '🦁'}
                                    {animal.id === 'owl' && '🦉'}
                                    {animal.id === 'dinosaur' && '🦖'}
                                </span>
                                <span className="font-bold text-magic-text">{t(animal.labelKey)}</span>
                                <span className="text-xs text-gray-500 text-center">{t(animal.traitKey)}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Helpers for colors
const getSkinColor = (tone) => {
    const colors = {
        'Light': '#f5d0b0',
        'Medium': '#e0ac69',
        'Tan': '#c68642',
        'Deep': '#8d5524',
        'Dark': '#523418'
    };
    return colors[tone] || '#ccc';
};

const getHairColor = (color) => {
    const colors = {
        'Black': '#090806',
        'Brown': '#4b3621',
        'Blonde': '#faf0be',
        'Red': '#b55239',
        'Fantasy Blue': '#4169e1',
        'Fantasy Pink': '#ff69b4'
    };
    return colors[color] || '#ccc';
};

export default Step2Hero;
