import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, CheckCircle2, ShieldCheck, Clock, Users, MessageSquare, Sparkles, Calculator, Calendar } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { trackContactCtaClick, trackBookCallClick, trackCtaClick } from '../lib/analytics';
import { getCalendarBookingUrl } from '../lib/booking';

const smbFaqs = [
  {
    question: "Is our business too small for AI automation?",
    answer: "No. Small businesses actually gain the highest relative benefit from automation because every recovered hour directly frees up founders and key staff from tedious administrative tasks to focus on serving clients and generating revenue."
  },
  {
    question: "Do we need an in-house IT person or developer to maintain this?",
    answer: "Not at all. We build reliable, self-contained systems integrated directly into the software you already use (like WhatsApp, Google Calendar, and your CRM). We provide simple video walkthroughs, and our systems require zero coding to operate day-to-day."
  },
  {
    question: "How long does it take to implement and see results?",
    answer: "Most small business automations—such as WhatsApp auto-reply agents, calendar booking integrations, and invoice reminder workflows—are engineered, tested, and deployed within 7 to 14 business days."
  },
  {
    question: "What are the ongoing costs after the initial setup?",
    answer: "You only pay for your own third-party software subscriptions (e.g., standard WhatsApp API tokens or Make.com accounts, typically $15–$50/month). There are zero hidden agency fees, and optional monthly support retainers are available if you want ongoing optimizations."
  },
  {
    question: "How does the AI handle inquiries it doesn't understand?",
    answer: "We engineer strict boundaries. If an inquiry is outside predefined business parameters, the system immediately forwards the message to your team with full conversation history and an alert so you can step in seamlessly."
  }
];

const AiForSmallBusiness = () => {
  const calendarUrl = getCalendarBookingUrl();
  const primaryCtaText = calendarUrl ? "Book a Discovery Call" : "Request a Free AI Automation Audit";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": smbFaqs.map(f => ({
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
    "name": "AI Automation for Small Business",
    "description": "Practical AI workflows, automated lead response, and system integrations engineered to help small businesses eliminate manual tasks and reduce overhead.",
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
        title="AI Automation for Small Business | AIFlowix"
        description="Practical AI workflows, automated lead response, and system integrations engineered to help small businesses eliminate manual tasks and reduce overhead."
        canonical="/ai-for-small-business"
        schema={pageSchema}
      />

      {/* Hero Section */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto text-center mb-16 sm:mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full bg-white/5 border border-white/10"
        >
          <Zap className="w-4 h-4 text-[#00C8FF]" />
          <span className="text-xs sm:text-sm font-semibold text-[#CBD5E1] uppercase tracking-wider">SMB Workflow Automation</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.15]"
        >
          <span className="block text-white">AI Automation Built for</span>
          <span className="text-gradient-primary">Growing Small Businesses</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-3xl mx-auto mb-8 leading-relaxed font-normal"
        >
          Practical AI workflows and system integrations engineered specifically for growing teams. Eliminate manual data handling, respond to leads in seconds, and free up 15–20 hours each week.
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
                trackBookCallClick('calendar', 'AI for Small Business Hero');
              } else {
                trackContactCtaClick('Book Discovery Call', 'AI for Small Business Page');
              }
            }}
            className="btn-primary flex items-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-bold w-full sm:w-auto justify-center shadow-lg shadow-[#00C8FF]/20"
          >
            <span>{primaryCtaText}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="/roi-calculator"
            onClick={() => trackCtaClick('Calculate Small Business ROI', 'AI for Small Business Hero')}
            className="btn-secondary flex items-center gap-2 px-6 py-3.5 text-sm font-semibold w-full sm:w-auto justify-center hover:bg-white/10 transition-colors"
          >
            <Calculator className="w-4 h-4 text-[#00C8FF]" />
            <span>Calculate Your Savings</span>
          </a>
        </motion.div>

        {/* Trust proof row */}
        <div className="py-2.5 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#94A3B8] text-xs font-medium border-t border-white/5 max-w-2xl mx-auto">
          <span className="flex items-center gap-1.5">
            <span className="text-[#00C8FF] font-bold">Fixed-Scope Pricing</span> Zero Surprise Bills
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">1–2 Week Deployment</span> Fast Turnaround
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-indigo-400 font-bold">No IT Team Required</span> Simple Handover
          </span>
        </div>
      </section>

      {/* Who This Is For: Target SMB Profile */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto mb-16">
        <div className="rounded-2xl bg-[#0F172A]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00C8FF] uppercase tracking-wider mb-2">
            <Users className="w-4 h-4" /> Target Business Profile
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Who This Service Is Engineered For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div>
              <h3 className="font-bold text-white mb-2">Ideal Company Profile:</h3>
              <p className="text-[#94A3B8] leading-relaxed mb-4">
                Growing businesses with 2 to 30 employees, local service firms, clinics, agencies, and trade contractors looking to scale without hiring administrative headcount.
              </p>
              <div className="space-y-2 text-[#CBD5E1]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dental clinics & medical practices</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Home service contractors (HVAC, plumbing, electrical)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real estate brokerages & property managers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Independent professional consultancies</span>
                </div>
              </div>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
              <h3 className="font-bold text-white mb-2">Common Operational Challenges We Solve:</h3>
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-lg bg-white/5 text-[#E2E8F0]">
                  You miss customer calls or messages during busy work hours, losing deals to competitors who reply faster.
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 text-[#E2E8F0]">
                  Founders and staff spend evenings sending invoice reminders and rescheduling appointments manually.
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 text-[#E2E8F0]">
                  Customer contact details and job notes are trapped across paper notepads, texts, and personal phones.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Practical Automations for Small Business */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">4 Practical Automations for Immediate ROI</h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto">
            Focused, proven implementations that save hours in your first week.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 sm:p-6 rounded-xl bg-[#0F172A]/70 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#00C8FF]/10 text-[#00C8FF] flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">Under-60-Second Lead Response</h3>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">
                When a new customer fills out your website form or messages your WhatsApp/Instagram, an automated AI agent replies instantly, answers service questions, and qualifies their request.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Eliminates lead drop-off during busy hours
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-xl bg-[#0F172A]/70 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">Automated Appointment Booking</h3>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">
                Customers book directly on your live Google or Outlook calendar without phone tag. The system automatically sends SMS and WhatsApp reminders to reduce no-shows.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Saves 8+ hours of weekly phone coordination
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-xl bg-[#0F172A]/70 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">Automated Invoicing & Payment Chasing</h3>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">
                Completed jobs automatically trigger invoice creation in QuickBooks, Xero, or Stripe, with scheduled polite WhatsApp/SMS payment reminders for overdue accounts.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Speeds up receivables turnaround significantly
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-xl bg-[#0F172A]/70 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">Centralized Customer Data & Sync</h3>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">
                Every customer interaction, phone call recording, text, and quote is automatically synced to your central CRM database so your entire team is always aligned.
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> No more lost client notes or double-entry
            </div>
          </div>
        </div>
      </section>

      {/* Contextual Mid-Page Conversion Section */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto mb-16">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] border border-[#00C8FF]/30 text-center shadow-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00C8FF] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Simple 30-Minute Review
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            See Where Your Small Business Can Save 15+ Hours/Week
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto mb-6">
            We review your current customer journey, identify your biggest administrative time-drains, and show you exactly what to automate first.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={calendarUrl || "#contact"}
              {...(calendarUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => {
                if (calendarUrl) {
                  trackBookCallClick('calendar', 'SMB Mid-Page');
                } else {
                  trackContactCtaClick('Mid-Page Consultation CTA', 'AI for Small Business');
                }
              }}
              className="bg-[#00C8FF] hover:bg-white text-[#0F172A] font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-colors flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg shadow-[#00C8FF]/20"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/roi-calculator"
              onClick={() => trackCtaClick('Mid-Page ROI Calculator', 'AI for Small Business')}
              className="bg-transparent border border-white/20 hover:bg-white/10 text-white font-medium text-xs sm:text-sm px-5 py-3 rounded-full transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Calculator className="w-3.5 h-3.5 text-[#00C8FF]" />
              <span>Calculate Automation ROI</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3-Step Low Friction Process */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">How We Work Together</h2>
          <p className="text-xs sm:text-sm text-[#94A3B8]">Simple, fast, and respectful of your operating hours.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-card p-5 rounded-xl border border-white/5">
            <span className="text-xl font-black text-[#00C8FF] block mb-2">01</span>
            <h3 className="text-base font-bold text-white mb-1.5">30-Minute Discovery</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              We discuss where your team loses the most manual time and identify quick-win automation opportunities.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl border border-white/5">
            <span className="text-xl font-black text-[#00C8FF] block mb-2">02</span>
            <h3 className="text-base font-bold text-white mb-1.5">Fixed-Price Setup (1–2 Wks)</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              We build, test, and integrate the automations with your existing tools under a fixed-cost agreement.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl border border-white/5">
            <span className="text-xl font-black text-[#00C8FF] block mb-2">03</span>
            <h3 className="text-base font-bold text-white mb-1.5">Live Handover & 30-Day Support</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              We walk your team through the system with simple video instructions and monitor for 30 days.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 sm:px-6 max-w-3xl mx-auto my-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center text-white">Frequently Asked Questions</h2>
        <p className="text-xs sm:text-sm text-[#94A3B8] text-center mb-8">
          Clear answers for small business owners considering automation.
        </p>
        <dl className="space-y-4">
          {smbFaqs.map((faq, index) => (
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

export default AiForSmallBusiness;
