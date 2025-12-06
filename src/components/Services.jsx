import React from 'react';
import { MessageSquare, Settings, Code2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceGroup = ({ title, icon: Icon, items, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="glass-card p-10 rounded-[2rem] h-full group hover:bg-[#1E293B]/80 relative overflow-hidden"
    >
        {/* Hover Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00C8FF]/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10">
            <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00C8FF]/10 to-[#6366F1]/10 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    <Icon className="text-[#00C8FF] w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
            </div>

            <ul className="space-y-5">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-4 text-[#94A3B8] group/item cursor-default">
                        <div className="w-6 h-6 rounded-full bg-[#1E293B] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover/item:border-[#00C8FF]/50 transition-colors">
                            <CheckCircle2 className="w-3 h-3 text-[#00C8FF] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </div>
                        <span className="group-hover/item:text-white transition-colors text-lg font-medium">{item}</span>
                    </li>
                ))}
            </ul>

            <a href="#contact" className="mt-10 pt-8 border-t border-white/5 flex items-center text-[#00C8FF] font-semibold cursor-pointer group/link">
                <span className="group-hover/link:mr-2 transition-all">Explore Solutions</span>
                <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover/link:opacity-100 transition-opacity" />
            </a>
        </div>
    </motion.div>
);

const Services = () => {
    return (
        <section id="services" className="section bg-[#030712] relative">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1 mb-6 border border-[#6366F1]/30 rounded-full bg-[#6366F1]/10"
                    >
                        <span className="text-[#6366F1] text-sm font-bold tracking-wider uppercase">Our Expertise</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                        Comprehensive <span className="text-gradient-primary">Automation Solutions</span>
                    </h2>
                    <p className="text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
                        From simple task automation to complex enterprise AI agents, we build systems that handle your business operations.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <ServiceGroup
                        title="AI Agents"
                        icon={MessageSquare}
                        items={[
                            "Support Bots",
                            "Sales Follow-up Systems",
                            "Voice Assistants",
                            "Internal HR Agents"
                        ]}
                        delay={0.1}
                    />
                    <ServiceGroup
                        title="Operations Automation"
                        icon={Settings}
                        items={[
                            "Lead Processing",
                            "CRM & ERP Automation",
                            "Auto-Reporting",
                            "Task Scheduling"
                        ]}
                        delay={0.2}
                    />
                    <ServiceGroup
                        title="System Engineering"
                        icon={Code2}
                        items={[
                            "API Integrations",
                            "Dashboarding",
                            "Workflow Mapping",
                            "RPA Automation"
                        ]}
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    );
};

export default Services;
