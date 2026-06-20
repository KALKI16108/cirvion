import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { getBlogs } from '../lib/api';

const Blog = () => {
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchBlogs = async () => {
          try {
              const data = await getBlogs();
              // Show all blogs unless explicitly marked published: false
              setBlogsData(data.filter(b => b.published !== false));
          } catch (error) {
              console.error("Failed to fetch blogs:", error);
          } finally {
              setLoading(false);
          }
      };
      fetchBlogs();
  }, []);

  return (
    <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-screen">
      <SEOHead 
        title="AIFlowix Blog | AI Automation Insights"
        description="Explore our latest thoughts on workflow automation, custom AI software, and business transformation."
        canonical="/blog"
      />
      
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

      {loading ? (
          <div className="flex justify-center my-20">
              <div className="w-10 h-10 border-4 border-[#00C8FF] border-t-transparent rounded-full animate-spin"></div>
          </div>
      ) : (
          <div className="space-y-16">
              {Array.from(new Set(blogsData.map(b => b.category || 'Strategy'))).map(category => {
                  const categoryBlogs = blogsData.filter(b => (b.category || 'Strategy').toLowerCase() === category.toLowerCase());
                  if (categoryBlogs.length === 0) return null;
                  
                  return (
                      <div key={category}>
                          <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">{category}</h2>
                          <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                          >
                            {categoryBlogs.map((post, index) => (
                              <Link key={index} to={`/blog/${post.slug}`} className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-6 hover:border-[#00C8FF]/50 transition-colors cursor-pointer group flex flex-col">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00C8FF] transition-colors">{post.title}</h3>
                                <p className="text-[#94A3B8] text-sm mb-4 flex-grow">
                                  {post.meta_description || post.metaDescription}
                                </p>
                                <span className="text-[#00C8FF] text-sm font-medium transition-colors mt-auto">Read Guide &rarr;</span>
                              </Link>
                            ))}
                          </motion.div>
                      </div>
                  );
              })}
          </div>
      )}
    </main>
  );
};

export default Blog;
