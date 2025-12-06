import React from 'react';
import { useWizard } from '../../contexts/WizardContext';
import { useTranslation } from '../../hooks/useTranslation';
import { bookConfigOptions } from '../../constants/config';
import { Palette, Sparkles } from 'lucide-react';

const Step6ArtStyle = () => {
    const { storyData, updateStoryData } = useWizard();
    const { t } = useTranslation();

    const handleStyleSelect = (style) => {
        updateStoryData('artStyle', style);
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-magic-text mb-2">{t('styleTitle')}</h2>
            </div>

            {/* Art Style Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookConfigOptions.artStyles.map((style) => {
                    const isSelected = storyData.artStyle?.id === style.id;

                    return (
                        <button
                            key={style.id}
                            onClick={() => handleStyleSelect(style)}
                            className={`
                                p-6 rounded-3xl border-2 transition-all
                                ${isSelected
                                    ? 'border-magic-primary bg-magic-primary/10 shadow-lg scale-105'
                                    : 'border-gray-200 bg-white hover:border-magic-primary/50 hover:shadow-md'
                                }
                            `}
                        >
                            <div className="flex flex-col items-center gap-3">
                                {/* Icon */}
                                <div className={`
                                    w-16 h-16 rounded-full flex items-center justify-center
                                    ${isSelected ? 'bg-magic-primary text-white' : 'bg-gray-100 text-gray-500'}
                                `}>
                                    {isSelected ? (
                                        <Sparkles className="w-8 h-8" />
                                    ) : (
                                        <Palette className="w-8 h-8" />
                                    )}
                                </div>

                                {/* Style Name */}
                                <h3 className={`
                                    text-lg font-bold
                                    ${isSelected ? 'text-magic-primary' : 'text-magic-text'}
                                `}>
                                    {t(style.labelKey)}
                                </h3>

                                {/* Visual Preview Indicator */}
                                <div className="text-xs text-gray-500 text-center">
                                    {style.id === 'watercolor' && '🎨 Soft & Dreamy'}
                                    {style.id === 'vector' && '📐 Bold & Modern'}
                                    {style.id === 'crayon' && '🖍️ Playful & Textured'}
                                    {style.id === 'pixar' && '🎬 3D & Cute'}
                                    {style.id === 'collage' && '📄 Layered & Artistic'}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Step6ArtStyle;
