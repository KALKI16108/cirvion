import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { submitAuditRequest } from '../lib/api';
import toast from 'react-hot-toast';

const FreeAiAudit = () => {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        website: '',
        teamSize: '',
        monthlyRevenue: '',
        painPoints: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        // Basic validation for step 1
        if (!formData.name || !formData.email || !formData.company) {
            toast.error('Please fill in your name, email, and company.');
            return;
        }
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await submitAuditRequest(formData);
            toast.success("Audit request sent! We'll be in touch shortly.");
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting audit:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const auditSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Free AI Automation Audit",
        "provider": {
            "@type": "Organization",
            "name": "AIFlowix"
        },
        "description": "A comprehensive, 100% free business process audit to identify AI automation opportunities, calculate ROI, and propose exact technology stacks."
    };

    return (
        <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-screen grid lg:grid-cols-2 gap-12 items-start">
            <SEOHead 
                title="Free AI Automation Audit | AIFlowix"
                description="Get a free, comprehensive AI audit for your business. Discover exactly how much time and money AI automation can save you."
                canonical="/free-ai-audit"
                schema={auditSchema}
            />
            
            {/* SEO & Context Column */}
            <article className="space-y-8 mt-4 lg:sticky lg:top-32">
                <div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/20"
                    >
                        <FileText className="w-4 h-4 text-[#00C8FF]" />
                        <span className="text-sm font-medium text-[#00C8FF]">100% Free Assessment</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white"
                    >
                        Request Your Free AI Audit
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[#94A3B8]"
                    >
                        Find out exactly where your business is bleeding time and money, and how AI can fix it.
                    </motion.p>
                </div>

                <section className="bg-[#1E293B]/40 border border-white/5 p-8 rounded-3xl" aria-labelledby="what-is-audit">
                    <h2 id="what-is-audit" className="text-2xl font-bold text-white mb-4">What is an AI Automation Audit?</h2>
                    <p className="text-[#94A3B8] leading-relaxed mb-6">
                        An AI Automation Audit is a comprehensive technical review of your company's current operational workflows, software stack, and manual bottlenecks. Our automation engineers analyze your processes to identify high-ROI opportunities where Artificial Intelligence can eliminate manual data entry, automate client communications, and reduce operational costs.
                    </p>
                    
                    <h3 className="text-lg font-bold text-white mb-3">Audit Deliverables:</h3>
                    <ul className="space-y-3">
                        {['Process Mapping & Bottleneck Identification', 'Custom AI Tech Stack Recommendations', 'Estimated Cost Reductions & ROI Calculation', 'Implementation Timeline & Roadmap'].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-[#94A3B8]">
                                <CheckCircle2 className="w-5 h-5 text-[#00C8FF] shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </article>

            {/* Form Column */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-8 md:p-10 rounded-3xl border border-white/5"
            >
                {submitted ? (
                    <div className="text-center py-12">
                        <CheckCircle2 className="w-16 h-16 text-[#10B981] mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-white mb-4">Request Received!</h2>
                        <p className="text-[#94A3B8]">Our automation engineers will review your details and reach out within 24 hours to schedule your free audit.</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-[#94A3B8]">Step {step} of 2</span>
                                <span className="text-sm font-medium text-[#00C8FF]">{step === 1 ? 'Contact Info' : 'Business Details'}</span>
                            </div>
                            <div className="w-full bg-[#0F172A] rounded-full h-2">
                                <div className={`bg-[#00C8FF] h-2 rounded-full transition-all duration-500 ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
                            </div>
                        </div>

                        <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-6">
                            {step === 1 && (
                                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#E2E8F0]">Full Name <span className="text-red-400">*</span></label>
                                        <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#E2E8F0]">Work Email <span className="text-red-400">*</span></label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors" placeholder="john@company.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#E2E8F0]">Company Name <span className="text-red-400">*</span></label>
                                        <input required type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors" placeholder="Acme Corp" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#E2E8F0]">Company Website</label>
                                        <input type="url" name="website" value={formData.website} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors" placeholder="https://company.com" />
                                    </div>
                                    <button type="submit" className="w-full bg-gradient-primary hover:opacity-90 text-[#0F172A] font-bold py-4 rounded-xl transition-opacity flex items-center justify-center gap-2">
                                        Next <ArrowRight className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#E2E8F0]">Team Size <span className="text-red-400">*</span></label>
                                            <select required name="teamSize" value={formData.teamSize} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors">
                                                <option value="" disabled>Select...</option>
                                                <option value="1-10">1-10</option>
                                                <option value="11-50">11-50</option>
                                                <option value="51-200">51-200</option>
                                                <option value="200+">200+</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#E2E8F0]">Monthly Revenue <span className="text-red-400">*</span></label>
                                            <select required name="monthlyRevenue" value={formData.monthlyRevenue} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors">
                                                <option value="" disabled>Select...</option>
                                                <option value="<$10k">&lt;$10k</option>
                                                <option value="$10k-$50k">$10k - $50k</option>
                                                <option value="$50k-$200k">$50k - $200k</option>
                                                <option value="$200k+">$200k+</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#E2E8F0]">Biggest Bottleneck <span className="text-red-400">*</span></label>
                                        <textarea required name="painPoints" value={formData.painPoints} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors h-32 resize-none" placeholder="E.g., We spend 20 hours a week on manual data entry..."></textarea>
                                    </div>
                                    
                                    <div className="flex gap-4">
                                        <button type="button" onClick={handleBack} className="w-1/3 bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                                            <ArrowLeft className="w-4 h-4" /> Back
                                        </button>
                                        <button disabled={isSubmitting} type="submit" className="w-2/3 bg-gradient-primary hover:opacity-90 text-[#0F172A] font-bold py-4 rounded-xl transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
                                            {isSubmitting ? 'Submitting...' : 'Request Free Audit'}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </form>
                    </>
                )}
            </motion.div>
        </main>
    );
};

export default FreeAiAudit;
