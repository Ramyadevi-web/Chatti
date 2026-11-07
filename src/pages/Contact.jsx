import { useState } from 'react'
import { sendEnquiry } from '../lib/sendEnquiry'
import { ENQUIRY_TO } from '../config'

export default function Contact() {
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data.website) return // honeypot
    setSending(true); setError('')
    try {
      await sendEnquiry({ ...data, subject: 'Chatti website enquiry' })
      form.reset(); setDone(true)
    } catch (err) {
      console.error(err)
      setError(`Unable to send your message. Please email ${ENQUIRY_TO}.`)
    } finally { setSending(false) }
  }

  return (
    <>
      <header className="page-hero menu-hero" />
      <section className="cream contact-sec" id="contact-form">
        <div className="contact-info">
          <p className="eyebrow">Get in touch</p>
          <h2>Contact Us</h2>
          <p className="body">For reservations, events or any questions, send us a message and our team will get back to you.</p>
          <p className="body contact-lines">
            Chatti by Regi Mathew<br />252 W 37th St, New York, NY 10018<br />
            <a href="tel:+12129949599">+1 (212) 994 9599</a><br />
            <a href={`mailto:${ENQUIRY_TO}`}>{ENQUIRY_TO}</a>
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
            {done && <p className="cf-ok">Thank you! Your message has been received.</p>}
            {error && <p className="cf-err">{error}</p>}
          </div>
        </form>
      </section>
    </>
  )
}
