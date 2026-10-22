import { supabase } from './supabase.js';
import staticBlogs from '../data/blogs.json';
import { submitToWeb3Forms } from './web3forms.js';
import { trackLeadSubmission } from './analytics.js';

// Form submission functions powered by resilient leads.js module
import {
    submitContactForm as leadsSubmitContactForm,
    submitAuditRequest as leadsSubmitAuditRequest,
    submitRoiCalculation as leadsSubmitRoiCalculation,
    submitReadinessAssessment as leadsSubmitReadinessAssessment
} from './leads.js';

export async function submitContactForm(data) {
    const result = await leadsSubmitContactForm(data);
    if (result && result.success) {
        // Verified conversion tracked in leads.js
    }
    return result;
}

export async function submitAuditRequest(data) {
    const result = await leadsSubmitAuditRequest(data);
    if (result && result.success) {
        // Verified conversion tracked in leads.js
    }
    return result;
}

export async function submitRoiCalculation(data) {
    const result = await leadsSubmitRoiCalculation(data);
    if (result && result.success) {
        // Verified conversion tracked in leads.js
    }
    return result;
}

export async function submitReadinessAssessment(data) {
    return leadsSubmitReadinessAssessment(data);
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
