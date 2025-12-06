import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const CookiePolicy = ({ onClose }) => {
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
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Cookie Policy</h1>
                            <p className="text-[#94A3B8] mb-12">Last updated: December 12, 2025</p>

                            <div className="space-y-8 text-[#CBD5E1]">
                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">1. What Are Cookies?</h2>
                                    <p className="leading-relaxed">
                                        Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">2. Types of Cookies We Use</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">Essential Cookies</h3>
                                            <p className="leading-relaxed">
                                                These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">Analytics Cookies</h3>
                                            <p className="leading-relaxed">
                                                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's performance and user experience.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">Functionality Cookies</h3>
                                            <p className="leading-relaxed">
                                                These cookies allow the website to remember choices you make (such as your language or region) and provide enhanced, more personalized features.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Cookies</h2>
                                    <p className="leading-relaxed mb-4">We use cookies to:</p>
                                    <ul className="space-y-2 ml-6">
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Keep you signed in (if applicable)</li>
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Understand and analyze how you use our website</li>
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Remember your preferences and settings</li>
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Improve website performance and user experience</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Cookies</h2>
                                    <p className="leading-relaxed">
                                        We may use third-party services (such as Google Analytics) that also use cookies. These third parties have their own privacy policies and cookie policies, which we encourage you to review.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">5. Managing Cookies</h2>
                                    <p className="leading-relaxed mb-4">
                                        You can control and manage cookies in various ways:
                                    </p>
                                    <ul className="space-y-2 ml-6">
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span><strong className="text-white">Browser Settings:</strong> Most browsers allow you to refuse or accept cookies through their settings</li>
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span><strong className="text-white">Delete Cookies:</strong> You can delete cookies that have already been set</li>
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span><strong className="text-white">Block Cookies:</strong> You can block future cookies from being set</li>
                                    </ul>
                                    <p className="leading-relaxed mt-4 text-[#94A3B8]">
                                        Please note that blocking or deleting cookies may impact your experience on our website and some features may not function properly.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">6. Updates to This Policy</h2>
                                    <p className="leading-relaxed">
                                        We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
                                    <p className="leading-relaxed">
                                        If you have any questions about our use of cookies, please contact us at:<br />
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

export default CookiePolicy;
