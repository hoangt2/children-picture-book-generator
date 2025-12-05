import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { WizardProvider, useWizard } from './contexts/WizardContext';
import Header from './components/Header';
import Wizard from './components/Wizard';
import StoryBook from './components/StoryBook';

const MainContent = () => {
  const { generatedStory } = useWizard();
  return (
    <div className="min-h-screen bg-magic-bg font-magic pb-20">
      {!generatedStory && <Header />}
      {generatedStory ? <StoryBook /> : <Wizard />}
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <WizardProvider>
        <MainContent />
      </WizardProvider>
    </LanguageProvider>
  );
}

export default App;
