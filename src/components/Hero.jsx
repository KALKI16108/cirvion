import React from 'react';
import { ArrowRight, Zap, Calculator, Sparkles, Shield, Code, Cpu } from 'lucide-react';
import BlurText from './animations/BlurText';
import ShinyText from './animations/ShinyText';
import Aurora from './animations/Aurora';
import { trackCtaClick, trackBookCallClick } from '../lib/analytics';
import { getCalendarBookingUrl } from '../lib/booking';

const Hero = () => {
    const calendarUrl = getCalendarBookingUrl();
    const primaryCtaLabel = calendarUrl ? "Book a Discovery Call" : "Request a Free AI Automation Audit";

    return (
        <section className="relative flex flex-col justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-[#030712]">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0 bg-grid opacity-20 pointer-events-none"></div>
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
                 <Aurora colorStops={['#00C8FF', '#6366F1', '#00C8FF']} amplitude={1.2} />
            </div>

            {/* Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#00C8FF]/10 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[120px] pointer-events-none opacity-40"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
                <div className="max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#00C8FF]/50 transition-colors cursor-default">
                        <Zap className="w-3.5 h-3.5 text-[#00C8FF] fill-current" />
                        <ShinyText text="Mumbai Engineering HQ • Serving US, UK, Canada, Australia, UAE & India" disabled={false} speed={3} className="text-xs sm:text-sm font-medium tracking-wide" color="#CBD5E1" shineColor="#00C8FF" />
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 md:mb-4 tracking-tight leading-[1.1]">
                        <BlurText 
                           text="Automate Your Workflows."
                           delay={150}
                           animateBy="words"
                           direction="top"
                           className="flex justify-center text-white"
                        />
                        <BlurText 
                           text="Reclaim Hundreds of Hours."
                           delay={150}
                           animateBy="words"
                           direction="bottom"
                           className="flex justify-center text-gradient-primary"
                        />
                        <span className="sr-only">Automate Your Workflows. Reclaim Hundreds of Hours. Practical AI automation, AI agents, WhatsApp workflows, and custom software by AIFlowix.</span>
                    </h1>

                    {/* Supporting Explanation */}
                    <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] max-w-2xl mx-auto mb-6 leading-relaxed font-normal px-2">
                        We engineer custom AI agents, automated workflow pipelines, WhatsApp bots, and CRM integrations for scaling companies across the US, UK, Canada, Australia, UAE, and India.
                    </p>

                    {/* Dominant Primary Action & Distinct Secondary Action */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2 mb-6">
                        <a
                            href={calendarUrl || "#contact"}
                            {...(calendarUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            onClick={() => {
                                if (calendarUrl) {
                                    trackBookCallClick('calendar', 'Hero');
                                } else {
                                    trackCtaClick('Book a Free Discovery Call', 'Hero');
                                }
                            }}
                            className="btn-primary flex items-center gap-2.5 group px-6 sm:px-8 py-3 text-sm sm:text-base w-full sm:w-auto justify-center shadow-lg shadow-[#00C8FF]/20 hover:scale-105 active:scale-95 transition-all"
                        >
                            <span>{primaryCtaLabel}</span>
                            <span className="sr-only">Request Free Audit</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href="#calculator"
                            onClick={() => trackCtaClick('Calculate Automation ROI', 'Hero')}
                            className="btn-secondary flex items-center gap-2 group px-5 py-3 text-xs sm:text-sm w-full sm:w-auto justify-center hover:bg-white/10 transition-colors"
                        >
                            <Calculator className="w-4 h-4 text-[#00C8FF]" />
                            <span>Calculate Automation ROI</span>
                        </a>
                    </div>

                    {/* Quick Secondary Links & Detailed Tool Link */}
                    <div className="flex items-center justify-center gap-4 text-xs text-[#94A3B8] mb-6">
                        <a
                            href="#services"
                            onClick={() => trackCtaClick('Explore Services', 'Hero Quick Link')}
                            className="hover:text-[#00C8FF] transition-colors flex items-center gap-1"
                        >
                            Explore Solutions <ArrowRight className="w-3 h-3" />
                        </a>
                        <span className="text-white/20">•</span>
                        <a
                            href="/roi-calculator"
                            onClick={() => trackCtaClick('Interactive ROI Calculator', 'Hero')}
                            className="text-[#00C8FF] hover:underline flex items-center gap-1 font-medium"
                        >
                            <Sparkles className="w-3 h-3" /> Dedicated ROI Calculator
                        </a>
                    </div>

                    {/* Trust & Proof Indicators */}
                    <div className="py-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#94A3B8] text-xs font-medium border-t border-white/5 max-w-3xl mx-auto">
                        <span className="flex items-center gap-1.5">
                            <span className="text-[#00C8FF] font-bold">Direct Senior Engineering</span> Global Delivery
                        </span>
                        <span className="hidden sm:inline text-white/20">•</span>
                        <span className="flex items-center gap-1.5">
                            <span className="text-emerald-400 font-bold">Fixed-Scope Milestones</span> Clear Timelines
                        </span>
                        <span className="hidden sm:inline text-white/20">•</span>
                        <span className="flex items-center gap-1.5">
                            <span className="text-indigo-400 font-bold">100% Code Ownership</span> Zero Vendor Lock-in
                        </span>
                    </div>

                    {/* Executive Overview Card (Answers What, Problems, Who) */}
                    <div className="mt-6 rounded-xl bg-[#0F172A]/70 border border-white/5 p-4 sm:p-5 text-left grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div className="border-b md:border-b-0 md:border-r border-white/5 pb-3 md:pb-0 md:pr-4">
                            <div className="text-[#00C8FF] font-bold uppercase tracking-wider text-[10px] mb-1 flex items-center gap-1">
                                <Cpu className="w-3 h-3" /> What We Build
                            </div>
                            <p className="text-[#CBD5E1] leading-relaxed">
                                Custom AI agents, WhatsApp bots, automated workflow pipelines, and tailored full-stack software.
                            </p>
                        </div>
                        <div className="border-b md:border-b-0 md:border-r border-white/5 pb-3 md:pb-0 md:pr-4">
                            <div className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] mb-1 flex items-center gap-1">
                                <Code className="w-3 h-3" /> Problems We Eliminate
                            </div>
                            <p className="text-[#CBD5E1] leading-relaxed">
                                Slow lead follow-ups, manual data entry across disconnected CRMs, and repetitive operational backlogs.
                            </p>
                        </div>
                        <div>
                            <div className="text-purple-400 font-bold uppercase tracking-wider text-[10px] mb-1 flex items-center gap-1">
                                <Shield className="w-3 h-3" /> Who We Partner With
                            </div>
                            <p className="text-[#CBD5E1] leading-relaxed">
                                Scaling B2B firms, service operators, real estate, clinics, and founders in US, UK, Canada, UAE & APAC.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
