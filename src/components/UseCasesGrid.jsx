import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Zap, Target, Wrench } from 'lucide-react';

const UseCasesGrid = ({ useCases }) => {
    if (!useCases || useCases.length === 0) return null;

    return (
        <div className="my-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white">Real-World Business Architecture Examples</h2>
                    <p className="text-xs text-[#94A3B8] mt-1">
                        Illustrative workflow architectures engineered for specific commercial operations.
                    </p>
                </div>
                <span className="text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#00C8FF] w-fit">
                    Architecture Blueprints
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {useCases.map((useCase, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/5 relative overflow-hidden group hover:border-[#00C8FF]/30 transition-all flex flex-col justify-between"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C8FF]/5 rounded-bl-full -z-10 group-hover:bg-[#00C8FF]/10 transition-colors"></div>
                        
                        <div className="space-y-5">
                            <div>
                                <h3 className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                                    <Briefcase className="w-3.5 h-3.5" /> Operational Bottleneck
                                </h3>
                                <p className="text-white text-base font-medium leading-relaxed">{useCase.problem}</p>
                            </div>

                            <div className="pl-3.5 border-l-2 border-[#00C8FF]">
                                <h3 className="flex items-center gap-1.5 text-[#00C8FF] text-xs font-bold uppercase tracking-wider mb-1.5">
                                    <Zap className="w-3.5 h-3.5" /> Engineered Solution
                                </h3>
                                <p className="text-[#CBD5E1] text-xs sm:text-sm leading-relaxed">{useCase.solution}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                                <div className="p-2.5 rounded-lg bg-white/5">
                                    <h4 className="flex items-center gap-1 text-[#94A3B8] text-[11px] font-bold uppercase mb-1">
                                        <Target className="w-3 h-3 text-[#10B981]" /> Expected Outcome
                                    </h4>
                                    <p className="text-[#10B981] font-semibold text-xs leading-relaxed">{useCase.result}</p>
                                </div>
                                <div className="p-2.5 rounded-lg bg-white/5">
                                    <h4 className="flex items-center gap-1 text-[#94A3B8] text-[11px] font-bold uppercase mb-1">
                                        <Wrench className="w-3 h-3 text-purple-400" /> Technology Stack
                                    </h4>
                                    <p className="text-purple-300 text-xs font-mono break-all">{useCase.stack}</p>
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
