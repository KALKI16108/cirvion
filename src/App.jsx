import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatWeDo from './components/WhatWeDo';
import WhyCirvion from './components/WhyCirvion';
import Services from './components/Services';
import Industries from './components/Industries';
import CaseStudies from './components/CaseStudies';
import AboutUs from './components/AboutUs';
import CTA from './components/CTA';
import ContactFooter from './components/ContactFooter';

function App() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white selection:bg-[#00C8FF] selection:text-[#0F172A]">
      <Navbar />
      <main>
        <Hero />
        <WhatWeDo />
        <WhyCirvion />
        <Services />
        <Industries />
        <CaseStudies />
        <AboutUs />
        <CTA />
      </main>
      <ContactFooter />
    </div>
  );
}

export default App;
