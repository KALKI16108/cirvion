import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'
          }`}
      >
        <div className={`container mx-auto px-6 transition-all duration-300 ${isScrolled ? 'max-w-6xl' : ''
          }`}>
          <div className={`rounded-full px-6 py-3 flex justify-between items-center transition-all duration-300 ${isScrolled
            ? 'bg-[#0F172A]/80 backdrop-blur-md border border-white/10 shadow-lg'
            : 'bg-transparent'
            }`}>

            {/* Logo */}
            <a href="#" className="flex items-center">
              <Logo className="h-8" />
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Services', 'Industries', 'Case Studies', 'About'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-sm font-medium text-[#CBD5E1] hover:text-white transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00C8FF] transition-all group-hover:w-full"></span>
                </a>
              ))}

              <a href="#contact" className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full font-semibold text-sm transition-all border border-white/10">
                Book Audit
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
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
            className="fixed inset-0 z-40 bg-[#0F172A] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              {['Services', 'Industries', 'Case Studies', 'About'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-2xl font-medium text-white hover:text-[#00C8FF]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a href="#contact" className="btn-primary w-full mt-8 block text-center py-3" onClick={() => setIsMobileMenuOpen(false)}>
                Book Audit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
