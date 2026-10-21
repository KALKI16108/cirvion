import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Workflow, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const industryExamples = [
    {
        industry: "Healthcare & Clinics",
        slug: "/healthcare-automation",
        problem: "Front desk overwhelmed with routine queries and scheduling.",
        automation: "24/7 WhatsApp AI receptionist integrated with EMR & calendar.",
        delay: 0.1
    },
    {
        industry: "Real Estate & Brokerages",
        slug: "/real-estate-automation",
        problem: "Agents spending 15+ hours weekly answering repetitive lead questions.",
        automation: "Instant webhook & AI lead qualification pipeline feeding your CRM.",
        delay: 0.2
    },
    {
        industry: "Logistics & Dispatch",
        slug: "/logistics-automation",
        problem: "Manual spreadsheet updates and driver dispatch phone calls.",
        automation: "Telematics webhook pipeline pushing automated WhatsApp tracking alerts.",
        delay: 0.3
    }
];

const CaseStudies = () => {
    return (
        <section id="blueprints" className="section bg-[#030712]/70 py-8 sm:py-10 border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                <div className="text-center mb-6 sm:mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-1.5 px-3 py-0.5 mb-2 rounded-full bg-white/5 border border-white/10"
                    >
                        <Workflow className="w-3.5 h-3.5 text-[#00C8FF]" />
                        <span className="text-xs font-medium text-[#CBD5E1]">Industry Solutions</span>
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
                        Automation <span className="text-gradient-primary">Industry Use Cases</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
                        Practical examples of how our automation pipelines eliminate bottlenecks across key sectors.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                    {industryExamples.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: item.delay, duration: 0.4 }}
                            className="glass-card rounded-xl p-4 sm:p-5 flex flex-col justify-between border border-white/5 hover:border-[#00C8FF]/30 transition-all group"
                        >
                            <div>
                                <h3 className="px-2.5 py-0.5 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/20 text-[#00C8FF] text-[11px] font-bold uppercase tracking-wider inline-block mb-3">
                                    {item.industry}
                                </h3>

                                <div className="space-y-2 mb-4">
                                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                                        <strong className="text-red-400 font-semibold">Problem:</strong> {item.problem}
                                    </p>
                                    <p className="text-xs text-white/90 leading-relaxed">
                                        <strong className="text-[#00C8FF] font-semibold">Solution:</strong> {item.automation}
                                    </p>
                                </div>
                            </div>

                            <Link
                                to={item.slug}
                                aria-label={`Explore industry solution for ${item.industry}`}
                                className="pt-2.5 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#00C8FF] group-hover:text-white transition-colors"
                            >
                                <span>Explore Industry Solution</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CaseStudies;
