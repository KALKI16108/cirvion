import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../../lib/api';
import { Users, FileText, Activity } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({ totalLeads: 0, totalAudits: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="text-[#94A3B8]">Loading stats...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#6366F1]/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-[#6366F1]" />
                    </div>
                    <div>
                        <p className="text-[#94A3B8] text-sm font-medium">Total Leads</p>
                        <p className="text-3xl font-bold text-white">{stats.totalLeads}</p>
                    </div>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <div>
                        <p className="text-[#94A3B8] text-sm font-medium">Audit Requests</p>
                        <p className="text-3xl font-bold text-white">{stats.totalAudits}</p>
                    </div>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#00C8FF]/10 flex items-center justify-center">
                        <Activity className="w-6 h-6 text-[#00C8FF]" />
                    </div>
                    <div>
                        <p className="text-[#94A3B8] text-sm font-medium">System Health</p>
                        <p className="text-3xl font-bold text-white">Online</p>
                    </div>
                </div>
            </div>
            
            <div className="glass-card p-8 rounded-3xl border border-white/5">
                <h2 className="text-xl font-bold text-white mb-4">Welcome to AIFlowix Admin</h2>
                <p className="text-[#94A3B8]">
                    Use the sidebar to navigate to the Lead Pipeline to view and manage incoming leads, or go to Content to manage your dynamic website content.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
