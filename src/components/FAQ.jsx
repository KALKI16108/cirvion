import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "How long does it take to build and deploy an automation system?",
        answer: "Standard workflow automations, WhatsApp agents, and CRM syncs are deployed within 1 to 3 weeks. Custom web applications typically require 3 to 6 weeks. Every project begins with a free discovery audit with exact milestone dates."
    },
    {
        question: "What is your pricing model, and are there recurring costs?",
        answer: "We work on fixed-scope project agreements with zero surprise billing. Optional monthly retainers are available for ongoing maintenance, model updates, and monitoring. You retain 100% ownership of all code and workflow logic."
    },
    {
        question: "Which CRMs, platforms, and APIs do you integrate with?",
        answer: "We integrate across HubSpot, Salesforce, Zoho, Follow Up Boss, Pipedrive, Slack, Stripe, Airtable, PostgreSQL, Supabase, and custom REST APIs utilizing OpenAI, Claude, and serverless webhook pipelines."
    },
    {
        question: "How do you handle data privacy and security?",
        answer: "Your business data remains strictly confidential and is never fed into public AI model training sets. Systems are architected with isolated environment variables, encrypted API transit, and human-in-the-loop review controls."
    },
    {
        question: "How does an India-based agency support international clients?",
        answer: "We serve clients across the US, UK, Canada, Australia, and UAE with dedicated Slack/Teams communication, regular Loom walkthroughs, and scheduled video meetings during overlapping business hours."
    }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border border-white/10 bg-[#0F172A]/50 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300">
            <button
                className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between focus:outline-none"
                onClick={onClick}
            >
                <span className="font-semibold text-white text-base sm:text-lg pr-4">{question}</span>
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
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-[#94A3B8] text-xs sm:text-sm md:text-base leading-relaxed">
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
        <section className="section bg-[#030712] relative py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
                <div className="text-center mb-8 sm:mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 sm:px-4 py-1 mb-3 border border-[#00C8FF]/30 rounded-full bg-[#00C8FF]/10"
                    >
                        <span className="text-[#00C8FF] text-xs sm:text-sm font-bold tracking-wider uppercase">Questions?</span>
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-[#94A3B8] text-sm sm:text-base max-w-2xl mx-auto">
                        Key details regarding project timelines, pricing, security, and international collaboration.
                    </p>
                </div>

                <div className="space-y-3.5">
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
