import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, LogOut, Loader2 } from 'lucide-react';
import { getSession, logoutAdmin } from '../../lib/api';
import { supabase } from '../../lib/supabase';

const AdminLayout = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Initial session check
        getSession().then((session) => {
            setSession(session);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await logoutAdmin();
        window.location.href = '/admin/login';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#030712]">
                <Loader2 className="w-12 h-12 text-[#6366F1] animate-spin" />
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/admin/login" replace />;
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Pipeline', href: '/admin/pipeline', icon: Users },
        { name: 'Content', href: '/admin/content', icon: FileText },
    ];

    return (
        <div className="min-h-screen bg-[#0F172A] flex">
            {/* Sidebar */}
            <div className="w-64 bg-[#030712] border-r border-white/5 flex flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b border-white/5">
                    <span className="text-white font-bold text-lg tracking-wider">AIFLOWIX<span className="text-[#6366F1]">ADMIN</span></span>
                </div>
                
                <div className="flex-1 py-6 px-4 space-y-2">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20' : 'text-[#94A3B8] hover:text-white hover:bg-white/5'}`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium text-sm">{item.name}</span>
                            </Link>
                        )
                    })}
                </div>

                <div className="p-4 border-t border-white/5">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[#94A3B8] hover:text-red-400 hover:bg-red-400/10 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                <header className="h-16 bg-[#030712]/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 md:hidden">
                    <span className="text-white font-bold">ADMIN</span>
                </header>
                <main className="flex-1 overflow-y-auto p-6 md:p-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
