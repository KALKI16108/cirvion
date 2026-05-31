import React from 'react';
import Hero from '../components/Hero';
import WhatWeDo from '../components/WhatWeDo';
import WhyAiflowix from '../components/WhyAiflowix';
import Services from '../components/Services';
import Industries from '../components/Industries';
import CaseStudies from '../components/CaseStudies';
import AboutUs from '../components/AboutUs';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <main>
      <Hero />
      <WhatWeDo />
      <WhyAiflowix />
      <Services />
      <Industries />
      <CaseStudies />
      <AboutUs />
      <CTA />
    </main>
  );
};

export default Home;
