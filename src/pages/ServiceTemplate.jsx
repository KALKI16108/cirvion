import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import servicesData from '../data/services.json';

const ServiceTemplate = () => {
    const { slug } = useParams();
    
    const service = useMemo(() => {
        return servicesData.find(s => s.slug === slug);
    }, [slug]);

    if (!service) {
        return <Navigate to="/" replace />;
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": service.faq.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
            "@type": "Organization",
            "name": "AIFlowix",
            "url": "https://aiflowix.in"
        },
        "areaServed": "Worldwide"
    };

    // Combine schemas
    const pageSchema = [serviceSchema, faqSchema];

    return (
        <main className="pt-32 pb-16 min-h-screen">
            <SEOHead 
                title={`${service.title} | AIFlowix`}
                description={service.metaDescription}
                canonical={`/services/${service.slug}`}
                schema={pageSchema}
            />

            <section className="px-6 max-w-7xl mx-auto mb-20">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10"
                    >
                        <span className="text-sm font-medium text-[#00C8FF]">Service Breakdown</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold mb-8 tracking-tight"
                    >
                        {service.h1}
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#94A3B8] leading-relaxed"
                    >
                        {service.description}
                    </motion.p>
                </div>
            </section>

            <section className="px-6 max-w-7xl mx-auto mb-24 grid md:grid-cols-2 gap-16">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold mb-8">Key Benefits</h2>
                    <div className="space-y-4">
                        {service.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-4 glass-card p-4 rounded-xl border border-white/5">
                                <CheckCircle2 className="w-6 h-6 text-[#00C8FF] shrink-0 mt-0.5" />
                                <span className="text-[#E2E8F0] font-medium text-lg">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold mb-8">Our Process</h2>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                        {service.process.map((step, index) => (
                            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#1E293B] group-[.is-active]:bg-[#00C8FF] text-white group-[.is-active]:text-[#0F172A] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">
                                    {index + 1}
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-xl border border-white/5">
                                    <div className="font-bold text-[#E2E8F0]">{step}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            <section className="px-6 max-w-3xl mx-auto mb-20">
                <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    {service.faq.map((item, index) => (
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
        </main>
    );
};

export default ServiceTemplate;
