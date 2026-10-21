import React from 'react';
import { MessageSquare, Settings, Code2, ArrowRight, Smartphone, Database, Globe, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const coreServicesList = [
    {
        title: "AI Agents & Customer Support",
        slug: "/ai-agent-development",
        icon: MessageSquare,
        desc: "Autonomous AI agents for 24/7 customer support, lead triage, and internal knowledge bases.",
        badge: "AI Agents"
    },
    {
        title: "Workflow Automation",
        slug: "/workflow-automation-services",
        icon: Settings,
        desc: "End-to-end automated process pipelines connecting CRMs, webhooks, and databases.",
        badge: "Process Sync"
    },
    {
        title: "WhatsApp & Voice AI",
        slug: "/whatsapp-automation",
        icon: Smartphone,
        desc: "Official WhatsApp Business API & Voice AI receptionists for instant lead response and booking.",
        badge: "Voice & Chat"
    },
    {
        title: "CRM & ERP Automation",
        slug: "/crm-development",
        icon: Database,
        desc: "Two-way data synchronization across HubSpot, Salesforce, Zoho, and SQL databases.",
        badge: "CRM Sync"
    },
    {
        title: "Custom Software Engineering",
        slug: "/custom-software-development",
        icon: Code2,
        desc: "Tailored full-stack platforms, internal operations tools, and enterprise API systems.",
        badge: "Full-Stack"
    },
    {
        title: "Web & App Development",
        slug: "/web-development-services",
        icon: Globe,
        desc: "High-performance React/Next.js web applications, client portals, and SaaS tools.",
        badge: "Web Apps"
    }
];

const Services = () => {
    return (
        <section id="services" className="section bg-[#030712] relative py-8 sm:py-10">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
                <div className="text-center mb-6 sm:mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 py-0.5 mb-2 border border-[#6366F1]/30 rounded-full bg-[#6366F1]/10"
                    >
                        <span className="text-[#6366F1] text-xs font-bold tracking-wider uppercase">Our Services</span>
                    </motion.div>

                    <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
                        AI & Automation Services <span className="text-gradient-primary">That Drive Growth</span>
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed px-2">
                        We transform manual bottlenecks into automated, high-throughput systems.
                    </p>
                </div>

                {/* 6 Core Service Cards (3x2 Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {coreServicesList.map((svc, i) => {
                        const IconComponent = svc.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}
                            >
                                <Link
                                    to={svc.slug}
                                    className="p-4 sm:p-5 rounded-xl bg-[#0F172A]/80 border border-white/5 hover:border-[#00C8FF]/40 hover:bg-[#1E293B] transition-all group flex flex-col justify-between h-full relative overflow-hidden"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="w-9 h-9 rounded-lg bg-[#00C8FF]/10 text-[#00C8FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <IconComponent className="w-4 h-4" />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#94A3B8] border border-white/10">
                                                {svc.badge}
                                            </span>
                                        </div>
                                        <h3 className="text-white font-bold text-base mb-1.5 group-hover:text-[#00C8FF] transition-colors">{svc.title}</h3>
                                        <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">{svc.desc}</p>
                                    </div>
                                    <div className="pt-2.5 border-t border-white/5 flex items-center gap-1.5 text-xs text-[#00C8FF] font-semibold group-hover:text-white transition-colors">
                                        <span>Explore Service</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Supporting Consulting Line */}
                <div className="mt-6 text-center border-t border-white/5 pt-4 flex flex-wrap justify-center items-center gap-3 text-xs text-[#94A3B8]">
                    <span>Need technical architecture audits or AI receptionist telephony?</span>
                    <div className="flex items-center gap-3">
                        <Link to="/ai-automation-services" className="text-[#00C8FF] font-semibold hover:underline flex items-center gap-1">
                            <Bot className="w-3.5 h-3.5" /> AI Consulting <ArrowRight className="w-3 h-3" />
                        </Link>
                        <Link to="/ai-receptionist" className="text-[#00C8FF] font-semibold hover:underline flex items-center gap-1">
                            AI Receptionist <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
