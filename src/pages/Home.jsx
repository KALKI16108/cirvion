import React from 'react';
import Hero from '../components/Hero';
import WhyAiflowix from '../components/WhyAiflowix';
import Services from '../components/Services';
import Industries from '../components/Industries';
import FAQ from '../components/FAQ';

const Home = () => {
  return (
    <main>
      <Hero />
      <WhyAiflowix />
      <Services />
      <Industries />
      <FAQ />
    </main>
  );
};

export default Home;
