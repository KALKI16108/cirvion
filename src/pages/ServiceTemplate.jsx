import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, Code2, Users, Sparkles, Calculator } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import StatsDashboard from '../components/StatsDashboard';
import UseCasesGrid from '../components/UseCasesGrid';
import CaseStudy from '../components/CaseStudy';
import InternalLinks from '../components/InternalLinks';
import servicesData from '../data/services.json';
import { trackContactCtaClick, trackBookCallClick, trackCtaClick } from '../lib/analytics';
import { getCalendarBookingUrl } from '../lib/booking';

const ServiceTemplate = ({ forcedSlug }) => {
    const params = useParams();
    const slug = forcedSlug || params.slug;
    const calendarUrl = getCalendarBookingUrl();
    
    const service = useMemo(() => {
        return servicesData.find(s => s.slug === slug);
    }, [slug]);

    if (!service) {
        return <Navigate to="/" replace />;
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": service.faq?.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        })) || []
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
    const primaryCtaText = calendarUrl ? "Book a Discovery Call" : "Request a Free AI Automation Audit";

    return (
        <main className="pt-28 sm:pt-32 pb-16 min-h-screen">
            <SEOHead 
                title={`${service.title} | AIFlowix`}
                description={service.metaDescription}
                canonical={forcedSlug ? `/${forcedSlug}` : `/services/${service.slug}`}
                schema={pageSchema}
            />

            {/* Service Hero Section */}
            <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-16 sm:mb-20">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full bg-white/5 border border-white/10"
                    >
                        <span className="text-xs sm:text-sm font-semibold text-[#00C8FF] uppercase tracking-wider">Engineering Service Scope</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.15]"
                    >
                        <span className="text-white block">{service.h1}</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-base sm:text-lg md:text-xl text-[#94A3B8] leading-relaxed mb-8 max-w-3xl mx-auto"
                    >
                        {service.description}
                    </motion.p>

                    {/* Dominant Primary CTA & Distinct Secondary Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8"
                    >
                        <a
                            href={calendarUrl || "#contact"}
                            {...(calendarUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            onClick={() => {
                                if (calendarUrl) {
                                    trackBookCallClick('calendar', service.title);
                                } else {
                                    trackContactCtaClick('Service Hero Consultation', service.title);
                                }
                            }}
                            className="btn-primary flex items-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-bold w-full sm:w-auto justify-center shadow-lg shadow-[#00C8FF]/20"
                        >
                            <span>{primaryCtaText}</span>
                            <ArrowRight className="w-4 h-4" />
                        </a>

                        <a
                            href="/roi-calculator"
                            onClick={() => trackCtaClick('Calculate Automation ROI', service.title)}
                            className="btn-secondary flex items-center gap-2 px-6 py-3.5 text-sm font-semibold w-full sm:w-auto justify-center hover:bg-white/10 transition-colors"
                        >
                            <Calculator className="w-4 h-4 text-[#00C8FF]" />
                            <span>Calculate Automation ROI</span>
                        </a>
                    </motion.div>

                    {/* Verified Trust Proof Row */}
                    <div className="py-2.5 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#94A3B8] text-xs font-medium border-t border-white/5 max-w-2xl mx-auto">
                        <span className="flex items-center gap-1.5">
                            <span className="text-[#00C8FF] font-bold">100% Code Ownership</span> Full Git Transfer
                        </span>
                        <span className="hidden sm:inline text-white/20">•</span>
                        <span className="flex items-center gap-1.5">
                            <span className="text-emerald-400 font-bold">Direct Senior Engineer</span> Slack/Teams
                        </span>
                        <span className="hidden sm:inline text-white/20">•</span>
                        <span className="flex items-center gap-1.5">
                            <span className="text-indigo-400 font-bold">Fixed-Scope Milestones</span> Zero Surprise Fees
                        </span>
                    </div>
                </div>
            </section>

            {/* Who This Service Is Best Suited For (Target Audience & Fit) */}
            {service.targetAudience && (
                <section className="px-4 sm:px-6 max-w-5xl mx-auto mb-16">
                    <div className="rounded-2xl bg-[#0F172A]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-md">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#00C8FF] uppercase tracking-wider mb-2">
                            <Users className="w-4 h-4" /> Ideal Company Profile & Fit
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Who This Service Is Engineered For</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-bold text-white mb-2">Best Suited For:</h3>
                                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-4">{service.targetAudience.idealProfile}</p>
                                <div className="space-y-2">
                                    {service.targetAudience.industries?.map((ind, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                            <span>{ind}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                                <h3 className="text-sm font-bold text-white mb-2">Signs You Need This Solution:</h3>
                                <div className="space-y-2.5">
                                    {service.targetAudience.painPoints?.map((pain, i) => (
                                        <div key={i} className="p-2.5 rounded-lg bg-white/5 text-xs text-[#E2E8F0] leading-relaxed">
                                            {pain}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* GEO: Direct Answer / Definition Block for AI Extraction */}
            {service.definition && (
                <section className="px-4 sm:px-6 max-w-4xl mx-auto mb-16 sm:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-6 md:p-8"
                    >
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">What is {service.title}?</h2>
                        <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#E2E8F0] leading-relaxed">
                            {service.definition.split('\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-3">{paragraph}</p>
                            ))}
                        </div>
                    </motion.div>
                </section>
            )}

            {/* Operational Impact Benchmarks */}
            <section className="px-4 sm:px-6 max-w-7xl mx-auto">
                <StatsDashboard statistics={service.statistics} />
                
                {/* Capabilities & Implementation Stages Grid */}
                <div className="grid md:grid-cols-2 gap-8 sm:gap-16 my-16 sm:my-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#00C8FF] uppercase tracking-wider">
                            <Code2 className="w-3.5 h-3.5" /> What We Deliver
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">Key Technical Capabilities</h2>
                        <div className="space-y-3.5">
                            {service.benefits?.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-3.5 glass-card p-4 rounded-xl border border-white/5">
                                    <CheckCircle2 className="w-5 h-5 text-[#00C8FF] shrink-0 mt-0.5" />
                                    <span className="text-[#E2E8F0] font-medium text-sm sm:text-base leading-snug">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#00C8FF] uppercase tracking-wider">
                            <Clock className="w-3.5 h-3.5" /> Implementation Roadmap
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">Engineering Process</h2>
                        <div className="space-y-4">
                            {service.process?.map((step, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-[#1E293B]/40 border border-white/5">
                                    <div className="w-8 h-8 rounded-lg bg-[#00C8FF]/10 text-[#00C8FF] font-bold text-sm flex items-center justify-center shrink-0">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white text-sm sm:text-base">{step}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Contextual Mid-Page Conversion Section */}
                <div className="my-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] border border-[#00C8FF]/30 text-center max-w-4xl mx-auto shadow-xl">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00C8FF] uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5" /> Custom Architecture Review
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        Ready to Automate Your {service.title} Workflows?
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto mb-6">
                        Request a free operational audit. Our senior engineers will evaluate your integration scope and map out a fixed-scope technical blueprint.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href={calendarUrl || "#contact"}
                            {...(calendarUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            onClick={() => {
                                if (calendarUrl) {
                                    trackBookCallClick('calendar', `Mid-Page ${service.title}`);
                                } else {
                                    trackContactCtaClick('Mid-Page Consultation CTA', service.title);
                                }
                            }}
                            className="bg-[#00C8FF] hover:bg-white text-[#0F172A] font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-colors flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg shadow-[#00C8FF]/20"
                        >
                            <span>{primaryCtaText}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                        <a
                            href="/roi-calculator"
                            onClick={() => trackCtaClick('Mid-Page ROI Calculator', service.title)}
                            className="bg-transparent border border-white/20 hover:bg-white/10 text-white font-medium text-xs sm:text-sm px-5 py-3 rounded-full transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
                        >
                            <Calculator className="w-3.5 h-3.5 text-[#00C8FF]" />
                            <span>Calculate Automation ROI</span>
                        </a>
                    </div>
                </div>

                <UseCasesGrid useCases={service.useCases} />
                <CaseStudy caseStudy={service.caseStudy} />
                
                {/* Technical Standards & Security Guarantees */}
                {service.eeat && (
                    <div className="my-16 bg-[#0F172A]/80 border border-white/5 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
                        <div className="flex items-center gap-2 text-[#00C8FF] font-bold uppercase tracking-widest text-xs mb-3">
                            <ShieldCheck className="w-4 h-4" /> Technical & Security Standards
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Engineering Discipline & Data Confidentiality</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                            {service.eeat.map((signal, idx) => (
                                <div key={idx} className="p-3 rounded-xl bg-white/5 flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>{signal}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* Service FAQ Section */}
            <section className="px-4 sm:px-6 max-w-3xl mx-auto my-16 sm:my-20">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center text-white">Frequently Asked Questions</h2>
                <p className="text-xs sm:text-sm text-[#94A3B8] text-center mb-8">
                    Common questions regarding technical scope, data privacy, and implementation for {service.title}.
                </p>
                <dl className="space-y-4">
                    {service.faq?.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-5 sm:p-6 rounded-2xl border border-white/5"
                        >
                            <dt className="text-base sm:text-lg font-bold text-white mb-2">{item.question}</dt>
                            <dd className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed m-0">{item.answer}</dd>
                        </motion.div>
                    ))}
                </dl>
            </section>

            {/* Related Links & Internal SEO Discovery */}
            <section className="px-4 sm:px-6 max-w-7xl mx-auto">
                <InternalLinks links={service.relatedLinks} />
            </section>
        </main>
    );
};

export default ServiceTemplate;
