import { submitToWeb3Forms } from './web3forms.js';
import { trackLeadSubmission } from './analytics.js';

// --- LOCAL RESILIENCE STORAGE ---

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
        // Safe fallback - localStorage unavailable or quota exceeded
    }
}

// Asynchronously and non-blockingly backup to Supabase without coupling to submission success
function backupLeadToSupabase(tableOrFunction, isFunction, payload) {
    try {
        import('./supabase.js')
            .then(({ supabase }) => {
                if (!supabase) return;
                if (isFunction) {
                    supabase.functions.invoke(tableOrFunction, { body: payload }).catch(() => {});
                } else {
                    supabase.from(tableOrFunction).insert([payload]).catch(() => {});
                }
            })
            .catch(() => {
                // Supabase is completely optional; ignore if unavailable
            });
    } catch {
        // Safe ignore
    }
}

// --- CORE FORM SUBMISSION HANDLERS ---

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

    const result = await submitToWeb3Forms(payload);

    // Fire confirmed conversion event ONLY after successful API submission
    if (result && result.success) {
        trackLeadSubmission('Contact Form', { service: data.service || 'General' });
    }

    backupLeadToSupabase('submit-contact', true, data);

    return result;
}

export async function submitAuditRequest(data) {
    const companyName = data.company_name || data.company || '';
    const teamSize = data.team_size || data.teamSize || '';
    const monthlyRevenue = data.monthly_revenue || data.monthlyRevenue || '';
    const biggestBottleneck = data.biggest_bottleneck || data.painPoints || data.bottleneck || '';
    const phone = data.phone || data.phone_number || '';
    const website = data.website || '';

    const payload = {
        subject: data.subject || 'New AIFlowix Free Audit Request',
        source: data.source || 'AIFlowix Website',
        form_type: 'Free Audit',
        name: data.name,
        email: data.email,
        phone: phone ? phone : 'N/A',
        company_name: companyName,
        website: website ? website : 'N/A',
        team_size: teamSize,
        monthly_revenue: monthlyRevenue,
        biggest_bottleneck: biggestBottleneck
    };

    saveLeadToLocalStorage('Free Audit', payload);

    const result = await submitToWeb3Forms(payload);

    // Fire confirmed conversion event ONLY after successful API submission
    if (result && result.success) {
        trackLeadSubmission('Free Audit', {
            team_size: teamSize,
            revenue_tier: monthlyRevenue
        });
    }

    backupLeadToSupabase('audit_requests', false, {
        name: data.name,
        email: data.email,
        phone: phone || null,
        company: companyName,
        website: website || null,
        teamSize: teamSize,
        monthlyRevenue: monthlyRevenue,
        painPoints: biggestBottleneck
    });

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

    const result = await submitToWeb3Forms(payload);

    // Fire confirmed conversion event ONLY after successful API submission
    if (result && result.success) {
        trackLeadSubmission('ROI Calculator', {
            estimated_savings: data.estimatedSavings,
            employees: data.employees
        });
    }

    backupLeadToSupabase('submit-roi-calculation', true, data);

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

    const result = await submitToWeb3Forms(payload);

    // Fire confirmed conversion event ONLY after successful API submission
    if (result && result.success) {
        trackLeadSubmission('Readiness Quiz', {
            score: data.score,
            recommendation: data.recommendation || ''
        });
    }

    backupLeadToSupabase('submit-readiness-assessment', true, data);

    return result;
}
