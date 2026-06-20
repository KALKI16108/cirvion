import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
    title, 
    description, 
    canonical, 
    keywords, 
    ogImage = "https://aiflowix.in/og-image.jpg", // We'll assume an og-image exists or user adds it later
    schema,
    type = "website"
}) => {
    const siteUrl = "https://aiflowix.in";
    const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "AIFlowix",
        "url": "https://aiflowix.in",
        "logo": "https://aiflowix.in/logo.png",
        "sameAs": [
            "https://www.linkedin.com/company/aiflowix",
            "https://twitter.com/aiflowix"
        ]
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "AIFlowix AI Automation Agency",
        "image": "https://aiflowix.in/logo.png",
        "url": "https://aiflowix.in",
        "telephone": "+91-9930744723", // Adding the actual phone number based on ContactFooter
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Navi Mumbai",
            "addressRegion": "Maharashtra",
            "addressCountry": "IN"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "AIFlowix",
        "url": "https://aiflowix.in",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://aiflowix.in/services?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    // Combine schemas
    const allSchemas = [organizationSchema, localBusinessSchema, websiteSchema];
    if (schema) {
        if (Array.isArray(schema)) {
            allSchemas.push(...schema);
        } else {
            allSchemas.push(schema);
        }
    }

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={fullCanonical} />

            {/* OpenGraph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content="AIFlowix" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullCanonical} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Schema.org JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(allSchemas)}
            </script>
        </Helmet>
    );
};

export default SEOHead;
