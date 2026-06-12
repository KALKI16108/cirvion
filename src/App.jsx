import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ContactFooter from './components/ContactFooter';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import SEOHead from './components/SEOHead';

// Lazy Load Pages for Performance (Code Splitting)
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const CustomAiSoftware = lazy(() => import('./pages/CustomAiSoftware'));
const AiForSmallBusiness = lazy(() => import('./pages/AiForSmallBusiness'));
// Programmatic SEO Templates
const ServiceTemplate = lazy(() => import('./pages/ServiceTemplate'));
const LocationTemplate = lazy(() => import('./pages/LocationTemplate'));
const IndustryTemplate = lazy(() => import('./pages/IndustryTemplate'));
const BlogTemplate = lazy(() => import('./pages/BlogTemplate'));

// Lead Magnets
const FreeAiAudit = lazy(() => import('./pages/FreeAiAudit'));
const RoiCalculator = lazy(() => import('./pages/RoiCalculator'));
const ReadinessAssessment = lazy(() => import('./pages/ReadinessAssessment'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Pipeline = lazy(() => import('./pages/admin/Pipeline'));
const ContentManager = lazy(() => import('./pages/admin/ContentManager'));

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

const PublicLayout = () => (
  <>
    <Navbar />
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#0F172A]"><div className="w-10 h-10 border-4 border-[#00C8FF] border-t-transparent rounded-full animate-spin"></div></div>}>
      <Outlet />
    </Suspense>
    <CaseStudies />
    <Testimonials />
    <CTA />
    <ContactFooter />
    <FloatingWhatsApp />
  </>
);

function App() {
  // Ensure default load is at root (mywebsite.in) not (#contact)
  useEffect(() => {
    if (window.location.hash === '#contact' && window.location.pathname === '/') {
      window.history.replaceState(null, '', '/');
    }
  }, []);

  // Global Schema
  const globalSchema = {
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
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://aiflowix.in/assets/logo.png'
        }
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://aiflowix.in/#localbusiness',
        'name': 'AIFLOWIX AI Automation',
        'description': 'Leading AI & automation consultancy for business workflow optimization in Mumbai',
        'url': 'https://aiflowix.in',
        'telephone': '+91-0000000000',
        'priceRange': '$$'
      }
    ]
  };

  return (
    <HelmetProvider>
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#1E293B',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
        },
      }} />
      <SEOHead 
        title="AIFlowix | AI Automation Agency"
        description="Enterprise-grade AI automation platform: End-to-end AI integration, operational efficiency, and hyper-automation solutions."
        schema={globalSchema}
      />
      <Router>
        <ScrollToAnchor />
        <div className="min-h-screen bg-[#0F172A] text-white selection:bg-[#00C8FF] selection:text-[#0F172A]">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#030712]"><div className="w-10 h-10 border-4 border-[#6366F1] border-t-transparent rounded-full animate-spin"></div></div>}>
                <AdminLogin />
              </Suspense>
            } />
            <Route path="/admin" element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#030712]"><div className="w-10 h-10 border-4 border-[#6366F1] border-t-transparent rounded-full animate-spin"></div></div>}>
                <AdminLayout />
              </Suspense>
            }>
              <Route index element={<Dashboard />} />
              <Route path="pipeline" element={<Pipeline />} />
              <Route path="content" element={<ContentManager />} />
            </Route>

            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/custom-ai-software" element={<CustomAiSoftware />} />
              <Route path="/ai-for-small-business" element={<AiForSmallBusiness />} />
              
              {/* Programmatic SEO Routes */}
              <Route path="/blog/:slug" element={<BlogTemplate />} />
              <Route path="/services/:slug" element={<ServiceTemplate />} />
              <Route path="/locations/:slug" element={<LocationTemplate />} />
              <Route path="/industries/:slug" element={<IndustryTemplate />} />

              {/* Lead Magnets */}
              <Route path="/free-ai-audit" element={<FreeAiAudit />} />
              <Route path="/roi-calculator" element={<RoiCalculator />} />
              <Route path="/ai-readiness" element={<ReadinessAssessment />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
