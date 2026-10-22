import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "How long does an automation or AI agent project take to deploy?",
        answer: "Standard workflow automations, WhatsApp agents, and CRM syncs are deployed in 1 to 3 weeks. Custom web applications and complex database architectures generally require 3 to 6 weeks. Every project is planned with fixed milestones and delivery dates agreed upon in writing."
    },
    {
        question: "How is pricing structured, and are there hidden recurring costs?",
        answer: "We work on transparent, fixed-scope milestone agreements with zero surprise invoices. You pay for engineering and integration milestones. You retain 100% ownership of all code and architecture. Any external third-party software subscriptions (e.g., OpenAI API tokens, Twilio phone numbers, or Make/n8n hosting) are billed directly to your own company accounts."
    },
    {
        question: "Which CRMs, databases, and business software do you integrate with?",
        answer: "We integrate across HubSpot, Salesforce, Zoho, Follow Up Boss, Pipedrive, Slack, Stripe, Airtable, PostgreSQL, Supabase, Google Workspace, Microsoft 365, and any system exposing REST or GraphQL APIs. We build custom webhook pipelines utilizing OpenAI, Claude, and specialized open-source models."
    },
    {
        question: "How do you protect our proprietary business and customer data?",
        answer: "Data privacy is an engineering priority. We sign mutual NDAs before reviewing sensitive systems. We never use your proprietary business data or customer conversations to train public AI models. All API tokens and credentials are securely stored using encrypted environment secret managers with least-privilege access."
    },
    {
        question: "How does an India-based engineering team collaborate with international clients?",
        answer: "We operate our primary engineering team in Mumbai, India, serving clients across North America, the UK, Europe, Australia, and the UAE. We collaborate via dedicated Slack or Microsoft Teams channels, share weekly asynchronous Loom video walkthroughs, and schedule real-time video syncs during overlapping business hours."
    },
    {
        question: "What happens after our automation system goes live?",
        answer: "Every deployment includes 30 days of complimentary post-launch monitoring, tuning, and bug fixes to ensure operational stability. We deliver complete Git repositories, system documentation, and video training. For ongoing feature development and monitoring, optional monthly async maintenance retainers are available."
    }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border border-white/10 bg-[#0F172A]/60 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20">
            <button
                className="w-full text-left px-5 py-4 flex items-center justify-between focus:outline-none"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-white text-sm sm:text-base pr-4 leading-snug">{question}</span>
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
                        <div className="px-5 pb-5 text-[#94A3B8] text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-3">
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
        <section id="faq" className="section bg-[#030712] relative py-12 sm:py-16 border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-3xl">
                <div className="text-center mb-10 sm:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 mb-2 border border-[#00C8FF]/30 rounded-full bg-[#00C8FF]/10"
                    >
                        <HelpCircle className="w-3.5 h-3.5 text-[#00C8FF]" />
                        <span className="text-[#00C8FF] text-xs font-bold tracking-wider uppercase">Got Questions?</span>
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
                        Straightforward answers regarding delivery timelines, pricing, security, and international collaboration.
                    </p>
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
