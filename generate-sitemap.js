import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://aiflowix.in';

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
const locations = loadJson('locations.json');
const blogs = loadJson('blogs.json');

// Hardcoded root-level mapped pages from App.jsx
const rootServices = [
    'ai-automation-services',
    'workflow-automation-services',
    'custom-software-development',
    'web-development-services',
    'ai-receptionist'
];

const rootIndustries = [
    'dental-clinics',
    'real-estate',
    'interior-designers',
    'recruitment-agencies'
];

const staticPages = [
    '',
    '/blog',
    '/custom-ai-software',
    '/ai-for-small-business',
    '/free-ai-audit',
    '/roi-calculator'
];

const generateSitemap = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const addUrl = (route, priority = '0.8', changefreq = 'monthly') => {
        // Prevent double slashes
        const url = `${BASE_URL}${route.startsWith('/') ? route : `/${route}`}`;
        xml += `  <url>\n`;
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
        xml += `    <changefreq>${changefreq}</changefreq>\n`;
        xml += `    <priority>${priority}</priority>\n`;
        xml += `  </url>\n`;
    };

    // Add static pages
    staticPages.forEach(page => addUrl(page, page === '' ? '1.0' : '0.8', 'weekly'));

    // Add root services
    rootServices.forEach(slug => addUrl(`/${slug}`, '0.9', 'weekly'));

    // Add root industries
    rootIndustries.forEach(slug => addUrl(`/automation-for-${slug}`, '0.9', 'weekly'));

    // Add dynamic services
    services.forEach(s => {
        if (!rootServices.includes(s.slug)) {
            addUrl(`/services/${s.slug}`, '0.8', 'monthly');
        }
    });

    // Add dynamic industries
    industries.forEach(i => {
        if (!rootIndustries.includes(i.slug)) {
            addUrl(`/industries/${i.slug}`, '0.8', 'monthly');
        }
    });

    // Add locations
    locations.forEach(l => addUrl(`/locations/${l.slug}`, '0.8', 'monthly'));

    // Add blogs
    blogs.forEach(b => addUrl(`/blog/${b.slug}`, '0.7', 'monthly'));

    xml += `</urlset>`;

    fs.writeFileSync(path.join(__dirname, 'public/sitemap.xml'), xml);
    console.log('✅ sitemap.xml generated successfully!');
};

generateSitemap();
