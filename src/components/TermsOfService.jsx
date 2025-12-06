import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const TermsOfService = ({ onClose }) => {
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
                            {/* Use h2 here to keep single main page H1 while preserving visual size/classes */}
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h2>
                            <p className="text-[#94A3B8] mb-12">Last updated: December 12, 2025</p>

                            <div className="space-y-8 text-[#CBD5E1]">
                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                                    <p className="leading-relaxed">
                                        By accessing or using the CIRVION website or services, you agree to these Terms of Service. If you do not agree, do not use our services.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
                                    <p className="leading-relaxed">
                                        CIRVION provides AI & automation consulting services including workflow automation, AI system setup, and technical advisory. Services may change or evolve over time.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">3. Use of Website</h2>
                                    <p className="leading-relaxed mb-4">You agree not to:</p>
                                    <ul className="space-y-2 ml-6">
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Use the site for illegal activities</li>
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Attempt to access restricted systems</li>
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Copy or misuse content without permission</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
                                    <p className="leading-relaxed">
                                        All content, branding, logos, and materials are owned by CIRVION unless stated otherwise. Unauthorized use is prohibited.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">5. Payments & Refunds</h2>
                                    <ul className="space-y-2 ml-6">
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Payment terms are defined per project or agreement</li>
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Unless stated otherwise, payments are non-refundable once work has begun</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
                                    <p className="leading-relaxed mb-4">CIRVION is not responsible for:</p>
                                    <ul className="space-y-2 ml-6">
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Business losses</li>
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>Data loss due to third-party services</li>
                                        <li className="flex gap-3"><span className="text-[#00C8FF] mt-1">•</span>System downtime or indirect damages</li>
                                    </ul>
                                    <p className="leading-relaxed mt-4 font-semibold text-white">
                                        All services are provided "as is" without guarantees of specific outcomes.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">7. Termination</h2>
                                    <p className="leading-relaxed">
                                        We reserve the right to suspend or terminate access if these terms are violated.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
                                    <p className="leading-relaxed">
                                        These Terms are governed by the laws of India.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">9. Changes to Terms</h2>
                                    <p className="leading-relaxed">
                                        We may update these Terms at any time. Continued use means acceptance of the revised terms.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-white mb-4">10. Contact</h2>
                                    <p className="leading-relaxed">
                                        For questions regarding these Terms, contact:<br />
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

export default TermsOfService;
