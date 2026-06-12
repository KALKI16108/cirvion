import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const FreeAiAudit = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className="pt-32 pb-16 px-6 max-w-4xl mx-auto min-h-screen">
            <SEOHead 
                title="Free AI Automation Audit | AIFlowix"
                description="Get a free, comprehensive AI audit for your business. Discover exactly how much time and money AI automation can save you."
                canonical="/free-ai-audit"
            />
            
            <div className="text-center mb-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/20"
                >
                    <FileText className="w-4 h-4 text-[#00C8FF]" />
                    <span className="text-sm font-medium text-[#00C8FF]">100% Free Assessment</span>
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white"
                >
                    Free AI Automation Audit
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-[#94A3B8]"
                >
                    Find out exactly where your business is bleeding time and money, and how AI can fix it.
                </motion.p>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-8 md:p-12 rounded-3xl border border-white/5"
            >
                {submitted ? (
                    <div className="text-center py-12">
                        <CheckCircle2 className="w-16 h-16 text-[#10B981] mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-white mb-4">Request Received!</h2>
                        <p className="text-[#94A3B8]">Our automation engineers will review your details and reach out within 24 hours to schedule your free audit.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#E2E8F0]">Full Name</label>
                                <input required type="text" className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#E2E8F0]">Work Email</label>
                                <input required type="email" className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors" placeholder="john@company.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#E2E8F0]">Company Website</label>
                            <input required type="url" className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors" placeholder="https://company.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#E2E8F0]">Biggest Bottleneck</label>
                            <textarea required className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors h-32 resize-none" placeholder="E.g., We spend 20 hours a week on manual data entry..."></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gradient-primary hover:opacity-90 text-[#0F172A] font-bold py-4 rounded-xl transition-opacity flex items-center justify-center gap-2">
                            Request Free Audit
                        </button>
                    </form>
                )}
            </motion.div>
        </main>
    );
};

export default FreeAiAudit;
