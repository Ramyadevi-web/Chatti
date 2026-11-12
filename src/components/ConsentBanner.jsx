import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ANALYTICS } from '../siteConfig'
import { getConsent, initAnalytics, setConsent } from '../lib/analytics'
import './ConsentBanner.css'

// Cookie / analytics notice. Analytics and session recording start only after "Accept"
// (set ANALYTICS.requireConsent = false in siteConfig.js to load them for everyone).
export default function ConsentBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    initAnalytics()
    setShow(ANALYTICS.requireConsent && getConsent() === null)
  }, [])

  if (!show) return null
  const choose = (v) => { setConsent(v); setShow(false) }

  return (
    <div className="cb" role="dialog" aria-label="Cookie notice">
      <p>
        We use analytics and session-recording tools (Google Analytics, Microsoft Clarity) to improve this website.
        See our <Link to="/privacy">Privacy Policy</Link>.
      </p>
      <div className="cb-btns">
        <button className="cb-no" onClick={() => choose('denied')}>Decline</button>
        <button className="cb-yes" onClick={() => choose('granted')}>Accept</button>
      </div>
    </div>
  )
}
