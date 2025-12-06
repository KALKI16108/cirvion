import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const CTA = () => {
    return (
        <section className="section relative overflow-hidden py-40">
            {/* Background Gradient & Particles */}
            <div className="absolute inset-0 bg-[#030712]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00C8FF]/10 to-[#6366F1]/10 opacity-30 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto bg-[#1E293B]/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 md:p-24 relative overflow-hidden group hover:border-[#00C8FF]/30 transition-colors duration-500"
                >
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-[#00C8FF]/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 group-hover:bg-[#00C8FF]/20 transition-colors duration-500"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6366F1]/10 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2 group-hover:bg-[#6366F1]/20 transition-colors duration-500"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                            <Sparkles className="w-4 h-4 text-[#00C8FF]" />
                            <span className="text-[#CBD5E1] text-sm font-medium">Limited Availability for New Clients</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                            Ready to Automate <br />
                            <span className="text-gradient-primary">Your Business?</span>
                        </h2>

                        <p className="text-xl text-[#94A3B8] mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                            Book a free workflow audit today. We'll analyze your operations, identify bottlenecks,
                            and show you exactly how much time and money you can save.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary text-lg px-12 py-5 shadow-2xl shadow-blue-500/20 flex items-center gap-3"
                            >
                                Get Started Now
                                <ArrowRight className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
