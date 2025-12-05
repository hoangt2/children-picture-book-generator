import React from 'react';
import { useWizard } from '../../contexts/WizardContext';
import { useTranslation } from '../../hooks/useTranslation';
import { bookConfigOptions } from '../../constants/config';
import { motion } from 'framer-motion';

const Step3Sidekick = () => {
    const { storyData, updateStoryData } = useWizard();
    const { t } = useTranslation();

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-magic-text mb-2">{t('sidekickTitle')}</h2>
                <p className="text-gray-500">{t('step3')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookConfigOptions.sidekick.map((option) => (
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
                            {option.id === 'none' && '👤'}
                            {option.id === 'pet_dog' && '🐶'}
                            {option.id === 'pet_cat' && '🐱'}
                            {option.id === 'robot' && '🤖'}
                            {option.id === 'fairy' && '🧚'}
                            {option.id === 'stuffed_animal' && '🧸'}
                        </div>
                        <h3 className="text-lg font-bold text-magic-text">
                            {t(option.labelKey)}
                        </h3>
                        {/* <p className="text-sm text-gray-500">{option.prompt}</p> */}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default Step3Sidekick;
