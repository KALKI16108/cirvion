const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./src/data/industries.json', 'utf8'));

// Update Dental Clinics
const dental = data.find(d => d.slug === 'dental-clinics');
if (dental) {
    dental.caseStudy = {
        before: "A multi-location dental practice was losing 20% of their new patient inquiries because front desk staff were too busy assisting in-office patients to answer the phone.",
        implementation: "We deployed a conversational Voice AI Receptionist integrated directly with Open Dental. The AI answers every call instantly, checks real-time calendar availability, answers questions about insurance accepted, and books the appointment into the system without human intervention.",
        after: "Missed calls dropped to zero. The practice recaptured $15,000+ per month in previously lost revenue, and staff stress levels plummeted."
    };
    dental.faq = [
        {
            question: "Can the AI verify patient insurance?",
            answer: "Yes, our AI agents can be connected to insurance verification APIs or prompt patients to upload their insurance card securely via a follow-up SMS link."
        },
        {
            question: "Does this integrate with our current dental software?",
            answer: "We integrate with all major dental EMRs and scheduling tools, including Open Dental, Dentrix, and Eaglesoft, using secure API connections."
        }
    ];
}

// Update Recruitment Agencies
const recruitment = data.find(d => d.slug === 'recruitment-agencies');
if (recruitment) {
    recruitment.caseStudy = {
        before: "A mid-sized staffing agency had recruiters spending 4 hours a day manually reading resumes, extracting data, and entering candidate profiles into Bullhorn.",
        implementation: "We built an AI-powered resume parsing and enrichment pipeline. Now, when a candidate applies, the AI automatically reads the PDF, extracts key skills, generates a formatted candidate summary, and creates the structured record in the CRM.",
        after: "Recruiters got 20 hours a week back to focus on interviewing and relationship building. Candidate placement time dropped by 3 days due to faster processing."
    };
    recruitment.faq = [
        {
            question: "Can the AI screen candidates based on specific criteria?",
            answer: "Yes. We can program the AI to look for mandatory certifications, years of experience, or specific tech stacks, and automatically tag candidates as 'Highly Qualified' or send polite rejection emails."
        },
        {
            question: "Is the AI biased?",
            answer: "We design our AI screening tools to strictly evaluate based on skills and experience parameters, actively stripping out demographic identifiers to ensure fair, unbiased shortlisting."
        }
    ];
}

// Update Law Firms
const law = data.find(d => d.slug === 'law-firms');
if (law) {
    law.caseStudy = {
        before: "A boutique corporate law firm struggled with the sheer volume of discovery documents. Paralegals spent weeks manually reviewing thousands of PDFs to find relevant clauses for litigation.",
        implementation: "We deployed a private, secure Retrieval-Augmented Generation (RAG) system. The firm uploaded their discovery documents into an encrypted vault. Lawyers can now 'chat' with the documents, asking 'Find all instances where the defendant mentioned project delays' and receive exact citations and page numbers instantly.",
        after: "Document review time was reduced by 85%. The firm was able to take on twice as many cases without hiring additional paralegal staff."
    };
    law.faq = [
        {
            question: "Is client data kept confidential and secure?",
            answer: "Absolutely. We deploy private LLM instances (like Enterprise Azure OpenAI or locally hosted models) that do not use your confidential legal documents to train public AI models. Your data remains completely isolated."
        },
        {
            question: "Can the AI draft legal documents?",
            answer: "Yes, we can build custom drafting assistants that use your firm's historical contracts as templates. You provide the key variables, and the AI generates the first draft in seconds for your final review."
        }
    ];
}

fs.writeFileSync('./src/data/industries.json', JSON.stringify(data, null, 2));
console.log('Industries updated successfully.');
