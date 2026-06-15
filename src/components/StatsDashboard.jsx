import React from 'react';
import { motion } from 'framer-motion';
import { Timer, IndianRupee } from 'lucide-react';

const StatsDashboard = ({ statistics }) => {
    if (!statistics || statistics.length === 0) return null;

    return (
        <div className="my-16">
            <h2 className="text-2xl font-bold text-white mb-8">Measurable Business Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statistics.map((stat, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-6 hover:border-[#00C8FF]/30 transition-colors flex flex-col justify-center items-center text-center"
                    >
                        <div className="text-4xl font-bold text-gradient-primary mb-2">{stat.metric}</div>
                        <div className="text-sm font-bold text-white mb-2">{stat.impact}</div>
                        <div className="text-xs text-[#94A3B8] border-t border-white/10 pt-3 w-full mt-3 flex flex-col items-center gap-1.5">
                            <span className="flex items-center justify-center gap-1.5"><Timer className="w-3.5 h-3.5 text-[#00C8FF]" /> {stat.time}</span>
                            <span className="flex items-center justify-center gap-1.5"><IndianRupee className="w-3.5 h-3.5 text-[#10B981]" /> {stat.revenue}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default StatsDashboard;
