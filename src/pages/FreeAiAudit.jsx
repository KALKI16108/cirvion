import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { submitAuditRequest } from '../lib/api';
import toast from 'react-hot-toast';

const FreeAiAudit = () => {
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

    return (
        <main className="pt-32 pb-16 px-6 max-w-4xl mx-auto min-h-screen">
            <SEOHead 
                title="Free AI Automation Audit | AIFlowix"
                description="Get a free, comprehensive AI audit for your business. Discover exactly how much time and money AI automation can save you."
                canonical="/free-ai-audit"
            />
            
            <div className="text-center mb-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/20"
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
                    Free AI Automation Audit
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

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-8 md:p-12 rounded-3xl border border-white/5"
            >
                {submitted ? (
                    <div className="text-center py-12">
                        <CheckCircle2 className="w-16 h-16 text-[#10B981] mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-white mb-4">Request Received!</h2>
                        <p className="text-[#94A3B8]">Our automation engineers will review your details and reach out within 24 hours to schedule your free audit.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#E2E8F0]">Full Name</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#E2E8F0]">Work Email</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors" placeholder="john@company.com" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#E2E8F0]">Company Name</label>
                                <input required type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors" placeholder="Acme Corp" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#E2E8F0]">Company Website</label>
                                <input required type="url" name="website" value={formData.website} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors" placeholder="https://company.com" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#E2E8F0]">Team Size</label>
                                <select required name="teamSize" value={formData.teamSize} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors">
                                    <option value="" disabled>Select team size...</option>
                                    <option value="1-10">1-10 employees</option>
                                    <option value="11-50">11-50 employees</option>
                                    <option value="51-200">51-200 employees</option>
                                    <option value="200+">200+ employees</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#E2E8F0]">Monthly Revenue</label>
                                <select required name="monthlyRevenue" value={formData.monthlyRevenue} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors">
                                    <option value="" disabled>Select revenue...</option>
                                    <option value="<$10k">&lt;$10k / month</option>
                                    <option value="$10k-$50k">$10k - $50k / month</option>
                                    <option value="$50k-$200k">$50k - $200k / month</option>
                                    <option value="$200k+">$200k+ / month</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#E2E8F0]">Biggest Bottleneck</label>
                            <textarea required name="painPoints" value={formData.painPoints} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors h-32 resize-none" placeholder="E.g., We spend 20 hours a week on manual data entry..."></textarea>
                        </div>
                        <button disabled={isSubmitting} type="submit" className="w-full bg-gradient-primary hover:opacity-90 text-[#0F172A] font-bold py-4 rounded-xl transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
                            {isSubmitting ? 'Submitting...' : 'Request Free Audit'}
                        </button>
                    </form>
                )}
            </motion.div>
        </main>
    );
};

export default FreeAiAudit;
