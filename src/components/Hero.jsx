import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Zap, Activity, Calculator, TrendingUp, Sparkles, DollarSign, Users, Clock } from 'lucide-react';
import VideoModal from './VideoModal';
import BlurText from './animations/BlurText';
import ShinyText from './animations/ShinyText';
import Aurora from './animations/Aurora';
import { trackCtaClick, trackToolEngagement } from '../lib/analytics';

const Hero = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [teamSize, setTeamSize] = useState(10);
    const [hoursPerWeek, setHoursPerWeek] = useState(12);

    // Instant ROI Calculation for Interactive Hero Widget
    const hourlyCost = 35; // average hourly cost $35/hr
    const weeklyHoursSaved = Math.round(teamSize * hoursPerWeek * 0.7); // 70% automated
    const annualSavings = Math.round(weeklyHoursSaved * 52 * hourlyCost);

    const handleSliderChange = (type, val) => {
        if (type === 'team') {
            setTeamSize(val);
            trackToolEngagement('Hero Quick Calculator', 'change_team_size', { value: val });
        } else {
            setHoursPerWeek(val);
            trackToolEngagement('Hero Quick Calculator', 'change_hours', { value: val });
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col justify-center pt-32 sm:pt-40 pb-16 overflow-hidden bg-[#030712]">
            <VideoModal
                isOpen={isVideoOpen}
                onClose={() => setIsVideoOpen(false)}
                videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            />

            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0 bg-grid opacity-20"></div>
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
                 <Aurora colorStops={['#00C8FF', '#6366F1', '#00C8FF']} amplitude={1.2} />
            </div>

            {/* Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#00C8FF]/10 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[120px] pointer-events-none opacity-40"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="max-w-5xl mx-auto">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#00C8FF]/50 transition-colors cursor-default"
                    >
                        <Zap className="w-4 h-4 text-[#00C8FF] fill-current" />
                        <ShinyText text="India-Based Engineering • Global AI & Automation Partner" disabled={false} speed={3} className="text-sm font-medium tracking-wide" color="#CBD5E1" shineColor="#00C8FF" />
                    </motion.div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight leading-[1.1]">
                        <BlurText 
                           text="Automate Your Business."
                           delay={150}
                           animateBy="words"
                           direction="top"
                           className="flex justify-center text-white"
                        />
                        <BlurText 
                           text="Spend Less Time on Repetitive Work."
                           delay={150}
                           animateBy="words"
                           direction="bottom"
                           className="flex justify-center text-gradient-primary"
                        />
                        <span className="sr-only">Automate Your Business. Spend Less Time on Repetitive Work. Custom AI software, workflow automation, and web applications by AIFlowix.</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#94A3B8] max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed font-light px-4">
                        AI automation, customer support workflows, lead follow-ups, and custom software built around your business operations.
                        Based in India, delivering reliable, production-grade systems for clients across the US, UK, Canada, Australia, UAE, and worldwide.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4 mb-10">
                        <motion.a
                            href="#contact"
                            onClick={() => trackCtaClick('Book a Free Discovery Call', 'Hero')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary flex items-center gap-3 group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto justify-center"
                        >
                            Book a Free Discovery Call
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.a>

                        <motion.a
                            href="#services"
                            onClick={() => trackCtaClick('Explore Our Solutions', 'Hero')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-secondary flex items-center gap-3 group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto justify-center"
                        >
                            Explore Our Solutions
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                    </div>

                    {/* Trust & Proof Indicators */}
                    <div className="pt-2 pb-6 flex flex-wrap items-center justify-center gap-6 text-[#94A3B8] text-xs sm:text-sm font-medium border-t border-white/5 max-w-3xl mx-auto">
                        <span className="flex items-center gap-2">
                            <span className="text-[#00C8FF] font-bold">India-Based</span> Direct Engineering Team
                        </span>
                        <span className="hidden sm:inline text-white/20">•</span>
                        <span className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold">Fixed Scope</span> Clear Milestones & Deliverables
                        </span>
                        <span className="hidden sm:inline text-white/20">•</span>
                        <span className="flex items-center gap-2">
                            <span className="text-indigo-400 font-bold">Zero Lock-In</span> You Own 100% of the Code
                        </span>
                    </div>
                </div>

                {/* Interactive Hero Widget: Instant AI ROI Estimator */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-6 sm:mt-10 relative mx-auto max-w-4xl text-left"
                >
                    <div className="relative rounded-2xl bg-[#0F172A]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden group hover:border-[#00C8FF]/30 transition-all">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#00C8FF]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-white/10 pb-4">
                            <div>
                                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00C8FF] uppercase tracking-wider mb-1">
                                    <Sparkles className="w-3.5 h-3.5" /> Instant AI Savings Calculator
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-white">How much can AI automation save your business?</h2>
                            </div>
                            <a
                                href="/roi-calculator"
                                onClick={() => trackCtaClick('Full ROI Breakdown', 'Hero Calculator Widget')}
                                className="text-xs font-semibold text-[#00C8FF] hover:underline flex items-center gap-1 shrink-0"
                            >
                                Full ROI Breakdown <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                            {/* Controls Column */}
                            <div className="md:col-span-7 space-y-5">
                                <div>
                                    <div className="flex justify-between items-center text-sm font-medium text-[#CBD5E1] mb-2">
                                        <label htmlFor="hero-team-size" className="flex items-center gap-2 cursor-pointer">
                                            <Users className="w-4 h-4 text-[#00C8FF]" /> Team Size:
                                        </label>
                                        <span className="text-white font-bold text-base">{teamSize} employees</span>
                                    </div>
                                    <input
                                        id="hero-team-size"
                                        type="range"
                                        min="2"
                                        max="100"
                                        value={teamSize}
                                        onChange={(e) => handleSliderChange('team', parseInt(e.target.value))}
                                        aria-label="Team Size"
                                        className="w-full accent-[#00C8FF] bg-[#1E293B] h-2 rounded-lg cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center text-sm font-medium text-[#CBD5E1] mb-2">
                                        <label htmlFor="hero-manual-hours" className="flex items-center gap-2 cursor-pointer">
                                            <Clock className="w-4 h-4 text-[#6366F1]" /> Manual Hours / Person / Week:
                                        </label>
                                        <span className="text-white font-bold text-base">{hoursPerWeek} hrs/week</span>
                                    </div>
                                    <input
                                        id="hero-manual-hours"
                                        type="range"
                                        min="5"
                                        max="30"
                                        value={hoursPerWeek}
                                        onChange={(e) => handleSliderChange('hours', parseInt(e.target.value))}
                                        aria-label="Manual Hours Per Person Per Week"
                                        className="w-full accent-[#6366F1] bg-[#1E293B] h-2 rounded-lg cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Result Display Box */}
                            <div className="md:col-span-5 bg-[#030712]/80 border border-white/10 rounded-xl p-5 text-center flex flex-col justify-center">
                                <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">
                                    Estimated Annual AI Savings
                                </span>
                                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00C8FF] to-[#10B981] my-1">
                                    ${annualSavings.toLocaleString()}
                                </div>
                                <p className="text-xs text-[#94A3B8] mt-1">
                                    ~<strong className="text-white">{(weeklyHoursSaved * 52).toLocaleString()} hours</strong> freed up per year
                                </p>
                                <a
                                    href="#contact"
                                    onClick={() => trackCtaClick('Claim These Savings', 'Hero Calculator Widget')}
                                    className="mt-4 py-2.5 px-4 bg-gradient-to-r from-[#00C8FF] to-[#3B82F6] hover:opacity-90 text-white text-xs font-bold rounded-lg transition-all text-center flex items-center justify-center gap-1.5 shadow-lg shadow-[#00C8FF]/20"
                                >
                                    Claim These Savings Now <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
