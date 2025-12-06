import React from 'react';
import { CheckCircle2, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureItem = ({ text }) => (
    <div className="flex items-center gap-3 mb-4 group">
        <CheckCircle2 className="text-[#00C8FF] w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
        <span className="text-[#CBD5E1] font-medium group-hover:text-white transition-colors">{text}</span>
    </div>
);

const StatItem = ({ value, label }) => (
    <div className="text-center p-8 rounded-2xl bg-[#1E293B]/30 border border-white/5 backdrop-blur-sm hover:bg-[#1E293B]/50 transition-colors">
        <div className="text-4xl md:text-5xl font-bold text-[#00C8FF] mb-2">{value}</div>
        <div className="text-sm text-[#94A3B8] uppercase tracking-wider font-semibold">{label}</div>
    </div>
);

const WhyCirvion = () => {
    return (
        <section className="section relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00C8FF]/5 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Why Businesses Choose <span className="text-gradient-primary">CIRVION</span>
                        </h2>
                        <p className="text-lg text-[#94A3B8] mb-8 leading-relaxed">
                            We don’t just automate tasks. We engineer systems that make your operations faster, smoother, and measurable.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                            <FeatureItem text="Precision workflow analysis" />
                            <FeatureItem text="Custom AI system design" />
                            <FeatureItem text="Enterprise-grade integration" />
                            <FeatureItem text="Automation that scales" />
                            <FeatureItem text="Real-time reporting" />
                            <FeatureItem text="Human + AI synergy" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-[#00C8FF] blur-[100px] opacity-10"></div>

                        {/* Abstract Tech Visual */}
                        <div className="glass-card p-8 rounded-2xl relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-[#00C8FF]/20 flex items-center justify-center">
                                    <Cpu className="text-[#00C8FF]" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-lg">System Architecture</div>
                                    <div className="text-sm text-[#94A3B8]">Optimized for scale</div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {['Data Processing', 'AI Inference', 'Response Generation'].map((label, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-xs text-[#94A3B8] uppercase tracking-wider">
                                            <span>{label}</span>
                                            <span>{90 + i * 3}%</span>
                                        </div>
                                        <div className="h-2 bg-[#334155] rounded-full w-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${90 + i * 3}%` }}
                                                transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                                                className="h-full bg-gradient-to-r from-[#00C8FF] to-[#6366F1]"
                                            ></motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <StatItem value="50–70%" label="Manual Workload Reduction" />
                    <StatItem value="3x" label="Faster Response Speed" />
                    <StatItem value="24/7" label="Automated Operations" />
                </div>
            </div>
        </section>
    );
};

export default WhyCirvion;
