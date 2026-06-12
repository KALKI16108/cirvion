import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs, deleteBlog } from '../../lib/api';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ContentManager = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const data = await getBlogs();
            setBlogs(data);
        } catch (error) {
            toast.error('Failed to load blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;
        try {
            await deleteBlog(id);
            toast.success('Blog deleted successfully');
            fetchBlogs();
        } catch (error) {
            toast.error('Failed to delete blog');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Content Manager</h1>
                <Link 
                    to="/admin/content/blog/new" 
                    className="flex items-center gap-2 bg-[#00C8FF] text-[#0F172A] px-4 py-2 rounded-lg font-bold hover:bg-white transition-colors"
                >
                    <Plus className="w-5 h-5" /> New Blog
                </Link>
            </div>
            
            <div className="glass-card rounded-3xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5 text-[#94A3B8]">
                                <th className="p-4 font-semibold text-sm">Title</th>
                                <th className="p-4 font-semibold text-sm">Slug</th>
                                <th className="p-4 font-semibold text-sm">Category</th>
                                <th className="p-4 font-semibold text-sm">Status</th>
                                <th className="p-4 font-semibold text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="p-4 text-center text-[#94A3B8]">Loading...</td></tr>
                            ) : blogs.length === 0 ? (
                                <tr><td colSpan="5" className="p-4 text-center text-[#94A3B8]">No blogs found</td></tr>
                            ) : (
                                blogs.map((blog) => (
                                    <tr key={blog.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-medium text-white">{blog.title}</td>
                                        <td className="p-4 text-[#94A3B8]">{blog.slug}</td>
                                        <td className="p-4 text-[#94A3B8]">
                                            <span className="px-2 py-1 bg-[#6366F1]/20 text-[#6366F1] rounded text-xs">{blog.category}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs ${blog.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                {blog.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link 
                                                    to={`/admin/content/blog/${blog.id}`}
                                                    className="p-2 bg-white/5 hover:bg-white/10 rounded transition-colors text-white"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(blog.id)}
                                                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContentManager;
