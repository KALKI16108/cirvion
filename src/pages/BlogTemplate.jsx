import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import InternalLinks from '../components/InternalLinks';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getBlogBySlug } from '../lib/api';

const BlogTemplate = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data = await getBlogBySlug(slug);
                if (data) {
                    // Map snake_case from DB to camelCase used in template if needed
                    data.metaDescription = data.meta_description || data.metaDescription;
                    data.relatedLinks = data.related_links || data.relatedLinks;
                    setArticle(data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Failed to fetch blog article:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [slug]);

    if (loading) {
        return (
            <main className="pt-32 pb-16 min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#00C8FF] border-t-transparent rounded-full animate-spin"></div>
            </main>
        );
    }

    if (error || !article) {
        return <Navigate to="/blog" replace />;
    }

    const faqSchema = article.faq && article.faq.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": article.faq.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    } : null;

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.metaDescription,
        "author": {
            "@type": "Organization",
            "name": "AIFlowix"
        },
        "publisher": {
            "@type": "Organization",
            "name": "AIFlowix",
            "logo": {
                "@type": "ImageObject",
                "url": "https://aiflowix.in/assets/logo.png"
            }
        },
        "datePublished": "2026-06-01T08:00:00+08:00",
        "dateModified": "2026-06-01T08:00:00+08:00"
    };

    const schema = faqSchema ? [articleSchema, faqSchema] : [articleSchema];

    return (
        <main className="pt-32 pb-16 min-h-screen">
            <SEOHead 
                title={`${article.title} | AIFlowix Blog`}
                description={article.metaDescription}
                canonical={`/blog/${article.slug}`}
                schema={schema}
                type="article"
            />

            <article className="px-6 max-w-4xl mx-auto mb-20">
                <Link to="/blog" className="inline-flex items-center gap-2 text-[#00C8FF] hover:text-white transition-colors mb-8 font-medium">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>

                <div className="mb-12">
                    <div className="flex items-center gap-4 text-sm text-[#94A3B8] mb-6">
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Jun 1, 2026</span>
                        <span className="flex items-center gap-1.5 text-[#6366F1]"><Tag className="w-4 h-4" /> {article.category}</span>
                    </div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight tracking-tight text-white"
                    >
                        {article.title}
                    </motion.h1>
                </div>

                {/* EEAT Signals Author Box */}
                {article.eeat && (
                    <div className="mb-12 bg-[#1E293B]/30 border-l-4 border-[#00C8FF] p-6 rounded-r-xl">
                        <h3 className="text-sm font-bold text-[#00C8FF] uppercase tracking-wider mb-2">Authoritative Insight</h3>
                        <div className="space-y-2 text-[#E2E8F0] text-sm">
                            {article.eeat.map((signal, idx) => (
                                <p key={idx}>{signal}</p>
                            ))}
                        </div>
                    </div>
                )}

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-[#00C8FF] hover:prose-a:text-white prose-p:text-[#CBD5E1] prose-strong:text-white prose-img:rounded-2xl prose-img:mx-auto"
                >
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm]} 
                        rehypePlugins={[rehypeRaw]}
                    >
                        {article.content || ''}
                    </ReactMarkdown>
                </motion.div>

                {article.faq && article.faq.length > 0 && (
                    <div className="mt-16 pt-16 border-t border-white/10">
                        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {article.faq.map((item, index) => (
                                <div key={index} className="glass-card p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-xl font-bold text-white mb-3">{item.question}</h3>
                                    <p className="text-[#94A3B8] leading-relaxed">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-16">
                    <InternalLinks links={article.relatedLinks} />
                </div>
            </article>
        </main>
    );
};

export default BlogTemplate;
