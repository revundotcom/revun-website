import { Resend } from 'resend'

/* Lead delivery for the contact + demo forms.
 * Requires env: RESEND_API_KEY, LEAD_TO, LEAD_FROM (from must be a Resend-verified domain).
 * Never throws to the caller — on failure it logs and returns false so the UX still succeeds. */

type LeadType = 'contact' | 'demo'

export async function sendLead(type: LeadType, data: Record<string, string | undefined>): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_TO
  const from = process.env.LEAD_FROM || 'Revun Leads <leads@revun.com>'

  // Always log (visible in Vercel runtime logs) as a backstop.
  // eslint-disable-next-line no-console
  console.info(`[Revun ${type} lead]`, { ...data, ts: new Date().toISOString() })

  if (!apiKey || !to) return false

  const rows = Object.entries(data)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;font-weight:600;color:#0A1628">${k}</td><td style="padding:4px 0;color:#334155">${(v ?? '(none)').toString().replace(/</g, '&lt;')}</td></tr>`)
    .join('')
  const subject = type === 'demo' ? `New demo request: ${data.name || ''} (${data.company || ''})` : `New contact: ${data.name || ''} (${data.role || ''})`

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to: to.split(',').map((s) => s.trim()),
      replyTo: data.email,
      subject,
      html: `<h2 style="font-family:sans-serif;color:#0A1628">New ${type} submission</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
    })
    if (error) {
      // eslint-disable-next-line no-console
      console.error(`[Revun ${type} lead] Resend error`, error)
      return false
    }
    return true
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`[Revun ${type} lead] send failed`, err)
    return false
  }
}
