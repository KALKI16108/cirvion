import React from 'react';
import Hero from '../components/Hero';
import WhyAiflowix from '../components/WhyAiflowix';
import Services from '../components/Services';
import CaseStudies from '../components/CaseStudies';
import DeliveryProcess from '../components/DeliveryProcess';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <main>
      <Hero />
      <WhyAiflowix />
      <Services />
      <CaseStudies />
      <DeliveryProcess />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
};

export default Home;
