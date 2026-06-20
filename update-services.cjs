const fs = require('fs');

const data = require('./src/data/services.json');

// 1. Rename 'custom-ai-agents' to 'ai-agent-development'
const aiAgentsIdx = data.findIndex(d => d.slug === 'custom-ai-agents');
if (aiAgentsIdx !== -1) {
    data[aiAgentsIdx].slug = 'ai-agent-development';
    data[aiAgentsIdx].title = 'Custom AI Agent Development';
}

// 2. Rename 'crm-automation' to 'crm-development'
const crmIdx = data.findIndex(d => d.slug === 'crm-automation');
if (crmIdx !== -1) {
    data[crmIdx].slug = 'crm-development';
    data[crmIdx].title = 'Custom CRM Development Services';
}

// 3. Add 'voice-ai-agents' if it doesn't exist
if (!data.find(d => d.slug === 'voice-ai-agents')) {
    data.push({
        slug: 'voice-ai-agents',
        title: 'Voice AI Agent Development',
        metaDescription: 'Deploy conversational Voice AI agents that handle phone calls, book appointments, and route support inquiries with human-like latency.',
        h1: 'Conversational Voice AI Agents for Enterprise',
        description: 'Stop missing inbound calls. We build ultra-low latency Voice AI agents that sound human, integrate with your CRM, and handle 10,000+ concurrent calls.',
        definition: 'Voice AI Agents use advanced STT (Speech-to-Text), LLMs, and TTS (Text-to-Speech) to conduct real-time phone conversations. They can qualify leads, book calendar appointments, and provide technical support over the phone.',
        benefits: [
            'Zero Missed Calls',
            'Human-Like Conversational Latency',
            'Native CRM & Calendar Sync',
            'Multilingual Support'
        ],
        process: [
            'Telephony Architecture',
            'LLM Persona & Voice Cloning',
            'Latency Optimization',
            'Production Deployment'
        ],
        statistics: [
            { metric: '100%', impact: 'Call Answer Rate', time: '24/7/365', revenue: 'No Lost Leads' },
            { metric: '<500ms', impact: 'Response Latency', time: 'Real-time', revenue: 'Better UX' }
        ],
        useCases: [
            {
                problem: 'Dental clinics missing 20% of inbound calls during busy hours.',
                solution: 'A Voice AI agent that answers the phone, checks the schedule, and books appointments.',
                result: 'Recaptured 100% of missed appointment revenue.'
            }
        ],
        caseStudy: {
            before: 'A logistics company relied on a team of 10 dispatchers to handle inbound driver queries, resulting in long hold times.',
            implementation: 'We deployed a custom Voice AI agent connected to their fleet management API.',
            after: 'The AI now handles 80% of routine inquiries instantly, saving 200 hours per week.'
        },
        eeat: [
            'Built on low-latency infrastructure like Vapi, Bland AI, and custom Twilio pipelines.',
            'Deep expertise in latency optimization to ensure natural conversation flow.',
            'Compliant with telemarketing regulations.'
        ],
        faq: [
            { question: 'Do the agents sound robotic?', answer: 'No. We use state-of-the-art voice models like ElevenLabs and PlayHT to create completely natural, emotive voices.' },
            { question: 'Can the agent transfer a call to a human?', answer: 'Yes. If the AI detects a complex issue or an angry customer, it instantly patches the call through to a human representative.' }
        ],
        relatedLinks: {
            services: [
                { title: 'AI Receptionist', slug: 'ai-receptionist' },
                { title: 'Customer Support Automation', slug: 'customer-support-automation' }
            ],
            industries: [
                { title: 'Dental Clinics', slug: 'dental-clinics' },
                { title: 'Healthcare', slug: 'healthcare' }
            ],
            blogs: [],
            magnets: []
        }
    });
}

fs.writeFileSync('./src/data/services.json', JSON.stringify(data, null, 2));
console.log('Successfully updated services.json');
