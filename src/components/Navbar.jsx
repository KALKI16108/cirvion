import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-4 sm:pt-6`}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className={`rounded-full px-6 py-3 flex justify-between items-center transition-all duration-500 border ${isScrolled
            ? 'bg-[#030712]/70 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border-transparent'
            }`}>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2" title="AIFLOWIX - Go to homepage">
              <Logo className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-all duration-300" />
              <span className="sr-only">AIFLOWIX Home</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {[
                { label: 'Services', href: '/#services' },
                { label: 'Industries', href: '/#industries' },
                { label: 'ROI Calculator', href: '/roi-calculator' },
                { label: 'Readiness Quiz', href: '/ai-readiness' },
                { label: 'Blog', href: '/blog' }
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-sm font-medium text-[#CBD5E1] hover:text-[#00C8FF] transition-colors relative group py-2"
                  title={`Navigate to ${item.label}`}
                  aria-label={`Go to ${item.label}`}
                >
                  {item.label}
                  <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-[#00C8FF] transition-all duration-300 ease-out group-hover:w-full rounded-full" aria-hidden="true"></span>
                </Link>
              ))}

              <Link to="/free-ai-audit" className="bg-white/10 hover:bg-[#00C8FF] hover:text-black text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 border border-white/10 hover:border-[#00C8FF] shadow-[0_0_15px_rgba(0,200,255,0.1)] hover:shadow-[0_0_25px_rgba(0,200,255,0.4)]">
                Book Audit
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0F172A] pt-24 px-6 lg:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              {[
                { label: 'Services', href: '/#services' },
                { label: 'Industries', href: '/#industries' },
                { label: 'ROI Calculator', href: '/roi-calculator' },
                { label: 'Readiness Quiz', href: '/ai-readiness' },
                { label: 'Blog', href: '/blog' }
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-2xl font-medium text-white hover:text-[#00C8FF]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/free-ai-audit" className="btn-primary w-full mt-8 block text-center py-3" onClick={() => setIsMobileMenuOpen(false)}>
                Book Audit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
