import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Send } from 'lucide-react';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import CookiePolicy from './CookiePolicy';
import Logo from './Logo';

const ContactFooter = () => {
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showCookie, setShowCookie] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        business: '',
        phone: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            // Using Web3Forms - FREE service that sends form data to your email
            // Get your access key from: https://web3forms.com
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: '764755b8-1e72-4cb2-a43d-b4630d2877df', // Replace with your actual key
                    name: formData.name,
                    business: formData.business,
                    phone: formData.phone,
                    email: formData.email,
                    message: formData.message,
                    subject: `New Contact Form Submission from ${formData.name}`,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success');
                setFormData({ name: '', business: '', phone: '', email: '', message: '' });
                alert('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.');
            } else {
                setSubmitStatus('error');
                alert('Oops! Something went wrong. Please try again or email us directly at siddhantpitale125@gmail.com');
            }
        } catch (error) {
            setSubmitStatus('error');
            alert('Oops! Something went wrong. Please try again or email us directly at siddhantpitale125@gmail.com');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
            {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
            {showCookie && <CookiePolicy onClose={() => setShowCookie(false)} />}

            <footer id="contact" className="bg-[#030712] border-t border-white/5 pt-32 pb-12 relative overflow-hidden">
                {/* Footer Glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#00C8FF]/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-24 mb-24">

                        {/* Left Column: Contact Info */}
                        <div>
                            <div className="mb-12">
                                <a href="#" className="flex items-center mb-6">
                                    <Logo className="h-10" />
                                </a>
                                <p className="text-[#94A3B8] text-lg max-w-md leading-relaxed">
                                    Empowering businesses with intelligent automation.
                                    Stop working in your business, start working on it.
                                </p>
                            </div>

                            <div className="space-y-8 mb-12">
                                <div className="flex items-start gap-6 group cursor-default">
                                    <div className="w-14 h-14 rounded-2xl bg-[#1E293B] border border-white/5 flex items-center justify-center group-hover:bg-[#00C8FF] group-hover:border-[#00C8FF] transition-all duration-300 shadow-lg">
                                        <MapPin className="text-[#00C8FF] w-6 h-6 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-1">Headquarters</h4>
                                        <p className="text-[#94A3B8]">Mumbai, India</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group cursor-default">
                                    <div className="w-14 h-14 rounded-2xl bg-[#1E293B] border border-white/5 flex items-center justify-center group-hover:bg-[#00C8FF] group-hover:border-[#00C8FF] transition-all duration-300 shadow-lg">
                                        <Mail className="text-[#00C8FF] w-6 h-6 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-1">Email Us</h4>
                                        <p className="text-[#94A3B8]">siddhantpitale125@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group cursor-default">
                                    <div className="w-14 h-14 rounded-2xl bg-[#1E293B] border border-white/5 flex items-center justify-center group-hover:bg-[#00C8FF] group-hover:border-[#00C8FF] transition-all duration-300 shadow-lg">
                                        <Phone className="text-[#00C8FF] w-6 h-6 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-1">WhatsApp</h4>
                                        <p className="text-[#94A3B8]">+91 99307 44723</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-white font-semibold mb-6">Connect With Us</h4>
                                <div className="flex gap-4">
                                    <a href="#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#1E293B] border border-white/5 flex items-center justify-center text-[#94A3B8] hover:bg-[#00C8FF] hover:text-white hover:border-[#00C8FF] transition-all duration-300 hover:-translate-y-1 shadow-lg">
                                        <Linkedin size={20} />
                                    </a>
                                    <a href="#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#1E293B] border border-white/5 flex items-center justify-center text-[#94A3B8] hover:bg-[#00C8FF] hover:text-white hover:border-[#00C8FF] transition-all duration-300 hover:-translate-y-1 shadow-lg">
                                        <Twitter size={20} />
                                    </a>
                                    <a href="https://www.instagram.com/circuit.vision.ai/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#1E293B] border border-white/5 flex items-center justify-center text-[#94A3B8] hover:bg-[#00C8FF] hover:text-white hover:border-[#00C8FF] transition-all duration-300 hover:-translate-y-1 shadow-lg">
                                        <Instagram size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Form */}
                        <div className="bg-[#1E293B]/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                            <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
                            <p className="text-[#94A3B8] mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2 ml-1">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all placeholder:text-slate-700"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2 ml-1">Business</label>
                                        <input
                                            type="text"
                                            name="business"
                                            value={formData.business}
                                            onChange={handleChange}
                                            placeholder="Company Ltd."
                                            className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all placeholder:text-slate-700"
                                        />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2 ml-1">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all placeholder:text-slate-700"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2 ml-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                            className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all placeholder:text-slate-700"
                                        />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2 ml-1">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Tell us about your automation goals..."
                                        rows="4"
                                        className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00C8FF] focus:ring-1 focus:ring-[#00C8FF] transition-all placeholder:text-slate-700 resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-[#00C8FF] to-[#3B82F6] text-white font-bold py-5 rounded-xl hover:shadow-[0_0_30px_rgba(0,200,255,0.4)] transition-all flex items-center justify-center gap-2 group transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[#64748B] text-sm">
                        <p>&copy; {new Date().getFullYear()} CIRVION. All rights reserved.</p>
                        <div className="flex gap-8">
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
