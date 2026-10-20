import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Workflow, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const blueprints = [
    {
        industry: "Healthcare & Clinics",
        slug: "/healthcare-automation",
        problem: "Front desk staff overwhelmed with routine phone queries, appointment rescheduling, and missed patient follow-ups.",
        architecture: "WhatsApp Business API + Conversational AI Agent -> Automated Triage -> Calendar / EMR Synchronization",
        deliverables: [
            "24/7 autonomous inquiry answering",
            "Zero double-bookings with automated calendar validation",
            "Immediate appointment confirmation & SMS reminders"
        ],
        delay: 0.1
    },
    {
        industry: "Real Estate & Brokerages",
        slug: "/real-estate-automation",
        problem: "Agents spend 15+ hours weekly answering repetitive budget and location questions from unqualified portal inquiries.",
        architecture: "Inbound Portal Webhooks -> LLM Qualification Pipeline -> CRM Auto-Entry & High-Priority Agent Routing",
        deliverables: [
            "Instant under-60-second lead qualification",
            "Structured lead profiles automatically populated into CRM",
            "Only pre-qualified buyers routed to human brokers"
        ],
        delay: 0.2
    },
    {
        industry: "Logistics & Dispatch",
        slug: "/logistics-automation",
        problem: "Manual spreadsheet updates and constant phone calls between dispatch coordinators, drivers, and consignees.",
        architecture: "Telematics / ERP Webhook Event -> Serverless Automation Pipeline -> Real-time Tracking & Consignee Alerts",
        deliverables: [
            "Instant status notifications across WhatsApp & SMS",
            "Automated exception flagging on route delays",
            "Elimination of manual dispatch tracking sheets"
        ],
        delay: 0.3
    }
];

const CaseStudies = () => {
    return (
        <section id="blueprints" className="section bg-[#030712]/70 py-20 sm:py-24 border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 mb-4 rounded-full bg-white/5 border border-white/10">
                        <Workflow className="w-4 h-4 text-[#00C8FF]" />
                        <span className="text-xs sm:text-sm font-medium text-[#CBD5E1]">Technical Architecture</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
                        Workflow Blueprints & <span className="text-gradient-primary">System Walkthroughs</span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
                        Practical examples of how our automation pipelines eliminate manual bottlenecks and connect modern AI models to legacy business systems.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blueprints.map((bp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: bp.delay, duration: 0.5 }}
                            className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-white/5 hover:border-[#00C8FF]/30 transition-all group"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="px-3 py-1 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/20 text-[#00C8FF] text-xs font-bold uppercase tracking-wider inline-block">
                                        {bp.industry}
                                    </h3>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <h5 className="text-xs font-semibold uppercase text-red-400 tracking-wider mb-1">Operational Bottleneck</h5>
                                        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{bp.problem}</p>
                                    </div>

                                    <div>
                                        <h5 className="text-xs font-semibold uppercase text-[#00C8FF] tracking-wider mb-1">Automation Architecture</h5>
                                        <p className="text-xs text-white/90 bg-[#0F172A] p-2.5 rounded-lg border border-white/10 font-mono leading-relaxed">
                                            {bp.architecture}
                                        </p>
                                    </div>

                                    <div>
                                        <h5 className="text-xs font-semibold uppercase text-emerald-400 tracking-wider mb-2">Key System Deliverables</h5>
                                        <ul className="space-y-1.5">
                                            {bp.deliverables.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <Link
                                to={bp.slug}
                                aria-label={`Explore industry solution for ${bp.industry}`}
                                className="pt-4 border-t border-white/5 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#00C8FF] group-hover:text-white transition-colors"
                            >
                                <span>Explore Industry Solution</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CaseStudies;
