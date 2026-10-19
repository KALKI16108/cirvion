import React, { useState, useEffect } from 'react';
import { Calculator, HelpCircle, FileText, X, ArrowUpRight } from 'lucide-react';
import { trackCtaClick } from '../lib/analytics';

const StickyQuickBar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 350 && !isDismissed) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isDismissed]);

    if (!isVisible || isDismissed) return null;

    return (
        <aside
            aria-label="Quick action navigation bar"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg bg-[#0F172A]/90 backdrop-blur-xl border border-[#00C8FF]/30 p-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-between gap-2 transition-all animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
                <a
                    href="#contact"
                    onClick={() => trackCtaClick('Sticky Free Audit', 'Floating Quick Bar')}
                    className="px-3 py-1.5 bg-gradient-to-r from-[#00C8FF] to-[#3B82F6] text-white text-xs font-bold rounded-full flex items-center gap-1 hover:opacity-90 transition-all shrink-0"
                >
                    <FileText className="w-3.5 h-3.5" /> Free Audit
                </a>

                <a
                    href="/roi-calculator"
                    onClick={() => trackCtaClick('Sticky ROI Calculator', 'Floating Quick Bar')}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white text-xs font-medium rounded-full border border-white/10 flex items-center gap-1 transition-all shrink-0"
                >
                    <Calculator className="w-3.5 h-3.5 text-[#00C8FF]" /> Calculate ROI
                </a>

                <a
                    href="/ai-readiness"
                    onClick={() => trackCtaClick('Sticky Readiness Quiz', 'Floating Quick Bar')}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-[#CBD5E1] text-xs font-medium rounded-full border border-white/10 flex items-center gap-1 transition-all shrink-0 hidden sm:flex"
                >
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-400" /> AI Quiz
                </a>
            </div>

            <button
                onClick={() => setIsDismissed(true)}
                className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10 shrink-0 ml-1"
                aria-label="Dismiss quick bar"
            >
                <X className="w-3.5 h-3.5" />
            </button>
        </aside>
    );
};

export default StickyQuickBar;
