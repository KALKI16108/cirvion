import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { trackContactCtaClick } from '../lib/analytics';

const AiForSmallBusiness = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Automation for Small Business",
    "description": "Practical AI workflows, automated lead response, and system integrations engineered to help small businesses eliminate manual tasks.",
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
        title="AI Automation for Small Business | AIFlowix"
        description="Practical AI workflows, automated lead response, and system integrations engineered to help small businesses eliminate manual tasks and reduce overhead."
        canonical="/ai-for-small-business"
        schema={serviceSchema}
      />

      <section className="px-6 max-w-5xl mx-auto text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10"
        >
          <Zap className="w-4 h-4 text-[#00C8FF]" />
          <span className="text-xs sm:text-sm font-medium text-[#CBD5E1]">SMB Workflow Automation</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.15]"
        >
          <span className="block text-white">AI Automation</span>
          <span className="text-gradient-primary">Built for Growing Businesses</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-3xl mx-auto mb-8 leading-relaxed font-normal"
        >
          Practical AI workflows and system integrations engineered specifically for growing teams. We help businesses eliminate manual data handling, respond to leads in seconds, and free up 20+ hours each week.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            onClick={() => trackContactCtaClick('Book Discovery Call', 'AI for Small Business Page')}
            className="btn-primary flex items-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-bold w-full sm:w-auto justify-center shadow-lg shadow-[#00C8FF]/20"
          >
            Book a Free Discovery Call
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/roi-calculator"
            className="btn-secondary flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold w-full sm:w-auto justify-center"
          >
            Calculate Your ROI
          </a>
        </motion.div>
      </section>
    </main>
  );
};

export default AiForSmallBusiness;
