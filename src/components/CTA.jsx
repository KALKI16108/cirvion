import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Clock, ShieldCheck, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackContactCtaClick, trackBookCallClick } from '../lib/analytics';
import { getCalendarBookingUrl } from '../lib/booking';

const CTA = () => {
    const calendarUrl = getCalendarBookingUrl();
    const primaryLabel = calendarUrl ? "Book a Discovery Call" : "Request a Free AI Automation Audit";

    return (
        <section id="audit" className="section relative overflow-hidden py-12 sm:py-16 bg-[#030712] border-t border-white/5">
            {/* Background Glows */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00C8FF]/10 via-transparent to-[#6366F1]/10 opacity-30 blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#0F172A]/90 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden group hover:border-[#00C8FF]/30 transition-all duration-500"
                >
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
                            <Sparkles className="w-3.5 h-3.5 text-[#00C8FF]" />
                            <span className="text-[#CBD5E1] text-xs font-semibold uppercase tracking-wider">Start Here • Direct Engineering Review</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight leading-tight">
                            Ready to Eliminate Your Company's <span className="text-gradient-primary">Operational Bottlenecks?</span>
                        </h2>

                        <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] mb-8 max-w-2xl mx-auto font-normal leading-relaxed px-2">
                            Request a complimentary operational audit. We analyze your workflows, identify manual bottlenecks, and provide a fixed-scope technical roadmap.
                        </p>

                        {/* What Happens After You Enquire (3 Concrete Steps) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-8 max-w-3xl mx-auto">
                            <div className="p-4 rounded-xl bg-[#030712]/70 border border-white/5">
                                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                                    <Clock className="w-4 h-4 text-[#00C8FF]" />
                                    <span>1. 24-Hour Review</span>
                                </div>
                                <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                                    Our senior engineers evaluate your submitted workflow details and existing software stack.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-[#030712]/70 border border-white/5">
                                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                                    <FileText className="w-4 h-4 text-emerald-400" />
                                    <span>2. Discovery Session</span>
                                </div>
                                <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                                    A focused 30-minute technical review (or async Loom) to discuss feasibility and data flows.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-[#030712]/70 border border-white/5">
                                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                                    <span>3. Fixed-Scope Plan</span>
                                </div>
                                <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                                    You receive a written technical blueprint with clear milestones, deliverables, and fixed pricing.
                                </p>
                            </div>
                        </div>

                        {/* Primary Dominant Action & Distinct Secondary Action */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
                            {calendarUrl ? (
                                <motion.a
                                    href={calendarUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackBookCallClick('calendar', 'Bottom Banner')}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-[#00C8FF] text-[#0F172A] font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg shadow-[#00C8FF]/20 flex items-center gap-2 w-full sm:w-auto justify-center hover:bg-white transition-colors"
                                >
                                    <span>Book a Discovery Call</span>
                                    <Sparkles className="w-4 h-4" />
                                </motion.a>
                            ) : (
                                <motion.a
                                    href="#contact"
                                    onClick={() => trackContactCtaClick('Free AI Audit CTA', 'Bottom Banner')}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-[#00C8FF] text-[#0F172A] font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg shadow-[#00C8FF]/20 flex items-center gap-2 w-full sm:w-auto justify-center hover:bg-white transition-colors"
                                >
                                    <span>Request a Free AI Automation Audit</span>
                                    <span className="sr-only">Request Free Audit</span>
                                    <Sparkles className="w-4 h-4" />
                                </motion.a>
                            )}

                            <motion.a
                                href="/roi-calculator"
                                onClick={() => trackContactCtaClick('Calculate Automation ROI', 'Bottom Banner')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-transparent text-white border border-white/20 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full flex items-center gap-2 w-full sm:w-auto justify-center hover:bg-white/10 transition-colors"
                            >
                                <span>Calculate Automation ROI</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </motion.a>
                        </div>

                        {/* Reassurance text */}
                        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#94A3B8]">
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Zero sales pressure</span>
                            </span>
                            <span className="text-white/20">•</span>
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Mutual NDA protection</span>
                            </span>
                            <span className="text-white/20">•</span>
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Direct engineer evaluation</span>
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
