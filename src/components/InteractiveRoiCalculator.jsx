import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Users, Clock, DollarSign, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackToolEngagement, trackCtaClick } from '../lib/analytics';

const InteractiveRoiCalculator = () => {
    const [teamSize, setTeamSize] = useState(10);
    const [hoursPerWeek, setHoursPerWeek] = useState(12);
    const [hourlyRate, setHourlyRate] = useState(35);

    // Dynamic Calculation: 65% automation benchmark on repetitive tasks
    const automationRate = 0.65;
    const weeklyHoursSaved = Math.round(teamSize * hoursPerWeek * automationRate);
    const annualHoursSaved = weeklyHoursSaved * 52;
    const annualSavings = Math.round(annualHoursSaved * hourlyRate);

    const handleTeamChange = (val) => {
        setTeamSize(val);
        trackToolEngagement('Homepage Interactive Calculator', 'change_team_size', { value: val });
    };

    const handleHoursChange = (val) => {
        setHoursPerWeek(val);
        trackToolEngagement('Homepage Interactive Calculator', 'change_hours', { value: val });
    };

    const handleRateChange = (val) => {
        setHourlyRate(val);
        trackToolEngagement('Homepage Interactive Calculator', 'change_rate', { value: val });
    };

    return (
        <section id="calculator" className="section bg-[#0F172A] relative overflow-hidden py-12 sm:py-16 border-t border-white/5">
            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00C8FF]/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6366F1]/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
                <div className="text-center mb-10 sm:mb-12">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-3 rounded-full bg-white/5 border border-white/10">
                        <Calculator className="w-3.5 h-3.5 text-[#00C8FF]" />
                        <span className="text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider">Interactive ROI Estimator</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">
                        Estimate Your Team's <span className="text-gradient-primary">Automation Savings</span>
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
                        Calculate how much administrative time and operating cost your business can recover by automating repetitive manual workflows.
                    </p>
                </div>

                <div className="rounded-2xl bg-[#030712]/90 border border-white/10 p-5 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden group hover:border-[#00C8FF]/30 transition-all">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                        {/* Sliders Column */}
                        <div className="lg:col-span-7 space-y-5">
                            <div>
                                <div className="flex justify-between items-center gap-4 text-xs sm:text-sm font-medium text-[#CBD5E1] mb-2">
                                    <label htmlFor="hp-team-size" className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                                        <Users className="w-4 h-4 text-[#00C8FF] shrink-0" />
                                        <span>Team Members on Repetitive Tasks:</span>
                                    </label>
                                    <span className="text-white font-bold text-sm sm:text-base shrink-0 whitespace-nowrap bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
                                        {teamSize} employees
                                    </span>
                                </div>
                                <input
                                    id="hp-team-size"
                                    type="range"
                                    min="2"
                                    max="100"
                                    value={teamSize}
                                    onChange={(e) => handleTeamChange(parseInt(e.target.value))}
                                    aria-label="Team Size"
                                    className="w-full accent-[#00C8FF] bg-[#1E293B] h-2 rounded-lg cursor-pointer"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center gap-4 text-xs sm:text-sm font-medium text-[#CBD5E1] mb-2">
                                    <label htmlFor="hp-manual-hours" className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                                        <Clock className="w-4 h-4 text-[#6366F1] shrink-0" />
                                        <span>Manual Hours Spent per Person / Week:</span>
                                    </label>
                                    <span className="text-white font-bold text-sm sm:text-base shrink-0 whitespace-nowrap bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
                                        {hoursPerWeek} hrs/week
                                    </span>
                                </div>
                                <input
                                    id="hp-manual-hours"
                                    type="range"
                                    min="5"
                                    max="30"
                                    value={hoursPerWeek}
                                    onChange={(e) => handleHoursChange(parseInt(e.target.value))}
                                    aria-label="Manual Hours Per Person Per Week"
                                    className="w-full accent-[#6366F1] bg-[#1E293B] h-2 rounded-lg cursor-pointer"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center gap-4 text-xs sm:text-sm font-medium text-[#CBD5E1] mb-2">
                                    <label htmlFor="hp-hourly-rate" className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                                        <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                                        <span>Estimated Blended Hourly Rate (USD):</span>
                                    </label>
                                    <span className="text-white font-bold text-sm sm:text-base shrink-0 whitespace-nowrap bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
                                        ${hourlyRate}/hr
                                    </span>
                                </div>
                                <input
                                    id="hp-hourly-rate"
                                    type="range"
                                    min="15"
                                    max="100"
                                    step="5"
                                    value={hourlyRate}
                                    onChange={(e) => handleRateChange(parseInt(e.target.value))}
                                    aria-label="Estimated Blended Hourly Rate in USD"
                                    className="w-full accent-emerald-400 bg-[#1E293B] h-2 rounded-lg cursor-pointer"
                                />
                            </div>

                            <p className="text-[11px] text-[#64748B] leading-relaxed pt-1">
                                * Illustrative estimate assuming an average 65% automation benchmark for repetitive data entry, CRM logging, and inquiry triage. Exact savings depend on workflow complexity.
                            </p>
                        </div>

                        {/* Calculation Output Box */}
                        <div className="lg:col-span-5 bg-[#0F172A] border border-white/10 rounded-xl p-5 sm:p-6 text-center flex flex-col justify-center">
                            <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">
                                Estimated Annual Value Recovered
                            </span>
                            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00C8FF] via-emerald-400 to-[#10B981] my-2">
                                ${annualSavings.toLocaleString()}
                            </div>
                            <div className="grid grid-cols-2 gap-2 my-3 pt-3 border-t border-white/10 text-left">
                                <div className="p-2 rounded bg-white/5">
                                    <span className="text-[10px] text-[#94A3B8] uppercase block">Hours Recovered</span>
                                    <strong className="text-white text-sm font-bold">~{annualHoursSaved.toLocaleString()} hrs/yr</strong>
                                </div>
                                <div className="p-2 rounded bg-white/5">
                                    <span className="text-[10px] text-[#94A3B8] uppercase block">Weekly Time Saved</span>
                                    <strong className="text-white text-sm font-bold">~{weeklyHoursSaved} hrs/wk</strong>
                                </div>
                            </div>

                            <a
                                href="#contact"
                                onClick={() => trackCtaClick('Claim These Savings with a Free Audit', 'Interactive Calculator Section')}
                                className="w-full py-3 px-4 bg-gradient-to-r from-[#00C8FF] to-[#3B82F6] hover:opacity-95 text-white text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00C8FF]/20"
                            >
                                <Sparkles className="w-4 h-4" />
                                Claim These Savings with a Free Audit
                            </a>

                            <div className="mt-3 text-center">
                                <a
                                    href="/roi-calculator"
                                    onClick={() => trackCtaClick('Full Multi-Variable ROI Breakdown', 'Interactive Calculator Section')}
                                    className="text-xs font-semibold text-[#00C8FF] hover:underline inline-flex items-center gap-1"
                                >
                                    Open Full Multi-Variable ROI Calculator <ArrowRight className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveRoiCalculator;
