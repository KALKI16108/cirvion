import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import industriesData from '../data/industries.json';
import { Briefcase, ArrowRight } from 'lucide-react';

const IndustriesIndex = () => {
    const hubSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "AI Automation Industries | AIFlowix",
        "description": "Discover how AIFlowix implements custom AI and automation solutions across Real Estate, Healthcare, Finance, and more.",
        "url": "https://aiflowix.in/industries",
        "hasPart": industriesData.map(ind => ({
            "@type": "WebPage",
            "name": ind.h1,
            "url": `https://aiflowix.in/industries/${ind.slug}`
        }))
    };

    return (
        <main className="pt-32 pb-16 min-h-screen bg-[#0F172A] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#00C8FF]/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true"></div>
            
            <SEOHead 
                title="AI Automation Industries | AIFlowix"
                description="Explore custom AI automation solutions engineered for specific industries including Healthcare, Real Estate, E-commerce, Finance, and Legal."
                canonical="/industries"
                schema={hubSchema}
            />

            <section className="px-6 max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/20"
                    >
                        <Briefcase className="w-4 h-4 text-[#00C8FF]" />
                        <span className="text-sm font-medium text-[#00C8FF] uppercase tracking-wider">Industry Solutions</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight"
                    >
                        AI Engineered for Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C8FF] to-[#00E5FF]">Vertical</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-[#94A3B8] leading-relaxed"
                    >
                        Generic AI doesn't solve industry-specific bottlenecks. We build custom automation pipelines tailored to the exact operational workflows of your sector.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {industriesData.map((ind, index) => (
                        <motion.div
                            key={ind.slug}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="h-full"
                        >
                            <Link 
                                to={`/industries/${ind.slug}`}
                                className="block h-full bg-[#1E293B]/40 border border-white/10 hover:border-[#00C8FF]/50 rounded-2xl p-6 lg:p-8 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,200,255,0.1)] flex flex-col"
                            >
                                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-[#00C8FF] transition-colors">
                                    {ind.industry}
                                </h2>
                                <p className="text-[#94A3B8] leading-relaxed mb-6 line-clamp-3">
                                    {ind.description}
                                </p>
                                <div className="mt-auto flex items-center text-[#00C8FF] font-medium text-sm">
                                    Explore Solutions
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default IndustriesIndex;
