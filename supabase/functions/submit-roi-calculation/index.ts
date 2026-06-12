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
      source: 'ROI Calculator'
    })

    // 2. Insert Message
    const { error } = await supabaseAdmin
      .from('roi_calculations')
      .insert([{
        lead_id: leadId,
        employees: data.employees,
        hours_per_week: data.hoursPerWeek,
        hourly_cost: data.hourlyCost,
        monthly_cost: data.monthlyCost,
        estimated_savings: data.estimatedSavings,
        estimated_roi: data.estimatedRoi
      }])

    if (error) throw error

    // 3. Send Email Notification
    const emailHtml = `
      <h2>New ROI Calculator Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Employees:</strong> ${data.employees}</p>
      <p><strong>Hours/Week Wasted:</strong> ${data.hoursPerWeek}</p>
      <p><strong>Hourly Cost ($):</strong> ${data.hourlyCost}</p>
      <p><strong>Estimated Monthly Cost ($):</strong> ${data.monthlyCost}</p>
      <p><strong>Estimated Annual Savings ($):</strong> ${data.estimatedSavings}</p>
      <p><strong>Estimated ROI (%):</strong> ${data.estimatedRoi}</p>
    `
    await sendNotificationEmail('New Lead: ROI Calculation', emailHtml)

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
