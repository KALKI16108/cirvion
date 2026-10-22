import React from 'react';
import { MessageSquare, Settings, Code2, ArrowRight, Smartphone, Database, Globe, Bot, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const problemsSolved = [
    { problem: "Slow Lead Response", impact: "Leads go cold after 5 minutes of inactivity", fix: "Automated qualification in under 60 seconds" },
    { problem: "Manual CRM Logging", impact: "Sales reps lose 8–15 hrs/week copying data", fix: "Two-way webhook synchronization across tools" },
    { problem: "After-Hours Inquiries", impact: "Prospects drop off outside normal office hours", fix: "24/7 autonomous AI chat & WhatsApp agents" },
    { problem: "Document Processing", impact: "Manual transcription of invoices & contracts", fix: "Automated OCR extraction into your databases" },
    { problem: "Disconnected SaaS Tools", impact: "Isolated data silos and broken manual transfers", fix: "Unified API pipelines and webhook triggers" },
    { problem: "Front-Desk Overload", impact: "Staff overwhelmed answering routine repetitive questions", fix: "Instant AI triage and self-service routing" }
];

const coreServicesList = [
    {
        title: "AI Agents & Autonomous Support",
        slug: "/ai-agent-development",
        icon: MessageSquare,
        desc: "Autonomous conversational agents for 24/7 customer support, lead triage, and internal knowledge bases.",
        bestFor: "Customer support teams & scaling SaaS",
        badge: "AI Agents"
    },
    {
        title: "Workflow & Pipeline Automation",
        slug: "/workflow-automation-services",
        icon: Settings,
        desc: "End-to-end automated process pipelines connecting webhooks, third-party APIs, and central databases.",
        bestFor: "Operations managers & service agencies",
        badge: "Process Automation"
    },
    {
        title: "WhatsApp & Voice AI Systems",
        slug: "/whatsapp-automation",
        icon: Smartphone,
        desc: "Official WhatsApp Business API integration and voice receptionists for instant lead response and automated booking.",
        bestFor: "Real estate, clinics & field services",
        badge: "WhatsApp & Voice"
    },
    {
        title: "CRM & ERP Integration",
        slug: "/crm-development",
        icon: Database,
        desc: "Bi-directional data synchronization and automated stage progression across HubSpot, Salesforce, Zoho, and SQL.",
        bestFor: "Sales teams tired of manual data entry",
        badge: "CRM Sync"
    },
    {
        title: "Custom Software & Internal Tools",
        slug: "/custom-software-development",
        icon: Code2,
        desc: "Tailored operations portals, staff admin dashboards, custom API wrappers, and scalable backend infrastructure.",
        bestFor: "Companies outgrowing off-the-shelf software",
        badge: "Custom Engineering"
    },
    {
        title: "Web & Client Portal Development",
        slug: "/web-development-services",
        icon: Globe,
        desc: "High-performance React/Next.js web applications, client self-service portals, and digital customer journeys.",
        bestFor: "Businesses upgrading digital customer touchpoints",
        badge: "Web Applications"
    }
];

const Services = () => {
    return (
        <section id="services" className="section bg-[#030712] relative py-12 sm:py-16 border-t border-white/5">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 py-1 mb-2 border border-[#6366F1]/30 rounded-full bg-[#6366F1]/10"
                    >
                        <span className="text-[#6366F1] text-xs font-bold tracking-wider uppercase">Services & Capabilities</span>
                    </motion.div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">
                        AI & Automation Engineering <span className="text-gradient-primary">That Solves Real Bottlenecks</span>
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed px-2">
                        We build robust, maintainable systems that connect your software stack and eliminate tedious operational friction.
                    </p>
                </div>

                {/* Sub-section: 6 Common Business Bottlenecks Solved */}
                <div className="mb-12 rounded-2xl bg-[#0F172A]/70 border border-white/5 p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertCircle className="w-4 h-4 text-[#00C8FF]" />
                        <h3 className="text-white font-bold text-sm sm:text-base">Operational Friction Points We Eliminate:</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {problemsSolved.map((item, idx) => (
                            <div key={idx} className="p-3 rounded-lg bg-[#030712]/60 border border-white/5 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-bold text-red-400 block mb-0.5">{item.problem}</span>
                                    <p className="text-[11px] text-[#94A3B8] mb-2">{item.impact}</p>
                                </div>
                                <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                                    <span>{item.fix}</span>
                                </div>
                            </div>
                        ))}
                    </div>
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
                                    className="p-5 rounded-xl bg-[#0F172A]/80 border border-white/5 hover:border-[#00C8FF]/40 hover:bg-[#1E293B] transition-all group flex flex-col justify-between h-full relative overflow-hidden"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#00C8FF]/10 text-[#00C8FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#94A3B8] border border-white/10">
                                                {svc.badge}
                                            </span>
                                        </div>
                                        <h3 className="text-white font-bold text-base mb-1.5 group-hover:text-[#00C8FF] transition-colors">{svc.title}</h3>
                                        <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">{svc.desc}</p>
                                        <div className="mb-3 text-[11px] text-[#CBD5E1] bg-white/5 px-2.5 py-1 rounded">
                                            <span className="text-[#94A3B8]">Best for:</span> {svc.bestFor}
                                        </div>
                                    </div>
                                    <div className="pt-2.5 border-t border-white/5 flex items-center gap-1.5 text-xs text-[#00C8FF] font-semibold group-hover:text-white transition-colors">
                                        <span>Explore Service Scope</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Supporting Consulting Line */}
                <div className="mt-8 text-center border-t border-white/5 pt-5 flex flex-wrap justify-center items-center gap-3 text-xs text-[#94A3B8]">
                    <span>Need technical architecture audits or specialized AI consulting?</span>
                    <div className="flex items-center gap-4">
                        <Link to="/ai-automation-services" className="text-[#00C8FF] font-semibold hover:underline flex items-center gap-1">
                            <Bot className="w-3.5 h-3.5" /> AI Consulting Services <ArrowRight className="w-3 h-3" />
                        </Link>
                        <Link to="/custom-ai-software" className="text-[#00C8FF] font-semibold hover:underline flex items-center gap-1">
                            Custom AI Software <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
