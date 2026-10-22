import React, { useState, useRef, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { trackFormStart, trackFormSubmit, trackBookCallClick } from '../lib/analytics';
import { getCalendarBookingUrl } from '../lib/booking';
import { submitAuditRequest } from '../lib/leads';

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
    if (!phone || typeof phone !== 'string' || phone.trim() === '') return true; // Optional field
    const cleaned = phone.trim();
    // Allow international format: optional +, then 6-25 characters of digits, spaces, hyphens, dots, parentheses
    const phoneRegex = /^(\+?[0-9\s\-().]{6,25})$/;
    return phoneRegex.test(cleaned);
};

const ContactFooter = () => {
    const location = useLocation();
    const isAuditPage = location.pathname === '/free-ai-audit';
    const calendarUrl = getCalendarBookingUrl();

    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showCookie, setShowCookie] = useState(false);
    
    // 2-step form state
    const [step, setStep] = useState(1);
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const formStartedRef = useRef(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!formStartedRef.current) {
            formStartedRef.current = true;
            trackFormStart('Free Audit Form (Footer)');
        }
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNext = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setSubmitStatus('');
        setErrorMessage('');

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
        setSubmitStatus('');
        setErrorMessage('');
        setStep(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return; // Prevent duplicate clicks

        const name = (formData.name || '').trim();
        const email = (formData.email || '').trim();
        const companyName = (formData.company_name || '').trim();
        const website = (formData.website || '').trim();
        const rawPhone = (formData.phone || '').trim();
        const teamSize = (formData.team_size || '').trim();
        const monthlyRevenue = (formData.monthly_revenue || '').trim();
        const biggestBottleneck = (formData.biggest_bottleneck || '').trim();

        // Verify Step 1 fields
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

        // Verify Step 2 fields
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

        // Track submission initiation in GA4
        trackFormSubmit('Free Audit Form (Footer)');

        setIsSubmitting(true);
        setSubmitStatus('');
        setErrorMessage('');

        try {
            // Direct call to statically imported submitAuditRequest (zero runtime dynamic import failure)
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
            setSubmitStatus('success');
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
            toast.success('Audit Request Sent! We will contact you within 24 hours.');
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
            let friendlyErr = error?.message || 'Unable to submit your request. Please try again.';
            if (/dynamically imported module|failed to fetch/i.test(friendlyErr)) {
                friendlyErr = 'A temporary network error occurred. Your details are preserved—please click Submit again.';
            }
            setErrorMessage(friendlyErr);
            toast.error(friendlyErr);
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

            <footer id="contact" className="bg-[#030712] border-t border-white/5 pt-10 sm:pt-12 lg:pt-16 pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-16 relative overflow-hidden">
                {/* Footer Glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-[#00C8FF]/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className={isAuditPage ? "max-w-4xl mx-auto mb-8 sm:mb-10" : "flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 mb-8 sm:mb-10 lg:mb-12"}>

                        {/* Left Column: Contact Info & Navigation (Order 2 on Mobile, Order 1 on Desktop) */}
                        <div className={isAuditPage ? "w-full" : "order-2 lg:order-1"}>
                            <div className="mb-6 sm:mb-8">
                                <p className="text-[#94A3B8] text-xs sm:text-sm max-w-md leading-relaxed">
                                    Empowering scaling businesses worldwide with intelligent custom AI & workflow automation.
                                </p>
                                <p className="sr-only">Contact AIFLOWIX for a free automation audit and practical roadmap to reduce manual work.</p>
                            </div>

                            <div className="space-y-4 sm:space-y-6 md:space-y-8 mb-8 sm:mb-10 md:mb-12">
                                <div className="flex items-start gap-3 sm:gap-4 md:gap-6 group cursor-default">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-[#1E293B] border border-white/5 flex items-center justify-center group-hover:bg-[#00C8FF] group-hover:border-[#00C8FF] transition-all duration-300 shadow-lg flex-shrink-0">
                                        <MapPin className="text-[#00C8FF] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">Global Delivery & HQ</h3>
                                        <p className="text-[#94A3B8] text-xs sm:text-sm md:text-base">Mumbai, India • Serving US, UK, Canada, UAE & Worldwide</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 sm:gap-4 md:gap-6 group cursor-default">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-[#1E293B] border border-white/5 flex items-center justify-center group-hover:bg-[#00C8FF] group-hover:border-[#00C8FF] transition-all duration-300 shadow-lg flex-shrink-0">
                                        <Mail className="text-[#00C8FF] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">Email Us</h3>
                                        <a href="mailto:solutions@aiflowix.in" className="text-[#94A3B8] hover:text-[#00C8FF] transition-colors text-xs sm:text-sm md:text-base break-all">solutions@aiflowix.in</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 sm:gap-4 md:gap-6 group cursor-default">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-[#1E293B] border border-white/5 flex items-center justify-center group-hover:bg-[#00C8FF] group-hover:border-[#00C8FF] transition-all duration-300 shadow-lg flex-shrink-0">
                                        <Phone className="text-[#00C8FF] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">WhatsApp & Direct Line</h3>
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
                                            <li><Link to="/whatsapp-automation" className="hover:text-[#00C8FF] transition-colors">WhatsApp Automation</Link></li>
                                            <li><Link to="/workflow-automation-services" className="hover:text-[#00C8FF] transition-colors">Workflow Automation</Link></li>
                                            <li><Link to="/crm-development" className="hover:text-[#00C8FF] transition-colors">CRM Automation</Link></li>
                                            <li><Link to="/voice-ai-agents" className="hover:text-[#00C8FF] transition-colors">Voice AI Agents</Link></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Industries</h3>
                                        <ul className="space-y-3 text-sm text-[#94A3B8]">
                                            <li><Link to="/real-estate-automation" className="hover:text-[#00C8FF] transition-colors">Real Estate</Link></li>
                                            <li><Link to="/healthcare-automation" className="hover:text-[#00C8FF] transition-colors">Healthcare</Link></li>
                                            <li><Link to="/e-commerce-automation" className="hover:text-[#00C8FF] transition-colors">E-Commerce</Link></li>
                                            <li><Link to="/logistics-automation" className="hover:text-[#00C8FF] transition-colors">Logistics</Link></li>
                                        </ul>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Company</h3>
                                        <ul className="space-y-3 text-sm text-[#94A3B8]">
                                            <li><Link to="/blog" className="hover:text-[#00C8FF] transition-colors">Blog</Link></li>
                                            <li><Link to="/free-ai-audit" className="hover:text-[#00C8FF] transition-colors">Free AI Audit</Link></li>
                                            <li><Link to="/roi-calculator" className="hover:text-[#00C8FF] transition-colors">ROI Calculator</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: 2-Step Form (Order 1 on Mobile, Order 2 on Desktop) */}
                        {!isAuditPage && (
                            <div className="order-1 lg:order-2 bg-[#1E293B]/30 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl relative">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">Request a Free AI Automation Audit</h2>
                                <p className="text-[#94A3B8] text-xs sm:text-sm md:text-base mb-4">Get a written technical review of your bottlenecks, integration scope, and automation roadmap from our senior engineers.</p>

                                {calendarUrl && (
                                    <div className="mb-6 p-3 rounded-xl bg-[#00C8FF]/10 border border-[#00C8FF]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                                        <span className="text-[#E2E8F0]">Prefer direct 1-on-1 scheduling?</span>
                                        <a
                                            href={calendarUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => trackBookCallClick('calendar', 'Footer Form Header')}
                                            className="inline-flex items-center gap-1 font-bold text-[#00C8FF] hover:underline whitespace-nowrap"
                                        >
                                            Book on Calendar &rarr;
                                        </a>
                                    </div>
                                )}

                                {submitStatus === 'success' ? (
                                    <div className="text-center py-8 sm:py-12 animate-in fade-in duration-300">
                                        <div className="w-16 h-16 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                            <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Audit Request Received!</h3>
                                        <p className="text-[#94A3B8] text-sm max-w-sm mx-auto mb-6">We'll review your details and reach out within 24 hours to schedule your free audit.</p>
                                        <button
                                            type="button"
                                            onClick={() => setSubmitStatus('')}
                                            className="text-xs sm:text-sm text-[#00C8FF] hover:underline transition-colors"
                                        >
                                            Submit another request
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-6">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[10px] sm:text-xs font-medium text-[#94A3B8] uppercase">Step {step} of 2</span>
                                                <span className="text-[10px] sm:text-xs font-medium text-[#00C8FF] uppercase">{step === 1 ? 'Contact Info' : 'Business Details'}</span>
                                            </div>
                                            <div className="w-full bg-[#0F172A] rounded-full h-1.5">
                                                <div className={`bg-[#00C8FF] h-1.5 rounded-full transition-all duration-500 ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
                                            </div>
                                        </div>

                                        {submitStatus === 'error' && errorMessage && (
                                            <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm">
                                                {errorMessage}
                                            </div>
                                        )}

                                        <form className="space-y-4 sm:space-y-6" onSubmit={step === 1 ? handleNext : handleSubmit}>
                                            {/* Web3Forms Honeypot for spam prevention */}
                                            <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                                            {step === 1 ? (
                                                <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="group">
                                                            <label htmlFor="footer-name" className="block text-[10px] sm:text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1 ml-1">Name <span className="text-red-400">*</span></label>
                                                            <input id="footer-name" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" aria-label="Full Name" className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all" />
                                                        </div>
                                                        <div className="group">
                                                            <label htmlFor="footer-email" className="block text-[10px] sm:text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1 ml-1">Work Email <span className="text-red-400">*</span></label>
                                                            <input id="footer-email" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@company.com" aria-label="Work Email" className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all" />
                                                        </div>
                                                    </div>
                                                    <div className="group">
                                                        <label htmlFor="footer-company" className="block text-[10px] sm:text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1 ml-1">Company Name <span className="text-red-400">*</span></label>
                                                        <input id="footer-company" type="text" name="company_name" value={formData.company_name} onChange={handleChange} required placeholder="Acme Corp" aria-label="Company Name" className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all" />
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="group">
                                                            <label htmlFor="footer-phone" className="block text-[10px] sm:text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1 ml-1">Phone Number (Optional)</label>
                                                            <div className="flex rounded-xl border border-white/10 bg-[#0F172A] focus-within:border-[#00C8FF] focus-within:ring-1 focus-within:ring-[#00C8FF] transition-all overflow-hidden">
                                                                <select
                                                                    name="country_code"
                                                                    value={formData.country_code || '+1'}
                                                                    onChange={handleChange}
                                                                    aria-label="Country Code"
                                                                    className="bg-[#1E293B] text-[11px] sm:text-xs text-[#94A3B8] px-2 py-3 border-r border-white/10 focus:outline-none cursor-pointer shrink-0"
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
                                                                    id="footer-phone"
                                                                    type="tel"
                                                                    name="phone"
                                                                    value={formData.phone}
                                                                    onChange={handleChange}
                                                                    placeholder="+1 415 555 0132"
                                                                    aria-label="Phone Number (Optional)"
                                                                    className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="group">
                                                            <label htmlFor="footer-website" className="block text-[10px] sm:text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1 ml-1">Website (Optional)</label>
                                                            <input id="footer-website" type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://company.com" aria-label="Website (Optional)" className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all" />
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
                                                            <label htmlFor="footer-team-size" className="block text-[10px] sm:text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1 ml-1">Team Size <span className="text-red-400">*</span></label>
                                                            <select id="footer-team-size" required name="team_size" value={formData.team_size} onChange={handleChange} aria-label="Team Size" className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all appearance-none">
                                                                <option value="" disabled>Select...</option>
                                                                <option value="1-10">1-10</option>
                                                                <option value="11-50">11-50</option>
                                                                <option value="51-200">51-200</option>
                                                                <option value="200+">200+</option>
                                                            </select>
                                                        </div>
                                                        <div className="group">
                                                            <label htmlFor="footer-monthly-revenue" className="block text-[10px] sm:text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1 ml-1">Monthly Revenue <span className="text-red-400">*</span></label>
                                                            <select id="footer-monthly-revenue" required name="monthly_revenue" value={formData.monthly_revenue} onChange={handleChange} aria-label="Monthly Revenue" className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all appearance-none">
                                                                <option value="" disabled>Select...</option>
                                                                <option value="<$10k">&lt;$10k</option>
                                                                <option value="$10k-$50k">$10k - $50k</option>
                                                                <option value="$50k-$200k">$50k - $200k</option>
                                                                <option value="$200k+">$200k+</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="group">
                                                        <label htmlFor="footer-bottleneck" className="block text-[10px] sm:text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1 ml-1">Biggest Bottleneck <span className="text-red-400">*</span></label>
                                                        <textarea id="footer-bottleneck" required name="biggest_bottleneck" value={formData.biggest_bottleneck} onChange={handleChange} placeholder="E.g., We spend 20 hours a week on manual data entry..." aria-label="Biggest Bottleneck" rows="3" className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all resize-none"></textarea>
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
                                    </>
                                )}
                            </div>
                        )}
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
