const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./src/data/industries.json', 'utf8'));

// 1. Update Healthcare
const healthcare = data.find(d => d.slug === 'healthcare');
if (healthcare) {
    healthcare.faq = [
        {
            question: "Is this HIPAA compliant?",
            answer: "Yes, we build on top of HIPAA-eligible infrastructure and execute Business Associate Agreements (BAAs) for all deployments."
        },
        {
            question: "Can it integrate with our EMR?",
            answer: "Yes, we integrate with Epic, Cerner, Athenahealth, and Open Dental via their secure APIs."
        }
    ];
}

// 2. Update E-Commerce
const ecommerce = data.find(d => d.slug === 'e-commerce');
if (ecommerce) {
    ecommerce.caseStudy = {
        before: "An online retailer was drowning in 'Where is my order?' tickets, slowing down their customer service team and frustrating buyers.",
        implementation: "We deployed an AI agent integrated with Shopify and ShipStation. The agent intercepts tickets, checks live tracking, and provides real-time updates.",
        after: "Support ticket volume dropped by 65%, and customer satisfaction scores increased by 18%."
    };
    ecommerce.faq = [
        {
            question: "Does it work with Shopify?",
            answer: "Yes, we build direct API integrations with Shopify, WooCommerce, and Magento to process refunds, track orders, and recommend products."
        },
        {
            question: "Can it handle returns automatically?",
            answer: "Yes. The AI can verify the return policy, generate a shipping label, and email it to the customer without human intervention."
        }
    ];
}

// 3. Update Finance
const finance = data.find(d => d.slug === 'finance');
if (finance) {
    finance.caseStudy = {
        before: "A wealth management firm had analysts spending 15 hours a week manually extracting financial data from 10-K reports into spreadsheets.",
        implementation: "We built an automated data extraction pipeline using Vision AI to scrape tables and text from SEC filings and push it directly into their financial modeling software.",
        after: "Analysts now spend zero time on data entry, saving the firm thousands of hours a year and accelerating investment decisions."
    };
    finance.faq = [
        {
            question: "How do you ensure data security?",
            answer: "We deploy private, single-tenant AI models that run within your secure cloud environment (AWS, Azure, or GCP). Your data is never used to train public models."
        },
        {
            question: "Can it analyze financial documents?",
            answer: "Yes, we use advanced RAG systems to parse PDFs, contracts, and spreadsheets, allowing you to 'chat' with your financial documents."
        }
    ];
}

// 4. Update Agencies
const agencies = data.find(d => d.slug === 'agencies');
if (agencies) {
    agencies.caseStudy = {
        before: "A marketing agency's account managers spent 3 days at the end of every month compiling reporting dashboards for their 40 clients.",
        implementation: "We automated the entire reporting workflow. A system pulls data from Facebook Ads, Google Analytics, and HubSpot, writes a custom performance summary using an LLM, and emails the PDF to the client.",
        after: "Monthly reporting now takes 5 minutes total. Account managers focus entirely on strategy."
    };
    agencies.faq = [
        {
            question: "Can it write ad copy?",
            answer: "Yes, we can fine-tune models on your highest-performing historical ads to generate new variations that match your exact brand voice."
        },
        {
            question: "Does it integrate with GoHighLevel?",
            answer: "Absolutely. We are experts at extending GoHighLevel's capabilities with custom AI agents and Zapier/Make.com workflows."
        }
    ];
}

// 5. Update Interior Designers
const interior = data.find(d => d.slug === 'interior-designers');
if (interior) {
    interior.caseStudy = {
        before: "An interior design firm was struggling to keep track of hundreds of vendor invoices, shipping updates, and client communications across multiple projects.",
        implementation: "We built a centralized automation hub. Vendor emails are automatically parsed, purchase orders are updated in their project management software, and clients receive weekly automated progress reports.",
        after: "The firm saved 20 hours a week on administrative follow-ups and eliminated costly ordering mistakes."
    };
    interior.faq = [
        {
            question: "Can AI help with design generation?",
            answer: "Yes, we can implement custom image generation workflows using Midjourney or Stable Diffusion to help you rapidly prototype concepts for clients."
        },
        {
            question: "Will this replace my project manager?",
            answer: "No, it supercharges them. The AI handles the data entry and tracking, freeing your project manager to focus on design execution and vendor relationships."
        }
    ];
}

// Add Logistics
if (!data.find(d => d.slug === 'logistics')) {
    data.push({
        slug: "logistics",
        industry: "Logistics & Supply Chain",
        h1: "AI Automation for Logistics Companies",
        description: "Optimize your supply chain. We build AI systems that automate freight quoting, track shipments, and eliminate manual bill of lading data entry.",
        metaDescription: "Logistics AI automation. Automate freight quoting, dispatching, and back-office data entry to scale your supply chain operations.",
        challenges: [
            "Dispatchers spend hours manually quoting freight rates via email.",
            "Manual data entry from Bills of Lading (BOL) causes delays and errors.",
            "Customers constantly calling for 'track and trace' updates."
        ],
        solutions: [
            "Deploy an AI email agent that reads rate requests and generates accurate freight quotes instantly.",
            "Implement OCR to digitize Bills of Lading and invoices straight into your TMS.",
            "Build a WhatsApp tracking bot so customers can get live updates instantly."
        ],
        benefits: [
            "Instant Quoting",
            "Zero Manual Entry",
            "Real-Time Tracking"
        ],
        statistics: [
            { metric: "90%", impact: "Faster Quoting", time: "Instant", revenue: "More Won Bids" },
            { metric: "40 Hrs", impact: "Saved Per Week", time: "Data Entry", revenue: "Lower Admin Cost" }
        ],
        useCases: [
            {
                problem: "Customers calling repeatedly for shipment status.",
                solution: "WhatsApp AI agent integrated with your TMS provides real-time location updates.",
                result: "Call volume dropped by 70%."
            }
        ],
        caseStudy: {
            before: "A freight brokerage was losing bids because it took them 45 minutes to reply to email quote requests.",
            implementation: "We built an AI agent that monitors the quoting inbox, calculates the rate based on historical lane data and current market boards, and replies with a quote in 2 minutes.",
            after: "Quote volume increased by 300% and win rate improved by 15%."
        },
        eeat: [
            "Experience integrating with major TMS platforms like McLeod, MercuryGate, and custom SQL databases.",
            "We understand supply chain terminology and freight dynamics."
        ],
        faq: [
            {
                question: "Can the AI read messy Bills of Lading?",
                answer: "Yes. Our OCR models are specifically trained on logistics documents and can extract data even from handwritten or poor-quality scans."
            }
        ],
        relatedLinks: {
            services: [{ title: "Custom CRM Development", slug: "crm-development" }],
            industries: [{ title: "E-Commerce", slug: "e-commerce" }],
            blogs: [],
            magnets: []
        }
    });
}

// Add Manufacturing
if (!data.find(d => d.slug === 'manufacturing')) {
    data.push({
        slug: "manufacturing",
        industry: "Manufacturing",
        h1: "AI Automation for Manufacturing Facilities",
        description: "Modernize your factory floor and back office. We implement AI to predict equipment maintenance, automate procurement, and streamline inventory tracking.",
        metaDescription: "Manufacturing AI automation. Predictive maintenance, automated procurement, and ERP integrations for modern manufacturers.",
        challenges: [
            "Unplanned equipment downtime costing thousands per hour.",
            "Manual inventory counts leading to stockouts or over-ordering.",
            "Siloed data between the factory floor and the ERP system."
        ],
        solutions: [
            "Implement predictive maintenance models that analyze sensor data to flag potential failures.",
            "Automate procurement workflows to instantly generate POs when inventory dips below thresholds.",
            "Build custom dashboards that unify ERP and factory floor data."
        ],
        benefits: [
            "Predictive Maintenance",
            "Automated Procurement",
            "Unified Data"
        ],
        statistics: [
            { metric: "30%", impact: "Less Downtime", time: "Predictive Alerts", revenue: "Higher Output" },
            { metric: "100%", impact: "Inventory Accuracy", time: "Automated Tracking", revenue: "Lower Carrying Costs" }
        ],
        useCases: [
            {
                problem: "Running out of raw materials unexpectedly.",
                solution: "Automated workflow monitors ERP inventory and emails suppliers when levels are low.",
                result: "Zero stockouts in 12 months."
            }
        ],
        caseStudy: {
            before: "A mid-sized manufacturer suffered from unpredictable machine breakdowns that halted production.",
            implementation: "We trained a machine learning model on historical vibration and temperature sensor data to predict when a motor was likely to fail.",
            after: "Maintenance is now scheduled during planned downtime, reducing emergency repairs by 40%."
        },
        eeat: [
            "Deep experience with IoT data pipelines and legacy ERP integrations (SAP, Oracle, NetSuite).",
            "Strict adherence to industrial security standards."
        ],
        faq: [
            {
                question: "Does this require us to replace our old machines?",
                answer: "Not necessarily. We can often install retrofitted IoT sensors on legacy equipment to gather the data needed for AI analysis."
            }
        ],
        relatedLinks: {
            services: [{ title: "Custom Software Development", slug: "custom-software-development" }],
            industries: [{ title: "Logistics", slug: "logistics" }],
            blogs: [],
            magnets: []
        }
    });
}


fs.writeFileSync('./src/data/industries.json', JSON.stringify(data, null, 2));
console.log('Successfully updated additional industries.');
