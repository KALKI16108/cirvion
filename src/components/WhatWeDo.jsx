import React from 'react';
import { Bot, Zap, BarChart3, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="glass-card p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl group relative overflow-hidden"
    >
        {/* Hover Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00C8FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-[#00C8FF]/10 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300 border border-[#00C8FF]/20">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#00C8FF]" />
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4 group-hover:text-[#00C8FF] transition-colors">{title}</h3>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-4 sm:mb-5 md:mb-6">{description}</p>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#00C8FF] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Learn more <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
        </div>
    </motion.div>
);

const WhatWeDo = () => {
    return (
        <section className="section relative">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-20">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6">
                        AI & Automation That <br className="hidden sm:block" />
                        <span className="text-gradient-primary">Actually Delivers Results</span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] px-2">
                        We transform slow, manual operations into intelligent, automated workflows. Our systems integrate seamlessly into your business.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <ServiceCard
                        icon={Bot}
                        title="AI Agents & Smart Assistants"
                        description="Create automated support, sales, and operations agents that run 24/7 and deliver instant responses."
                        delay={0.1}
                    />
                    <ServiceCard
                        icon={Zap}
                        title="Business Process Automation"
                        description="Remove repetitive tasks, reduce manual work, and streamline operations with custom AI workflows."
                        delay={0.2}
                    />
                    <ServiceCard
                        icon={BarChart3}
                        title="Workflow Intelligence"
                        description="Analyze workflows, detect bottlenecks, and build scalable automation systems that drive consistent growth."
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    );
};

export default WhatWeDo;
