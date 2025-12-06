import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutUs = () => {
    return (
        <section id="about" className="section relative overflow-hidden bg-[#030712]">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#00C8FF]/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#6366F1]/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block px-4 py-1 mb-6 border border-[#00C8FF]/30 rounded-full bg-[#00C8FF]/10">
                            <span className="text-[#00C8FF] text-sm font-bold tracking-wider uppercase">Who We Are</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                            Engineering the <br />
                            <span className="text-gradient-primary">Future of Work.</span>
                        </h2>

                        <p className="text-lg text-[#94A3B8] leading-relaxed mb-8">
                            CIRVION isn't just an automation agency. We are architects of efficiency.
                            We dissect complex business processes and rebuild them with intelligent AI systems
                            that operate with zero friction and infinite scalability.
                        </p>

                        <div className="space-y-6 mb-10">
                            {[
                                { title: "100% Tailored Solutions", desc: "No templates. Every system is built for your specific workflow." },
                                { title: "Expert Process Engineering", desc: "We optimize before we automate to ensure maximum efficiency." },
                                { title: "High-Quality System Design", desc: "Enterprise-grade architecture that scales with your growth." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-[#1E293B] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-[#00C8FF]/50 transition-colors">
                                        <Check className="w-6 h-6 text-[#00C8FF]" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{item.title}</h4>
                                        <p className="text-[#64748B] text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a href="#contact" className="btn-secondary flex items-center gap-2 group inline-flex px-6 py-3">
                            Get in Touch
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>

                    {/* Visual Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0F172A]">
                            {/* Abstract Code/Flow Visual */}
                            <div className="absolute inset-0 bg-grid opacity-20"></div>
                            <div className="p-8 md:p-12 relative z-10">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="text-xs text-[#64748B] font-mono">system_core.py</div>
                                </div>

                                <div className="space-y-4 font-mono text-sm">
                                    <div className="flex gap-4">
                                        <span className="text-[#64748B]">01</span>
                                        <span className="text-[#C678DD]">class</span> <span className="text-[#E5C07B]">CirvionAutomator</span>:
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-[#64748B]">02</span>
                                        <span className="pl-4 text-[#C678DD]">def</span> <span className="text-[#61AFEF]">optimize_workflow</span>(self, <span className="text-[#D19A66]">data</span>):
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-[#64748B]">03</span>
                                        <span className="pl-8 text-[#E06C75]">if</span> <span className="text-[#D19A66]">data</span>.inefficiency &gt; <span className="text-[#D19A66]">0</span>:
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-[#64748B]">04</span>
                                        <span className="pl-12 text-[#C678DD]">return</span> self.<span className="text-[#61AFEF]">deploy_agent</span>(<span className="text-[#98C379]">'efficiency_bot'</span>)
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-[#64748B]">05</span>
                                        <span className="pl-8 text-[#E06C75]">else</span>:
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-[#64748B]">06</span>
                                        <span className="pl-12 text-[#C678DD]">return</span> <span className="text-[#98C379]">'System Optimized'</span>
                                    </div>
                                </div>

                                <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                                    <div>
                                        <div className="text-[#64748B] text-xs uppercase tracking-wider mb-1">System Status</div>
                                        <div className="text-[#00C8FF] font-bold flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-[#00C8FF] animate-pulse"></span>
                                            Operational
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[#64748B] text-xs uppercase tracking-wider mb-1">Efficiency Gain</div>
                                        <div className="text-white font-bold text-xl">+450%</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-[#1E293B] border border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <Check className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm">Task Completed</div>
                                    <div className="text-[#64748B] text-xs">Just now</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
