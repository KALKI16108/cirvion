import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';

const steps = [
    {
        num: "01",
        title: "Audit Operations",
        duration: "3–5 Days",
        icon: Search,
        description: "We analyze your operations and identify manual task bottlenecks.",
        deliverable: "Workflow assessment & ROI map."
    },
    {
        num: "02",
        title: "Identify Inefficiencies & Discuss Solutions",
        duration: "1 Week",
        icon: Compass,
        description: "We map friction points and design a fixed-scope technical architecture.",
        deliverable: "Transparent technical blueprint."
    },
    {
        num: "03",
        title: "Implement Agreed Solution",
        duration: "2–4 Weeks",
        icon: Rocket,
        description: "We engineer, integrate, test, and deploy production-grade AI pipelines.",
        deliverable: "Production system + 100% code ownership."
    }
];

const DeliveryProcess = () => {
    return (
        <section id="process" className="section bg-[#0F172A] relative overflow-hidden py-8 sm:py-10">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C8FF]/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6366F1]/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
                <div className="text-center mb-6 sm:mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 py-0.5 mb-2 border border-[#00C8FF]/30 rounded-full bg-[#00C8FF]/10"
                    >
                        <span className="text-[#00C8FF] text-xs font-bold tracking-wider uppercase">How We Work</span>
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
                        Three Steps to <span className="text-gradient-primary">Automating Your Workflows</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
                        Milestone-driven engineering with direct communication and full code handover.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.4 }}
                                className="glass-card p-4 sm:p-5 rounded-xl border border-white/5 relative group hover:border-[#00C8FF]/30 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xl font-black text-[#00C8FF]/40 group-hover:text-[#00C8FF] transition-colors">{step.num}</span>
                                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#94A3B8] border border-white/10">
                                            {step.duration}
                                        </span>
                                    </div>
                                    <div className="w-9 h-9 rounded-lg bg-[#00C8FF]/10 text-[#00C8FF] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-base font-bold text-white mb-1.5">{step.title}</h3>
                                    <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">{step.description}</p>
                                </div>
                                <div className="pt-2.5 border-t border-white/5">
                                    <div className="flex items-center gap-1.5 text-xs text-[#CBD5E1]">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                        <span><strong className="text-white">Deliverable:</strong> {step.deliverable}</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Practical trust statement */}
                <div className="mt-5 text-center border-t border-white/5 pt-4">
                    <p className="text-xs text-[#94A3B8]">
                        Serving global clients across US, UK, Europe, UAE & APAC via dedicated Slack/Teams channels and async updates.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DeliveryProcess;
