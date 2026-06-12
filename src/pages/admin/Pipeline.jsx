import React, { useEffect, useState } from 'react';
import { getLeads, updateLeadStatus } from '../../lib/api';

const PIPELINE_STAGES = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'];

const Pipeline = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const data = await getLeads();
            setLeads(data);
        } catch (error) {
            console.error("Error fetching leads:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        // Optimistic update
        setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
        try {
            await updateLeadStatus(id, newStatus);
        } catch (error) {
            console.error("Failed to update status:", error);
            // Revert on failure by refetching
            fetchLeads();
        }
    };

    const exportToCSV = () => {
        const headers = ['Name', 'Email', 'Company', 'Source', 'Status', 'Date'];
        const csvData = leads.map(lead => [
            `"${lead.name || ''}"`,
            `"${lead.email || ''}"`,
            `"${lead.company || ''}"`,
            `"${lead.source || ''}"`,
            `"${lead.status || ''}"`,
            `"${new Date(lead.created_at).toLocaleDateString()}"`
        ]);
        
        const csvContent = [headers.join(','), ...csvData.map(row => row.join(','))].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `aiflowix-leads-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div className="text-[#94A3B8]">Loading pipeline...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Lead Pipeline</h1>
                <button 
                    onClick={exportToCSV}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-white/10"
                >
                    Export CSV
                </button>
            </div>

            <div className="bg-[#030712] rounded-2xl border border-white/5 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="p-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Lead</th>
                            <th className="p-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Source</th>
                            <th className="p-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Submissions</th>
                            <th className="p-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Status</th>
                            <th className="p-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="p-4">
                                    <div className="font-medium text-white">{lead.name}</div>
                                    <div className="text-sm text-[#94A3B8]">{lead.email}</div>
                                    {lead.company && <div className="text-xs text-[#6366F1] mt-1">{lead.company}</div>}
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex px-2 py-1 text-xs rounded bg-white/5 text-[#E2E8F0] border border-white/10">
                                        {lead.source}
                                    </span>
                                </td>
                                <td className="p-4 text-xs text-[#94A3B8] space-y-1">
                                    {lead.contact_messages?.[0]?.count > 0 && <div>{lead.contact_messages[0].count} Contact(s)</div>}
                                    {lead.audit_requests?.[0]?.count > 0 && <div>{lead.audit_requests[0].count} Audit(s)</div>}
                                    {lead.roi_calculations?.[0]?.count > 0 && <div>{lead.roi_calculations[0].count} ROI Calc(s)</div>}
                                    {lead.readiness_assessments?.[0]?.count > 0 && <div>{lead.readiness_assessments[0].count} Quiz(zes)</div>}
                                </td>
                                <td className="p-4">
                                    <select 
                                        value={lead.status}
                                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                        className="bg-[#0F172A] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#6366F1]"
                                    >
                                        {PIPELINE_STAGES.map(stage => (
                                            <option key={stage} value={stage}>{stage}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="p-4 text-sm text-[#94A3B8]">
                                    {new Date(lead.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        {leads.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-[#94A3B8]">No leads found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Pipeline;
