import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPolicy = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] bg-[#030712] overflow-y-auto">
            <div className="min-h-screen py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 text-[#00C8FF] hover:text-white transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </button>

                        <div className="glass-card p-8 md:p-12 rounded-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
                            <p className="text-[#94A3B8] mb-12">Last updated: December 12, 2025</p>

                            <div className="space-y-8 text-[#CBD5E1]">
                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                                    <p className="leading-relaxed">
                                        CIRVION ("we," "our," "us") respects your privacy and is committed to protecting it. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                                    <p className="leading-relaxed mb-4">We may collect the following types of information:</p>
                                    <ul className="space-y-3 ml-6">
                                        <li className="flex gap-3">
                                            <span className="text-[#00C8FF] mt-1">•</span>
                                            <span><strong className="text-white">Personal Information:</strong> Name, email address, phone number, company name, or any information you voluntarily provide when contacting us or using our services.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-[#00C8FF] mt-1">•</span>
                                            <span><strong className="text-white">Usage Data:</strong> IP address, browser type, pages visited, time spent on pages, and device details.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-[#00C8FF] mt-1">•</span>
                                            <span><strong className="text-white">Cookies:</strong> Basic cookies to improve website functionality and user experience.</span>
                                        </li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                                    <p className="leading-relaxed mb-4">We use your information to:</p>
                                    <ul className="space-y-2 ml-6">
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Provide and improve our services</li>
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Respond to inquiries and support requests</li>
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Communicate important updates</li>
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Analyze usage to improve performance</li>
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Comply with legal obligations</li>
                                    </ul>
                                    <p className="leading-relaxed mt-4 font-semibold text-white">We do not sell or rent your personal data.</p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">4. Data Protection</h2>
                                    <p className="leading-relaxed">
                                        We use reasonable technical and organizational measures to protect your information. However, no system is 100% secure, so absolute security is not guaranteed.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
                                    <p className="leading-relaxed">
                                        We may use third-party tools (analytics, automation platforms, hosting providers). These services may have access to limited data only to perform their functions and are bound by their own privacy policies.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
                                    <p className="leading-relaxed mb-4">You may:</p>
                                    <ul className="space-y-2 ml-6">
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Request access to your data</li>
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Request correction or deletion</li>
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Withdraw consent where applicable</li>
                                    </ul>
                                    <p className="leading-relaxed mt-4">
                                        To exercise these rights, contact us at <a href="mailto:siddhantpitale125@gmail.com" className="text-[#00C8FF] hover:underline">siddhantpitale125@gmail.com</a>
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">7. Changes to This Policy</h2>
                                    <p className="leading-relaxed">
                                        We may update this Privacy Policy at any time. Continued use of our services means you accept the updated policy.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">8. Contact</h2>
                                    <p className="leading-relaxed">
                                        For questions about this Privacy Policy, contact:<br />
                                        📧 <a href="mailto:siddhantpitale125@gmail.com" className="text-[#00C8FF] hover:underline">siddhantpitale125@gmail.com</a>
                                    </p>
                                </section>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
