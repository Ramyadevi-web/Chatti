import { EMAILJS, ENQUIRY_TO } from '../config'

// Sends the enquiry through EmailJS (works straight from the browser, no server needed).
// Resolves when delivered; throws if EmailJS is not configured or the send fails,
// so the page can show a success / failure toast.
export async function sendEnquiry(data) {
  const { serviceId, templateId, publicKey } = EMAILJS
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS is not configured. Add serviceId, templateId and publicKey in src/config.js')
  }

  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        subject: data.subject || 'Muttch Lounge enquiry',
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        event: data.event || '',
        guests: data.guests || '',
        date: data.date || '',
        message: data.message || '',
        to_email: ENQUIRY_TO,
      },
    }),
  })
  if (!res.ok) throw new Error(await res.text())
  return { sent: true }
}
