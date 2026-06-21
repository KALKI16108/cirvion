import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Data
const loadJson = (filename) => {
    try {
        const raw = fs.readFileSync(path.join(__dirname, 'src/data', filename), 'utf-8');
        return JSON.parse(raw);
    } catch (e) {
        console.warn(`Could not load ${filename}`);
        return [];
    }
};

const services = loadJson('services.json');
const industries = loadJson('industries.json');
const blogs = loadJson('blogs.json');

const generateLlmsFull = () => {
    let content = '';

    // 1. Read Base llms.txt
    try {
        const baseLlms = fs.readFileSync(path.join(__dirname, 'public/llms.txt'), 'utf-8');
        content += baseLlms + '\n\n';
    } catch (e) {
        console.warn('Could not read public/llms.txt');
    }

    content += '---\n# AIFlowix Comprehensive Content Directory\n\n';

    // 2. Add Services
    content += '## Services\n\n';
    services.forEach(s => {
        content += `### ${s.title}\n`;
        content += `**Description:** ${s.description}\n`;
        
        if (s.benefits) {
            content += `**Benefits:**\n${s.benefits.map(b => `- ${b}`).join('\n')}\n`;
        }
        if (s.useCases) {
            content += `**Use Cases:**\n${s.useCases.map(u => `- **${u.title}:** ${u.description}`).join('\n')}\n`;
        }
        if (s.caseStudy) {
            content += `**Case Study:**\n- **Before:** ${s.caseStudy.before}\n- **Implementation:** ${s.caseStudy.implementation}\n- **After:** ${s.caseStudy.after}\n`;
        }
        if (s.faq) {
            content += `**Frequently Asked Questions:**\n${s.faq.map(f => `- **Q:** ${f.question}\n  **A:** ${f.answer}`).join('\n')}\n`;
        }
        content += '\n';
    });

    // 3. Add Industries
    content += '---\n## Industries Served\n\n';
    industries.forEach(i => {
        content += `### ${i.h1 || i.industry}\n`;
        content += `**Description:** ${i.description}\n`;
        
        if (i.challenges) {
            content += `**Key Challenges Solved:**\n${i.challenges.map(c => `- ${c}`).join('\n')}\n`;
        }
        if (i.solutions) {
            content += `**Automation Solutions:**\n${i.solutions.map(sol => `- ${sol}`).join('\n')}\n`;
        }
        if (i.caseStudy) {
            content += `**Industry Case Study:**\n- **Before:** ${i.caseStudy.before}\n- **Implementation:** ${i.caseStudy.implementation}\n- **After:** ${i.caseStudy.after}\n`;
        }
        if (i.faq) {
            content += `**Industry FAQs:**\n${i.faq.map(f => `- **Q:** ${f.question}\n  **A:** ${f.answer}`).join('\n')}\n`;
        }
        content += '\n';
    });

    // 4. Add Blogs / Case Studies
    content += '---\n## Deep Dive Case Studies & Insights\n\n';
    blogs.forEach(b => {
        if (b.published !== false) {
            content += `### ${b.title}\n`;
            content += `**Category:** ${b.category || 'Strategy'}\n`;
            content += `**Summary:** ${b.metaDescription || b.meta_description || ''}\n`;
            content += `**Content:**\n${b.content.replace(/<[^>]+>/g, '')}\n\n`; // Strip HTML tags
        }
    });

    fs.writeFileSync(path.join(__dirname, 'public/llms-full.txt'), content);
    console.log('✅ llms-full.txt generated successfully!');
};

generateLlmsFull();
