import React from 'react';
import { useWizard } from '../../contexts/WizardContext';
import { useTranslation } from '../../hooks/useTranslation';
import { bookConfigOptions } from '../../constants/config';
import { motion } from 'framer-motion';

const Step3Sidekick = () => {
    const { storyData, updateStoryData } = useWizard();
    const { t } = useTranslation();

    // Filter sidekicks based on genre
    const filteredSidekicks = bookConfigOptions.sidekick.filter(option => {
        if (option.type === 'both') return true;
        return option.type === storyData.storyGenre;
    });

    // Emoji mapping for all sidekicks
    const getEmoji = (id) => {
        const emojiMap = {
            'none': '👤',
            'pet_dog': '🐶',
            'pet_cat': '🐱',
            'pet_rabbit': '🐰',
            'pet_bird': '🦜',
            'sibling': '👶',
            'friend': '👧',
            'grandparent': '👵',
            'stuffed_animal': '🧸',
            'fairy': '🧚',
            'robot': '🤖',
            'dragon': '🐉',
            'unicorn': '🦄',
            'talking_tree': '🌳',
            'magic_butterfly': '🦋'
        };
        return emojiMap[id] || '❓';
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-magic-text mb-2">{t('sidekickTitle')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSidekicks.map((option) => (
                    <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => updateStoryData('sidekick', option)}
                        className={`
                            p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all text-center
                            ${storyData.sidekick?.id === option.id
                                ? 'border-magic-primary bg-magic-primary/5 shadow-magic ring-4 ring-magic-primary/20'
                                : 'border-gray-200 hover:border-magic-primary/50 hover:bg-gray-50'}
                        `}
                    >
                        <div className="text-4xl">
                            {getEmoji(option.id)}
                        </div>
                        <h3 className="text-lg font-bold text-magic-text">
                            {t(option.labelKey)}
                        </h3>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default Step3Sidekick;
