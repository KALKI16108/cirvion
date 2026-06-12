import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.44.0'

export function getAdminClient(): SupabaseClient {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    { auth: { persistSession: false } }
  )
}

export async function getOrCreateLead(supabaseAdmin: SupabaseClient, leadData: { name: string, email: string, phone?: string, company?: string, source?: string }) {
  if (!leadData.email) throw new Error('Email is required');

  // Find existing lead
  const { data: existingLead, error: searchError } = await supabaseAdmin
    .from('leads')
    .select('id')
    .eq('email', leadData.email)
    .maybeSingle()

  if (searchError) throw searchError

  if (existingLead) {
    return existingLead.id
  }

  // Create new lead
  const { data: newLead, error: insertError } = await supabaseAdmin
    .from('leads')
    .insert([{
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone || null,
      company: leadData.company || null,
      source: leadData.source || 'Website',
      status: 'New'
    }])
    .select('id')
    .single()

  if (insertError) throw insertError
  return newLead.id
}
