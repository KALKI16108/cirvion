import React from 'react';
import { motion } from 'framer-motion';

const CustomAiSoftware = () => {
  return (
    <main className="pt-32 pb-16 min-h-screen">
      <section className="px-6 max-w-7xl mx-auto text-center mb-20">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10"
        >
            <span className="text-sm font-medium text-[#CBD5E1]">Custom Solutions</span>
        </motion.div>
        
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[1.1]"
        >
            <span className="block text-white">Custom AI Software</span>
            <span className="text-gradient-primary">Development India</span>
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-[#94A3B8] max-w-3xl mx-auto mb-12"
        >
            As a leading <strong>AI software development company Mumbai</strong>, we specialize in <strong>custom AI software development India</strong>. We build the <strong>bespoke AI application development</strong> solutions and <strong>AI-powered business software Mumbai</strong> enterprises rely on to scale.
        </motion.p>
      </section>
    </main>
  );
};

export default CustomAiSoftware;
