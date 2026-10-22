import React from 'react';
import { motion } from 'framer-motion';
import { Code2, ArrowRight, CheckCircle2, ShieldCheck, Clock, Users, Database, Sparkles, Calculator, Terminal } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { trackContactCtaClick, trackBookCallClick, trackCtaClick } from '../lib/analytics';
import { getCalendarBookingUrl } from '../lib/booking';

const customSoftwareFaqs = [
  {
    question: "How is custom software better than subscribing to existing SaaS tools?",
    answer: "Off-the-shelf SaaS forces your team into rigid, generic workflows and charges recurring per-user fees that escalate as you hire. Custom software is engineered around your exact business logic, eliminates per-seat subscription overhead, and provides 100% proprietary code ownership."
  },
  {
    question: "Who owns the intellectual property and code when the project is finished?",
    answer: "You own 100% of the intellectual property. Upon milestone completion, we transfer the full Git repositories, Docker configurations, database migration scripts, and architecture documentation directly to your organization."
  },
  {
    question: "What technology stack do you use for custom AI software?",
    answer: "We engineer production applications using modern, maintainable technologies: React, TypeScript, and Tailwind CSS for the frontend; Node.js, Python, and FastAPI for backend services; and PostgreSQL (with pgvector for AI memory) and Redis for database architectures."
  },
  {
    question: "How do you protect proprietary company and customer data?",
    answer: "We deploy applications into your dedicated private cloud infrastructure (e.g., AWS, GCP, or private VPS). API credentials and environment secrets are encrypted, and no client operational data is ever shared with public AI models."
  },
  {
    question: "What is the typical timeline and cost model for custom software?",
    answer: "Most custom operations tools and internal portals are built and deployed in 3 to 6 weeks under a fixed-scope milestone agreement. You receive a guaranteed price and milestone timeline before engineering starts—with zero unexpected hourly billing."
  }
];

const CustomAiSoftware = () => {
  const calendarUrl = getCalendarBookingUrl();
  const primaryCtaText = calendarUrl ? "Book a Discovery Call" : "Request a Free AI Automation Audit";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": customSoftwareFaqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom AI Software Development",
    "description": "Bespoke AI application engineering, internal operations platforms, and custom workflow software built to eliminate operational bottlenecks and scale efficiency.",
    "provider": {
      "@type": "Organization",
      "name": "AIFlowix",
      "url": "https://aiflowix.in"
    },
    "areaServed": "Worldwide"
  };

  const pageSchema = [serviceSchema, faqSchema];

  return (
    <main className="pt-28 sm:pt-32 pb-16 min-h-screen">
      <SEOHead 
        title="Custom AI Software Development | AIFlowix"
        description="Bespoke AI application engineering, internal operations platforms, and custom workflow software built to eliminate operational bottlenecks and scale efficiency."
        canonical="/custom-ai-software"
        schema={pageSchema}
      />

      {/* Hero Section */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto text-center mb-16 sm:mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full bg-white/5 border border-white/10"
        >
          <Code2 className="w-4 h-4 text-[#00C8FF]" />
          <span className="text-xs sm:text-sm font-semibold text-[#CBD5E1] uppercase tracking-wider">Engineering & Custom Development</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.15]"
        >
          <span className="block text-white">Custom AI Software</span>
          <span className="text-gradient-primary">Engineered for Your Business</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-3xl mx-auto mb-8 leading-relaxed font-normal"
        >
          We engineer tailored AI applications, internal operations platforms, and secure API integrations designed to automate repetitive business processes and scale throughput.
        </motion.p>

        {/* Primary and Secondary Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8"
        >
          <a
            href={calendarUrl || "#contact"}
            {...(calendarUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={() => {
              if (calendarUrl) {
                trackBookCallClick('calendar', 'Custom AI Software Hero');
              } else {
                trackContactCtaClick('Book Discovery Call', 'Custom AI Software Page');
              }
            }}
            className="btn-primary flex items-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-bold w-full sm:w-auto justify-center shadow-lg shadow-[#00C8FF]/20"
          >
            <span>{primaryCtaText}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="/roi-calculator"
            onClick={() => trackCtaClick('Calculate Automation ROI', 'Custom AI Software Hero')}
            className="btn-secondary flex items-center gap-2 px-6 py-3.5 text-sm font-semibold w-full sm:w-auto justify-center hover:bg-white/10 transition-colors"
          >
            <Calculator className="w-4 h-4 text-[#00C8FF]" />
            <span>Calculate Automation ROI</span>
          </a>
        </motion.div>

        {/* Verified Trust Proof Row */}
        <div className="py-2.5 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#94A3B8] text-xs font-medium border-t border-white/5 max-w-2xl mx-auto">
          <span className="flex items-center gap-1.5">
            <span className="text-[#00C8FF] font-bold">100% Code Ownership</span> Full Git Transfer
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">Zero Per-Seat Fees</span> Unlimited Users
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-indigo-400 font-bold">Fixed-Scope Milestones</span> Clear Timelines
          </span>
        </div>
      </section>

      {/* Target Audience: Who This Service Is For */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto mb-16">
        <div className="rounded-2xl bg-[#0F172A]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00C8FF] uppercase tracking-wider mb-2">
            <Users className="w-4 h-4" /> Ideal Company Fit
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Who Custom AI Software Is Built For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div>
              <h3 className="font-bold text-white mb-2">Best Suited For:</h3>
              <p className="text-[#94A3B8] leading-relaxed mb-4">
                Growing companies outgrowing off-the-shelf software, managing proprietary workflows, or spending excessive amounts on fragmented SaaS subscriptions.
              </p>
              <div className="space-y-2 text-[#CBD5E1]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Commercial B2B services & logistics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Healthcare & specialized clinical testing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Financial services & underwriting firms</span>
                </div>
              </div>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
              <h3 className="font-bold text-white mb-2">Signs You Need Custom Software:</h3>
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-lg bg-white/5 text-[#E2E8F0]">
                  Your team uses multiple spreadsheets to bridge gaps that off-the-shelf tools can't handle.
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 text-[#E2E8F0]">
                  SaaS per-user license fees are increasing dramatically as your headcount expands.
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 text-[#E2E8F0]">
                  You require custom AI models and private data pipelines operating securely within your own infrastructure.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Engineering Capabilities */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">What We Actually Engineer</h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto">
            Production-grade systems built around your exact operational specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 sm:p-6 rounded-xl bg-[#0F172A]/70 border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-[#00C8FF]/10 text-[#00C8FF] flex items-center justify-center mb-3">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Internal Operations Portals</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Bespoke admin dashboards, employee workflows, and task automation portals that centralize multiple back-end tools into one fast interface.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-xl bg-[#0F172A]/70 border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Proprietary AI Pipelines & RAG</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Custom vector databases, private retrieval-augmented generation (RAG), and deterministic tool-calling agents integrated with your existing data stores.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-xl bg-[#0F172A]/70 border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Scalable APIs & Middleware</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              High-throughput REST and GraphQL APIs, webhook event buses, and bi-directional synchronization services engineered with Node.js and PostgreSQL.
            </p>
          </div>
        </div>
      </section>

      {/* Contextual Mid-Page Conversion Section */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto mb-16">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] border border-[#00C8FF]/30 text-center shadow-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00C8FF] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Direct Technical Scope
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Have a Specific Operational System in Mind?
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto mb-6">
            Schedule a free technical discovery call. We review your architectural requirements, data flows, and deliver a fixed-scope milestone proposal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={calendarUrl || "#contact"}
              {...(calendarUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => {
                if (calendarUrl) {
                  trackBookCallClick('calendar', 'Custom AI Software Mid-Page');
                } else {
                  trackContactCtaClick('Mid-Page Consultation CTA', 'Custom AI Software');
                }
              }}
              className="bg-[#00C8FF] hover:bg-white text-[#0F172A] font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-colors flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg shadow-[#00C8FF]/20"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/roi-calculator"
              onClick={() => trackCtaClick('Mid-Page ROI Calculator', 'Custom AI Software')}
              className="bg-transparent border border-white/20 hover:bg-white/10 text-white font-medium text-xs sm:text-sm px-5 py-3 rounded-full transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Calculator className="w-3.5 h-3.5 text-[#00C8FF]" />
              <span>Calculate Automation ROI</span>
            </a>
          </div>
        </div>
      </section>

      {/* Engineering Process */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Our Engineering Process</h2>
          <p className="text-xs sm:text-sm text-[#94A3B8]">From initial architecture mapping to production handover.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-card p-5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-black text-[#00C8FF]">01</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#94A3B8]">1–2 Weeks</span>
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">Architecture & Schema Specification</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              We define database schemas, API contracts, user flows, and milestone agreements before writing code.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-black text-[#00C8FF]">02</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#94A3B8]">3–5 Weeks</span>
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">Agile Sprint Engineering</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              We build in two-week sprints with staging environment demos and direct Slack/Teams feedback.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-black text-[#00C8FF]">03</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#94A3B8]">1 Week</span>
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">Deployment & 100% Handover</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Production deployment to your cloud, automated CI/CD pipelines, full Git transfer, and 30-day warranty.
            </p>
          </div>
        </div>
      </section>

      {/* Security & Code Ownership */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto mb-16">
        <div className="rounded-2xl bg-[#0F172A]/80 border border-white/5 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00C8FF] uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" /> Security & Data Confidentiality
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Enterprise Code Ownership & Standards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#CBD5E1]">
            <div className="p-3 rounded-lg bg-white/5 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Full Git repository and database migration transfer upon completion.</span>
            </div>
            <div className="p-3 rounded-lg bg-white/5 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Zero customer data used to train public foundational AI models.</span>
            </div>
            <div className="p-3 rounded-lg bg-white/5 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Direct engineer communication via dedicated Slack/Teams channels.</span>
            </div>
            <div className="p-3 rounded-lg bg-white/5 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>30-day included post-launch monitoring and bug-fixing warranty.</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 sm:px-6 max-w-3xl mx-auto my-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center text-white">Frequently Asked Questions</h2>
        <p className="text-xs sm:text-sm text-[#94A3B8] text-center mb-8">
          Common questions regarding custom software architecture, ownership, and timelines.
        </p>
        <dl className="space-y-4">
          {customSoftwareFaqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-5 sm:p-6 rounded-2xl border border-white/5"
            >
              <dt className="text-base sm:text-lg font-bold text-white mb-2">{faq.question}</dt>
              <dd className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed m-0">{faq.answer}</dd>
            </motion.div>
          ))}
        </dl>
      </section>
    </main>
  );
};

export default CustomAiSoftware;
