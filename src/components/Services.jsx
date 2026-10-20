import React from 'react';
import { MessageSquare, Settings, Code2, ArrowRight, Bot, PhoneCall, Smartphone, Database, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const coreServicesList = [
    {
        title: "AI Agent Development",
        slug: "/ai-agent-development",
        icon: MessageSquare,
        desc: "Autonomous AI bots for 24/7 customer support, lead triage, and internal knowledge bases.",
        badge: "AI Agents"
    },
    {
        title: "Workflow Automation",
        slug: "/workflow-automation-services",
        icon: Settings,
        desc: "End-to-end automated pipelines connecting CRMs, databases, and webhook workflows.",
        badge: "Process Sync"
    },
    {
        title: "WhatsApp Automation",
        slug: "/whatsapp-automation",
        icon: Smartphone,
        desc: "Official WhatsApp Business API integration for instant customer messaging & qualification.",
        badge: "Messaging"
    },
    {
        title: "AI Receptionist & Voice",
        slug: "/ai-receptionist",
        icon: PhoneCall,
        desc: "Inbound AI call answering, speech recognition, and automated appointment scheduling.",
        badge: "Voice AI"
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
    },
    {
        title: "CRM & ERP Automation",
        slug: "/crm-development",
        icon: Database,
        desc: "Bi-directional synchronization across HubSpot, Salesforce, Zoho, and SQL databases.",
        badge: "CRM Sync"
    },
    {
        title: "AI Automation Consulting",
        slug: "/ai-automation-services",
        icon: Bot,
        desc: "Strategic technical audit, workflow optimization, and custom AI architecture planning.",
        badge: "Consulting"
    }
];

const Services = () => {
    return (
        <section id="services" className="section bg-[#030712] relative py-12 sm:py-16">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
                <div className="text-center mb-8 sm:mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 sm:px-4 py-1 mb-3 border border-[#6366F1]/30 rounded-full bg-[#6366F1]/10"
                    >
                        <span className="text-[#6366F1] text-xs sm:text-sm font-bold tracking-wider uppercase">Our Services</span>
                    </motion.div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white">
                        AI & Automation Services <span className="text-gradient-primary">That Drive Growth</span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed px-2">
                        We transform manual bottlenecks into automated, high-throughput systems. Direct engineering from India, delivering production-grade solutions worldwide.
                    </p>
                </div>

                {/* Single Consolidated Grid of Compact Service Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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
                                    className="p-5 rounded-2xl bg-[#0F172A]/80 border border-white/5 hover:border-[#00C8FF]/40 hover:bg-[#1E293B] transition-all group flex flex-col justify-between h-full relative overflow-hidden"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#00C8FF]/10 text-[#00C8FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#94A3B8] border border-white/10">
                                                {svc.badge}
                                            </span>
                                        </div>
                                        <h3 className="text-white font-bold text-base mb-1.5 group-hover:text-[#00C8FF] transition-colors">{svc.title}</h3>
                                        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-4">{svc.desc}</p>
                                    </div>
                                    <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs text-[#00C8FF] font-semibold group-hover:text-white transition-colors">
                                        <span>Explore Service</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
