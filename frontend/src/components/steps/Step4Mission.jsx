import React from 'react';
import { useWizard } from '../../contexts/WizardContext';
import { useTranslation } from '../../hooks/useTranslation';
import { bookConfigOptions } from '../../constants/config';
import { motion } from 'framer-motion';

const Step4Mission = () => {
    const { storyData, updateStoryData } = useWizard();
    const { t, language } = useTranslation();

    // Filter themes based on genre and language
    const filteredCategories = bookConfigOptions.themes.map(category => {
        const filteredOptions = category.options.filter(option => {
            // Filter by genre
            if (option.type && option.type !== storyData.storyGenre) return false;
            // Filter by language (if specified)
            if (option.languages && !option.languages.includes(language)) return false;
            return true;
        });
        return { ...category, options: filteredOptions };
    }).filter(category => category.options.length > 0);

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-magic-text mb-2">{t('missionTitle')}</h2>
                <p className="text-gray-500">{t('step4')}</p>
            </div>

            <div className="space-y-8">
                {filteredCategories.map((category) => (
                    <div key={category.categoryKey} className="animate-fadeIn">
                        <h3 className="text-lg font-bold text-magic-secondary mb-4 uppercase tracking-wider">
                            {t(category.categoryKey)}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {category.options.map((option) => (
                                <motion.button
                                    key={option.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => updateStoryData('theme', option)}
                                    className={`
                                        p-5 rounded-xl border-2 text-left transition-all
                                        ${storyData.theme?.id === option.id
                                            ? 'border-magic-accent bg-magic-accent/10 shadow-md ring-2 ring-magic-accent'
                                            : 'border-gray-200 hover:border-magic-accent/50 hover:bg-gray-50'}
                                    `}
                                >
                                    <h4 className="font-bold text-magic-text mb-1">{t(option.labelKey)}</h4>
                                    <p className="text-sm text-gray-500">{t(option.descKey)}</p>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Step4Mission;
