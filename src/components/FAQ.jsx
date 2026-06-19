import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "How long does it take to build an AI automation system?",
        answer: "Most of our custom AI workflows and chatbots are deployed within 2 to 4 weeks. Complex enterprise integrations (like full CRM + ERP syncs) may take 6 to 8 weeks. We always start with a clear timeline during our initial audit."
    },
    {
        question: "Do I need to hire an IT team to manage it?",
        answer: "No! We handle the entire setup, hosting, and maintenance. Our systems are built to be completely hands-off for you. We also provide a simple dashboard if you ever need to view the AI's performance or leads."
    },
    {
        question: "Will the AI sound like a robot to my customers?",
        answer: "Not at all. We train our Large Language Models (LLMs) on your specific brand voice, past emails, and company knowledge base. The AI responses are highly empathetic, context-aware, and indistinguishable from a human."
    },
    {
        question: "Is my business data secure?",
        answer: "Security is our top priority. We use enterprise-grade encryption and never use your private business data to train public AI models like ChatGPT. Your data remains strictly siloed and confidential."
    }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border border-white/10 bg-[#0F172A]/50 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300">
            <button
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                onClick={onClick}
            >
                <span className="font-semibold text-white text-lg pr-4">{question}</span>
                <ChevronDown 
                    className={`w-5 h-5 text-[#00C8FF] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6 text-[#94A3B8] leading-relaxed">
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
        <section className="section bg-[#030712] relative">
            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
                <div className="text-center mb-12 sm:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 sm:px-4 py-1 mb-4 sm:mb-5 border border-[#00C8FF]/30 rounded-full bg-[#00C8FF]/10"
                    >
                        <span className="text-[#00C8FF] text-xs sm:text-sm font-bold tracking-wider uppercase">Questions?</span>
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
                        Everything you need to know about integrating AI into your business.
                    </p>
                </div>

                <div className="space-y-4">
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
