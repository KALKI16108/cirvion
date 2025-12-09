import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatWeDo from './components/WhatWeDo';
import WhyAiflowix from './components/WhyAiflowix';
import Services from './components/Services';
import Industries from './components/Industries';
import CaseStudies from './components/CaseStudies';
import AboutUs from './components/AboutUs';
import CTA from './components/CTA';
import ContactFooter from './components/ContactFooter';

function App() {
  // Ensure default load is at root (mywebsite.in) not (#contact)
  useEffect(() => {
    if (window.location.hash === '#contact' && window.location.pathname === '/') {
      window.history.replaceState(null, '', '/');
    }

    // Inject structured data for rich snippets & local SEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://www.aiflowix.in/#organization',
          'name': 'AIFLOWIX',
          'url': 'https://www.aiflowix.in',
          'description': 'AI & Business Workflow Automation Consultancy',
          'sameAs': [
            'https://www.linkedin.com/company/aiflowix',
            'https://www.twitter.com/aiflowix',
            'https://www.instagram.com/aiflowix'
          ],
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '123 Tech Park, Bandra Kurla Complex',
            'addressLocality': 'Mumbai',
            'addressRegion': 'MH',
            'postalCode': '400051',
            'addressCountry': 'IN'
          },
          'contactPoint': {
            '@type': 'ContactPoint',
            'telephone': '+91-XXXXXXX',
            'contactType': 'Business Development',
            'areaServed': ['IN', 'US', 'UAE'],
            'availableLanguage': ['en', 'hi']
          },
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://www.aiflowix.in/assets/logo.png',
            'width': 250,
            'height': 60
          }
        },
        {
          '@type': 'LocalBusiness',
          '@id': 'https://www.aiflowix.in/#localbusiness',
          'name': 'AIFLOWIX AI Automation',
          'description': 'Leading AI & automation consultancy for business workflow optimization in Mumbai',
          'image': 'https://www.aiflowix.in/assets/og-image.png',
          'url': 'https://www.aiflowix.in',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '123 Tech Park, Bandra Kurla Complex',
            'addressLocality': 'Mumbai',
            'addressRegion': 'MH',
            'postalCode': '400051',
            'addressCountry': 'IN'
          },
          'telephone': '+91-XXXXXXX',
          'priceRange': '$$',
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': '19.0176',
            'longitude': '72.8479'
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://www.aiflowix.in/#breadcrumb',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.aiflowix.in' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Services', 'item': 'https://www.aiflowix.in#services' },
            { '@type': 'ListItem', 'position': 3, 'name': 'Case Studies', 'item': 'https://www.aiflowix.in#case-studies' },
            { '@type': 'ListItem', 'position': 4, 'name': 'Why AIFLOWIX', 'item': 'https://www.aiflowix.in#why-aiflowix' },
            { '@type': 'ListItem', 'position': 5, 'name': 'About', 'item': 'https://www.aiflowix.in#about' },
            { '@type': 'ListItem', 'position': 6, 'name': 'Contact', 'item': 'https://www.aiflowix.in#contact' }
          ]
        },
        {
          '@type': 'WebPage',
          '@id': 'https://www.aiflowix.in/#webpage',
          'name': 'End-to-End AI Integration & Hyper-Automation | AIFLOWIX',
          'description': 'Enterprise-grade AI automation platform: End-to-end AI integration, operational efficiency, and hyper-automation solutions. Mumbai-based AI consultancy for workflow ROI optimization and intelligent process automation.',
          'url': 'https://www.aiflowix.in',
          'isPartOf': { '@id': 'https://www.aiflowix.in/#website' },
          'inLanguage': 'en-IN',
          'potentialAction': {
            '@type': 'SearchAction',
            'target': { '@type': 'EntryPoint', 'urlTemplate': 'https://www.aiflowix.in?q={search_term_string}' },
            'query-input': 'required name=search_term_string'
          }
        },
        {
          '@type': 'Service',
          '@id': 'https://www.aiflowix.in/#service-lead-qualifier',
          'name': 'Lead Qualifier AI',
          'description': 'Intelligent lead qualification automation that scores, filters, and prioritizes prospects in real-time, reducing manual qualification workload and improving conversion rates.',
          'provider': { '@id': 'https://www.aiflowix.in/#organization' },
          'areaServed': [
            { '@type': 'Country', 'name': 'India' },
            { '@type': 'Country', 'name': 'United States' },
            { '@type': 'Country', 'name': 'United Arab Emirates' }
          ],
          'serviceType': 'AI Automation',
          'offers': {
            '@type': 'Offer',
            'priceCurrency': 'INR',
            'priceRange': '₹50000 - ₹500000',
            'price': '0',
            'pricingModel': 'Custom Enterprise Pricing',
            'url': 'https://www.aiflowix.in#contact'
          },
          'image': 'https://www.aiflowix.in/assets/lead-qualifier-demo.png',
          'potentialAction': {
            '@type': 'ReserveAction',
            'target': { '@type': 'EntryPoint', 'urlTemplate': 'https://www.aiflowix.in#contact', 'actionPlatform': 'http://schema.org/DesktopWebPlatform' },
            'name': 'Schedule Lead Qualifier Demo'
          }
        },
        {
          '@type': 'Service',
          '@id': 'https://www.aiflowix.in/#service-document-digitization',
          'name': 'Document Digitization AI',
          'description': 'Enterprise document digitization powered by AI: intelligent extraction, OCR processing, and instant digital transformation of paper and PDF documents into structured, searchable data.',
          'provider': { '@id': 'https://www.aiflowix.in/#organization' },
          'areaServed': [
            { '@type': 'Country', 'name': 'India' },
            { '@type': 'Country', 'name': 'United States' },
            { '@type': 'Country', 'name': 'United Arab Emirates' }
          ],
          'serviceType': 'AI Automation',
          'offers': {
            '@type': 'Offer',
            'priceCurrency': 'INR',
            'priceRange': '₹75000 - ₹750000',
            'price': '0',
            'pricingModel': 'Custom Enterprise Pricing',
            'url': 'https://www.aiflowix.in#contact'
          },
          'image': 'https://www.aiflowix.in/assets/document-digitization-demo.png',
          'potentialAction': {
            '@type': 'ReserveAction',
            'target': { '@type': 'EntryPoint', 'urlTemplate': 'https://www.aiflowix.in#contact', 'actionPlatform': 'http://schema.org/DesktopWebPlatform' },
            'name': 'Schedule Document Digitization Demo'
          }
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.aiflowix.in/#faq',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'What is AI automation?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'AI automation uses artificial intelligence and machine learning to automate repetitive business processes, eliminate manual work, and improve operational efficiency. It combines intelligent algorithms with workflow optimization to deliver measurable business outcomes.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How does AIFLOWIX lead qualification work?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'AIFLOWIX Lead Qualifier AI uses advanced machine learning to automatically score, filter, and prioritize sales leads in real-time. It learns from your historical data to identify high-quality prospects, reducing manual qualification workload and improving conversion rates.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can AIFLOWIX handle my document digitization needs?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, AIFLOWIX Document Digitization AI uses OCR and intelligent extraction to automatically convert paper documents and PDFs into structured, searchable digital data. It handles complex layouts and multi-language documents with high accuracy.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Is AIFLOWIX suitable for small businesses?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'AIFLOWIX serves businesses of all sizes, from startups to enterprises. We provide custom, scalable AI automation solutions tailored to your specific needs and budget, whether you\'re just starting with automation or already running complex systems.'
              }
            }
          ]
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white selection:bg-[#00C8FF] selection:text-[#0F172A]">
      <Navbar />
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
      <ContactFooter />
    </div>
  );
}

export default App;
