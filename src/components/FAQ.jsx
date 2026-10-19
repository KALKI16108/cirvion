import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "How long does it take to build and deploy an automation system?",
        answer: "Standard workflow automations, WhatsApp agents, and CRM syncs are deployed within 1 to 3 weeks. Custom web applications and complex multi-system integrations typically require 3 to 6 weeks. Every engagement begins with a 100% free discovery audit where we outline exact milestone dates before you commit."
    },
    {
        question: "What is your pricing model, and are there recurring costs?",
        answer: "We primarily work on milestone-based fixed-scope project agreements so you know exact costs upfront with zero surprise billing. For ongoing maintenance, model updates, and monitoring, we offer optional monthly support retainers. You also retain 100% ownership of all created code and workflow logic."
    },
    {
        question: "Which CRMs, platforms, and APIs do you integrate with?",
        answer: "We build integrations across HubSpot, Salesforce, Zoho, Follow Up Boss, Pipedrive, Slack, Stripe, Airtable, PostgreSQL, Supabase, and custom REST/GraphQL APIs. For AI layers, we utilize OpenAI, Anthropic Claude, custom fine-tuned models, and serverless webhook pipelines (n8n, Python, Node.js)."
    },
    {
        question: "How do you handle data privacy and security?",
        answer: "Your business data and customer conversations remain strictly confidential. We never feed client data into public model training sets. All systems are architected with isolated environment variables, encrypted API transit, and human-in-the-loop review capabilities for sensitive operations."
    },
    {
        question: "How does an India-based agency support international clients?",
        answer: "We serve clients across the US, UK, Canada, Australia, and UAE with structured timezone overlap. Our engineers communicate directly through dedicated Slack or Microsoft Teams channels, accompanied by regular Loom video walkthroughs and scheduled sync meetings to ensure seamless alignment."
    },
    {
        question: "Do I need technical skills or an in-house developer to maintain this?",
        answer: "No. We handle end-to-end architecture, API configuration, stress-testing, and hosting setup. Upon completion, we provide clear documentation, staff training sessions, and 30 days of complimentary post-launch warranty support."
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
