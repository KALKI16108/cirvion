import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContactFooter from './components/ContactFooter';
import Home from './pages/Home';
import Blog from './pages/Blog';
import CustomAiSoftware from './pages/CustomAiSoftware';
import AiForSmallBusiness from './pages/AiForSmallBusiness';
import BlogPostLeadQualification from './pages/BlogPostLeadQualification';
import BlogPostCustomAi from './pages/BlogPostCustomAi';

const ScrollToAnchor = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

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
          '@id': 'https://aiflowix.in/#organization',
          'name': 'AIFLOWIX',
          'url': 'https://aiflowix.in',
          'description': 'AI & Business Workflow Automation Consultancy',
          'sameAs': [
            'https://www.linkedin.com/company/aiflowix',
            'https://www.twitter.com/aiflowix',
            'https://www.instagram.com/aiflowix'
          ],
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Walbhatt Road, Goregaon East',
            'addressLocality': 'Mumbai',
            'addressRegion': 'MH',
            'postalCode': '400063',
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
            'url': 'https://aiflowix.in/assets/logo.png',
            'width': 250,
            'height': 60
          }
        },
        {
          '@type': 'LocalBusiness',
          '@id': 'https://aiflowix.in/#localbusiness',
          'name': 'AIFLOWIX AI Automation',
          'description': 'Leading AI & automation consultancy for business workflow optimization in Mumbai',
          'image': 'https://aiflowix.in/assets/og-image.png',
          'url': 'https://aiflowix.in',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Walbhatt Road, Goregaon East',
            'addressLocality': 'Mumbai',
            'addressRegion': 'MH',
            'postalCode': '400063',
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
          '@id': 'https://aiflowix.in/#breadcrumb',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://aiflowix.in' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Services', 'item': 'https://aiflowix.in#services' },
            { '@type': 'ListItem', 'position': 3, 'name': 'Case Studies', 'item': 'https://aiflowix.in#case-studies' },
            { '@type': 'ListItem', 'position': 4, 'name': 'Why AIFLOWIX', 'item': 'https://aiflowix.in#why-aiflowix' },
            { '@type': 'ListItem', 'position': 5, 'name': 'About', 'item': 'https://aiflowix.in#about' },
            { '@type': 'ListItem', 'position': 6, 'name': 'Contact', 'item': 'https://aiflowix.in#contact' }
          ]
        },
        {
          '@type': 'WebPage',
          '@id': 'https://aiflowix.in/#webpage',
          'name': 'End-to-End AI Integration & Hyper-Automation | AIFLOWIX',
          'description': 'Enterprise-grade AI automation platform: End-to-end AI integration, operational efficiency, and hyper-automation solutions. Mumbai-based AI consultancy for workflow ROI optimization and intelligent process automation.',
          'url': 'https://aiflowix.in',
          'isPartOf': { '@id': 'https://aiflowix.in/#website' },
          'inLanguage': 'en-IN',
          'potentialAction': {
            '@type': 'SearchAction',
            'target': { '@type': 'EntryPoint', 'urlTemplate': 'https://aiflowix.in?q={search_term_string}' },
            'query-input': 'required name=search_term_string'
          }
        },
        {
          '@type': 'Service',
          '@id': 'https://aiflowix.in/#service-lead-qualifier',
          'name': 'Lead Qualifier AI',
          'description': 'Intelligent lead qualification automation that scores, filters, and prioritizes prospects in real-time, reducing manual qualification workload and improving conversion rates.',
          'provider': { '@id': 'https://aiflowix.in/#organization' },
          'areaServed': [
            { '@type': 'Country', 'name': 'India' },
            { '@type': 'Country', 'name': 'United States' },
            { '@type': 'Country', 'name': 'United Arab Emirates' }
          ],
          'serviceType': 'AI Automation',
          'offers': {
            '@type': 'Offer',
            'priceCurrency': 'INR',
            'price': '0',
            'url': 'https://aiflowix.in#contact'
          },
          'image': 'https://aiflowix.in/assets/lead-qualifier-demo.png',
          'potentialAction': {
            '@type': 'ReserveAction',
            'target': { '@type': 'EntryPoint', 'urlTemplate': 'https://aiflowix.in#contact', 'actionPlatform': 'http://schema.org/DesktopWebPlatform' },
            'name': 'Schedule Lead Qualifier Demo'
          }
        },
        {
          '@type': 'Service',
          '@id': 'https://aiflowix.in/#service-document-digitization',
          'name': 'Document Digitization AI',
          'description': 'Enterprise document digitization powered by AI: intelligent extraction, OCR processing, and instant digital transformation of paper and PDF documents into structured, searchable data.',
          'provider': { '@id': 'https://aiflowix.in/#organization' },
          'areaServed': [
            { '@type': 'Country', 'name': 'India' },
            { '@type': 'Country', 'name': 'United States' },
            { '@type': 'Country', 'name': 'United Arab Emirates' }
          ],
          'serviceType': 'AI Automation',
          'offers': {
            '@type': 'Offer',
            'priceCurrency': 'INR',
            'price': '0',
            'url': 'https://aiflowix.in#contact'
          },
          'image': 'https://aiflowix.in/assets/document-digitization-demo.png',
          'potentialAction': {
            '@type': 'ReserveAction',
            'target': { '@type': 'EntryPoint', 'urlTemplate': 'https://aiflowix.in#contact', 'actionPlatform': 'http://schema.org/DesktopWebPlatform' },
            'name': 'Schedule Document Digitization Demo'
          }
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://aiflowix.in/#faq',
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
        },
        {
          '@type': 'SoftwareApplication',
          '@id': 'https://aiflowix.in/#software',
          'name': 'Custom AI Software Development',
          'applicationCategory': 'BusinessApplication',
          'operatingSystem': 'Web, Cloud',
          'description': 'Bespoke AI applications for enterprise and SMB automation.',
          'provider': { '@id': 'https://aiflowix.in/#organization' },
          'url': 'https://aiflowix.in/custom-ai-software',
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.9',
            'ratingCount': '24'
          },
          'offers': {
            '@type': 'Offer',
            'priceCurrency': 'INR',
            'price': '0',
            'url': 'https://aiflowix.in#contact'
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, []);

  return (
    <Router>
      <ScrollToAnchor />
      <div className="min-h-screen bg-[#0F172A] text-white selection:bg-[#00C8FF] selection:text-[#0F172A]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/automate-lead-qualification" element={<BlogPostLeadQualification />} />
          <Route path="/blog/custom-ai-software-benefits" element={<BlogPostCustomAi />} />
          <Route path="/custom-ai-software" element={<CustomAiSoftware />} />
          <Route path="/ai-for-small-business" element={<AiForSmallBusiness />} />
        </Routes>
        <ContactFooter />
      </div>
    </Router>
  );
}

export default App;
