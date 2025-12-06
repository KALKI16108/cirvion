import React from 'react';
import { motion } from 'framer-motion';

const CaseStudyCard = ({ industry, problem, solution, outcomes, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="glass-card rounded-3xl overflow-hidden group"
    >
        <div className="p-10">
            <div className="flex items-center justify-between mb-8">
                <div className="px-4 py-1 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/20 text-[#00C8FF] text-xs font-bold tracking-wider uppercase">
                    {industry}
                </div>
            </div>

            <div className="space-y-8">
                <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Problem
                    </h4>
                    <p className="text-[#94A3B8] text-sm leading-relaxed">{problem}</p>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Solution
                    </h4>
                    <p className="text-[#94A3B8] text-sm leading-relaxed">{solution}</p>
                </div>

                <div className="pt-8 border-t border-white/5">
                    <div className="grid grid-cols-3 gap-4">
                        {outcomes.map((outcome, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C8FF] to-[#6366F1] font-bold text-2xl mb-1">{outcome.value}</div>
                                <div className="text-[#64748B] text-[10px] uppercase tracking-wider font-semibold">{outcome.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

const CaseStudies = () => {
    return (
        <section id="case-studies" className="section bg-[#030712]/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Real Results. Real Efficiency.</h2>
                    <p className="text-lg text-[#94A3B8]">See how we've helped other businesses scale.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <CaseStudyCard
                        industry="Healthcare"
                        problem="Slow appointment follow-ups + manual reminders leading to no-shows."
                        solution="AI receptionist workflows + automated scheduling system."
                        outcomes={[
                            { value: "3x", label: "Faster Response" },
                            { value: "65%", label: "Less Manual Work" },
                            { value: "24/7", label: "Lead Handling" }
                        ]}
                        delay={0.1}
                    />
                    <CaseStudyCard
                        industry="Real Estate"
                        problem="Agents overwhelmed by unqualified leads and repetitive queries."
                        solution="Smart lead qualification bot + CRM auto-entry."
                        outcomes={[
                            { value: "40%", label: "More Conversions" },
                            { value: "10h+", label: "Saved Per Week" },
                            { value: "100%", label: "Lead Capture" }
                        ]}
                        delay={0.2}
                    />
                    <CaseStudyCard
                        industry="Logistics"
                        problem="Manual tracking updates and chaotic driver coordination."
                        solution="Automated dispatch system + real-time SMS notifications."
                        outcomes={[
                            { value: "50%", label: "Faster Dispatch" },
                            { value: "90%", label: "Auto-Updates" },
                            { value: "0", label: "Lost Orders" }
                        ]}
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    );
};

export default CaseStudies;
