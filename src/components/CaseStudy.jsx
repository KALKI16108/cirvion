import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const CaseStudy = ({ caseStudy }) => {
    if (!caseStudy) return null;

    return (
        <div className="my-16">
            <h2 className="text-2xl font-bold text-white mb-8">Implementation Case Study</h2>
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
            >
                {/* Before */}
                <div className="bg-[#1E293B]/80 border border-white/10 rounded-t-2xl p-6 md:p-8">
                    <div className="text-xs font-bold tracking-wider text-red-400 uppercase mb-2">Before</div>
                    <p className="text-white text-lg">{caseStudy.before}</p>
                </div>
                
                {/* Arrow */}
                <div className="flex justify-center -my-4 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-[#0F172A] border border-white/10 flex items-center justify-center">
                        <ArrowDown className="w-5 h-5 text-[#94A3B8]" />
                    </div>
                </div>

                {/* Implementation */}
                <div className="bg-gradient-to-b from-[#1E293B]/80 to-[#1E293B]/40 border-x border-white/10 p-6 md:p-8">
                    <div className="text-xs font-bold tracking-wider text-[#00C8FF] uppercase mb-2">Implementation</div>
                    <p className="text-[#E2E8F0]">{caseStudy.implementation}</p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-4 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-[#0F172A] border border-white/10 flex items-center justify-center">
                        <ArrowDown className="w-5 h-5 text-[#94A3B8]" />
                    </div>
                </div>

                {/* After */}
                <div className="bg-[#00C8FF]/10 border border-[#00C8FF]/30 rounded-b-2xl p-6 md:p-8">
                    <div className="text-xs font-bold tracking-wider text-[#10B981] uppercase mb-2">After</div>
                    <p className="text-white text-lg font-medium">{caseStudy.after}</p>
                </div>
            </motion.div>
        </div>
    );
};

export default CaseStudy;
