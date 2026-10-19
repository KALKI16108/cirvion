import React from 'react';
import { MessageSquare, Settings, Code2, ArrowRight, CheckCircle2, Bot, PhoneCall, Smartphone, Layers, Database, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServiceGroup = ({ title, icon: Icon, items, href, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="w-[85vw] flex-none snap-center md:w-auto glass-card p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl md:rounded-[2rem] h-full group hover:bg-[#1E293B]/80 relative overflow-hidden flex flex-col justify-between"
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
        </div>

        <Link to={href} className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 md:pt-8 border-t border-white/5 flex items-center text-[#00C8FF] font-semibold cursor-pointer group/link text-sm sm:text-base">
            <span className="group-hover/link:mr-2 transition-all">Explore Service Details</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 opacity-0 group-hover/link:opacity-100 transition-opacity" />
        </Link>
    </motion.div>
);

const coreServicesList = [
    { title: "AI Automation Services", slug: "/ai-automation-services", icon: Bot, desc: "End-to-end intelligent workflow pipelines" },
    { title: "AI Agent Development", slug: "/ai-agent-development", icon: MessageSquare, desc: "Autonomous reasoning & task-execution bots" },
    { title: "Workflow Automation", slug: "/workflow-automation-services", icon: Settings, desc: "Automate repetitive data & process handoffs" },
    { title: "WhatsApp Automation", slug: "/whatsapp-automation", icon: Smartphone, desc: "24/7 lead qualification & customer messaging" },
    { title: "AI Receptionist & Voice", slug: "/ai-receptionist", icon: PhoneCall, desc: "Inbound call answering & smart booking" },
    { title: "Custom Software Engineering", slug: "/custom-software-development", icon: Code2, desc: "Tailored full-stack platforms & internal tools" },
    { title: "Web & App Development", slug: "/web-development-services", icon: Globe, desc: "High-performance React/Vite/Next applications" },
    { title: "CRM & ERP Automation", slug: "/crm-development", icon: Database, desc: "Two-way synchronization across HubSpot, Zoho & CRMs" }
];

const Services = () => {
    return (
        <section id="services" className="section bg-[#030712] relative">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-12 sm:mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 sm:px-4 py-1 mb-4 sm:mb-5 md:mb-6 border border-[#6366F1]/30 rounded-full bg-[#6366F1]/10"
                    >
                        <span className="text-[#6366F1] text-xs sm:text-sm font-bold tracking-wider uppercase">Our Capabilities</span>
                    </motion.div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 text-white">
                        AI & Automation That <span className="text-gradient-primary">Delivers Measurable ROI</span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed px-2">
                        We transform manual bottlenecks into automated, high-throughput systems. Direct engineering from India, delivering production-grade solutions worldwide.
                    </p>
                </div>

                {/* 3 Core Pillars */}
                <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 pb-8 -mx-4 px-4 md:pb-0 md:mx-0 md:px-0 scrollbar-hide mb-16">
                    <ServiceGroup
                        title="AI Agents & Chat"
                        icon={MessageSquare}
                        href="/ai-agent-development"
                        items={[
                            "Customer Support Agents (24/7)",
                            "Inbound Lead Qualification Bots",
                            "Voice Receptionists & Booking",
                            "Internal HR & Knowledge Bases"
                        ]}
                        delay={0.1}
                    />
                    <ServiceGroup
                        title="Workflow & Process Automation"
                        icon={Settings}
                        href="/workflow-automation-services"
                        items={[
                            "Lead Routing & Scoring Systems",
                            "CRM & ERP Two-Way Data Sync",
                            "Automated Financial Reporting",
                            "Invoice & Document Processing"
                        ]}
                        delay={0.2}
                    />
                    <ServiceGroup
                        title="Custom Software Engineering"
                        icon={Code2}
                        href="/custom-software-development"
                        items={[
                            "Custom Web Applications (React/Vite)",
                            "Enterprise API Integrations",
                            "Internal Operations Portals",
                            "Database Architecture & Supabase"
                        ]}
                        delay={0.3}
                    />
                </div>

                {/* Direct Service Landing Page Directory */}
                <div className="border-t border-white/10 pt-12">
                    <div className="text-center mb-8">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Explore Specific Service Capabilities</h3>
                        <p className="text-sm text-[#94A3B8]">Browse comprehensive specifications, tech stacks, and workflows for each solution</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {coreServicesList.map((svc, i) => {
                            const IconComponent = svc.icon;
                            return (
                                <Link
                                    key={i}
                                    to={svc.slug}
                                    className="p-4 rounded-xl bg-[#0F172A]/80 border border-white/5 hover:border-[#00C8FF]/40 hover:bg-[#1E293B] transition-all group flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="w-8 h-8 rounded-lg bg-[#00C8FF]/10 text-[#00C8FF] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <IconComponent className="w-4 h-4" />
                                        </div>
                                        <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-[#00C8FF] transition-colors">{svc.title}</h4>
                                        <p className="text-xs text-[#94A3B8] leading-relaxed">{svc.desc}</p>
                                    </div>
                                    <div className="mt-3 flex items-center gap-1 text-xs text-[#00C8FF] font-medium opacity-80 group-hover:opacity-100">
                                        View service <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
