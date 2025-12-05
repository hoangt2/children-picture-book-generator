import React from 'react';
import { useWizard } from '../contexts/WizardContext';
import { useTranslation } from '../hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Cat, Dog, Rabbit, Bird, Fish, Sparkles } from 'lucide-react';

const LivePreview = () => {
    const { storyData } = useWizard();
    const { t } = useTranslation();

    // Helper to get character icon based on type/archetype
    const getCharacterIcon = () => {
        if (storyData.hero.type === 'human') {
            return <User className="w-24 h-24 text-magic-primary" />;
        }

        // Map animal archetypes to icons
        const animal = storyData.hero.animalArchetype?.id;
        switch (animal) {
            case 'rabbit': return <Rabbit className="w-24 h-24 text-magic-primary" />;
            case 'bird':
            case 'owl': return <Bird className="w-24 h-24 text-magic-primary" />;
            case 'fish':
            case 'carp': return <Fish className="w-24 h-24 text-magic-primary" />;
            case 'cat':
            case 'lion': return <Cat className="w-24 h-24 text-magic-primary" />;
            case 'dog':
            case 'fox':
            case 'bear': return <Dog className="w-24 h-24 text-magic-primary" />; // Approximation
            default: return <Sparkles className="w-24 h-24 text-magic-primary" />;
        }
    };

    return (
        <div className="hidden lg:flex flex-col w-1/3 min-h-[500px] bg-white rounded-3xl shadow-magic p-6 sticky top-24">
            <h3 className="text-xl font-bold text-magic-text mb-4 text-center">
                {t('creatingStory')}
            </h3>

            <div className="flex-1 bg-magic-bg rounded-2xl border-2 border-dashed border-magic-accent/30 flex items-center justify-center relative overflow-hidden">
                {/* Background Setting Hint */}
                {storyData.setting?.id !== 'none' && (
                    <div className="absolute inset-0 opacity-10 bg-cover bg-center"
                        style={{ backgroundImage: `url('/api/placeholder/400/600')` /* Placeholder for now */ }}
                    />
                )}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={storyData.hero.type + (storyData.hero.animalArchetype?.id || '')}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-magic-hover mb-4">
                            {getCharacterIcon()}
                        </div>

                        <div className="text-center">
                            <p className="font-bold text-lg text-magic-text">
                                {storyData.hero.name || t('heroName')}
                            </p>
                            <p className="text-sm text-gray-500">
                                {storyData.hero.type === 'human'
                                    ? `${t('trait_' + storyData.hero.gender?.toLowerCase()) || ''}`
                                    : t(storyData.hero.animalArchetype?.labelKey) || ''}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Stats / Summary */}
            <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t('step3')}:</span>
                    <span className="font-medium text-magic-primary">
                        {t(storyData.sidekick?.labelKey)}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t('step4')}:</span>
                    <span className="font-medium text-magic-secondary truncate max-w-[150px]">
                        {t(storyData.theme?.labelKey)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LivePreview;
