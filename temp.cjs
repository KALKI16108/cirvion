const fs = require('fs');
const file = 'src/data/services.json';
const data = JSON.parse(fs.readFileSync(file));

const newServices = [
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development Company',
    metaDescription: 'We build bespoke custom software, SaaS products, and enterprise applications engineered for scale, high performance, and AI integration.',
    h1: 'Enterprise Custom Software Development',
    description: 'Off-the-shelf software rarely fits perfectly. We build high-performance, secure, and scalable custom software applications—from bespoke internal enterprise tools to customer-facing SaaS platforms. We engineer our software to integrate seamlessly with AI and modern automation workflows.',
    definition: 'Custom Software Development is the process of designing, creating, deploying and maintaining software for a specific set of users, functions or organizations. Unlike commercial off-the-shelf software (COTS), custom software is tailored specifically to your business processes, ensuring 100% operational alignment without expensive recurring per-seat licensing fees.',
    benefits: ['Zero Per-Seat Licensing Fees', '100% Data Ownership & Security', 'Seamless AI & API Extensibility', 'Tailored to Unique Workflows'],
    process: ['Discovery & Architecture', 'UI/UX Prototyping', 'Agile Sprint Development', 'Security Audit & Deployment'],
    statistics: [
      { metric: '100%', impact: 'Workflow Alignment', time: 'Bespoke Logic', revenue: 'No Compromises' },
      { metric: '0$', impact: 'Per-User License Fees', time: 'Infinite Scaling', revenue: 'Higher Margins' },
      { metric: '99.9%', impact: 'Uptime Reliability', time: 'Cloud Native', revenue: 'Stable Operations' },
      { metric: '10x', impact: 'Data Processing Speed', time: 'Modern Stack', revenue: 'Faster Output' }
    ],
    useCases: [
      {
        problem: 'A logistics company using 5 disconnected SaaS tools and paying $10k/month in licenses.',
        solution: 'Built a unified custom ERP system incorporating routing, billing, and CRM into one dashboard.',
        result: 'Saved $120k annually in licensing fees and improved operational efficiency by 40%.',
        stack: 'Next.js + Node.js + PostgreSQL'
      }
    ],
    caseStudy: {
      before: 'A funded SaaS startup had outgrown their no-code MVP. The app was crashing under load and users were complaining about 10-second page load times.',
      implementation: 'We architected a scalable, microservices-based custom software solution using React and Node.js. We migrated their entire user base with zero downtime and integrated an AI data analysis engine directly into the core product.',
      after: 'Load times decreased to under 0.5 seconds, user churn dropped by 30%, and the startup successfully secured Series A funding.'
    },
    eeat: [
      'Our senior engineering team has built and scaled products serving millions of users.',
      'We follow strict OWASP security guidelines and perform penetration testing on enterprise builds.',
      'Experts in modern stacks: React, Next.js, Node.js, Python, PostgreSQL, and AWS/GCP.'
    ],
    faq: [
      {
        question: 'How much does custom software development cost?',
        answer: 'Costs vary heavily based on complexity. A simple MVP might start at $15k-$25k, while a full-scale enterprise system can range from $50k-$150k+. We provide fixed-price quotes after the Discovery phase.'
      },
      {
        question: 'Do we own the source code?',
        answer: 'Yes. Upon final payment and deployment, 100% of the Intellectual Property (IP) and source code is transferred to you.'
      }
    ],
    relatedLinks: {
      services: [{ title: 'Web Development', slug: 'web-development' }],
      industries: [{ title: 'Startups', slug: 'tech-startups' }],
      blogs: [{ title: 'Off-the-shelf vs Custom Software', slug: 'custom-software-vs-saas' }],
      magnets: [{ title: 'Book a Technical Audit', path: '/free-ai-audit' }]
    }
  },
  {
    slug: 'web-development',
    title: 'Web Design & Development Agency',
    metaDescription: 'High-converting responsive web design and modern web app development using Next.js and React. We build fast, secure, and beautiful websites.',
    h1: 'High-Performance Web Development',
    description: 'Your website is your ultimate salesperson. We build lightning-fast, visually stunning, and conversion-optimized websites and web apps. Using modern frameworks like React and Next.js, we ensure your digital storefront ranks high on search engines and converts visitors into leads.',
    definition: 'Web Development refers to the building, creating, and maintaining of websites and web applications. It encompasses everything from a simple static landing page to complex, interactive single-page applications (SPAs). Modern web development prioritizes Core Web Vitals (speed, responsiveness, visual stability) and mobile-first design to maximize SEO and user conversion rates.',
    benefits: ['Sub-second Page Load Speeds', 'Mobile-First Responsive Design', 'Built-in Technical SEO Architecture', 'High-Converting UI/UX'],
    process: ['Wireframing & UI Design', 'Frontend Development', 'CMS & Backend Integration', 'Speed & SEO Optimization'],
    statistics: [
      { metric: '< 1s', impact: 'Load Time', time: 'Next.js Edge', revenue: 'Lower Bounce Rate' },
      { metric: '99', impact: 'Google Lighthouse Score', time: 'Technical SEO', revenue: 'Higher Rankings' },
      { metric: '3x', impact: 'Conversion Rate', time: 'Optimized UI', revenue: 'More Leads' },
      { metric: '100%', impact: 'Mobile Responsive', time: 'Tailwind CSS', revenue: 'Better UX' }
    ],
    useCases: [
      {
        problem: 'A B2B consultancy had an outdated WordPress site loading in 6 seconds, leading to a 75% bounce rate.',
        solution: 'Rebuilt the site from scratch using Next.js with a headless CMS for ultra-fast static generation.',
        result: 'Bounce rate dropped to 30% and inbound lead form submissions doubled.',
        stack: 'Next.js + Sanity CMS + Tailwind CSS'
      }
    ],
    caseStudy: {
      before: 'An e-commerce brand was losing thousands of dollars a day due to slow product page loads on mobile devices during peak ad spend hours.',
      implementation: 'We developed a custom headless e-commerce storefront. By decoupling the frontend from Shopify and using a modern React edge-caching architecture, we delivered instant page transitions.',
      after: 'Mobile conversion rates increased by 45% and average order value (AOV) rose significantly due to a frictionless checkout experience.'
    },
    eeat: [
      'We obsess over Google Core Web Vitals and Lighthouse performance metrics.',
      'Our designers focus on conversion-rate optimization (CRO) rather than just aesthetics.',
      'We build accessible (WCAG compliant) websites to ensure universal usability.'
    ],
    faq: [
      {
        question: 'Do you use WordPress or modern frameworks?',
        answer: 'While we can build and maintain WordPress sites, we highly recommend and specialize in modern frameworks like Next.js and React for superior speed, security, and SEO performance.'
      },
      {
        question: 'Will I be able to edit the website content myself?',
        answer: 'Absolutely. We integrate intuitive Headless CMS platforms (like Sanity, Strapi, or Contentful) so your marketing team can update content without touching a single line of code.'
      }
    ],
    relatedLinks: {
      services: [{ title: 'Custom Software', slug: 'custom-software-development' }],
      industries: [{ title: 'E-Commerce', slug: 'e-commerce' }],
      blogs: [{ title: 'Why Next.js is the future', slug: 'nextjs-web-development' }],
      magnets: [{ title: 'Free SEO Audit', path: '/free-ai-audit' }]
    }
  },
  {
    slug: 'ai-chatbot-development',
    title: 'AI Chatbot Development Services',
    metaDescription: 'Deploy advanced, conversational AI chatbots and AI receptionists that speak 50+ languages, handle customer support, and book appointments 24/7.',
    h1: 'Conversational AI Chatbot Development',
    description: 'Move beyond frustrating, rules-based phone trees. We develop intelligent, LLM-powered AI chatbots that understand context, nuance, and intent. Whether deployed on your website, WhatsApp, or as a voice-based AI receptionist, our bots act like your best employee—working 24/7/365.',
    definition: 'AI Chatbot Development involves building conversational interfaces powered by Large Language Models (LLMs) and Natural Language Processing (NLP). Unlike traditional chatbots that rely on rigid decision trees, AI chatbots can understand natural human language, access knowledge bases (RAG) to provide factual answers, and execute actions like booking appointments or updating CRM records via APIs.',
    benefits: ['24/7/365 Customer Support', 'Multilingual Capabilities (50+ Languages)', 'Context-Aware Human Handoffs', 'Instant API Action Execution'],
    process: ['Knowledge Base Ingestion', 'Persona & Tone Engineering', 'RAG System Architecture', 'Human-in-the-Loop Testing'],
    statistics: [
      { metric: '80%', impact: 'Tickets Resolved Instantly', time: 'Zero Wait Time', revenue: 'Lower Support Cost' },
      { metric: '24/7', impact: 'Availability', time: 'Always On', revenue: 'Global Reach' },
      { metric: '50+', impact: 'Languages Supported', time: 'Auto-Translate', revenue: 'New Markets' },
      { metric: '95%', impact: 'Accuracy Rate', time: 'RAG Architecture', revenue: 'High CSAT' }
    ],
    useCases: [
      {
        problem: 'A global travel agency struggling to handle customer support across 12 different time zones and languages.',
        solution: 'Deployed a multilingual AI chatbot trained on their specific travel policies, FAQ, and live booking API.',
        result: 'The bot now handles 85% of global inquiries autonomously, allowing the human team to focus on VIP clients.',
        stack: 'OpenAI + Pinecone + Custom Webhook'
      }
    ],
    caseStudy: {
      before: 'A medical clinic was missing 30% of their inbound calls because the reception desk was overwhelmed during morning rush hours.',
      implementation: 'We developed an AI Voice Receptionist capable of understanding complex medical terminology. The bot answers calls, answers basic questions, and books appointments directly into their EMR calendar.',
      after: 'Missed calls dropped to zero. Appointment bookings increased by 20%, and the front-desk staff reported significantly lower stress levels.'
    },
    eeat: [
      'We use advanced Retrieval-Augmented Generation (RAG) to ensure the AI only answers using your verified data—eliminating hallucinations.',
      'Our systems include strict guardrails and confidence-scoring thresholds for instant human handoff.',
      'We prioritize data privacy, ensuring no customer PII is used to train public models.'
    ],
    faq: [
      {
        question: 'What happens if the chatbot doesn\'t know the answer?',
        answer: 'We implement a seamless human handoff. If the AI\'s confidence score drops below a set threshold, it escalates the chat directly to a human agent along with the full conversation history.'
      },
      {
        question: 'Can the chatbot actually take actions, like refunding a customer?',
        answer: 'Yes! Through function calling and API integrations, we can give the chatbot the ability to execute specific tasks (like processing a refund in Stripe or booking a calendar slot) securely.'
      }
    ],
    relatedLinks: {
      services: [{ title: 'WhatsApp Automation', slug: 'whatsapp-automation' }],
      industries: [{ title: 'Healthcare', slug: 'healthcare' }],
      blogs: [{ title: 'The end of phone trees', slug: 'ai-voice-receptionists' }],
      magnets: [{ title: 'See an AI Demo', path: '/free-ai-audit' }]
    }
  }
];

// Check if these already exist so we don't append duplicates
const slugs = data.map(d => d.slug);
const toAdd = newServices.filter(s => !slugs.includes(s.slug));

data.push(...toAdd);
fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log(`Added ${toAdd.length} new services!`);
