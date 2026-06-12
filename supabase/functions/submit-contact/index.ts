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
      phone: data.phone,
      company: data.company,
      source: 'Contact Form'
    })

    // 2. Insert Message
    const { error } = await supabaseAdmin
      .from('contact_messages')
      .insert([{
        lead_id: leadId,
        subject: data.subject || 'New Contact Inquiry',
        message: data.message
      }])

    if (error) throw error

    // 3. Send Email Notification
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
      <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
      <p><strong>Subject:</strong> ${data.subject || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `
    await sendNotificationEmail('New Lead: Contact Form Submission', emailHtml)

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
