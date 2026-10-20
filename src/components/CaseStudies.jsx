import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Workflow, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const industryExamples = [
    {
        industry: "Healthcare & Clinics",
        slug: "/healthcare-automation",
        problem: "Front desk overwhelmed with routine phone queries, rescheduling, and missed patient follow-ups.",
        automation: "24/7 WhatsApp AI receptionist integrated with automated EMR & calendar scheduling.",
        benefit: "Zero double-bookings and 100% automated patient confirmation & reminders.",
        delay: 0.1
    },
    {
        industry: "Real Estate & Brokerages",
        slug: "/real-estate-automation",
        problem: "Agents spend 15+ hours weekly answering repetitive budget questions from unqualified leads.",
        automation: "Portal webhook & LLM lead qualification pipeline auto-populating CRM records.",
        benefit: "Instant under-60-second lead triage; only pre-qualified buyers reach brokers.",
        delay: 0.2
    },
    {
        industry: "Logistics & Dispatch",
        slug: "/logistics-automation",
        problem: "Manual spreadsheet updates and constant phone calls between dispatch coordinators and drivers.",
        automation: "Telematics & ERP webhook pipeline pushing real-time WhatsApp/SMS tracking alerts.",
        benefit: "Instant automated status updates and elimination of manual tracking sheets.",
        delay: 0.3
    }
];

const CaseStudies = () => {
    return (
        <section id="blueprints" className="section bg-[#030712]/70 py-12 sm:py-16 border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                <div className="text-center mb-8 sm:mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 mb-3 rounded-full bg-white/5 border border-white/10"
                    >
                        <Workflow className="w-4 h-4 text-[#00C8FF]" />
                        <span className="text-xs sm:text-sm font-medium text-[#CBD5E1]">Industry Solutions</span>
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">
                        Automation <span className="text-gradient-primary">Industry Use Cases</span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
                        Practical examples of how our automation pipelines eliminate operational bottlenecks across key sectors.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {industryExamples.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: item.delay, duration: 0.5 }}
                            className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-white/5 hover:border-[#00C8FF]/30 transition-all group"
                        >
                            <div>
                                <h3 className="px-3 py-1 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/20 text-[#00C8FF] text-xs font-bold uppercase tracking-wider inline-block mb-4">
                                    {item.industry}
                                </h3>

                                <div className="space-y-3.5 mb-6">
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase text-red-400 tracking-wider mb-1">Problem</h4>
                                        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{item.problem}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-semibold uppercase text-[#00C8FF] tracking-wider mb-1">Proposed Automation</h4>
                                        <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                                            {item.automation}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-semibold uppercase text-emerald-400 tracking-wider mb-1">Key Benefit</h4>
                                        <p className="text-xs sm:text-sm text-emerald-300/90 flex items-start gap-1.5 leading-relaxed">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                            <span>{item.benefit}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Link
                                to={item.slug}
                                aria-label={`Explore industry solution for ${item.industry}`}
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
