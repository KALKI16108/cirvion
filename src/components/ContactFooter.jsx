import React, { useState, lazy, Suspense } from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { submitContactForm } from '../lib/api';

// Lazy-load modal components to reduce initial bundle size (performance optimization)
const PrivacyPolicy = lazy(() => import('./PrivacyPolicy'));
const TermsOfService = lazy(() => import('./TermsOfService'));
const CookiePolicy = lazy(() => import('./CookiePolicy'));

// Security: Input validation and sanitization
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    // Remove potentially dangerous characters and trim whitespace
    return input
        .trim()
        .replace(/[<>\"\'`]/g, '') // Remove HTML/script tags
        .slice(0, 500); // Limit length to 500 chars
};

const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhone = (phone) => {
    // Allow digits, spaces, hyphens, parentheses, and + symbol
    const phoneRegex = /^[0-9\s\-+()]+$/;
    return phone === '' || phoneRegex.test(phone);
};

const ContactFooter = () => {
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showCookie, setShowCookie] = useState(false);
    
    // 2-step form state
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        website: '',
        teamSize: '',
        monthlyRevenue: '',
        painPoints: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Security: Sanitize input to prevent XSS attacks
        const sanitizedValue = sanitizeInput(value);
        setFormData({
            ...formData,
            [name]: sanitizedValue
        });
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (!sanitizeInput(formData.name) || formData.name.length < 2) {
            toast.error('Please enter a valid name.');
            return;
        }
        if (!validateEmail(formData.email)) {
            toast.error('Please enter a valid email address.');
            return;
        }
        if (!sanitizeInput(formData.company) || formData.company.length < 2) {
            toast.error('Please enter a valid company name.');
            return;
        }
        setStep(2);
    };

    const handleBack = () => setStep(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        if (!sanitizeInput(formData.painPoints) || formData.painPoints.length < 5) {
            setSubmitStatus('error');
            toast.error('Please describe your bottlenecks.');
            setIsSubmitting(false);
            return;
        }

        try {
            // Import dynamically to avoid top-level import errors if we change api.js
            const { submitAuditRequest } = await import('../lib/api');
            await submitAuditRequest(formData);

            setSubmitStatus('success');
            setFormData({ name: '', email: '', company: '', website: '', teamSize: '', monthlyRevenue: '', painPoints: '' });
            setStep(1);
            toast.success('Audit Request Sent! We will contact you within 24 hours.');
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
            toast.error('Oops! Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Lazy-load modal components with Suspense (performance optimization) */}
            <Suspense fallback={null}>
                {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
                {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
                {showCookie && <CookiePolicy onClose={() => setShowCookie(false)} />}
            </Suspense>

            <footer id="contact" className="bg-[#030712] border-t border-white/5 pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-6 sm:pb-8 md:pb-12 relative overflow-hidden">
                {/* Footer Glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] md:w-[1000px] h-[300px] sm:h-[400px] md:h-[500px] bg-[#00C8FF]/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-24 mb-10 sm:mb-12 md:mb-16 lg:mb-24">

                        {/* Left Column: Contact Info */}
                        <div>
                            <div className="mb-8 sm:mb-10 md:mb-12">
                                <p className="text-[#94A3B8] text-sm sm:text-base md:text-lg max-w-md leading-relaxed">
                                    Empowering businesses with intelligent automation. If you're looking for an <strong>automation agency near me</strong>, AIFLOWIX serves clients locally and globally.
                                </p>
                                {/* Screen-reader-only: short contact intent line for SEO and a11y */}
                                <p className="sr-only">Contact AIFLOWIX for a free automation audit and practical roadmap to reduce manual work.</p>
                            </div>

                            <div className="space-y-4 sm:space-y-6 md:space-y-8 mb-8 sm:mb-10 md:mb-12">
                                <div className="flex items-start gap-3 sm:gap-4 md:gap-6 group cursor-default">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-[#1E293B] border border-white/5 flex items-center justify-center group-hover:bg-[#00C8FF] group-hover:border-[#00C8FF] transition-all duration-300 shadow-lg flex-shrink-0">
                                        <MapPin className="text-[#00C8FF] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">Headquarters</h3>
                                        <p className="text-[#94A3B8] text-xs sm:text-sm md:text-base">Mumbai, India</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 sm:gap-4 md:gap-6 group cursor-default">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-[#1E293B] border border-white/5 flex items-center justify-center group-hover:bg-[#00C8FF] group-hover:border-[#00C8FF] transition-all duration-300 shadow-lg flex-shrink-0">
                                        <Mail className="text-[#00C8FF] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">Email Us</h3>
                                        <p className="text-[#94A3B8] text-xs sm:text-sm md:text-base break-all">siddhantpitale125@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 sm:gap-4 md:gap-6 group cursor-default">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-[#1E293B] border border-white/5 flex items-center justify-center group-hover:bg-[#00C8FF] group-hover:border-[#00C8FF] transition-all duration-300 shadow-lg flex-shrink-0">
                                        <Phone className="text-[#00C8FF] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">WhatsApp</h3>
                                        <p className="text-[#94A3B8] text-xs sm:text-sm md:text-base">+91 99307 44723</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base">Connect With Us</h3>
                                <div className="flex gap-3 sm:gap-4 mb-8">
                                    <a href="https://linkedin.com/company/aiflowix" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1E293B] border border-white/5 flex items-center justify-center text-[#94A3B8] hover:bg-[#00C8FF] hover:text-white hover:border-[#00C8FF] transition-all duration-300 hover:-translate-y-1 shadow-lg">
                                        <Linkedin size={16} className="sm:hidden" />
                                        <Linkedin size={20} className="hidden sm:block" />
                                    </a>
                                    <a href="https://twitter.com/aiflowix" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1E293B] border border-white/5 flex items-center justify-center text-[#94A3B8] hover:bg-[#00C8FF] hover:text-white hover:border-[#00C8FF] transition-all duration-300 hover:-translate-y-1 shadow-lg">
                                        <Twitter size={16} className="sm:hidden" />
                                        <Twitter size={20} className="hidden sm:block" />
                                    </a>
                                    <a href="https://www.instagram.com/circuit.vision.ai/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1E293B] border border-white/5 flex items-center justify-center text-[#94A3B8] hover:bg-[#00C8FF] hover:text-white hover:border-[#00C8FF] transition-all duration-300 hover:-translate-y-1 shadow-lg">
                                        <Instagram size={16} className="sm:hidden" />
                                        <Instagram size={20} className="hidden sm:block" />
                                    </a>
                                </div>
                                
                                {/* SEO Internal Linking - Expanded Footers */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mt-8 border-t border-white/5 pt-8">
                                    <div>
                                        <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Services</h3>
                                        <ul className="space-y-3 text-sm text-[#94A3B8]">
                                            <li><a href="/services/whatsapp-automation" className="hover:text-[#00C8FF] transition-colors">WhatsApp Automation</a></li>
                                            <li><a href="/services/ai-lead-generation" className="hover:text-[#00C8FF] transition-colors">AI Lead Generation</a></li>
                                            <li><a href="/services/crm-automation" className="hover:text-[#00C8FF] transition-colors">CRM Automation</a></li>
                                            <li><a href="/services/voice-ai-agents" className="hover:text-[#00C8FF] transition-colors">Voice AI Agents</a></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Industries</h3>
                                        <ul className="space-y-3 text-sm text-[#94A3B8]">
                                            <li><a href="/industries/real-estate" className="hover:text-[#00C8FF] transition-colors">Real Estate</a></li>
                                            <li><a href="/industries/healthcare" className="hover:text-[#00C8FF] transition-colors">Healthcare</a></li>
                                            <li><a href="/industries/ecommerce" className="hover:text-[#00C8FF] transition-colors">E-Commerce</a></li>
                                            <li><a href="/industries/logistics" className="hover:text-[#00C8FF] transition-colors">Logistics</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Company</h3>
                                        <ul className="space-y-3 text-sm text-[#94A3B8]">
                                            <li><a href="/blog" className="hover:text-[#00C8FF] transition-colors">Blog</a></li>
                                            <li><a href="/free-ai-audit" className="hover:text-[#00C8FF] transition-colors">Free AI Audit</a></li>
                                            <li><a href="/roi-calculator" className="hover:text-[#00C8FF] transition-colors">ROI Calculator</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: 2-Step Form */}
                        <div className="bg-[#1E293B]/30 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl relative">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">Request Free Audit</h2>
                            <p className="text-[#94A3B8] text-xs sm:text-sm md:text-base mb-6">Find out exactly where your business is bleeding time and money.</p>

                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] sm:text-xs font-medium text-[#94A3B8] uppercase">Step {step} of 2</span>
                                    <span className="text-[10px] sm:text-xs font-medium text-[#00C8FF] uppercase">{step === 1 ? 'Contact Info' : 'Business Details'}</span>
                                </div>
                                <div className="w-full bg-[#0F172A] rounded-full h-1.5">
                                    <div className={`bg-[#00C8FF] h-1.5 rounded-full transition-all duration-500 ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
                                </div>
                            </div>

                            <form className="space-y-4 sm:space-y-6" onSubmit={step === 1 ? handleNext : handleSubmit}>
                                {step === 1 ? (
                                    <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="group">
                                                <label className="block text-[10px] sm:text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1 ml-1">Name <span className="text-red-400">*</span></label>
                                                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all" />
                                            </div>
                                            <div className="group">
                                                <label className="block text-[10px] sm:text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1 ml-1">Work Email <span className="text-red-400">*</span></label>
                                                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@company.com" className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="group">
                                                <label className="block text-[10px] sm:text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1 ml-1">Company Name <span className="text-red-400">*</span></label>
                                                <input type="text" name="company" value={formData.company} onChange={handleChange} required placeholder="Acme Corp" className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all" />
                                            </div>
                                            <div className="group">
                                                <label className="block text-[10px] sm:text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1 ml-1">Website</label>
                                                <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://company.com" className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all" />
                                            </div>
                                        </div>
                                        <button type="submit" className="w-full bg-gradient-to-r from-[#00C8FF] to-[#3B82F6] text-white font-bold py-3 sm:py-4 rounded-xl hover:shadow-[0_0_30px_rgba(0,200,255,0.4)] transition-all flex items-center justify-center gap-2 group">
                                            Next Step
                                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="group">
                                                <label className="block text-[10px] sm:text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1 ml-1">Team Size <span className="text-red-400">*</span></label>
                                                <select required name="teamSize" value={formData.teamSize} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all appearance-none">
                                                    <option value="" disabled>Select...</option>
                                                    <option value="1-10">1-10</option>
                                                    <option value="11-50">11-50</option>
                                                    <option value="51-200">51-200</option>
                                                    <option value="200+">200+</option>
                                                </select>
                                            </div>
                                            <div className="group">
                                                <label className="block text-[10px] sm:text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1 ml-1">Monthly Revenue <span className="text-red-400">*</span></label>
                                                <select required name="monthlyRevenue" value={formData.monthlyRevenue} onChange={handleChange} className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all appearance-none">
                                                    <option value="" disabled>Select...</option>
                                                    <option value="<$10k">&lt;$10k</option>
                                                    <option value="$10k-$50k">$10k - $50k</option>
                                                    <option value="$50k-$200k">$50k - $200k</option>
                                                    <option value="$200k+">$200k+</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="group">
                                            <label className="block text-[10px] sm:text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1 ml-1">Biggest Bottleneck <span className="text-red-400">*</span></label>
                                            <textarea required name="painPoints" value={formData.painPoints} onChange={handleChange} placeholder="E.g., We spend 20 hours a week on manual data entry..." rows="3" className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all resize-none"></textarea>
                                        </div>
                                        <div className="flex gap-3">
                                            <button type="button" onClick={handleBack} className="w-1/3 bg-transparent border border-white/20 text-white font-medium py-3 sm:py-4 rounded-xl hover:bg-white/5 transition-colors">
                                                Back
                                            </button>
                                            <button type="submit" disabled={isSubmitting} className="w-2/3 bg-gradient-to-r from-[#00C8FF] to-[#3B82F6] text-white font-bold py-3 sm:py-4 rounded-xl hover:shadow-[0_0_30px_rgba(0,200,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                                                {isSubmitting ? 'Sending...' : 'Get Free Audit'}
                                                <Send className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-4 sm:pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-[#94A3B8] text-xs sm:text-sm">
                        <p>&copy; {new Date().getFullYear()} AIFLOWIX. All rights reserved.</p>
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
                            <button onClick={() => setShowPrivacy(true)} className="hover:text-[#00C8FF] transition-colors">Privacy Policy</button>
                            <button onClick={() => setShowTerms(true)} className="hover:text-[#00C8FF] transition-colors">Terms of Service</button>
                            <button onClick={() => setShowCookie(true)} className="hover:text-[#00C8FF] transition-colors">Cookie Policy</button>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default ContactFooter;
