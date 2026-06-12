import React from 'react';
import { motion } from 'framer-motion';

const AiForSmallBusiness = () => {
  return (
    <main className="pt-32 pb-16 min-h-screen">
      <section className="px-6 max-w-7xl mx-auto text-center mb-20">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10"
        >
            <span className="text-sm font-medium text-[#CBD5E1]">Small Business Solutions</span>
        </motion.div>
        
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[1.1]"
        >
            <span className="block text-white">AI for Small Business</span>
            <span className="text-gradient-primary">Workflow Automation</span>
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-[#94A3B8] max-w-3xl mx-auto mb-12"
        >
            Transform your SMB with our <strong>AI automation for small business</strong> solutions. From <strong>intelligent process automation</strong> to <strong>small business workflow automation</strong>, we help you save 20+ hours a week and reduce operational costs without hiring more staff.
        </motion.p>
      </section>
    </main>
  );
};

export default AiForSmallBusiness;
