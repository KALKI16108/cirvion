import React from 'react';
import { Bot, Zap, BarChart3, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="glass-card p-8 rounded-2xl group relative overflow-hidden"
    >
        {/* Hover Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00C8FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10">
            <div className="w-14 h-14 rounded-xl bg-[#00C8FF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-[#00C8FF]/20">
                <Icon className="w-7 h-7 text-[#00C8FF]" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#00C8FF] transition-colors">{title}</h3>
            <p className="text-[#94A3B8] leading-relaxed mb-6">{description}</p>

            <div className="flex items-center gap-2 text-sm font-semibold text-[#00C8FF] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Learn more <ArrowRight className="w-4 h-4" />
            </div>
        </div>
    </motion.div>
);

const WhatWeDo = () => {
    return (
        <section className="section relative">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        AI & Automation That <br />
                        <span className="text-gradient-primary">Actually Delivers Results</span>
                    </h2>
                    <p className="text-lg text-[#94A3B8]">
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
