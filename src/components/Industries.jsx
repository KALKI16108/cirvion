import React from 'react';
import { Stethoscope, Building2, Landmark, ShoppingBag, GraduationCap, Briefcase, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const IndustryCard = ({ icon: Icon, name, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        whileHover={{ y: -5 }}
        className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-[#1E293B]/30 border border-white/5 hover:bg-[#1E293B]/60 hover:border-[#00C8FF]/30 transition-all duration-300 group cursor-default"
    >
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:bg-[#00C8FF]/20 transition-colors duration-300">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#64748B] group-hover:text-[#00C8FF] transition-colors duration-300" />
        </div>
        <span className="text-[#CBD5E1] font-medium text-xs sm:text-sm md:text-base lg:text-lg group-hover:text-white transition-colors text-center">{name}</span>
    </motion.div>
);

const Industries = () => {
    const industries = [
        { name: "Healthcare & Clinics", icon: Stethoscope },
        { name: "Real Estate", icon: Building2 },
        { name: "Finance & Insurance", icon: Landmark },
        { name: "Retail & E-commerce", icon: ShoppingBag },
        { name: "Education", icon: GraduationCap },
        { name: "Service Businesses", icon: Briefcase },
        { name: "Logistics", icon: Truck },
    ];

    return (
        <section id="industries" className="section relative">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-10 sm:mb-14 md:mb-20">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6">Industries We Transform</h2>
                    <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-[#00C8FF] to-transparent mx-auto rounded-full"></div>
                    {/* Screen-reader-only: clarifies where solutions apply (keeps visuals unchanged) */}
                    <p className="sr-only">Applicable industries include healthcare, real estate, finance, retail, education, services and logistics for workflow automation.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    {industries.map((ind, idx) => (
                        <IndustryCard key={idx} {...ind} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Industries;
