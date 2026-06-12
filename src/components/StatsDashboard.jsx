import React from 'react';
import { motion } from 'framer-motion';

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
                        <div className="text-xs text-[#94A3B8] border-t border-white/10 pt-2 w-full mt-2">
                            <span className="block mb-1">⏱️ {stat.time}</span>
                            <span className="block">💰 {stat.revenue}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default StatsDashboard;
