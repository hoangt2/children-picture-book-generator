import React, { useState } from 'react';
import { useWizard } from '../contexts/WizardContext';
import { useTranslation } from '../hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RefreshCw, ArrowLeft, ArrowRight, Home } from 'lucide-react';

const StoryBook = () => {
    const { generatedStory, setGeneratedStory, setIsGenerating, goToStep } = useWizard();
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(0);
    const [regeneratingPage, setRegeneratingPage] = useState(null);
    const [isArchiving, setIsArchiving] = useState(false);

    if (!generatedStory) return null;

    const pages = generatedStory.pages || [];
    const totalPages = pages.length;

    if (totalPages === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="text-xl text-gray-600 mb-4">{t('error_no_pages')}</div>
                <button
                    onClick={handleCreateAnother}
                    className="px-6 py-2 rounded-xl bg-magic-primary text-white font-bold"
                >
                    {t('createAnotherBtn')}
                </button>
            </div>
        );
    }

    const handleRegenerate = async (pageNumber) => {
        if (!confirm(t('confirm_regenerate'))) return;

        setRegeneratingPage(pageNumber);

        // Start polling for status updates
        let statusInterval = null;
        const pollStatus = async () => {
            try {
                const response = await fetch('/api/status');
                const data = await response.json();
                if (data.status && data.status !== 'Idle' && data.status !== 'Complete') {
                    // Show status in console for now (could be a toast notification)
                    console.log('Regeneration status:', data.status);
                }
            } catch (error) {
                console.error('Error polling status:', error);
            }
        };

        statusInterval = setInterval(pollStatus, 500);

        try {
            // Add timeout to prevent hanging
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout for regeneration

            const response = await fetch('/api/regenerate_page', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ page_number: pageNumber }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                const timestamp = new Date().getTime();
                const updatedPages = pages.map(p => {
                    if (p.page_number === pageNumber) {
                        return { ...p, timestamp };
                    }
                    return p;
                });
                setGeneratedStory({ ...generatedStory, pages: updatedPages });
                alert(t('regenerate_success'));
            } else {
                alert(t('regenerate_failed'));
            }
        } catch (error) {
            console.error('Error regenerating:', error);
            if (error.name === 'AbortError') {
                alert('Regeneration timed out. Please make sure the backend server is running and try again.');
            } else {
                alert('Error regenerating image: ' + error.message);
            }
        } finally {
            if (statusInterval) {
                clearInterval(statusInterval);
            }
            setRegeneratingPage(null);
        }
    };

    const handleCreateAnother = () => {
        setGeneratedStory(null);
        setIsGenerating(false);
        goToStep(1);
    };

    const handleArchive = async () => {
        setIsArchiving(true);
        try {
            const response = await fetch('/api/archive', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                alert(t('archived_success'));
            } else {
                alert('Failed to archive story');
            }
        } catch (error) {
            console.error('Error archiving:', error);
            alert('Error archiving story');
        } finally {
            setIsArchiving(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center px-4 py-6">
            {/* Controls Header - Compact */}
            <div className="flex justify-between items-center w-full max-w-6xl mb-4">
                <button
                    onClick={handleCreateAnother}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-magic-text shadow-sm hover:bg-gray-50 font-bold"
                >
                    <Home size={20} />
                    {t('createAnotherBtn')}
                </button>

                <div className="flex gap-3">
                    <button
                        onClick={handleArchive}
                        disabled={isArchiving}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-magic-accent text-white shadow-sm hover:scale-105 transition-all font-bold disabled:opacity-50"
                    >
                        {isArchiving ? '...' : t('saveArchive')}
                    </button>
                    <a
                        href="/download_pdf"
                        target="_blank"
                        className="flex items-center gap-2 px-6 py-2 rounded-xl bg-magic-secondary text-magic-text shadow-magic hover:scale-105 transition-all font-bold"
                    >
                        <Download size={20} />
                        {t('downloadPdf')}
                    </a>
                </div>
            </div>

            {/* Page Number - Above Book */}
            <div className="text-center text-base text-gray-500 font-medium mb-3">
                {t('page')} {currentPage + 1} {t('of')} {totalPages}
            </div>

            {/* Book Container with Arrows on Sides */}
            <div className="flex items-center justify-center gap-6 w-full max-w-6xl flex-1">
                {/* Left Arrow */}
                <button
                    onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                    disabled={currentPage === 0}
                    className={`flex-shrink-0 p-4 rounded-full transition-all ${currentPage === 0
                        ? 'opacity-0 pointer-events-none'
                        : 'bg-white shadow-lg hover:bg-gray-50 hover:scale-110'
                        }`}
                >
                    <ArrowLeft size={32} className="text-gray-700" />
                </button>

                {/* Book Viewer - Responsive Scaling */}
                <div className="bg-white rounded-3xl shadow-magic overflow-hidden flex flex-col w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
                    {/* Image */}
                    <div className="bg-gray-50 relative group flex items-center justify-center p-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage + (pages[currentPage]?.timestamp || '')}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-full flex items-center justify-center"
                            >
                                <img
                                    src={`/output/cards/story_card_${pages[currentPage].page_number}.png?t=${pages[currentPage].timestamp || Date.now()}`}
                                    alt={`Page ${pages[currentPage].page_number}`}
                                    className="max-w-full max-h-full object-contain rounded-lg"
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Regenerate Button Overlay */}
                        <button
                            onClick={() => handleRegenerate(pages[currentPage].page_number)}
                            disabled={regeneratingPage === pages[currentPage].page_number}
                            className="absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-gray-700 hover:text-magic-primary hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                            title={t('regenerate_btn')}
                        >
                            <RefreshCw size={20} className={regeneratingPage === pages[currentPage].page_number ? 'animate-spin' : ''} />
                        </button>
                    </div>

                    {/* Text Below Image */}
                    <div className="p-6 lg:p-8 xl:p-10 flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="prose prose-lg max-w-none"
                            >
                                <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-magic leading-relaxed text-magic-text text-center">
                                    {pages[currentPage].text}
                                </p>
                                {pages[currentPage].text_vi && (
                                    <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-magic leading-relaxed text-gray-500 mt-4 italic text-center">
                                        {pages[currentPage].text_vi}
                                    </p>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={currentPage === totalPages - 1}
                    className={`flex-shrink-0 p-4 rounded-full transition-all ${currentPage === totalPages - 1
                        ? 'opacity-0 pointer-events-none'
                        : 'bg-magic-primary text-white shadow-lg hover:bg-magic-primary/90 hover:scale-110'
                        }`}
                >
                    <ArrowRight size={32} />
                </button>
            </div>
        </div>
    );
};

export default StoryBook;
