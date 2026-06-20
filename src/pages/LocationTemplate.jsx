import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, XCircle, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import StatsDashboard from '../components/StatsDashboard';
import UseCasesGrid from '../components/UseCasesGrid';
import CaseStudy from '../components/CaseStudy';
import InternalLinks from '../components/InternalLinks';
import locationsData from '../data/locations.json';

const LocationTemplate = () => {
    const { slug } = useParams();
    
    const location = useMemo(() => {
        return locationsData.find(i => i.slug === slug);
    }, [slug]);

    if (!location) {
        return <Navigate to="/" replace />;
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": location.faq?.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        })) || []
    };

    const locationSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": location.h1,
        "description": location.description,
        "provider": {
            "@type": "Organization",
            "name": "AIFlowix",
            "url": "https://aiflowix.in"
        },
        "areaServed": {
            "@type": "Place",
            "name": location.city,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": location.city,
                "addressRegion": location.region,
                "addressCountry": location.country
            }
        }
    };

    return (
        <main className="pt-32 pb-16 min-h-screen">
            <SEOHead 
                title={`${location.h1} | AIFlowix`}
                description={location.metaDescription}
                canonical={`/locations/${location.slug}`}
                schema={[locationSchema, faqSchema]}
                keywords={location.keywords}
            />

            <section className="px-6 max-w-7xl mx-auto mb-20">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#10B981]/10 border border-[#10B981]/20"
                    >
                        <MapPin className="w-4 h-4 text-[#10B981]" />
                        <span className="text-sm font-medium text-[#10B981]">Serving {location.city}, {location.region}</span>
                    </motion.div>
                    
                    {/* GEO: Direct Answer Block (AI Extraction Point) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8 text-left bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                            {location.h1}
                        </h1>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg md:text-xl text-[#94A3B8] leading-relaxed font-medium">
                                {location.description}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="px-6 max-w-7xl mx-auto">
                {location.statistics && <StatsDashboard statistics={location.statistics} />}

                <div className="grid md:grid-cols-2 gap-12 my-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 rounded-3xl border border-red-500/20 bg-red-500/5"
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <XCircle className="text-red-500" />
                            Challenges in {location.city}
                        </h2>
                        <ul className="space-y-4">
                            {location.challenges?.map((challenge, idx) => (
                                <li key={idx} className="flex gap-4 items-start text-[#94A3B8]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/50 mt-2.5 flex-shrink-0" />
                                    {challenge}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8 rounded-3xl border border-[#10B981]/20 bg-[#10B981]/5"
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <CheckCircle2 className="text-[#10B981]" />
                            AIFlowix Solutions
                        </h2>
                        {/* GEO: Numbered list for AI scraping */}
                        <ol className="space-y-4 list-decimal list-inside text-[#E2E8F0] font-medium">
                            {location.solutions?.map((solution, idx) => (
                                <li key={idx} className="pl-2">
                                    {solution}
                                </li>
                            ))}
                        </ol>
                    </motion.div>
                </div>

                {location.useCases && <UseCasesGrid useCases={location.useCases} />}
                
                {location.caseStudy && <CaseStudy data={location.caseStudy} />}

                {/* EEAT Signals */}
                {location.eeat && (
                    <div className="my-16 bg-[#1E293B]/50 border border-white/5 rounded-2xl p-8 text-center max-w-4xl mx-auto">
                        <h3 className="text-[#00C8FF] font-bold uppercase tracking-widest text-sm mb-4">Local Expertise</h3>
                        <div className="text-[#E2E8F0] leading-relaxed space-y-4">
                            {location.eeat.map((signal, idx) => (
                                <p key={idx}>{signal}</p>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {location.faq && (
                <section className="px-6 max-w-3xl mx-auto my-20">
                    <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {location.faq.map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-6 rounded-2xl border border-white/5"
                            >
                                <h3 className="text-xl font-bold text-white mb-3">{item.question}</h3>
                                <p className="text-[#94A3B8] leading-relaxed">{item.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            <section className="px-6 max-w-7xl mx-auto">
                <InternalLinks links={location.relatedLinks} />
            </section>
        </main>
    );
};

export default LocationTemplate;
