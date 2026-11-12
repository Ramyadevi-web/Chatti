import { EMAILJS } from '../config'

// Sends an enquiry through EmailJS (works straight from the browser, no server needed).
// Resolves when delivered; throws if EmailJS is not configured or the send fails,
// so the page can show a success / failure message.
//
// SECURITY: the recipient is NOT sent from the browser. The "To Email" address(es) are fixed
// inside the EmailJS template itself, so nobody can use the public key to email other people.
//   options.templateId  -> use a different EmailJS template (e.g. the Contact form's own template)
export async function sendEnquiry(data, options = {}) {
  const { serviceId, templateId: defaultTemplate, publicKey } = EMAILJS
  const templateId = options.templateId || defaultTemplate
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
      },
    }),
  })
  if (!res.ok) {
    const reason = await res.text()
    console.error('EmailJS error:', res.status, reason)
    throw new Error(reason)
  }
  return { sent: true }
}
