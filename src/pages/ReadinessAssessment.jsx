import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const questions = [
    {
        id: 1,
        question: "How many hours per week does your team spend on manual data entry?",
        options: ["Less than 5 hours", "5-15 hours", "15-40 hours", "40+ hours"]
    },
    {
        id: 2,
        question: "Do you currently use a CRM (HubSpot, Salesforce, Zoho, etc.)?",
        options: ["Yes, and it's well organized", "Yes, but it's messy", "We use Excel/Spreadsheets", "No CRM at all"]
    },
    {
        id: 3,
        question: "How quickly do you respond to new sales leads?",
        options: ["Within 5 minutes", "Within 1 hour", "Within 24 hours", "It takes a few days"]
    },
    {
        id: 4,
        question: "Are your software tools connected to each other?",
        options: ["Yes, fully integrated", "Some are connected via Zapier", "No, we manually move data", "I'm not sure"]
    }
];

const ReadinessAssessment = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const handleOptionSelect = (option) => {
        setAnswers({ ...answers, [currentStep]: option });
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowResults(true);
        }
    };

    return (
        <main className="pt-32 pb-16 px-6 max-w-3xl mx-auto min-h-screen">
            <SEOHead 
                title="AI Readiness Assessment | AIFlowix"
                description="Take our 2-minute AI readiness assessment to find out if your business is prepared to scale with custom AI automation."
                canonical="/ai-readiness"
            />
            
            <div className="text-center mb-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20"
                >
                    <ClipboardCheck className="w-4 h-4 text-[#6366F1]" />
                    <span className="text-sm font-medium text-[#6366F1]">2-Minute Quiz</span>
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white"
                >
                    Is Your Business Ready for AI?
                </motion.h1>
            </div>

            <motion.div 
                key={showResults ? 'results' : currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-8 md:p-12 rounded-3xl border border-white/5"
            >
                {showResults ? (
                    <div className="text-center">
                        <CheckCircle2 className="w-16 h-16 text-[#10B981] mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-4">You're a Prime Candidate for Automation!</h2>
                        <p className="text-[#94A3B8] text-lg mb-8">
                            Based on your answers, your business has significant operational bottlenecks that AI can fix immediately. You are losing money to manual inefficiencies.
                        </p>
                        <a href="/free-ai-audit" className="inline-flex items-center justify-center gap-2 bg-gradient-primary text-[#0F172A] font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-opacity">
                            Book Free Strategy Call <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                ) : (
                    <div>
                        <div className="mb-8">
                            <span className="text-[#00C8FF] font-bold text-sm">Question {currentStep + 1} of {questions.length}</span>
                            <h2 className="text-2xl font-bold text-white mt-2">{questions[currentStep].question}</h2>
                        </div>
                        <div className="space-y-4">
                            {questions[currentStep].options.map((option, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => handleOptionSelect(option)}
                                    className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-[#00C8FF] hover:bg-[#00C8FF]/5 transition-all text-[#E2E8F0] font-medium flex items-center justify-between group"
                                >
                                    {option}
                                    <div className="w-5 h-5 rounded-full border-2 border-white/20 group-hover:border-[#00C8FF]"></div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </main>
    );
};

export default ReadinessAssessment;
