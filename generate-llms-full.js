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
        content += `**Pain Points Solved:** ${s.painPoints ? s.painPoints.join(', ') : ''}\n`;
        if (s.features) {
            content += `**Features:**\n${s.features.map(f => `- ${f}`).join('\n')}\n`;
        }
        content += '\n';
    });

    // 3. Add Industries
    content += '---\n## Industries Served\n\n';
    industries.forEach(i => {
        content += `### Automation for ${i.title}\n`;
        content += `**Description:** ${i.description}\n`;
        content += `**Key Solutions:**\n`;
        if (i.solutions) {
            i.solutions.forEach(sol => {
                content += `- **${sol.title}:** ${sol.description}\n`;
            });
        }
        content += '\n';
    });

    // 4. Add Blogs / Case Studies
    content += '---\n## Case Studies & Insights\n\n';
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
