import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ quote, author, role, company, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="glass-card rounded-2xl p-8 relative flex flex-col h-full"
    >
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#00C8FF] to-[#6366F1] rounded-full flex items-center justify-center opacity-20">
            <Quote className="w-5 h-5 text-white" />
        </div>
        
        <div className="flex gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-[#00C8FF] text-[#00C8FF]" />
            ))}
        </div>

        <blockquote className="text-lg text-white/90 leading-relaxed mb-8 flex-grow">
            "{quote}"
        </blockquote>

        <div className="flex items-center gap-4 mt-auto">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/10 flex items-center justify-center text-white font-bold text-lg">
                {author.charAt(0)}
            </div>
            <div>
                <div className="text-white font-semibold">{author}</div>
                <div className="text-[#94A3B8] text-sm">{role}, <span className="text-[#00C8FF]">{company}</span></div>
            </div>
        </div>
    </motion.div>
);

const Testimonials = () => {
    return (
        <section className="section bg-[#0F172A] relative overflow-hidden py-24">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00C8FF]/5 rounded-full blur-[100px] -translate-y-1/2"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10">
                        <span className="text-sm font-medium text-[#CBD5E1]">Client Success</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Trusted by Industry Leaders</h2>
                    <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
                        Don't just take our word for it. See what our enterprise clients have to say about the ROI of our custom automation solutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <TestimonialCard 
                        quote="AIFlowix completely transformed how we handle inbound inquiries. Their lead qualification AI reduced our sales cycle by 40% and freed up our SDRs to focus entirely on closing."
                        author="Rahul S."
                        role="VP of Sales"
                        company="TechCorp India"
                        delay={0.1}
                    />
                    <TestimonialCard 
                        quote="The custom WhatsApp automation they built for our clinic handles 80% of patient rescheduling automatically. It paid for itself in the first 3 weeks."
                        author="Priya M."
                        role="Operations Director"
                        company="HealthPlus"
                        delay={0.2}
                    />
                    <TestimonialCard 
                        quote="We were drowning in manual data entry across three different CRMs. AIFlowix built a unified automation layer that saves my team over 40 hours every single week."
                        author="Amit J."
                        role="CEO"
                        company="Logistics Pro"
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
