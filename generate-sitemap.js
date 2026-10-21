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

// Dedicated root-level mapped service pages from App.jsx
const rootServices = [
    'ai-automation-services',
    'workflow-automation-services',
    'ai-agent-development',
    'voice-ai-agents',
    'ai-receptionist',
    'whatsapp-automation',
    'custom-software-development',
    'web-development-services',
    'crm-development'
];

// Dedicated root-level mapped industry pages from App.jsx
const rootIndustries = [
    { path: '/real-estate-automation', slug: 'real-estate' },
    { path: '/dental-clinic-automation', slug: 'dental-clinics' },
    { path: '/recruitment-agency-automation', slug: 'recruitment-agencies' },
    { path: '/law-firm-automation', slug: 'law-firms' },
    { path: '/healthcare-automation', slug: 'healthcare' },
    { path: '/e-commerce-automation', slug: 'e-commerce' },
    { path: '/finance-automation', slug: 'finance' },
    { path: '/marketing-agency-automation', slug: 'agencies' },
    { path: '/interior-design-automation', slug: 'interior-designers' },
    { path: '/logistics-automation', slug: 'logistics' },
    { path: '/manufacturing-automation', slug: 'manufacturing' }
];

const staticPages = [
    '',
    '/blog',
    '/industries',
    '/custom-ai-software',
    '/ai-for-small-business',
    '/free-ai-audit',
    '/roi-calculator',
    '/ai-readiness',
    '/lab'
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

    // Add root services (high commercial intent)
    rootServices.forEach(slug => addUrl(`/${slug}`, '0.9', 'weekly'));

    // Add root industry pages (high conversion intent)
    rootIndustries.forEach(item => addUrl(item.path, '0.9', 'weekly'));

    // Add dynamic services
    services.forEach(s => {
        if (!rootServices.includes(s.slug)) {
            addUrl(`/services/${s.slug}`, '0.8', 'monthly');
        }
    });

    // Add dynamic industries
    industries.forEach(i => {
        const isRoot = rootIndustries.some(item => item.slug === i.slug);
        if (!isRoot) {
            addUrl(`/industries/${i.slug}`, '0.8', 'monthly');
        }
    });

    // Add locations
    locations.forEach(l => addUrl(`/locations/${l.slug}`, '0.8', 'monthly'));

    // Add blogs
    blogs.forEach(b => addUrl(`/blog/${b.slug}`, '0.7', 'monthly'));

    xml += `</urlset>`;

    fs.writeFileSync(path.join(__dirname, 'public/sitemap.xml'), xml);
    console.log('✅ sitemap.xml generated successfully with correct canonical URLs!');
};

generateSitemap();
