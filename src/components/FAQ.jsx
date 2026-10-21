import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "How long does it take to build and deploy an automation system?",
        answer: "Standard workflow automations, WhatsApp agents, and CRM syncs are deployed within 1 to 3 weeks. Custom web applications typically require 3 to 6 weeks with clear milestone dates."
    },
    {
        question: "What is your pricing model, and are there recurring costs?",
        answer: "We work on fixed-scope project agreements with zero surprise billing. Optional monthly retainers are available for ongoing maintenance. You retain 100% ownership of all code."
    },
    {
        question: "Which CRMs, platforms, and APIs do you integrate with?",
        answer: "We integrate across HubSpot, Salesforce, Zoho, Follow Up Boss, Pipedrive, Slack, Stripe, Airtable, PostgreSQL, Supabase, and custom REST APIs utilizing OpenAI, Claude, and webhook pipelines."
    },
    {
        question: "How do you handle data privacy and security?",
        answer: "Your business data remains strictly confidential and is never used to train public AI models. Systems are built with isolated environment variables, encrypted API transit, and human review controls."
    }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border border-white/10 bg-[#0F172A]/50 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300">
            <button
                className="w-full text-left px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between focus:outline-none"
                onClick={onClick}
            >
                <span className="font-semibold text-white text-sm sm:text-base pr-4">{question}</span>
                <ChevronDown 
                    className={`w-4 h-4 text-[#00C8FF] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-[#94A3B8] text-xs sm:text-sm leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="section bg-[#030712] relative py-8 sm:py-10">
            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-3xl">
                <div className="text-center mb-6 sm:mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 py-0.5 mb-2 border border-[#00C8FF]/30 rounded-full bg-[#00C8FF]/10"
                    >
                        <span className="text-[#00C8FF] text-xs font-bold tracking-wider uppercase">Questions?</span>
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
