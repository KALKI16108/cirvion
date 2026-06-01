import React from 'react';
import Hero from '../components/Hero';
import WhyAiflowix from '../components/WhyAiflowix';
import Services from '../components/Services';
import Industries from '../components/Industries';
import CaseStudies from '../components/CaseStudies';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <main>
      <Hero />
      <WhyAiflowix />
      <Services />
      <Industries />
      <CaseStudies />
      <CTA />
    </main>
  );
};

export default Home;
