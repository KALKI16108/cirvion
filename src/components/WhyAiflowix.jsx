import React from 'react';
import { CheckCircle2, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureItem = ({ text }) => (
    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 group">
        <CheckCircle2 className="text-[#00C8FF] w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
        <span className="text-sm sm:text-base text-[#CBD5E1] font-medium group-hover:text-white transition-colors">{text}</span>
    </div>
);

const StatItem = ({ value, label }) => (
    <div className="text-center p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-[#1E293B]/30 border border-white/5 backdrop-blur-sm hover:bg-[#1E293B]/50 transition-colors">
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#00C8FF] mb-1 sm:mb-2">{value}</div>
        <div className="text-[10px] sm:text-xs md:text-sm text-[#94A3B8] uppercase tracking-wider font-semibold">{label}</div>
    </div>
);

const WhyAiflowix = () => {
    return (
        <section className="section relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00C8FF]/5 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6">
                            Why Businesses Choose <span className="text-gradient-primary">AIFLOWIX</span>
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                            We don't just automate tasks. We engineer systems that make your operations faster, smoother, and measurable.
                        </p>
                        {/* Screen-reader-only: concise 'why' statement for SEO/accessibility */}
                        <p className="sr-only">Why AIFLOWIX: precise workflow analysis, enterprise-grade integrations, and measurable automation outcomes.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2 sm:gap-y-3 md:gap-y-4">
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    <StatItem value="50–70%" label="Manual Workload Reduction" />
                    <StatItem value="3x" label="Faster Response Speed" />
                    <StatItem value="24/7" label="Automated Operations" />
                </div>
            </div>
        </section>
    );
};

export default WhyAiflowix;
