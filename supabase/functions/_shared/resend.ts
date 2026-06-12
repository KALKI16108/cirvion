export const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || 're_CPpiZ1Wo_4RcNNeRicG9it7zzhRRdrD48';
export const NOTIFICATION_EMAIL = 'siddhantpitale125@gmail.com';

export async function sendNotificationEmail(subject: string, htmlContent: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'AIFlowix Leads <onboarding@resend.dev>', // Resend test domain (change when domain is verified)
      to: [NOTIFICATION_EMAIL],
      subject: subject,
      html: htmlContent,
    }),
  });

  if (!res.ok) {
    const errorData = await res.text();
    console.error('Failed to send email via Resend:', errorData);
  }

  return res.ok;
}
