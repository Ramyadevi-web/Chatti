import { Link } from 'react-router-dom'
import { INSTAGRAM_URL } from '../config'
import { track } from '../lib/analytics'

export default function Footer() {
  return (
    <footer>
      <div className="foot-inner">
        
        <div className="foot-brand">
          <img src="/images/logo.png" alt="Chatti" />
          <a className="insta" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
          </a>
        </div>
        <div className="foot-info">
          <h4>Information</h4>
          <p><a href="tel:+12129949599" onClick={() => track('phone_click', { location: 'footer' })}>Phone: +1 (212) 994 9599</a></p>
          <p><a href="tel:+16465989393" onClick={() => track('phone_click', { location: 'footer_mobile' })}>Mobile: +1 (646) 598 9393</a></p>
          <p><a href="mailto:info@thechatti.com">Email : info@thechatti.com</a></p>
          <p>Address : 252 W 37th St, New York, NY 10018</p>
        </div>
      </div>
      <div className="copy">Copyrights 2026 © All rights reserved by Chatti. <Link to="/privacy" style={{ marginLeft: 12, textDecoration: 'underline' }}>Privacy Policy</Link></div>
    </footer>
  )
}
