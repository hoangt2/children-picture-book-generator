import React from 'react';
import { useWizard } from '../../contexts/WizardContext';
import { useTranslation } from '../../hooks/useTranslation';
import { bookConfigOptions } from '../../constants/config';
import { motion } from 'framer-motion';

const Step5Setting = () => {
    const { storyData, updateStoryData } = useWizard();
    const { t, language } = useTranslation();

    // Filter settings based on genre and language
    const filteredSettings = bookConfigOptions.settings.filter(option => {
        // Always show 'none'
        if (option.id === 'none') return true;
        // Filter by genre
        if (option.type && option.type !== storyData.storyGenre) return false;
        // Filter by language (if specified)
        if (option.languages && !option.languages.includes(language)) return false;
        return true;
    });

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-magic-text mb-2">{t('settingTitle')}</h2>
                <p className="text-gray-500">{t('step5')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSettings.map((option) => (
                    <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => updateStoryData('setting', option)}
                        className={`
                            p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all text-center
                            ${storyData.setting?.id === option.id
                                ? 'border-magic-secondary bg-magic-secondary/10 shadow-magic ring-4 ring-magic-secondary/20'
                                : 'border-gray-200 hover:border-magic-secondary/50 hover:bg-gray-50'}
                        `}
                    >
                        <div className="text-4xl">
                            {option.id === 'none' && '✨'}
                            {option.id === 'bedroom' && '🛏️'}
                            {option.id === 'city' && '🏙️'}
                            {option.id === 'farm' && '🚜'}
                            {option.id === 'village' && '🏡'}
                            {option.id === 'old_town' && '🏮'}
                            {option.id === 'forest' && '🌳'}
                            {option.id === 'ocean' && '🌊'}
                            {option.id === 'castle' && '🏰'}
                            {option.id === 'sky_palace' && '☁️'}
                            {option.id === 'bamboo_forest' && '🎍'}
                        </div>
                        <h3 className="text-lg font-bold text-magic-text">
                            {t(option.labelKey)}
                        </h3>
                        <p className="text-sm text-gray-500">{t(option.descKey)}</p>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default Step5Setting;
