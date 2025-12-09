import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronRight, Zap, Cpu, Activity } from 'lucide-react';
import VideoModal from './VideoModal';

const Hero = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#030712]">
            <VideoModal
                isOpen={isVideoOpen}
                onClose={() => setIsVideoOpen(false)}
                videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" // Replace with your actual video URL
            />

            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0 bg-grid opacity-20"></div>

            {/* Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#00C8FF]/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#00C8FF]/50 transition-colors cursor-default"
                    >
                        <Zap className="w-4 h-4 text-[#00C8FF] fill-current" />
                        <span className="text-sm font-medium text-[#CBD5E1] tracking-wide">Next-Gen AI Automation</span>
                    </motion.div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-8 tracking-tight leading-[1.1]">
                        <span className="block text-white">Smarter Workflows,</span>
                        <span className="text-gradient-primary">Faster Growth.</span>
                        {/* Screen-reader clarification: keeps visual headline unchanged but adds explicit service intent for SEO and accessibility */}
                        <span className="sr-only">AIFLOWIX — AI & automation consultancy delivering business workflow automation and custom AI systems.</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#94A3B8] max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed font-light px-4">
                        We engineer intelligent automation systems that eliminate repetitive tasks,
                        accelerate operations, and empower your business to scale effortlessly.
                    </p>
                    {/* One-line SEO/problem statement (screen-reader-only to avoid visual change): clarifies the problem we solve */}
                    <p className="sr-only">We solve slow, repetitive business workflows by implementing custom AI-driven automation.</p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary flex items-center gap-3 group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto justify-center"
                        >
                            Book Free Audit
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.a>

                        <motion.button
                            onClick={() => setIsVideoOpen(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-secondary flex items-center gap-3 group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto justify-center"
                        >
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                <Play className="w-4 h-4 fill-white" />
                            </div>
                            See How It Works
                        </motion.button>
                    </div>
                </motion.div>

                {/* Dashboard Preview / Visual Anchor - Hidden on small mobile for cleaner experience */}
                <motion.div
                    initial={{ opacity: 0, y: 100, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.4, duration: 1, type: "spring" }}
                    className="mt-12 sm:mt-16 md:mt-24 relative mx-auto max-w-5xl perspective-1000 hidden sm:block"
                >
                    <div className="relative rounded-xl sm:rounded-2xl bg-[#0F172A]/90 border border-white/10 p-1 sm:p-2 backdrop-blur-xl shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#00C8FF]/5 to-transparent pointer-events-none"></div>

                        {/* Mock UI Header */}
                        <div className="h-8 sm:h-10 md:h-12 border-b border-white/10 flex items-center justify-between px-3 sm:px-4 md:px-6 bg-[#030712]/50">
                            <div className="flex gap-1.5 sm:gap-2">
                                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="text-[10px] sm:text-xs text-[#64748B] font-mono">AIFLOWIX_DASHBOARD_V2.0</div>
                        </div>

                        {/* Mock UI Content */}
                        <div className="p-3 sm:p-4 md:p-8 grid grid-cols-12 gap-3 sm:gap-4 md:gap-6 h-[180px] sm:h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden text-left">
                            {/* Sidebar */}
                            <div className="col-span-3 border-r border-white/10 pr-3 sm:pr-4 md:pr-6 space-y-2 sm:space-y-3 md:space-y-4 hidden md:block">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="h-6 sm:h-8 md:h-10 rounded-lg bg-white/5 w-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                                ))}
                            </div>

                            {/* Main Content */}
                            <div className="col-span-12 md:col-span-9 space-y-3 sm:space-y-4 md:space-y-6">
                                <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-8">
                                    <div>
                                        <div className="h-2 sm:h-3 md:h-4 w-16 sm:w-24 md:w-32 bg-white/10 rounded mb-1 sm:mb-2"></div>
                                        <div className="h-4 sm:h-6 md:h-8 w-32 sm:w-48 md:w-64 bg-white/10 rounded"></div>
                                    </div>
                                    <div className="h-6 sm:h-8 md:h-10 w-16 sm:w-24 md:w-32 bg-[#00C8FF]/20 rounded-lg border border-[#00C8FF]/30"></div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-6 mb-3 sm:mb-4 md:mb-8">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-16 sm:h-20 md:h-32 rounded-lg sm:rounded-xl bg-[#1E293B]/50 border border-white/5 p-2 sm:p-3 md:p-4 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-1 sm:p-2 md:p-4 opacity-50">
                                                <Activity className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-[#00C8FF]" />
                                            </div>
                                            <div className="mt-auto absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4">
                                                <div className="h-3 sm:h-4 md:h-6 w-10 sm:w-12 md:w-16 bg-white/10 rounded mb-1 sm:mb-2"></div>
                                                <div className="h-2 sm:h-3 md:h-4 w-8 sm:w-10 md:w-12 bg-white/5 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="h-20 sm:h-28 md:h-48 rounded-lg sm:rounded-xl bg-[#1E293B]/50 border border-white/5 p-2 sm:p-4 md:p-6 relative hidden sm:block">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-[#00C8FF] font-mono text-[10px] sm:text-xs md:text-sm animate-pulse">Processing Real-Time Data...</div>
                                    </div>
                                    {/* Animated Graph Line */}
                                    <svg className="absolute bottom-0 left-0 w-full h-12 sm:h-16 md:h-24 stroke-[#00C8FF] stroke-2 fill-none opacity-50" viewBox="0 0 100 20" preserveAspectRatio="none">
                                        <path d="M0 20 Q 10 5 20 15 T 40 10 T 60 18 T 80 5 T 100 15" vectorEffect="non-scaling-stroke">
                                            <animate attributeName="d" dur="5s" repeatCount="indefinite" values="M0 20 Q 10 5 20 15 T 40 10 T 60 18 T 80 5 T 100 15; M0 20 Q 10 15 20 5 T 40 18 T 60 10 T 80 15 T 100 5; M0 20 Q 10 5 20 15 T 40 10 T 60 18 T 80 5 T 100 15" />
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reflection */}
                    <div className="absolute -bottom-10 sm:-bottom-16 md:-bottom-20 left-0 right-0 h-10 sm:h-16 md:h-20 bg-gradient-to-b from-[#00C8FF]/5 to-transparent blur-xl transform scale-y-[-1] opacity-50"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
