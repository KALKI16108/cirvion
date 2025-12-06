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
        className="flex flex-col items-center justify-center p-8 rounded-2xl bg-[#1E293B]/30 border border-white/5 hover:bg-[#1E293B]/60 hover:border-[#00C8FF]/30 transition-all duration-300 group cursor-default"
    >
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[#00C8FF]/20 transition-colors duration-300">
            <Icon className="w-8 h-8 text-[#64748B] group-hover:text-[#00C8FF] transition-colors duration-300" />
        </div>
        <span className="text-[#CBD5E1] font-medium text-lg group-hover:text-white transition-colors">{name}</span>
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
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Industries We Transform</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#00C8FF] to-transparent mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {industries.map((ind, idx) => (
                        <IndustryCard key={idx} {...ind} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Industries;
