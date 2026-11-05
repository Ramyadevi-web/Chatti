import { EMAILJS, ENQUIRY_TO } from '../config'

// Sends the Muttch enquiry. Returns { sent: true } when delivered by EmailJS,
// or { sent: false } when it had to fall back to the visitor's email app.
export async function sendEnquiry(data) {
  const { serviceId, templateId, publicKey } = EMAILJS

  if (serviceId && templateId && publicKey) {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: { ...data, to_email: ENQUIRY_TO },
      }),
    })
    if (!res.ok) throw new Error(await res.text())
    return { sent: true }
  }

  // fallback: open a pre-filled email
  const body = [
    `Name: ${data.name || ''}`,
    `Email: ${data.email || ''}`,
    `Phone: ${data.phone || ''}`,
    `Event type: ${data.event || ''}`,
    `Approx. guests: ${data.guests || ''}`,
    `Preferred date: ${data.date || ''}`,
    '',
    data.message || '',
  ].join('\n')
  window.location.href = `mailto:${ENQUIRY_TO}?subject=${encodeURIComponent('Muttch Lounge enquiry')}&body=${encodeURIComponent(body)}`
  return { sent: false }
}
