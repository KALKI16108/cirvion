import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { submitAuditRequest } from '../lib/leads';
import { validateEmail } from '../security';
import { trackFormStart, trackFormSubmit } from '../lib/analytics';
import toast from 'react-hot-toast';

const validatePhone = (phone) => {
    if (!phone || typeof phone !== 'string' || phone.trim() === '') return true; // Optional field
    const cleaned = phone.trim();
    const phoneRegex = /^(\+?[0-9\s\-().]{6,25})$/;
    return phoneRegex.test(cleaned);
};

const FreeAiAudit = () => {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formStartedRef = useRef(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company_name: '',
        phone: '',
        country_code: '+1',
        website: '',
        team_size: '',
        monthly_revenue: '',
        biggest_bottleneck: ''
    });

    const handleChange = (e) => {
        if (!formStartedRef.current) {
            formStartedRef.current = true;
            trackFormStart('Free AI Audit Page');
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const name = (formData.name || '').trim();
        const email = (formData.email || '').trim();
        const companyName = (formData.company_name || '').trim();
        const rawPhone = (formData.phone || '').trim();

        if (!name) {
            toast.error('Please enter your name.');
            return;
        }
        if (!email || !validateEmail(email)) {
            toast.error('Please enter a valid work email address.');
            return;
        }
        if (!companyName) {
            toast.error('Please enter your company name.');
            return;
        }
        if (rawPhone && !validatePhone(rawPhone)) {
            toast.error('Please enter a valid phone number or leave it blank.');
            return;
        }
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const name = (formData.name || '').trim();
        const email = (formData.email || '').trim();
        const companyName = (formData.company_name || '').trim();
        const website = (formData.website || '').trim();
        const rawPhone = (formData.phone || '').trim();
        const teamSize = (formData.team_size || '').trim();
        const monthlyRevenue = (formData.monthly_revenue || '').trim();
        const biggestBottleneck = (formData.biggest_bottleneck || '').trim();

        // Validate Step 1 fields
        if (!name) {
            toast.error('Please enter your name.');
            setStep(1);
            return;
        }
        if (!email || !validateEmail(email)) {
            toast.error('Please enter a valid work email address.');
            setStep(1);
            return;
        }
        if (!companyName) {
            toast.error('Please enter your company name.');
            setStep(1);
            return;
        }
        if (rawPhone && !validatePhone(rawPhone)) {
            toast.error('Please enter a valid phone number or leave it blank.');
            setStep(1);
            return;
        }

        const finalPhone = rawPhone 
            ? (rawPhone.startsWith('+') ? rawPhone : `${formData.country_code || ''} ${rawPhone}`.trim())
            : '';

        // Validate Step 2 dropdowns and textarea
        if (!teamSize || teamSize === 'Select...') {
            toast.error('Please select your team size.');
            return;
        }
        if (!monthlyRevenue || monthlyRevenue === 'Select...') {
            toast.error('Please select your monthly revenue.');
            return;
        }
        if (!biggestBottleneck) {
            toast.error('Please describe your biggest bottleneck.');
            return;
        }

        trackFormSubmit('Free AI Audit Page');

        setIsSubmitting(true);
        try {
            await submitAuditRequest({
                name,
                email,
                phone: finalPhone,
                company_name: companyName,
                website,
                team_size: teamSize,
                monthly_revenue: monthlyRevenue,
                biggest_bottleneck: biggestBottleneck,
                source: 'AIFlowix Website',
                form_type: 'Free Audit'
            });
            formStartedRef.current = false;
            toast.success("Audit request sent! We'll be in touch shortly.");
            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                company_name: '',
                phone: '',
                country_code: '+1',
                website: '',
                team_size: '',
                monthly_revenue: '',
                biggest_bottleneck: ''
            });
            setStep(1);
        } catch (error) {
            console.error('Error submitting audit:', error);
            let friendlyErr = error?.message || 'Something went wrong. Please try again.';
            if (/dynamically imported module|failed to fetch/i.test(friendlyErr)) {
                friendlyErr = 'A temporary network error occurred. Your details are saved—please click Submit again.';
            }
            toast.error(friendlyErr);
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
                            {/* Web3Forms Honeypot for spam prevention */}
                            <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
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
                                        <label htmlFor="audit-company" className="text-sm font-medium text-[#E2E8F0]">Company Name <span className="text-red-400">*</span></label>
                                        <input id="audit-company" required type="text" name="company_name" value={formData.company_name} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors" placeholder="Acme Corp" aria-label="Company Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="audit-phone" className="text-sm font-medium text-[#E2E8F0]">Phone Number (Optional)</label>
                                        <div className="flex rounded-xl border border-white/10 bg-[#0F172A] focus-within:border-[#00C8FF] focus-within:ring-1 focus-within:ring-[#00C8FF] transition-all overflow-hidden">
                                            <select
                                                name="country_code"
                                                value={formData.country_code || '+1'}
                                                onChange={handleChange}
                                                aria-label="Country Code"
                                                className="bg-[#1E293B] text-xs text-[#94A3B8] px-3 py-3 border-r border-white/10 focus:outline-none cursor-pointer shrink-0"
                                            >
                                                <option value="+1">🇺🇸 +1</option>
                                                <option value="+44">🇬🇧 +44</option>
                                                <option value="+91">🇮🇳 +91</option>
                                                <option value="+971">🇦🇪 +971</option>
                                                <option value="+61">🇦🇺 +61</option>
                                                <option value="+65">🇸🇬 +65</option>
                                                <option value="+49">🇩🇪 +49</option>
                                                <option value="+33">🇫🇷 +33</option>
                                                <option value="+81">🇯🇵 +81</option>
                                                <option value="">Other</option>
                                            </select>
                                            <input
                                                id="audit-phone"
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+1 415 555 0132"
                                                aria-label="Phone Number (Optional)"
                                                className="w-full bg-transparent px-4 py-3 text-white placeholder-[#64748B] focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="audit-website" className="text-sm font-medium text-[#E2E8F0]">Website (Optional)</label>
                                        <input id="audit-website" type="url" name="website" value={formData.website} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors" placeholder="https://company.com" aria-label="Website (Optional)" />
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
                                            <select required name="team_size" value={formData.team_size} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors">
                                                <option value="" disabled>Select...</option>
                                                <option value="1-10">1-10</option>
                                                <option value="11-50">11-50</option>
                                                <option value="51-200">51-200</option>
                                                <option value="200+">200+</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#E2E8F0]">Monthly Revenue <span className="text-red-400">*</span></label>
                                            <select required name="monthly_revenue" value={formData.monthly_revenue} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors">
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
                                        <textarea required name="biggest_bottleneck" value={formData.biggest_bottleneck} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] transition-colors h-32 resize-none" placeholder="E.g., We spend 20 hours a week on manual data entry..."></textarea>
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
