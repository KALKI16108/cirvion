import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Code2, Terminal, RefreshCw, CheckCircle2 } from 'lucide-react';

const standards = [
    {
        icon: Lock,
        title: "Strict Data Privacy & Isolation",
        description: "Your operational records and customer conversations remain strictly confidential. We never use proprietary client data to train public AI models. All API integrations utilize encrypted secrets managers and isolated environment stores."
    },
    {
        icon: Code2,
        title: "100% Code & Pipeline Ownership",
        description: "You own every repository, workflow blueprint, webhook script, and database schema we build. We provide full Git repository transfers and documentation with zero proprietary vendor lock-in."
    },
    {
        icon: Terminal,
        title: "Direct Senior Engineer Collaboration",
        description: "You work directly with the software engineers who write the code and build your pipelines—not non-technical account managers. We collaborate asynchronously via dedicated Slack/Teams channels with clear sprint updates."
    },
    {
        icon: RefreshCw,
        title: "Production Resilience & Fallbacks",
        description: "Every automated pipeline includes built-in exception handling, idempotent retries, dead-letter alerts, and graceful human-in-the-loop fallback triggers so critical business operations never fail silently."
    }
];

const EngineeringPrinciples = () => {
    return (
        <section id="standards" className="section bg-[#030712] relative overflow-hidden py-12 sm:py-16 border-t border-white/5">
            {/* Ambient background */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00C8FF]/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
                <div className="text-center mb-10 sm:mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 rounded-full bg-white/5 border border-white/10">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#00C8FF]" />
                        <span className="text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider">Engineering Principles</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">
                        Built on Verifiable <span className="text-gradient-primary">Engineering Standards</span>
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
                        Why scaling businesses partner with AIFlowix: honest technical scope, robust architecture, and production-tested security.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {standards.map((std, idx) => {
                        const Icon = std.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.4 }}
                                className="glass-card p-5 sm:p-7 rounded-2xl border border-white/5 hover:border-[#00C8FF]/30 transition-all group flex flex-col justify-between"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-[#00C8FF]/10 text-[#00C8FF] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">{std.title}</h3>
                                        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{std.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* International trust badge */}
                <div className="mt-8 pt-6 border-t border-white/5 text-center flex flex-wrap items-center justify-center gap-4 text-xs text-[#94A3B8]">
                    <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>HQ in Mumbai, India</span>
                    </span>
                    <span className="text-white/20">•</span>
                    <span>Delivering globally across US, UK, Canada, Australia, UAE & APAC</span>
                    <span className="text-white/20">•</span>
                    <span className="text-white font-medium">Async Slack/Teams Collaboration</span>
                </div>
            </div>
        </section>
    );
};

export default EngineeringPrinciples;
