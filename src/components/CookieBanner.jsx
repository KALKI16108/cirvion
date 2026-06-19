import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check local storage to see if consent was already handled
    const consent = localStorage.getItem('cookie_consent');
    
    if (!consent) {
      // Show the banner if no choice was made
      setIsVisible(true);
    } else if (consent === 'granted') {
      // If already granted, immediately tell Google Analytics it's allowed
      grantConsent();
    }
  }, []);

  const grantConsent = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'granted');
    grantConsent();
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Leave the default 'denied' state alone, just hide the banner
    localStorage.setItem('cookie_consent', 'denied');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto bg-[#0F172A]/95 backdrop-blur-xl border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 shadow-2xl shadow-black/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#00C8FF]/10 p-3 rounded-full shrink-0">
                <Cookie className="w-6 h-6 text-[#00C8FF]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">We value your privacy</h3>
                <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
            </div>
            
            <div className="flex flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={handleDecline}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-full border border-[rgba(255,255,255,0.2)] text-gray-300 font-medium text-sm hover:bg-white/5 hover:text-white transition-all duration-300"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00C8FF] to-[#0080FF] text-white font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,200,255,0.4)] transition-all duration-300"
              >
                Accept All
              </button>
              <button 
                onClick={handleDecline}
                className="p-2 text-gray-500 hover:text-white transition-colors ml-2 hidden sm:block"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
