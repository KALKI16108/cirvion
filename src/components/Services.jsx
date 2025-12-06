import React from 'react';
import { MessageSquare, Settings, Code2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceGroup = ({ title, icon: Icon, items, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="glass-card p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl md:rounded-[2rem] h-full group hover:bg-[#1E293B]/80 relative overflow-hidden"
    >
        {/* Hover Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00C8FF]/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8 md:mb-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-[#00C8FF]/10 to-[#6366F1]/10 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    <Icon className="text-[#00C8FF] w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h3>
            </div>

            <ul className="space-y-3 sm:space-y-4 md:space-y-5">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 sm:gap-3 md:gap-4 text-[#94A3B8] group/item cursor-default">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1E293B] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover/item:border-[#00C8FF]/50 transition-colors">
                            <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#00C8FF] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </div>
                        <span className="group-hover/item:text-white transition-colors text-sm sm:text-base md:text-lg font-medium">{item}</span>
                    </li>
                ))}
            </ul>

            <a href="#contact" className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 md:pt-8 border-t border-white/5 flex items-center text-[#00C8FF] font-semibold cursor-pointer group/link text-sm sm:text-base">
                <span className="group-hover/link:mr-2 transition-all">Explore Solutions</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 opacity-0 group-hover/link:opacity-100 transition-opacity" />
            </a>
        </div>
    </motion.div>
);

const Services = () => {
    return (
        <section id="services" className="section bg-[#030712] relative">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-12 sm:mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 sm:px-4 py-1 mb-4 sm:mb-5 md:mb-6 border border-[#6366F1]/30 rounded-full bg-[#6366F1]/10"
                    >
                        <span className="text-[#6366F1] text-xs sm:text-sm font-bold tracking-wider uppercase">Our Expertise</span>
                    </motion.div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 text-white">
                        Comprehensive <span className="text-gradient-primary">Automation Solutions</span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed px-2">
                        From simple task automation to complex enterprise AI agents, we build systems that handle your business operations.
                    </p>
                    {/* Screen-reader-only: short service summary for SEO */}
                    <p className="sr-only">Services: AI agents, process automation, system engineering and integrations tailored to business workflows.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
