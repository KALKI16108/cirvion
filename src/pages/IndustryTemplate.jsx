import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, XCircle, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import StatsDashboard from '../components/StatsDashboard';
import UseCasesGrid from '../components/UseCasesGrid';
import CaseStudy from '../components/CaseStudy';
import InternalLinks from '../components/InternalLinks';
import industriesData from '../data/industries.json';

const IndustryTemplate = ({ forcedSlug }) => {
    const params = useParams();
    const slug = forcedSlug || params.slug;
    
    const industry = useMemo(() => {
        return industriesData.find(i => i.slug === slug);
    }, [slug]);

    if (!industry) {
        return <Navigate to="/" replace />;
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": industry.faq?.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        })) || []
    };

    const industrySchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": industry.h1,
        "description": industry.description,
        "provider": {
            "@type": "Organization",
            "name": "AIFlowix",
            "url": "https://aiflowix.in"
        },
        "audience": {
            "@type": "Audience",
            "audienceType": industry.industry
        }
    };

    return (
        <main className="pt-32 pb-16 min-h-screen">
            <SEOHead 
                title={`${industry.h1} | AIFlowix`}
                description={industry.metaDescription}
                canonical={`/industries/${industry.slug}`}
                schema={[industrySchema, faqSchema]}
            />

            <section className="px-6 max-w-7xl mx-auto mb-20">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#10B981]/10 border border-[#10B981]/20"
                    >
                        <Briefcase className="w-4 h-4 text-[#10B981]" />
                        <span className="text-sm font-medium text-[#10B981]">{industry.industry} Solutions</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold mb-8 tracking-tight"
                    >
                        {industry.h1}
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#94A3B8] leading-relaxed"
                    >
                        {industry.description}
                    </motion.p>
                </div>
            </section>

            <section className="px-6 max-w-7xl mx-auto">
                <StatsDashboard statistics={industry.statistics} />

                <div className="grid md:grid-cols-2 gap-12 my-24">
                    <motion.section
                        id="industry-challenges"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 rounded-3xl border border-red-500/20 bg-red-500/5"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                            <XCircle className="w-6 h-6 text-red-400" />
                            Core Challenges in {industry.industry}
                        </h2>
                        <ul className="space-y-4">
                            {industry.challenges?.map((challenge, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-[#94A3B8]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span>
                                    <span>{challenge}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.section>

                    <motion.section
                        id="ai-automation-solutions"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-8 rounded-3xl border border-green-500/20 bg-green-500/5"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                            Our AI Automation Solutions
                        </h2>
                        <ul className="space-y-4">
                            {industry.solutions?.map((solution, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-[#E2E8F0] font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0"></span>
                                    <span>{solution}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.section>
                </div>

                <UseCasesGrid useCases={industry.useCases} />
                <CaseStudy caseStudy={industry.caseStudy} />

                <div className="text-center mb-12 mt-24">
                    <h2 className="text-3xl font-bold">Why AIFlowix?</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {industry.benefits?.map((benefit, index) => (
                        <div key={index} className="glass-card p-6 rounded-xl border border-white/5 text-center">
                            <div className="text-[#00C8FF] font-bold text-xl mb-2">0{index + 1}</div>
                            <h3 className="text-white font-medium">{benefit}</h3>
                        </div>
                    ))}
                </div>

                {/* EEAT Signals */}
                {industry.eeat && (
                    <div className="my-16 bg-[#1E293B]/50 border border-white/5 rounded-2xl p-8 text-center max-w-4xl mx-auto">
                        <h3 className="text-[#00C8FF] font-bold uppercase tracking-widest text-sm mb-4">Industry Expertise</h3>
                        <div className="text-[#E2E8F0] leading-relaxed space-y-4">
                            {industry.eeat.map((signal, idx) => (
                                <p key={idx}>{signal}</p>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <section className="px-6 max-w-3xl mx-auto my-20">
                <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                <dl className="space-y-6">
                    {industry.faq?.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-6 rounded-2xl border border-white/5"
                        >
                            <dt className="text-xl font-bold text-white mb-3">{item.question}</dt>
                            <dd className="text-[#94A3B8] leading-relaxed m-0">{item.answer}</dd>
                        </motion.div>
                    ))}
                </dl>
            </section>

            <section className="px-6 max-w-7xl mx-auto">
                <InternalLinks links={industry.relatedLinks} />
            </section>
        </main>
    );
};

export default IndustryTemplate;
