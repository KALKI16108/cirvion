import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import StatsDashboard from '../components/StatsDashboard';
import UseCasesGrid from '../components/UseCasesGrid';
import CaseStudy from '../components/CaseStudy';
import InternalLinks from '../components/InternalLinks';
import locationsData from '../data/locations.json';

const LocationTemplate = () => {
    const { slug } = useParams();
    
    const location = useMemo(() => {
        return locationsData.find(l => l.slug === slug);
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
            "@type": "City",
            "name": location.city,
            "addressCountry": "IN"
        }
    };

    return (
        <main className="pt-32 pb-16 min-h-screen">
            <SEOHead 
                title={`${location.h1} | AIFlowix`}
                description={location.metaDescription}
                canonical={`/locations/${location.slug}`}
                schema={[locationSchema, faqSchema]}
            />

            <section className="px-6 max-w-7xl mx-auto mb-20">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20"
                    >
                        <MapPin className="w-4 h-4 text-[#6366F1]" />
                        <span className="text-sm font-medium text-[#6366F1]">Serving {location.city}</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold mb-8 tracking-tight"
                    >
                        {location.h1}
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#94A3B8] leading-relaxed"
                    >
                        {location.description}
                    </motion.p>
                </div>
            </section>

            <section className="px-6 max-w-7xl mx-auto">
                <StatsDashboard statistics={location.statistics} />

                <div className="max-w-4xl mx-auto my-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 md:p-12 rounded-[2rem] border border-white/5 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C8FF]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                        <h2 className="text-3xl font-bold mb-6 text-white">Local Expertise in {location.city}</h2>
                        <p className="text-lg text-[#E2E8F0] mb-8">{location.serviceArea}</p>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                            {['Custom AI Solutions', 'Workflow Automation', 'Lead Generation AI', 'CRM Integration'].map((service, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                                    <span className="text-[#94A3B8]">{service}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <UseCasesGrid useCases={location.useCases} />
                <CaseStudy caseStudy={location.caseStudy} />

                {/* EEAT Signals */}
                {location.eeat && (
                    <div className="my-16 bg-[#1E293B]/50 border border-white/5 rounded-2xl p-8 text-center max-w-4xl mx-auto">
                        <h3 className="text-[#00C8FF] font-bold uppercase tracking-widest text-sm mb-4">Local Impact</h3>
                        <div className="text-[#E2E8F0] leading-relaxed space-y-4">
                            {location.eeat.map((signal, idx) => (
                                <p key={idx}>{signal}</p>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <section className="px-6 max-w-3xl mx-auto my-20">
                <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    {location.faq?.map((item, index) => (
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

            <section className="px-6 max-w-7xl mx-auto">
                <InternalLinks links={location.relatedLinks} />
            </section>
        </main>
    );
};

export default LocationTemplate;
