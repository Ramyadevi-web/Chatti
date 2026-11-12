import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendEnquiry } from '../lib/sendEnquiry'
import { track } from '../lib/analytics'
import Seo from '../components/Seo'
import { EMAILJS } from '../config'
import { GENERAL_EMAIL } from '../siteConfig'

export default function Contact() {
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data.website) return // honeypot
    setSending(true); setError(''); setDone(false)
    try {
      // the Contact form can use its own EmailJS template (with both recipient emails fixed inside it)
      await sendEnquiry({ ...data, subject: 'Chatti website enquiry' }, { templateId: EMAILJS.templateIdContact })
      form.reset(); setDone(true)
      track('generate_lead', { form_name: 'contact' })
    } catch (err) {
      console.error(err)
      setError(`Sorry, we couldn't send your message right now. Please try again or email ${GENERAL_EMAIL}.`)
    } finally { setSending(false) }
  }

  return (
    <>
      <Seo
        title="Contact Chatti | 252 W 37th St, Midtown Manhattan, New York"
        description="Contact Chatti by Chef Regi Mathew for reservations, events and questions. 252 W 37th St, New York, NY 10018. Phone +1 (212) 994 9599."
        path="/contact"
      />
      <header className="page-hero menu-hero" />
      <section className="cream contact-sec" id="contact-form">
        <div className="contact-info">
          <p className="eyebrow">Get in touch</p>
          <h1 style={{ fontSize: 26, marginBottom: 12 }}>Contact Us</h1>
          <p className="body">For reservations, events or any questions, send us a message and our team will get back to you.</p>
          <p className="body contact-lines">
            Chatti by Regi Mathew<br />252 W 37th St, New York, NY 10018<br />
            <a href="tel:+12129949599" onClick={() => track('phone_click', { location: 'contact' })}>+1 (212) 994 9599</a><br />
            <a href={`mailto:${GENERAL_EMAIL}`}>{GENERAL_EMAIL}</a>
          </p>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <input className="cf-hp" tabIndex="-1" autoComplete="off" name="website" aria-hidden="true" />
          <label>Your name<input required name="name" /></label>
          <label>Email<input required type="email" name="email" /></label>
          <label>Phone<input name="phone" /></label>
          <label className="full">Message<textarea required rows="5" name="message" /></label>
          <div className="full">
            <button className="btn btn-fill" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send Message'}</button>
            <p className="cf-note" style={{ marginTop: 14, fontSize: 12, color: '#666' }}>By sending this message you agree to our <Link to="/privacy">Privacy Policy</Link>.</p>
            {done && <p className="cf-ok">Thank you! Your message has been received.</p>}
            {error && <p className="cf-err">{error}</p>}
          </div>
        </form>
      </section>
    </>
  )
}
