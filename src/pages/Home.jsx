import React from 'react';
import SEOHead from '../components/SEOHead';
import Hero from '../components/Hero';
import Services from '../components/Services';
import CaseStudies from '../components/CaseStudies';
import DeliveryProcess from '../components/DeliveryProcess';
import EngineeringPrinciples from '../components/EngineeringPrinciples';
import InteractiveRoiCalculator from '../components/InteractiveRoiCalculator';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

const Home = () => {
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'AIFlowix',
    'url': 'https://aiflowix.in',
    'description': 'AI workflow automation, custom AI agents, WhatsApp automation, and custom software engineering.',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://aiflowix.in/?s={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <main>
      <SEOHead 
        title="AIFlowix | AI Workflow Automation & Custom AI Software"
        description="We build custom AI agents, automated workflow pipelines, WhatsApp bots, and CRM integrations for scaling companies in the US, UK, Canada, Australia, UAE, and India."
        canonical="/"
        schema={homeSchema}
      />
      {/* 1. Hero with headline, supporting explanation, dominant primary CTA, and distinct secondary action */}
      <Hero />

      {/* 2. Relevant services and business problems solved */}
      <Services />

      {/* 3. Practical automation use cases (Industry Blueprints) */}
      <CaseStudies />

      {/* 4. How engagement and delivery work (Milestone roadmap) */}
      <DeliveryProcess />

      {/* 5. Verified trust signals and engineering principles */}
      <EngineeringPrinciples />

      {/* 6. Relevant interactive ROI calculator tool */}
      <InteractiveRoiCalculator />

      {/* 7. Concise FAQs addressing common buying concerns */}
      <FAQ />

      {/* 8. One clear final conversion section */}
      <CTA />
    </main>
  );
};

export default Home;
