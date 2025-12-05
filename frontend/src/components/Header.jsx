import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useWizard } from '../contexts/WizardContext';
import { Map, User, Users, Flag, Mountain, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
    { id: 1, icon: Map, label: 'step1' },
    { id: 2, icon: User, label: 'step2' },
    { id: 3, icon: Users, label: 'step3' },
    { id: 4, icon: Flag, label: 'step4' },
    { id: 5, icon: Mountain, label: 'step5' },
];

const Header = () => {
    const { t } = useTranslation();
    const { currentStep } = useWizard();

    return (
        <header className="w-full py-6 px-4 flex flex-col items-center gap-6">
            <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl md:text-4xl font-bold text-magic-primary text-center drop-shadow-sm"
            >
                {t('appTitle')}
            </motion.h1>

            {/* Adventure Map Progress Bar */}
            <div className="w-full max-w-3xl relative flex items-center justify-between px-4 md:px-12 py-4 bg-white/50 rounded-full backdrop-blur-sm shadow-magic">
                {/* Connecting Line */}
                <div className="absolute left-12 right-12 top-1/2 h-1 bg-gray-200 -z-10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-magic-secondary"
                        initial={{ width: '0%' }}
                        animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>

                {steps.map((step) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;
                    const Icon = step.icon;

                    return (
                        <div key={step.id} className="relative flex flex-col items-center group">
                            <motion.div
                                className={`
                                    w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
                                    transition-colors duration-300 border-2
                                    ${isActive ? 'bg-magic-secondary border-magic-primary text-white scale-110 shadow-lg' :
                                        isCompleted ? 'bg-magic-primary border-magic-primary text-white' :
                                            'bg-white border-gray-200 text-gray-400'}
                                `}
                                whileHover={{ scale: 1.1 }}
                                animate={isActive ? { y: [0, -5, 0] } : {}}
                                transition={isActive ? { repeat: Infinity, duration: 2 } : {}}
                            >
                                {isActive ? <Star className="w-5 h-5 md:w-6 md:h-6 fill-current" /> : <Icon className="w-5 h-5 md:w-6 md:h-6" />}
                            </motion.div>

                            {/* Tooltip/Label */}
                            <span className={`
                                absolute top-14 text-xs font-bold whitespace-nowrap px-2 py-1 rounded-md
                                transition-all duration-300
                                ${isActive ? 'opacity-100 bg-magic-text text-white' : 'opacity-0 group-hover:opacity-70 bg-gray-800 text-white'}
                            `}>
                                {t(step.label).split('.')[1]?.trim() || t(step.label)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </header>
    );
};

export default Header;
