import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';

const steps = [
    {
        num: "01",
        title: "Audit Operations",
        duration: "3–5 Days",
        icon: Search,
        description: "We analyze your existing workflows, shadow your team's repetitive manual tasks, and pinpoint operational bottlenecks.",
        deliverable: "Detailed workflow assessment & ROI map."
    },
    {
        num: "02",
        title: "Identify Inefficiencies & Discuss Solutions",
        duration: "1 Week",
        icon: Compass,
        description: "We analyze friction points, review root causes with your team, and present a fixed-scope technical blueprint and architecture.",
        deliverable: "Transparent roadmap & system architecture."
    },
    {
        num: "03",
        title: "Implement Agreed Solution",
        duration: "2–4 Weeks",
        icon: Rocket,
        description: "We engineer, integrate, stress-test, and deploy production-grade AI pipelines and custom software with full handover.",
        deliverable: "Production deployment + 100% code ownership."
    }
];

const DeliveryProcess = () => {
    return (
        <section id="process" className="section bg-[#0F172A] relative overflow-hidden py-12 sm:py-16">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C8FF]/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6366F1]/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
                <div className="text-center mb-10 sm:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 sm:px-4 py-1 mb-3 border border-[#00C8FF]/30 rounded-full bg-[#00C8FF]/10"
                    >
                        <span className="text-[#00C8FF] text-xs sm:text-sm font-bold tracking-wider uppercase">How We Work</span>
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white">
                        Three Steps to <span className="text-gradient-primary">Automating Your Workflows</span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
                        A clear, milestone-driven process with direct engineer access, zero hidden fees, and complete code ownership.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="glass-card p-6 rounded-2xl border border-white/5 relative group hover:border-[#00C8FF]/30 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-black text-[#00C8FF]/40 group-hover:text-[#00C8FF] transition-colors">{step.num}</span>
                                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-white/5 text-[#94A3B8] border border-white/10">
                                            {step.duration}
                                        </span>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-[#00C8FF]/10 text-[#00C8FF] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-4">{step.description}</p>
                                </div>
                                <div className="pt-3 border-t border-white/5">
                                    <div className="flex items-start gap-1.5 text-xs text-[#CBD5E1]">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                        <span><strong className="text-white">Output:</strong> {step.deliverable}</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Practical engagement standards */}
                <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl bg-[#030712]/60 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                    <div>
                        <h3 className="text-white font-bold text-base mb-1">What You Can Expect As An International Client</h3>
                        <p className="text-xs sm:text-sm text-[#94A3B8]">
                            Direct collaboration over dedicated Slack/Teams, asynchronous video walkthroughs, and timezone overlap covering US, UK, Europe, UAE, and APAC.
                        </p>
                    </div>
                    <a
                        href="#contact"
                        className="btn-primary text-xs sm:text-sm px-6 py-3 whitespace-nowrap shrink-0 flex items-center gap-2"
                    >
                        Start With a Free Audit <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default DeliveryProcess;
