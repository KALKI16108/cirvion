import { supabase } from './supabase';

// --- FORM SUBMISSIONS ---

export async function submitContactForm(data) {
    const { error, data: responseData } = await supabase.functions.invoke('submit-contact', {
        body: data
    });

    if (error) throw error;
    if (responseData?.error) throw new Error(responseData.error);
    return true;
}

export async function submitAuditRequest(data) {
    const { error, data: responseData } = await supabase.functions.invoke('submit-audit-request', {
        body: data
    });

    if (error) throw error;
    if (responseData?.error) throw new Error(responseData.error);
    return true;
}

export async function submitRoiCalculation(data) {
    const { error, data: responseData } = await supabase.functions.invoke('submit-roi-calculation', {
        body: data
    });

    if (error) throw error;
    if (responseData?.error) throw new Error(responseData.error);
    return true;
}

export async function submitReadinessAssessment(data) {
    const { error, data: responseData } = await supabase.functions.invoke('submit-readiness-assessment', {
        body: data
    });

    if (error) throw error;
    if (responseData?.error) throw new Error(responseData.error);
    return true;
}

// --- ADMIN API FUNCTIONS ---

export async function getLeads() {
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
        
    if (error) throw error;
    return data;
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
    // A simple aggregated stat fetch
    const { count: leadsCount, error: leadsError } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });
        
    const { count: auditCount } = await supabase
        .from('audit_requests')
        .select('*', { count: 'exact', head: true });

    if (leadsError) throw leadsError;

    return {
        totalLeads: leadsCount || 0,
        totalAudits: auditCount || 0
    };
}

// --- AUTH FUNCTIONS ---

export async function loginAdmin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
}

export async function logoutAdmin() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

export async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
}

// --- BLOG CMS FUNCTIONS ---

export async function getBlogs() {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
        
    if (error) throw error;
    return data;
}

export async function getBlogBySlug(slug) {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();
        
    if (error) throw error;
    return data;
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
