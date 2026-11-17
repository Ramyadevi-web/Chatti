import { SHEET } from '../config'

// Saves an enquiry as a row in Google Sheets. Never throws: a Sheet problem must not break the form.
export async function saveToSheet(data) {
  if (!SHEET?.url) return
  try {
    const q = new URLSearchParams(window.location.search)
    await fetch(SHEET.url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        secret: SHEET.secret,
        name: data.name, email: data.email, phone: data.phone,
        event: data.event, guests: data.guests, date: data.date, message: data.message,
        page: window.location.pathname,
        utm_source: q.get('utm_source') || '',
        utm_campaign: q.get('utm_campaign') || '',
      }),
    })
  } catch (e) {
    console.warn('Sheet save failed', e)
  }
}