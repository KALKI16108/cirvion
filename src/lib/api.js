import { supabase } from './supabase';
import staticBlogs from '../data/blogs.json';
import { submitToWeb3Forms } from './web3forms';
import { trackLeadSubmission } from './analytics';

// --- FORM SUBMISSIONS ---

function saveLeadToLocalStorage(type, leadData) {
    try {
        const existing = JSON.parse(localStorage.getItem('aiflowix_saved_leads') || '[]');
        const newRecord = {
            id: Date.now(),
            type,
            created_at: new Date().toISOString(),
            ...leadData
        };
        existing.unshift(newRecord);
        localStorage.setItem('aiflowix_saved_leads', JSON.stringify(existing.slice(0, 100)));
    } catch {
        // Safe fallback
    }
}

export async function submitContactForm(data) {
    const payload = {
        subject: data.subject || 'New AIFlowix Website Enquiry',
        source: data.source || 'AIFlowix Website',
        form_type: 'Contact Form',
        name: data.name,
        email: data.email,
        phone: data.phone || 'N/A',
        company: data.company || 'N/A',
        service: data.service || 'General Inquiry',
        message: data.message || '',
        ...data
    };

    saveLeadToLocalStorage('Contact Form', payload);
    trackLeadSubmission('Contact Form', payload);

    const result = await submitToWeb3Forms(payload);

    // Optional backup to Supabase
    try {
        await supabase.functions.invoke('submit-contact', { body: data });
    } catch {
        // Safe to ignore if Supabase is offline
    }

    return result;
}

export async function submitAuditRequest(data) {
    const companyName = data.company_name || data.company || '';
    const teamSize = data.team_size || data.teamSize || '';
    const monthlyRevenue = data.monthly_revenue || data.monthlyRevenue || '';
    const biggestBottleneck = data.biggest_bottleneck || data.painPoints || data.bottleneck || '';

    const payload = {
        subject: data.subject || 'New AIFlowix Free Audit Request',
        source: data.source || 'AIFlowix Website',
        form_type: 'Free Audit',
        name: data.name,
        email: data.email,
        company_name: companyName,
        website: data.website || '',
        team_size: teamSize,
        monthly_revenue: monthlyRevenue,
        biggest_bottleneck: biggestBottleneck
    };

    saveLeadToLocalStorage('Free Audit', payload);
    trackLeadSubmission('Free Audit', payload);

    const result = await submitToWeb3Forms(payload);

    // Optional backup to Supabase
    try {
        await supabase.from('audit_requests').insert([{
            name: data.name,
            email: data.email,
            company: companyName,
            website: data.website || '',
            teamSize: teamSize,
            monthlyRevenue: monthlyRevenue,
            painPoints: biggestBottleneck
        }]);
    } catch {
        // Safe to ignore if Supabase is offline
    }

    return result;
}

export async function submitRoiCalculation(data) {
    const payload = {
        subject: 'New AIFlowix ROI Report Request',
        source: 'AIFlowix Website',
        form_type: 'ROI Calculator',
        name: data.name,
        email: data.email,
        employees: data.employees,
        hours_per_week: data.hoursPerWeek,
        hourly_cost: data.hourlyCost,
        monthly_cost: data.monthlyCost,
        estimated_savings: data.estimatedSavings,
        estimated_roi: data.estimatedRoi ? `${Math.round(data.estimatedRoi)}%` : 'N/A',
        ...data
    };

    saveLeadToLocalStorage('ROI Calculator', payload);
    trackLeadSubmission('ROI Calculator', payload);

    const result = await submitToWeb3Forms(payload);

    // Optional backup to Supabase
    try {
        await supabase.functions.invoke('submit-roi-calculation', { body: data });
    } catch {
        // Safe to ignore if Supabase is offline
    }

    return result;
}

export async function submitReadinessAssessment(data) {
    const payload = {
        subject: 'New AIFlowix Readiness Assessment Submission',
        source: 'AIFlowix Website',
        form_type: 'AI Readiness Assessment',
        name: data.name,
        email: data.email,
        score: data.score !== undefined ? `${data.score}/100` : 'N/A',
        recommendation: data.recommendation || '',
        answers: data.answers || '',
        ...data
    };

    saveLeadToLocalStorage('Readiness Quiz', payload);
    trackLeadSubmission('Readiness Quiz', payload);

    const result = await submitToWeb3Forms(payload);

    // Optional backup to Supabase
    try {
        await supabase.functions.invoke('submit-readiness-assessment', { body: data });
    } catch {
        // Safe to ignore if Supabase is offline
    }

    return result;
}

// --- ADMIN API FUNCTIONS ---

export async function getLeads() {
    try {
        const { data, error } = await supabase
            .from('leads')
            .select(`
                *,
                contact_messages (count),
                audit_requests (count),
                roi_calculations (count),
                readiness_assessments (count)
            `)
            .order('created_at', { ascending: false });
            
        if (error) return [];
        return data || [];
    } catch {
        return [];
    }
}

export async function updateLeadStatus(id, status) {
    const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id);
    if (error) throw error;
    return true;
}

export async function updateLeadNotes(id, notes) {
    const { error } = await supabase
        .from('leads')
        .update({ notes })
        .eq('id', id);
    if (error) throw error;
    return true;
}

export async function getDashboardStats() {
    try {
        const { count: leadsCount } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true });
            
        const { count: auditCount } = await supabase
            .from('audit_requests')
            .select('*', { count: 'exact', head: true });

        return {
            totalLeads: leadsCount || 0,
            totalAudits: auditCount || 0
        };
    } catch {
        return {
            totalLeads: 0,
            totalAudits: 0
        };
    }
}

// --- AUTH FUNCTIONS ---

export async function loginAdmin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
}

export async function logoutAdmin() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    } catch (err) {
        console.warn('Sign out warning:', err);
    }
}

export async function getSession() {
    try {
        const { data, error } = await supabase.auth.getSession();
        if (error) return null;
        return data?.session || null;
    } catch {
        return null;
    }
}

// --- BLOG CMS FUNCTIONS ---

export async function getBlogs() {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error || !data || data.length === 0) return staticBlogs;
        return data;
    } catch {
        return staticBlogs;
    }
}

export async function getBlogBySlug(slug) {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .single();
            
        if (error || !data) {
            return staticBlogs.find(b => b.slug === slug) || null;
        }
        return data;
    } catch {
        return staticBlogs.find(b => b.slug === slug) || null;
    }
}

export async function createBlog(blogData) {
    const { data, error } = await supabase
        .from('blog_posts')
        .insert([blogData])
        .select()
        .single();
        
    if (error) throw error;
    return data;
}

export async function updateBlog(id, blogData) {
    const { data, error } = await supabase
        .from('blog_posts')
        .update(blogData)
        .eq('id', id)
        .select()
        .single();
        
    if (error) throw error;
    return data;
}

export async function deleteBlog(id) {
    const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
        
    if (error) throw error;
    return true;
}

// --- AI LEAD QUALIFICATION ---
export async function qualifyLead(leadData) {
    const prompt = `You are an expert AI Lead Qualifier for an AI Automation Agency. 
Please evaluate the following business lead and determine if they are a strong candidate for AI automation services (like lead generation chatbots, CRM automation, etc). 
A perfect lead (10/10) is a business that has no website or no Google Business Profile, or has clear operational bottlenecks.
A poor lead (1/10) is someone who already has highly advanced tech or is not a business.

Lead Data:
Name: ${leadData.name || 'Unknown'}
Email: ${leadData.email || 'Unknown'}
Website: ${leadData.website || 'None'}
Google Business Profile: ${leadData.has_google_profile ? 'Yes' : 'No'}
Source: ${leadData.source || 'Unknown'}

Respond strictly in JSON format exactly like this:
{
  "score": 8,
  "reasoning": "Brief explanation here"
}`;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "liquid/lfm-2.5-1.2b-instruct:free",
                messages: [
                    { role: "system", content: "You are a lead qualification AI. You must output ONLY valid JSON without any markdown formatting." },
                    { role: "user", content: prompt }
                ]
            })
        });

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        
        if (content) {
            try {
                // Safely strip any markdown code blocks
                const cleanContent = content.replace(/```json\s*/gi, '').replace(/\s*```/g, '').trim();
                const parsed = JSON.parse(cleanContent);
                return {
                    ai_score: parseInt(parsed.score) || 5,
                    ai_reasoning: parsed.reasoning || "Qualified successfully."
                };
            } catch (e) {
                console.error("Failed to parse JSON from AI response:", content);
                console.error("Raw content was:", content);
            }
        }
    } catch (error) {
        console.error("Error calling OpenRouter API:", error);
    }
    
    // Default fallback
    return { ai_score: null, ai_reasoning: "AI qualification failed." };
}

export async function bulkInsertLeads(leads) {
    const { data, error } = await supabase
        .from('leads')
        .insert(leads)
        .select();
        
    if (error) throw error;
    return data;
}
