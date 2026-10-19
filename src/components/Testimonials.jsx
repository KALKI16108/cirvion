import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Code2, HeartHandshake, CheckCircle2, Terminal } from 'lucide-react';

const standards = [
    {
        icon: Lock,
        title: "Strict Data Privacy & Isolation",
        description: "Your operational data and customer conversations are strictly confidential. We never use your proprietary data to train public AI models. All API integrations utilize encrypted credentials and isolated environment stores."
    },
    {
        icon: Code2,
        title: "100% Code & Pipeline Ownership",
        description: "You own every line of code, prompt, database schema, and automation workflow we build. We provide full Git repository transfers and deployment scripts with zero proprietary vendor lock-in."
    },
    {
        icon: Terminal,
        title: "Direct Engineer Communication",
        description: "You collaborate directly with full-stack automation engineers—not non-technical account managers. We communicate asynchronously via dedicated Slack/Teams channels with transparent sprint demos."
    },
    {
        icon: ShieldCheck,
        title: "Production Resilience & Fallbacks",
        description: "Every automated workflow includes built-in exception handling, retry logic, dead-letter queues, and human-in-the-loop fallback triggers so critical business processes never stall silently."
    }
];

const Testimonials = () => {
    return (
        <section id="standards" className="section bg-[#030712] relative overflow-hidden py-20 sm:py-24">
            {/* Ambient background */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00C8FF]/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-white/5 border border-white/10">
                        <ShieldCheck className="w-4 h-4 text-[#00C8FF]" />
                        <span className="text-xs sm:text-sm font-medium text-[#CBD5E1]">Engineering Principles</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
                        Built on Verifiable <span className="text-gradient-primary">Engineering Standards</span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
                        Why scaling businesses partner with AIFlowix: honest technical scope, robust architecture, and production-tested security.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {standards.map((std, idx) => {
                        const Icon = std.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-[#00C8FF]/30 transition-all group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#00C8FF]/10 text-[#00C8FF] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{std.title}</h3>
                                        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{std.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
