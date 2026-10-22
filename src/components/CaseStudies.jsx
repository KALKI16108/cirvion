import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Workflow, CheckCircle2, Building2, Stethoscope, Truck, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const industryExamples = [
    {
        industry: "Healthcare & Clinics",
        slug: "/healthcare-automation",
        icon: Stethoscope,
        problem: "Front-desk staff consumed by repetitive appointment scheduling, patient inquiries, and manual phone follow-ups.",
        automation: "24/7 WhatsApp AI receptionist synced directly with clinic calendars and electronic health records.",
        outcome: "Instant patient scheduling, automated appointment reminders, and zero missed after-hours inquiries.",
        delay: 0.1
    },
    {
        industry: "Real Estate & Brokerages",
        slug: "/real-estate-automation",
        icon: Building2,
        problem: "Agents taking hours to respond to new portal leads, leading to lost client acquisition opportunities.",
        automation: "Automated webhook ingestion that qualifies buyer criteria via WhatsApp in under 60 seconds and syncs to CRM.",
        outcome: "Immediate lead engagement, automated showing booking, and structured CRM pipeline updates.",
        delay: 0.2
    },
    {
        industry: "Logistics & Field Operations",
        slug: "/logistics-automation",
        icon: Truck,
        problem: "Dispatchers manually transcribing spreadsheet tracking IDs and answering endless status inquiry calls.",
        automation: "Telematics and database webhook pipeline automatically pushing real-time tracking alerts to clients.",
        outcome: "Hands-off status notification pipelines with zero manual spreadsheet reconciliation.",
        delay: 0.3
    },
    {
        industry: "Professional Services & Agencies",
        slug: "/industries",
        icon: Briefcase,
        problem: "Slow client onboarding with scattered agreements, manual document intake, and disconnected invoices.",
        automation: "Unified onboarding workflow generating contracts, setting up cloud client folders, and creating Stripe drafts.",
        outcome: "Consistent client onboarding executed in minutes with complete audit trails.",
        delay: 0.4
    }
];

const CaseStudies = () => {
    return (
        <section id="blueprints" className="section bg-[#030712]/70 py-12 sm:py-16 border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                <div className="text-center mb-10 sm:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 mb-2 rounded-full bg-white/5 border border-white/10"
                    >
                        <Workflow className="w-3.5 h-3.5 text-[#00C8FF]" />
                        <span className="text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider">Practical Use Cases</span>
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">
                        Production Automation <span className="text-gradient-primary">Industry Blueprints</span>
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
                        Illustrative examples of how our automation pipelines eliminate operational bottlenecks across key commercial sectors.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {industryExamples.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: item.delay, duration: 0.4 }}
                                className="glass-card rounded-xl p-5 sm:p-6 flex flex-col justify-between border border-white/5 hover:border-[#00C8FF]/30 transition-all group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-[#00C8FF]/10 text-[#00C8FF] flex items-center justify-center">
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <h3 className="text-white font-bold text-base">{item.industry}</h3>
                                        </div>
                                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#94A3B8] border border-white/10">
                                            Blueprint
                                        </span>
                                    </div>

                                    <div className="space-y-2.5 mb-5 text-xs">
                                        <div className="p-2.5 rounded-lg bg-red-500/5 border border-red-500/10">
                                            <span className="text-red-400 font-semibold block mb-0.5">Operational Bottleneck:</span>
                                            <p className="text-[#94A3B8] leading-relaxed">{item.problem}</p>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-[#00C8FF]/5 border border-[#00C8FF]/10">
                                            <span className="text-[#00C8FF] font-semibold block mb-0.5">Automated Architecture:</span>
                                            <p className="text-[#E2E8F0] leading-relaxed">{item.automation}</p>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                                            <span className="text-emerald-400 font-semibold block mb-0.5">Expected Outcome:</span>
                                            <p className="text-[#E2E8F0] leading-relaxed">{item.outcome}</p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to={item.slug}
                                    aria-label={`Explore industry solution for ${item.industry}`}
                                    className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#00C8FF] group-hover:text-white transition-colors"
                                >
                                    <span>Explore Industry Solution Architecture</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[11px] text-[#64748B]">
                        * Industry blueprints represent standard technical architectures designed for commercial workflows. Exact system integrations are customized to each client's specific software stack.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CaseStudies;
