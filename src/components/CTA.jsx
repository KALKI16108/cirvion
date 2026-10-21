import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackContactCtaClick } from '../lib/analytics';

const CTA = () => {
    return (
        <section className="section relative overflow-hidden py-6 sm:py-8">
            {/* Background Gradient & Particles */}
            <div className="absolute inset-0 bg-[#030712]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00C8FF]/10 to-[#6366F1]/10 opacity-30 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-5xl mx-auto bg-[#1E293B]/40 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 relative overflow-hidden group hover:border-[#00C8FF]/30 transition-colors duration-500"
                >
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-[#00C8FF]/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 group-hover:bg-[#00C8FF]/20 transition-colors duration-500"></div>
                    <div className="absolute bottom-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-[#6366F1]/10 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2 group-hover:bg-[#6366F1]/20 transition-colors duration-500"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3 backdrop-blur-md">
                            <Sparkles className="w-3 h-3 text-[#00C8FF]" />
                            <span className="text-[#CBD5E1] text-xs font-medium">Direct Engineering Consultation • Global Delivery</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight leading-tight">
                            Ready to Automate <span className="text-gradient-primary">Your Business Operations?</span>
                        </h2>

                        <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] mb-5 max-w-xl mx-auto font-light leading-relaxed px-2">
                            Request a free workflow automation audit to map your operational bottlenecks and get a clear technical roadmap.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                            <motion.a
                                href="#contact"
                                onClick={() => trackContactCtaClick('Free AI Audit CTA', 'Bottom Banner')}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-[#00C8FF] text-[#0F172A] font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg shadow-[#00C8FF]/20 flex items-center gap-2 w-full sm:w-auto justify-center hover:bg-white transition-colors"
                            >
                                Request Free Audit
                                <Sparkles className="w-3.5 h-3.5" />
                            </motion.a>
                            <motion.a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    trackContactCtaClick('Book Consultation CTA', 'Bottom Banner');
                                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                                }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-transparent text-white border border-white/20 font-bold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-2 w-full sm:w-auto justify-center hover:bg-white/10 transition-colors"
                            >
                                Book Consultation
                                <ArrowRight className="w-3.5 h-3.5" />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
