import React from 'react';
import { useWizard } from '../../contexts/WizardContext';
import { useTranslation } from '../../hooks/useTranslation';
import { Sparkles, User, Users, Target, MapPin, Palette } from 'lucide-react';

const Step7Review = () => {
    const { storyData } = useWizard();
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-magic-text mb-2">{t('reviewTitle')}</h2>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Settings */}
                <div className="p-6 rounded-3xl border-0" style={{ backgroundColor: 'var(--color-step-1)' }}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-magic-text" />
                        </div>
                        <h3 className="font-bold text-magic-text">{t('step1')}</h3>
                    </div>
                    <div className="space-y-2 text-sm text-magic-text-body">
                        <p><span className="font-medium">{t('childAge')}:</span> {storyData.childAge} {t('yearsOld')}</p>
                        <p><span className="font-medium">{t('genreTitle')}:</span> {t(`genre_${storyData.storyGenre}`)}</p>
                    </div>
                </div>

                {/* Hero */}
                <div className="p-6 rounded-3xl border-0" style={{ backgroundColor: 'var(--color-step-2)' }}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center">
                            <User className="w-5 h-5 text-magic-text" />
                        </div>
                        <h3 className="font-bold text-magic-text">{t('step2')}</h3>
                    </div>
                    <div className="space-y-2 text-sm text-magic-text-body">
                        <p><span className="font-medium">{t('heroName')}:</span> {storyData.hero.name || t('unnamed')}</p>
                        <p><span className="font-medium">{t('heroType')}:</span> {t(`hero_${storyData.hero.type}`)}</p>
                        {storyData.hero.type === 'human' && storyData.hero.gender && (
                            <p><span className="font-medium">{t('gender')}:</span> {t(`trait_${storyData.hero.gender.toLowerCase()}`)}</p>
                        )}
                        {storyData.hero.type === 'animal' && storyData.hero.animalArchetype && (
                            <p><span className="font-medium">{t('chooseAnimal')}:</span> {t(storyData.hero.animalArchetype.labelKey)}</p>
                        )}
                    </div>
                </div>

                {/* Sidekick */}
                <div className="p-6 rounded-3xl border-0" style={{ backgroundColor: 'var(--color-step-3)' }}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center">
                            <Users className="w-5 h-5 text-magic-text" />
                        </div>
                        <h3 className="font-bold text-magic-text">{t('step3')}</h3>
                    </div>
                    <div className="text-sm text-magic-text-body">
                        <p>{t(storyData.sidekick?.labelKey || 'sidekick_none')}</p>
                    </div>
                </div>

                {/* Mission */}
                <div className="p-6 rounded-3xl border-0" style={{ backgroundColor: 'var(--color-step-4)' }}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center">
                            <Target className="w-5 h-5 text-magic-text" />
                        </div>
                        <h3 className="font-bold text-magic-text">{t('step4')}</h3>
                    </div>
                    <div className="text-sm text-magic-text-body">
                        <p>{t(storyData.theme?.labelKey || 'theme_bravery')}</p>
                    </div>
                </div>

                {/* Setting */}
                <div className="p-6 rounded-3xl border-0" style={{ backgroundColor: 'var(--color-step-5)' }}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-magic-text" />
                        </div>
                        <h3 className="font-bold text-magic-text">{t('step5')}</h3>
                    </div>
                    <div className="text-sm text-magic-text-body">
                        <p>{t(storyData.setting?.labelKey || 'setting_none')}</p>
                    </div>
                </div>

                {/* Art Style */}
                <div className="p-6 rounded-3xl border-0" style={{ backgroundColor: 'var(--color-step-6)' }}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center">
                            <Palette className="w-5 h-5 text-magic-text" />
                        </div>
                        <h3 className="font-bold text-magic-text">{t('styleTitle')}</h3>
                    </div>
                    <div className="text-sm text-magic-text-body">
                        <p>{t(storyData.artStyle?.labelKey || 'style_watercolor')}</p>
                    </div>
                </div>
            </div>

            {/* Ready Message */}
            <div className="text-center p-8 rounded-3xl border-0" style={{ backgroundColor: 'var(--color-magic-accent)' }}>
                <Sparkles className="w-12 h-12 mx-auto mb-3 text-magic-primary" />
                <h3 className="text-xl font-bold text-magic-text mb-2">{t('readyToCreate')}</h3>
                <p className="text-magic-text-body">{t('reviewMessage')}</p>
            </div>
        </div>
    );
};

export default Step7Review;
