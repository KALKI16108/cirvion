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
      source: 'Readiness Assessment'
    })

    // 2. Insert Message
    const { error } = await supabaseAdmin
      .from('readiness_assessments')
      .insert([{
        lead_id: leadId,
        score: data.score,
        recommendation: data.recommendation
      }])

    if (error) throw error

    // 3. Send Email Notification
    const emailHtml = `
      <h2>New Readiness Assessment Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Calculated Score:</strong> ${data.score}</p>
      <p><strong>Recommendation Given:</strong></p>
      <p>${data.recommendation}</p>
    `
    await sendNotificationEmail('New Lead: Readiness Assessment', emailHtml)

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
