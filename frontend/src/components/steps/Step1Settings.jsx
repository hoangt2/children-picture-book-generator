import React from 'react';
import { useWizard } from '../../contexts/WizardContext';
import { useTranslation } from '../../hooks/useTranslation';
import { bookConfigOptions } from '../../constants/config';
import { motion } from 'framer-motion';

const Step1Settings = () => {
    const { storyData, updateStoryData, testMode, setTestMode } = useWizard();
    const { t, language, setLanguage } = useTranslation();

    // Sync language changes to storyData
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        updateStoryData('language', lang);
    };

    // Sync test mode to storyData
    const handleTestModeChange = (checked) => {
        setTestMode(checked);
        updateStoryData('test_mode', checked);
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-magic-text mb-2">{t('setupTitle')}</h2>
            </div>

            {/* Test Mode Toggle */}
            <div className="flex justify-center mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={testMode}
                        onChange={(e) => handleTestModeChange(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-magic-primary focus:ring-magic-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">{t('testMode')}</span>
                </label>
            </div>

            {/* Language Selection */}
            <div className="flex justify-center mb-6">
                <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
                    {['en', 'vi'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => handleLanguageChange(lang)}
                            className={`
                                px-4 py-2 rounded-lg font-bold transition-all
                                ${language === lang
                                    ? 'bg-white text-magic-primary shadow-sm'
                                    : 'text-gray-400 hover:text-gray-600'}
                            `}
                        >
                            {lang === 'en' ? 'English' : 'Tiếng Việt'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Genre Selection */}
            <div>
                <label className="block text-lg font-bold text-magic-text mb-4">
                    {t('genreTitle')}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookConfigOptions.genres.map((genre) => (
                        <motion.button
                            key={genre.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => updateStoryData('storyGenre', genre.id)}
                            className={`
                                relative p-6 rounded-2xl border-2 text-left transition-all
                                ${storyData.storyGenre === genre.id
                                    ? 'border-magic-primary bg-magic-primary/5 ring-4 ring-magic-primary/20'
                                    : 'border-gray-200 hover:border-magic-primary/50 hover:bg-gray-50'}
                            `}
                        >
                            <div className="text-4xl mb-3">{genre.icon}</div>
                            <h3 className="text-xl font-bold text-magic-text mb-1">
                                {t(genre.labelKey)}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {t(genre.descKey)}
                            </p>

                            {storyData.storyGenre === genre.id && (
                                <div className="absolute top-4 right-4 w-6 h-6 bg-magic-primary rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Text Type Selection */}
            <div>
                <label className="block text-lg font-bold text-magic-text mb-4">
                    {t('textTypeTitle')}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { id: 'story', icon: '📖', labelKey: 'textType_story', descKey: 'desc_story' },
                        { id: 'poem', icon: '✨', labelKey: 'textType_poem', descKey: 'desc_poem' }
                    ].map((type) => (
                        <motion.button
                            key={type.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => updateStoryData('textType', type.id)}
                            className={`
                                relative p-6 rounded-2xl border-2 text-left transition-all
                                ${storyData.textType === type.id
                                    ? 'border-magic-primary bg-magic-primary/5 ring-4 ring-magic-primary/20'
                                    : 'border-gray-200 hover:border-magic-primary/50 hover:bg-gray-50'}
                            `}
                        >
                            <div className="text-4xl mb-3">{type.icon}</div>
                            <h3 className="text-xl font-bold text-magic-text mb-1">
                                {t(type.labelKey)}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {t(type.descKey)}
                            </p>

                            {storyData.textType === type.id && (
                                <div className="absolute top-4 right-4 w-6 h-6 bg-magic-primary rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Text Amount Selection */}
            <div>
                <label className="block text-lg font-bold text-magic-text mb-4">
                    {t('textAmountTitle')}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { id: 'few', icon: '📝', labelKey: 'textAmount_few', descKey: 'desc_few' },
                        { id: 'medium', icon: '📄', labelKey: 'textAmount_medium', descKey: 'desc_medium' },
                        { id: 'more', icon: '📚', labelKey: 'textAmount_more', descKey: 'desc_more' }
                    ].map((amount) => (
                        <motion.button
                            key={amount.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => updateStoryData('textAmount', amount.id)}
                            className={`
                                relative p-6 rounded-2xl border-2 text-left transition-all
                                ${storyData.textAmount === amount.id
                                    ? 'border-magic-primary bg-magic-primary/5 ring-4 ring-magic-primary/20'
                                    : 'border-gray-200 hover:border-magic-primary/50 hover:bg-gray-50'}
                            `}
                        >
                            <div className="text-4xl mb-3">{amount.icon}</div>
                            <h3 className="text-xl font-bold text-magic-text mb-1">
                                {t(amount.labelKey)}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {t(amount.descKey)}
                            </p>

                            {storyData.textAmount === amount.id && (
                                <div className="absolute top-4 right-4 w-6 h-6 bg-magic-primary rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Child's Age */}
            <div>
                <label className="block text-lg font-bold text-magic-text mb-4">
                    {t('childAge')}
                </label>
                <div className="flex gap-2 justify-center overflow-x-auto py-2 px-4">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((age) => (
                        <button
                            key={age}
                            onClick={() => updateStoryData('childAge', age)}
                            className={`
                                w-14 h-14 rounded-full font-bold transition-all flex-shrink-0 flex items-center justify-center
                                ${age >= 10 ? 'text-base' : 'text-lg'}
                                ${storyData.childAge === age
                                    ? 'bg-magic-primary text-white shadow-lg scale-110'
                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}
                            `}
                        >
                            {age}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Step1Settings;
