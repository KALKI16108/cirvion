import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
        >
          <span className="text-white">Insights &amp; </span>
          <span className="text-gradient-primary">Updates</span>
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#94A3B8] max-w-2xl mx-auto"
        >
          Explore our latest thoughts on workflow automation, custom AI software, and business transformation.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Post 1 */}
        <Link to="/blog/automate-lead-qualification" className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-6 hover:border-[#00C8FF]/50 transition-colors cursor-pointer group flex flex-col">
          <div className="text-xs font-bold tracking-wider text-[#00C8FF] uppercase mb-2">Workflow Automation</div>
          <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#00C8FF] transition-colors">How to Automate Lead Qualification with AI</h2>
          <p className="text-[#94A3B8] text-sm mb-4 flex-grow">
            Stop wasting time on dead-end leads. Learn how AI can automatically score and filter your sales pipeline.
          </p>
          <span className="text-[#00C8FF] text-sm font-medium transition-colors mt-auto">Read Article &rarr;</span>
        </Link>

        {/* Post 2 */}
        <Link to="/blog/custom-ai-software-benefits" className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-6 hover:border-[#6366F1]/50 transition-colors cursor-pointer group flex flex-col">
          <div className="text-xs font-bold tracking-wider text-[#6366F1] uppercase mb-2">Custom AI Software</div>
          <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#6366F1] transition-colors">Benefits of Custom AI Software for Small Businesses</h2>
          <p className="text-[#94A3B8] text-sm mb-4 flex-grow">
            Why investing in bespoke AI applications yields better ROI than subscribing to multiple generic SaaS tools.
          </p>
          <span className="text-[#6366F1] text-sm font-medium transition-colors mt-auto">Read Article &rarr;</span>
        </Link>

        {/* Pillar 3 (Placeholder) */}
        <article onClick={() => alert('We are currently migrating our blog content. Full articles will be available soon!')} className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-6 hover:border-[#10B981]/50 transition-colors cursor-pointer group flex flex-col">
          <div className="text-xs font-bold tracking-wider text-[#10B981] uppercase mb-2">Business Transformation</div>
          <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#10B981] transition-colors">Scaling Your Agency with Intelligent Process Automation</h2>
          <p className="text-[#94A3B8] text-sm mb-4 flex-grow">
            A look into how AI is completely transforming operational ROI and empowering businesses to scale effortlessly.
          </p>
          <span className="text-[#10B981] text-sm font-medium transition-colors mt-auto">Read Article &rarr;</span>
        </article>
      </motion.div>
    </main>
  );
};

export default Blog;
