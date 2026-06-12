import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'
import { getAdminClient, getOrCreateLead } from '../_shared/lead.ts'
import { sendNotificationEmail } from '../_shared/resend.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const data = await req.json()
    const supabaseAdmin = getAdminClient()

    // 1. Process Lead
    const leadId = await getOrCreateLead(supabaseAdmin, {
      name: data.name,
      email: data.email,
      company: data.company,
      source: 'Free AI Audit'
    })

    // 2. Insert Message
    const { error } = await supabaseAdmin
      .from('audit_requests')
      .insert([{
        lead_id: leadId,
        website: data.website,
        business_type: data.businessType,
        team_size: data.teamSize,
        monthly_revenue: data.monthlyRevenue,
        pain_points: data.painPoints
      }])

    if (error) throw error

    // 3. Send Email Notification
    const emailHtml = `
      <h2>New Free AI Audit Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
      <p><strong>Website:</strong> ${data.website || 'N/A'}</p>
      <p><strong>Business Type:</strong> ${data.businessType || 'N/A'}</p>
      <p><strong>Team Size:</strong> ${data.teamSize || 'N/A'}</p>
      <p><strong>Monthly Revenue:</strong> ${data.monthlyRevenue || 'N/A'}</p>
      <p><strong>Pain Points:</strong></p>
      <p>${data.painPoints}</p>
    `
    await sendNotificationEmail('New Lead: Free AI Audit Request', emailHtml)

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
