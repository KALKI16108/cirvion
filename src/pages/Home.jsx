import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import DeliveryProcess from '../components/DeliveryProcess';
import CaseStudies from '../components/CaseStudies';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <main>
      <Hero />
      <Services />
      <DeliveryProcess />
      <CaseStudies />
      <FAQ />
      <CTA />
    </main>
  );
};

export default Home;
