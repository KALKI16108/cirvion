import fs from 'fs';
import path from 'path';

const domain = 'https://aiflowix.in';
const today = new Date().toISOString().split('T')[0];

const corePages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/blog', priority: '0.8', changefreq: 'weekly' },
  { loc: '/industries', priority: '0.8', changefreq: 'weekly' },
  { loc: '/custom-ai-software', priority: '0.8', changefreq: 'weekly' },
  { loc: '/ai-for-small-business', priority: '0.8', changefreq: 'weekly' },
  { loc: '/free-ai-audit', priority: '0.8', changefreq: 'weekly' },
  { loc: '/roi-calculator', priority: '0.8', changefreq: 'weekly' },
  { loc: '/ai-readiness', priority: '0.8', changefreq: 'weekly' },
  { loc: '/lab', priority: '0.8', changefreq: 'weekly' }
];

const servicePages = [
  '/ai-automation-services',
  '/workflow-automation-services',
  '/ai-agent-development',
  '/voice-ai-agents',
  '/ai-receptionist',
  '/whatsapp-automation',
  '/custom-software-development',
  '/web-development-services',
  '/crm-development'
];

const caseStudyPages = [
  '/healthcare-automation',
  '/real-estate-automation',
  '/logistics-automation',
  '/finance-automation',
  '/law-firm-automation',
  '/e-commerce-automation'
];

// Read blogs
const blogsPath = path.join(process.cwd(), 'src/data/blogs.json');
let blogs = [];
try {
  const content = fs.readFileSync(blogsPath, 'utf8');
  blogs = JSON.parse(content);
} catch (e) {
  console.error('Error reading blogs.json:', e);
}

function generateUrlSet(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${domain}${u.loc || u}</loc>
    <lastmod>${u.lastmod || today}</lastmod>
    <changefreq>${u.changefreq || 'weekly'}</changefreq>
    <priority>${u.priority || '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
}

// 1. Core sitemap
const coreXml = generateUrlSet(corePages);
fs.writeFileSync(path.join(process.cwd(), 'public/sitemap-core.xml'), coreXml);

// 2. Services sitemap
const servicesXml = generateUrlSet(servicePages.map(p => ({ loc: p, priority: '0.9', changefreq: 'weekly' })));
fs.writeFileSync(path.join(process.cwd(), 'public/sitemap-services.xml'), servicesXml);

// 3. Case Studies sitemap
const caseStudiesXml = generateUrlSet(caseStudyPages.map(p => ({ loc: p, priority: '0.9', changefreq: 'weekly' })));
fs.writeFileSync(path.join(process.cwd(), 'public/sitemap-case-studies.xml'), caseStudiesXml);

// 4. Blogs sitemap
const blogUrls = blogs.map(b => ({ loc: `/blog/${b.slug}`, priority: '0.8', changefreq: 'monthly' }));
const blogsXml = generateUrlSet(blogUrls);
fs.writeFileSync(path.join(process.cwd(), 'public/sitemap-blogs.xml'), blogsXml);

// 5. Sitemap Index
const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${domain}/sitemap-core.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${domain}/sitemap-services.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${domain}/sitemap-case-studies.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${domain}/sitemap-blogs.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
fs.writeFileSync(path.join(process.cwd(), 'public/sitemap-index.xml'), sitemapIndexXml);

// Also update master sitemap.xml to include everything
const allUrls = [
  ...corePages,
  ...servicePages.map(p => ({ loc: p, priority: '0.9', changefreq: 'weekly' })),
  ...caseStudyPages.map(p => ({ loc: p, priority: '0.9', changefreq: 'weekly' })),
  ...blogUrls
];
const masterXml = generateUrlSet(allUrls);
fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), masterXml);

console.log('Successfully generated sitemap-index.xml and all sub-sitemaps!');
