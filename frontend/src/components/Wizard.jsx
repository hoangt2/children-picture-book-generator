import React, { useState, useEffect, useRef } from 'react';
import { useWizard } from '../contexts/WizardContext';
import { useTranslation } from '../hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import LivePreview from './LivePreview';

import Step1Settings from './steps/Step1Settings';
import Step2Hero from './steps/Step2Hero';
import Step3Sidekick from './steps/Step3Sidekick';
import Step4Mission from './steps/Step4Mission';
import Step5Setting from './steps/Step5Setting';

const Wizard = () => {
    const { currentStep, prevStep, nextStep, storyData, isGenerating, setIsGenerating, setGeneratedStory } = useWizard();
    const { t, language } = useTranslation();
    const [generationStatus, setGenerationStatus] = useState('');
    const pollingRef = useRef(null);

    // Translate backend status messages to user's language
    const translateStatus = (status) => {
        if (!status) return '';

        // Map backend English messages to translation keys
        const statusMappings = {
            'Starting...': 'status_starting',
            'Starting story generation...': 'status_starting',
            'Starting MOCK story generation...': 'status_starting',
            'Generating story concept...': 'status_concept',
            'Generating character models...': 'status_character',
            'Creating character model...': 'status_character',
            'Compiling PDF...': 'status_compiling',
            'Recompiling PDF...': 'status_compiling',
            'Complete': 'status_complete',
        };

        // Direct match
        if (statusMappings[status]) {
            return t(statusMappings[status]);
        }

        // Check for regeneration patterns
        const regenMatch = status.match(/Regenerating page (\d+)/i);
        if (regenMatch) {
            const pageNum = regenMatch[1];
            return language === 'vi'
                ? `Đang tạo lại trang ${pageNum}...`
                : `Regenerating page ${pageNum}...`;
        }

        const regenImageMatch = status.match(/Generating new image for page (\d+)/i);
        if (regenImageMatch) {
            const pageNum = regenImageMatch[1];
            return language === 'vi'
                ? `Đang tạo ảnh mới cho trang ${pageNum}...`
                : `Generating new image for page ${pageNum}...`;
        }

        const regenCardMatch = status.match(/Creating story card for page (\d+)/i);
        if (regenCardMatch) {
            const pageNum = regenCardMatch[1];
            return language === 'vi'
                ? `Đang tạo thẻ truyện cho trang ${pageNum}...`
                : `Creating story card for page ${pageNum}...`;
        }

        const regenSuccessMatch = status.match(/Page (\d+) regenerated successfully/i);
        if (regenSuccessMatch) {
            const pageNum = regenSuccessMatch[1];
            return language === 'vi'
                ? `Đã tạo lại trang ${pageNum} thành công!`
                : `Page ${pageNum} regenerated successfully!`;
        }

        // Check for page generation pattern: "Generating page X..." or "Generating mock page X..." or "Processing page X..."
        const pageMatch = status.match(/(?:Generating (?:mock )?page|Processing page) (\d+)/i);
        if (pageMatch) {
            const pageNum = pageMatch[1];
            return language === 'vi'
                ? `Đang tạo trang ${pageNum}...`
                : `Processing page ${pageNum}...`;
        }

        // Check for "Creating page X of Y" pattern
        const pageOfMatch = status.match(/Creating page (\d+) of (\d+)/i);
        if (pageOfMatch) {
            const [, current, total] = pageOfMatch;
            return language === 'vi'
                ? `Đang tạo trang ${current}/${total}...`
                : `Creating page ${current} of ${total}...`;
        }

        // Return original if no translation found
        return status;
    };

    // Poll for status updates during generation
    useEffect(() => {
        if (isGenerating) {
            const pollStatus = async () => {
                try {
                    const response = await fetch('/api/status');
                    const data = await response.json();
                    setGenerationStatus(translateStatus(data.status || ''));
                } catch (error) {
                    console.error('Error polling status:', error);
                }
            };

            // Poll immediately, then every 500ms
            pollStatus();
            pollingRef.current = setInterval(pollStatus, 500);

            return () => {
                if (pollingRef.current) {
                    clearInterval(pollingRef.current);
                }
            };
        }
    }, [isGenerating, language]);

    const handleCreateStory = async () => {
        setIsGenerating(true);
        setGenerationStatus(t('status_starting'));
        try {
            const response = await fetch('/api/generate_story', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(storyData)
            });

            if (!response.ok) throw new Error('Failed to generate story');

            const data = await response.json();
            if (data.status === 'success') {
                setGeneratedStory(data.story);
            } else {
                alert('Error generating story: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating your story.');
        } finally {
            setIsGenerating(false);
            if (pollingRef.current) {
                clearInterval(pollingRef.current);
            }
        }
    };

    const handleNext = () => {
        if (currentStep === 5) {
            handleCreateStory();
        } else {
            nextStep();
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1Settings />;
            case 2: return <Step2Hero />;
            case 3: return <Step3Sidekick />;
            case 4: return <Step4Mission />;
            case 5: return <Step5Setting />;
            default: return null;
        }
    };

    if (isGenerating) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[600px] w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-magic p-10">
                <div className="w-32 h-32 relative mb-8">
                    <motion.div
                        className="absolute inset-0 border-4 border-gray-100 rounded-full"
                    />
                    <motion.div
                        className="absolute inset-0 border-4 border-magic-primary rounded-full border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">
                        ✨
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-magic-text mb-4 text-center animate-pulse">
                    {t('creatingStory')}
                </h2>
                <p className="text-gray-500 text-center max-w-md text-lg">
                    {generationStatus || t('status_starting')}
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto px-4 pb-12">
            {/* Main Form Area */}
            <div className="flex-1 bg-white rounded-3xl shadow-magic p-6 md:p-8 min-h-[600px] flex flex-col">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1"
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`
                            px-6 py-3 rounded-xl font-bold transition-all
                            ${currentStep === 1
                                ? 'opacity-0 pointer-events-none'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                        `}
                    >
                        {t('backBtn')}
                    </button>

                    <button
                        onClick={handleNext}
                        className="px-8 py-3 rounded-xl font-bold bg-magic-primary text-white shadow-lg shadow-magic-primary/30 hover:scale-105 hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
                    >
                        {currentStep === 5 ? t('createStoryBtn') : t('nextBtn')}
                        {currentStep !== 5 && (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Live Preview Side Panel */}
            <LivePreview />
        </div>
    );
};

export default Wizard;
