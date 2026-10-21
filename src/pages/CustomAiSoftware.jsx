import React from 'react';
import { motion } from 'framer-motion';
import { Code2, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { trackContactCtaClick } from '../lib/analytics';

const CustomAiSoftware = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom AI Software Development",
    "description": "Bespoke AI application engineering, internal operations platforms, and custom workflow software designed for operational scale.",
    "provider": {
      "@type": "Organization",
      "name": "AIFlowix",
      "url": "https://aiflowix.in"
    },
    "areaServed": "Worldwide"
  };

  return (
    <main className="pt-32 pb-16 min-h-screen">
      <SEOHead 
        title="Custom AI Software Development | AIFlowix"
        description="Bespoke AI application engineering, internal operations platforms, and custom workflow software built to eliminate operational bottlenecks and scale efficiency."
        canonical="/custom-ai-software"
        schema={serviceSchema}
      />

      <section className="px-6 max-w-5xl mx-auto text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10"
        >
          <Code2 className="w-4 h-4 text-[#00C8FF]" />
          <span className="text-xs sm:text-sm font-medium text-[#CBD5E1]">Engineering & Custom Development</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.15]"
        >
          <span className="block text-white">Custom AI Software</span>
          <span className="text-gradient-primary">Engineered for Your Business</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-3xl mx-auto mb-8 leading-relaxed font-normal"
        >
          We engineer tailored AI applications, internal operations platforms, and secure API integrations designed to automate repetitive business processes and scale throughput.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            onClick={() => trackContactCtaClick('Book Discovery Call', 'Custom AI Software Page')}
            className="btn-primary flex items-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-bold w-full sm:w-auto justify-center shadow-lg shadow-[#00C8FF]/20"
          >
            Book a Free Discovery Call
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/#services"
            className="btn-secondary flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold w-full sm:w-auto justify-center"
          >
            Explore All Solutions
          </a>
        </motion.div>
      </section>
    </main>
  );
};

export default CustomAiSoftware;
