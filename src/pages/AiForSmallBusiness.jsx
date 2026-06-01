import React from 'react';
import { motion } from 'framer-motion';
import CTA from '../components/CTA';

const AiForSmallBusiness = () => {
  return (
    <main className="pt-32 pb-16 min-h-screen">
      <section className="px-6 max-w-7xl mx-auto text-center mb-20">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10"
        >
            <span className="text-sm font-medium text-[#CBD5E1]">SMB Solutions</span>
        </motion.div>
        
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[1.1]"
        >
            <span className="block text-white">Small Business</span>
            <span className="text-gradient-primary">AI Automation</span>
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-[#94A3B8] max-w-3xl mx-auto mb-12"
        >
            If you're looking for an <strong>automation agency near me</strong>, transform your local operations with the best <strong>AI tools for small business India</strong>. We specialize in <strong>manual process automation small business</strong> owners use to cut costs, delivering accessible <strong>AI software for local business</strong>.
        </motion.p>
      </section>

      <CTA />
    </main>
  );
};

export default AiForSmallBusiness;
