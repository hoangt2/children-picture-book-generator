import React, { createContext, useState, useContext } from 'react';
import { bookConfigOptions } from '../constants/config';

const WizardContext = createContext();

export const WizardProvider = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [testMode, setTestMode] = useState(false);
    const [storyData, setStoryData] = useState({
        childAge: 6,
        childName: '',
        language: 'vi',
        storyGenre: 'realistic',
        test_mode: false,
        hero: {
            type: 'human',
            gender: 'Boy',
            name: '',
            traits: {
                race: 'Asian',
                skinTone: 'Light',
                hairColor: 'Black',
                hairStyle: 'Short & Straight',
                accessories: 'None'
            }
        },
        sidekick: bookConfigOptions.sidekick.find(s => s.id === 'none'),
        theme: bookConfigOptions.themes[0].options[0],
        setting: bookConfigOptions.settings.find(s => s.id === 'none'),
        artStyle: bookConfigOptions.artStyles[0]
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedStory, setGeneratedStory] = useState(null);

    const updateStoryData = (key, value) => {
        setStoryData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 7));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
    const goToStep = (step) => setCurrentStep(step);

    return (
        <WizardContext.Provider value={{
            currentStep,
            storyData,
            updateStoryData,
            nextStep,
            prevStep,
            goToStep,
            isGenerating,
            setIsGenerating,
            generatedStory,
            setGeneratedStory,
            testMode,
            setTestMode
        }}>
            {children}
        </WizardContext.Provider>
    );
};

export const useWizard = () => useContext(WizardContext);
