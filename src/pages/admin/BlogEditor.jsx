import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBlogs, createBlog, updateBlog } from '../../lib/api';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id;
    
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: '',
        meta_description: '',
        content: '',
        published: true,
        eeat: [],
        faq: [],
        related_links: { previous: null, next: null }
    });

    useEffect(() => {
        if (!isNew) {
            fetchBlog();
        }
    }, [id]);

    const fetchBlog = async () => {
        try {
            // We just fetch all and find, or use an API function if we have getBlogById. 
            // In api.js we only have getBlogs() and getBlogBySlug(). Let's use getBlogs and find.
            const allBlogs = await getBlogs();
            const blog = allBlogs.find(b => b.id === Number(id) || b.id === id);
            if (blog) {
                setFormData(blog);
            } else {
                toast.error("Blog not found");
                navigate('/admin/content');
            }
        } catch (error) {
            toast.error("Error fetching blog");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleJsonChange = (e, field) => {
        try {
            const val = JSON.parse(e.target.value);
            setFormData(prev => ({ ...prev, [field]: val }));
        } catch (err) {
            // Invalid JSON, don't update state yet or handle differently
            // A more complex editor would have separate fields for JSON array items
            // For now we just keep the string value if it fails to parse
            setFormData(prev => ({ ...prev, [field]: e.target.value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        
        try {
            // Ensure JSON fields are parsed arrays/objects before sending if they are strings
            const payload = { ...formData };
            if (typeof payload.eeat === 'string') payload.eeat = JSON.parse(payload.eeat);
            if (typeof payload.faq === 'string') payload.faq = JSON.parse(payload.faq);
            if (typeof payload.related_links === 'string') payload.related_links = JSON.parse(payload.related_links);
            
            if (isNew) {
                await createBlog(payload);
                toast.success('Blog created successfully');
            } else {
                await updateBlog(id, payload);
                toast.success('Blog updated successfully');
            }
            navigate('/admin/content');
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Error saving blog. Check JSON formatting.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-white">Loading editor...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <Link to="/admin/content" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-3xl font-bold text-white">{isNew ? 'Create New Blog' : 'Edit Blog'}</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="glass-card p-8 rounded-3xl border border-white/5 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-[#94A3B8] mb-2">Title</label>
                            <input 
                                required
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#94A3B8] mb-2">Slug</label>
                            <input 
                                required
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-[#94A3B8] mb-2">Category</label>
                            <input 
                                required
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF]"
                            />
                        </div>
                        <div className="flex items-center mt-8">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    name="published"
                                    checked={formData.published}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded border-white/10 bg-[#0F172A] text-[#00C8FF] focus:ring-[#00C8FF]"
                                />
                                <span className="text-white font-medium">Published</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#94A3B8] mb-2">Meta Description</label>
                        <textarea 
                            required
                            name="meta_description"
                            value={formData.meta_description}
                            onChange={handleChange}
                            rows="2"
                            className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF]"
                        />
                    </div>

                    <div className="w-full quill-dark-theme">
                        <label className="block text-sm font-medium text-[#94A3B8] mb-2">Content</label>
                        <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0F172A]">
                            <ReactQuill 
                                theme="snow"
                                value={formData.content}
                                onChange={(val) => setFormData(prev => ({ ...prev, content: val || '' }))}
                                className="text-white"
                                style={{ minHeight: '500px' }}
                                modules={{
                                    toolbar: [
                                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                        ['bold', 'italic', 'underline', 'strike'],
                                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                        ['link', 'image', 'video'],
                                        ['clean']
                                    ]
                                }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-[#94A3B8] mb-2">EEAT Signals (JSON Array)</label>
                            <textarea 
                                name="eeat"
                                value={typeof formData.eeat === 'string' ? formData.eeat : JSON.stringify(formData.eeat, null, 2)}
                                onChange={handleChange}
                                rows="4"
                                className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] font-mono text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#94A3B8] mb-2">Related Links (JSON Object)</label>
                            <textarea 
                                name="related_links"
                                value={typeof formData.related_links === 'string' ? formData.related_links : JSON.stringify(formData.related_links, null, 2)}
                                onChange={handleChange}
                                rows="4"
                                className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] font-mono text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#94A3B8] mb-2">FAQ (JSON Array of Objects)</label>
                        <textarea 
                            name="faq"
                            value={typeof formData.faq === 'string' ? formData.faq : JSON.stringify(formData.faq, null, 2)}
                            onChange={handleChange}
                            rows="6"
                            className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00C8FF] font-mono text-sm"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button 
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-[#00C8FF] text-[#0F172A] px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : <><Save className="w-5 h-5" /> Save Blog</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlogEditor;
