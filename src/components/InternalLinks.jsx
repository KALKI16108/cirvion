import React from 'react';
import { Link } from 'react-router-dom';

const InternalLinks = ({ links }) => {
    if (!links) return null;

    return (
        <div className="my-16 border-t border-white/10 pt-16">
            <h2 className="text-2xl font-bold text-white mb-8">Related Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                {/* Services */}
                {links.services && links.services.length > 0 && (
                    <div>
                        <h3 className="text-[#00C8FF] font-semibold mb-4">Related Services</h3>
                        <ul className="space-y-2">
                            {links.services.map((link, idx) => (
                                <li key={idx}>
                                    <Link to={`/services/${link.slug}`} className="text-[#94A3B8] hover:text-white transition-colors text-sm">
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Industries */}
                {links.industries && links.industries.length > 0 && (
                    <div>
                        <h3 className="text-[#6366F1] font-semibold mb-4">Industries</h3>
                        <ul className="space-y-2">
                            {links.industries.map((link, idx) => (
                                <li key={idx}>
                                    <Link to={`/industries/${link.slug}`} className="text-[#94A3B8] hover:text-white transition-colors text-sm">
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Blogs */}
                {links.blogs && links.blogs.length > 0 && (
                    <div>
                        <h3 className="text-[#10B981] font-semibold mb-4">Read More</h3>
                        <ul className="space-y-2">
                            {links.blogs.map((link, idx) => (
                                <li key={idx}>
                                    <Link to={`/blog/${link.slug}`} className="text-[#94A3B8] hover:text-white transition-colors text-sm">
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Lead Magnets */}
                {links.magnets && links.magnets.length > 0 && (
                    <div>
                        <h3 className="text-[#F59E0B] font-semibold mb-4">Free Tools</h3>
                        <ul className="space-y-2">
                            {links.magnets.map((link, idx) => (
                                <li key={idx}>
                                    <Link to={link.path} className="text-[#94A3B8] hover:text-white transition-colors text-sm">
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
        </div>
    );
};

export default InternalLinks;
