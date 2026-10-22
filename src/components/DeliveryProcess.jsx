import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Rocket, CheckCircle2, ShieldCheck, MessageSquare, Clock } from 'lucide-react';

const steps = [
    {
        num: "01",
        title: "Operational Audit & Bottleneck Mapping",
        duration: "3–5 Days",
        icon: Search,
        description: "We review your operational workflows, data flows, and software tools to pinpoint manual bottlenecks and quantify potential time savings.",
        deliverable: "Written workflow assessment, technical feasibility review & ROI map."
    },
    {
        num: "02",
        title: "Architecture Blueprint & Fixed Scope",
        duration: "1 Week",
        icon: Compass,
        description: "We design a transparent technical architecture, API integration maps, error fallbacks, and a fixed-scope milestone delivery contract.",
        deliverable: "Fixed-price agreement with milestone dates and zero surprise fees."
    },
    {
        num: "03",
        title: "Engineering, Integration & Handover",
        duration: "2–4 Weeks",
        icon: Rocket,
        description: "Our engineers build, test edge cases, and deploy live automated workflows into your staging and production environments.",
        deliverable: "Production system, staff walkthrough & 100% Git repository transfer."
    }
];

const DeliveryProcess = () => {
    return (
        <section id="process" className="section bg-[#0F172A] relative overflow-hidden py-12 sm:py-16 border-t border-white/5">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C8FF]/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6366F1]/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
                <div className="text-center mb-10 sm:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 py-1 mb-2 border border-[#00C8FF]/30 rounded-full bg-[#00C8FF]/10"
                    >
                        <span className="text-[#00C8FF] text-xs font-bold tracking-wider uppercase">How Engagement Works</span>
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">
                        Three Clear Steps to <span className="text-gradient-primary">Production Automation</span>
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
                        Milestone-driven engineering with direct engineer communication, fixed budgets, and full code handover.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.4 }}
                                className="glass-card p-5 sm:p-6 rounded-xl border border-white/5 relative group hover:border-[#00C8FF]/30 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-2xl font-black text-[#00C8FF]/40 group-hover:text-[#00C8FF] transition-colors">{step.num}</span>
                                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#94A3B8] border border-white/10 flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-[#00C8FF]" /> {step.duration}
                                        </span>
                                    </div>
                                    <div className="w-10 h-10 rounded-lg bg-[#00C8FF]/10 text-[#00C8FF] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">{step.description}</p>
                                </div>
                                <div className="pt-3 border-t border-white/5">
                                    <div className="flex items-start gap-1.5 text-xs text-[#CBD5E1]">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <span><strong className="text-white">Deliverable:</strong> {step.deliverable}</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* What Happens After Deployment & Global Working Model */}
                <div className="mt-8 rounded-xl bg-[#030712]/60 border border-white/5 p-5 text-xs text-[#94A3B8] grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                            <strong className="text-white block mb-0.5">Post-Deployment Warranty Included</strong>
                            <span>Every production deployment includes 30 days of proactive monitoring and bug fixing, plus optional monthly async maintenance retainers.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MessageSquare className="w-5 h-5 text-[#00C8FF] shrink-0 mt-0.5" />
                        <div>
                            <strong className="text-white block mb-0.5">Global Asynchronous Delivery</strong>
                            <span>We serve international clients across the US, UK, Canada, Australia, UAE & APAC via dedicated Slack/Teams channels, async Loom walkthroughs, and weekly video sprint syncs.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DeliveryProcess;
