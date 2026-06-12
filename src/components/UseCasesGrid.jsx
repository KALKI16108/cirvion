import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Zap, Target, Wrench } from 'lucide-react';

const UseCasesGrid = ({ useCases }) => {
    if (!useCases || useCases.length === 0) return null;

    return (
        <div className="my-16">
            <h2 className="text-2xl font-bold text-white mb-8">Real-World Business Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {useCases.map((useCase, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 rounded-3xl border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C8FF]/5 rounded-bl-full -z-10 group-hover:bg-[#00C8FF]/10 transition-colors"></div>
                        
                        <div className="space-y-6">
                            <div>
                                <h3 className="flex items-center gap-2 text-[#94A3B8] text-sm font-bold uppercase tracking-wider mb-2">
                                    <Briefcase className="w-4 h-4 text-red-400" /> The Problem
                                </h3>
                                <p className="text-white text-lg">{useCase.problem}</p>
                            </div>

                            <div className="pl-4 border-l-2 border-[#00C8FF]">
                                <h3 className="flex items-center gap-2 text-[#00C8FF] text-sm font-bold uppercase tracking-wider mb-2">
                                    <Zap className="w-4 h-4" /> AI Solution
                                </h3>
                                <p className="text-[#E2E8F0]">{useCase.solution}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                <div>
                                    <h3 className="flex items-center gap-1 text-[#94A3B8] text-xs font-bold uppercase mb-1">
                                        <Target className="w-3 h-3 text-[#10B981]" /> Expected Result
                                    </h3>
                                    <p className="text-[#10B981] font-semibold text-sm">{useCase.result}</p>
                                </div>
                                <div>
                                    <h3 className="flex items-center gap-1 text-[#94A3B8] text-xs font-bold uppercase mb-1">
                                        <Wrench className="w-3 h-3 text-purple-400" /> Stack
                                    </h3>
                                    <p className="text-purple-300 text-sm font-mono">{useCase.stack}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default UseCasesGrid;
