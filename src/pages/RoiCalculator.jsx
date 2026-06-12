import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Clock } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const RoiCalculator = () => {
    const [hours, setHours] = useState(20);
    const [hourlyRate, setHourlyRate] = useState(25);
    const [employees, setEmployees] = useState(5);

    const weeklySavings = hours * hourlyRate * employees;
    const annualSavings = weeklySavings * 52;

    return (
        <main className="pt-32 pb-16 px-6 max-w-4xl mx-auto min-h-screen">
            <SEOHead 
                title="AI Automation ROI Calculator | AIFlowix"
                description="Calculate how much time and money your business can save by replacing manual workflows with custom AI automation."
                canonical="/roi-calculator"
            />
            
            <div className="text-center mb-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#10B981]/10 border border-[#10B981]/20"
                >
                    <Calculator className="w-4 h-4 text-[#10B981]" />
                    <span className="text-sm font-medium text-[#10B981]">Interactive ROI Calculator</span>
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white"
                >
                    Calculate Your Automation ROI
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-[#94A3B8]"
                >
                    See exactly how much revenue you're losing to manual data entry and inefficient workflows.
                </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-8 rounded-3xl border border-white/5 space-y-8"
                >
                    <div>
                        <label className="flex justify-between text-[#E2E8F0] mb-4">
                            <span>Hours wasted per week, per employee</span>
                            <span className="font-bold text-[#00C8FF]">{hours} hrs</span>
                        </label>
                        <input 
                            type="range" 
                            min="1" 
                            max="40" 
                            value={hours} 
                            onChange={(e) => setHours(Number(e.target.value))}
                            className="w-full accent-[#00C8FF]"
                        />
                    </div>
                    <div>
                        <label className="flex justify-between text-[#E2E8F0] mb-4">
                            <span>Average hourly pay rate</span>
                            <span className="font-bold text-[#00C8FF]">${hourlyRate}</span>
                        </label>
                        <input 
                            type="range" 
                            min="15" 
                            max="100" 
                            step="5"
                            value={hourlyRate} 
                            onChange={(e) => setHourlyRate(Number(e.target.value))}
                            className="w-full accent-[#00C8FF]"
                        />
                    </div>
                    <div>
                        <label className="flex justify-between text-[#E2E8F0] mb-4">
                            <span>Number of employees doing manual tasks</span>
                            <span className="font-bold text-[#00C8FF]">{employees}</span>
                        </label>
                        <input 
                            type="range" 
                            min="1" 
                            max="100" 
                            value={employees} 
                            onChange={(e) => setEmployees(Number(e.target.value))}
                            className="w-full accent-[#00C8FF]"
                        />
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card p-8 rounded-3xl border border-[#00C8FF]/20 bg-[#00C8FF]/5 flex flex-col justify-center items-center text-center"
                >
                    <div className="mb-8">
                        <h3 className="text-[#94A3B8] text-lg mb-2">Estimated Annual Savings</h3>
                        <div className="text-5xl md:text-6xl font-bold text-white flex items-center justify-center gap-2">
                            <DollarSign className="w-10 h-10 text-[#00C8FF]" />
                            {annualSavings.toLocaleString()}
                        </div>
                    </div>
                    
                    <div className="flex gap-8 text-[#94A3B8]">
                        <div className="text-center">
                            <div className="font-bold text-white text-2xl mb-1">${weeklySavings.toLocaleString()}</div>
                            <div className="text-sm">Weekly Savings</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-white text-2xl mb-1">{hours * employees * 52}</div>
                            <div className="text-sm">Hours Saved/Year</div>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            <div className="text-center">
                 <a href="/free-ai-audit" className="inline-flex items-center justify-center gap-2 bg-gradient-primary text-[#0F172A] font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-opacity">
                    Claim Your Free AI Audit <DollarSign className="w-5 h-5" />
                 </a>
            </div>
        </main>
    );
};

export default RoiCalculator;
