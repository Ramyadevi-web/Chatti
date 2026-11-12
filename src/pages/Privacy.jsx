import Seo from '../components/Seo'
import { GENERAL_EMAIL } from '../siteConfig'
import './Privacy.css'

// NOTE: this is a plain-language starting template. Have it reviewed by a legal adviser
// before relying on it, and update it if you add new tools or change how data is used.
export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy | Chatti by Chef Regi Mathew"
        description="How Chatti by Chef Regi Mathew in New York collects and uses information from website visitors, enquiry forms and analytics."
        path="/privacy"
      />
      <header className="page-hero menu-hero" />
      <article className="cream privacy">
        <h1>Privacy Policy</h1>
        <p className="pv-date">Last updated: November 12, 2026</p>

        <p>
          This policy explains what information Chatti by Chef Regi Mathew ("Chatti", "we", "us"), 252 W 37th St,
          New York, NY 10018, collects through this website, including the Muttch Lounge page, and how we use it.
        </p>

        <h2>Information you give us</h2>
        <p>
          When you send an enquiry through the Contact or Muttch Lounge form we receive the details you enter: your
          name, email address, phone number, event type, guest count, preferred date and message. We use them only to
          reply to you and to plan your visit or event. Form messages are delivered to our team by email through the
          EmailJS service.
        </p>

        <h2>Analytics and session recording</h2>
        <p>
          With your consent, we use Google Analytics 4 and Microsoft Clarity. They collect information about how the
          site is used, such as pages visited, clicks, scrolling, device and browser type, approximate location and
          session recordings or heatmaps. This helps us fix problems and improve the site. These tools use cookies or
          similar technologies. If you choose "Decline", they are not loaded. You can change your mind at any time by
          clearing this site's data in your browser and choosing again when the notice reappears.
        </p>

        <h2>Other services on this site</h2>
        <ul>
          <li>Google Maps is embedded on the home page and may set its own cookies.</li>
          <li>Reservations are made on our booking partner's website, which has its own privacy policy.</li>
          <li>The site is hosted by Netlify, which processes standard server logs (such as IP address) to deliver pages.</li>
          <li>Links to Instagram, Facebook and press articles lead to third-party sites with their own policies.</li>
        </ul>

        <h2>How long we keep information</h2>
        <p>We keep enquiry emails only as long as needed to respond and to run the event or booking you asked about, and as required for our business records.</p>

        <h2>Your choices</h2>
        <p>
          You can ask us what information we hold about you, or ask us to correct or delete it, by emailing{' '}
          <a href={`mailto:${GENERAL_EMAIL}`}>{GENERAL_EMAIL}</a>. You can also block cookies in your browser settings,
          although some features may not work as expected.
        </p>

        <h2>Changes</h2>
        <p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>

        <h2>Contact</h2>
        <p>
          Chatti by Chef Regi Mathew, 252 W 37th St, New York, NY 10018 ·{' '}
          <a href="tel:+12129949599">+1 (212) 994 9599</a> · <a href={`mailto:${GENERAL_EMAIL}`}>{GENERAL_EMAIL}</a>
        </p>
      </article>
    </>
  )
}
