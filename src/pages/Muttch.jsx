import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sendEnquiry } from '../lib/sendEnquiry'
import { track } from '../lib/analytics'
import Seo from '../components/Seo'
import { muttchSchema } from '../lib/schema'
import { AWARDS } from '../data/awards'
import './Muttch.css'

gsap.registerPlugin(ScrollTrigger)

// All images live in  public/images/muttch/  — upload them there with these names
// (if your file is .png / .webp, just change the extension here).
const IMG_BASE = '/images/muttch/'
const IMG = {
  logo: 'logo-white.webp', hero: 'hero.jpg', intro: 'intro.jpg', chef: 'chef.jpg',
  dining: 'dining.jpg', beverage: 'beverage.webp',
  g1: 'gallery-1.webp', g2: 'gallery-2.webp', g3: 'gallery-3.webp', g4: 'gallery-4.jpg',
}
const img = (k) => IMG_BASE + IMG[k]

const DECK = '/muttch/Muttch-Event-Deck.pdf' // upload to public/muttch/
const INSTA = 'https://www.instagram.com/muttchlounge?stkn=M3p2OWVkNThpZ3V0&utm_source=qr'
const FB = 'https://www.facebook.com/profile.php?id=61594628716149'

const NAV = [['Experience', '#experience'], ['Awards', '#chef'], ['Dining', '#dining'], ['Gallery', '#gallery']]

const EXPERIENCE = [
  ['Corporate Gatherings', 'Corporate dinners, team dinners, client entertaining, networking events and holiday parties in Midtown Manhattan.'],
  ['Celebrations', 'Private birthday dinners, engagement parties, anniversaries and milestone celebrations, designed around your guests.'],
  ['Family & Milestones', 'Rehearsal dinners, graduation dinners, bridal and baby showers, and intimate family gatherings'],
  ['Social Gathering', 'Fundraisers, nonprofit events, reunions and group dinners.'],
]
const STATS = [[70, 'Seated guests'], [100, 'Standing guests'], ['Dedicated', 'Bar'], ['Private Dining', 'Experience']]
const PACKAGES = [
  ['Essential', 'Beer, house red and white wine, soft drinks and zero-proof coolers.', ['Beer', 'House red and white wine', 'Soft drinks', 'Zero-proof coolers']],
  ['Signature', "Everything in Essential, plus Chatti's signature cocktails built on Kerala spices. ", ['Everything in Essential', "Chatti's signature cocktails", 'Built on Kerala spices']],
  ['House', 'A wider wine list with house spirits and a menu of classic cocktails.', ['A wider wine list', 'House spirits', 'Classic cocktails']],
  ['Prestige', 'Premium spirits, sparkling wine and a bartender-led cocktail list for your guests.', ['Premium spirits', 'Sparkling wine', 'Bartender-led cocktail list']],
  ['Reserve', "Top-shelf spirits and reserve wines, paired course by course with Chef Regi's menu.", ['Top-shelf spirits', 'Reserve wines', "Paired course by course with Chef Regi's menu"]],
]
const GALLERY = [
  ['g1', 'Private dining room at Muttch Lounge in Midtown Manhattan', 'Thoughtfully designed'],
  ['g2', 'Bar and liquor shelves at Muttch Lounge in Midtown Manhattan', 'Crafted pours'],
  ['g3', 'Private dining table at Muttch Lounge in Midtown Manhattan', 'Curated dining experience'],
  ['g4', 'Craft cocktail at Muttch Lounge in Midtown Manhattan', 'Make it memorable'],
]

const Insta = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" /></svg>
)
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M5.5 10v10h13V10M10 20v-5.5h4V20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/* memoised so React never re-renders over the counter animation */
const Stats = memo(function Stats() {
  return (
    <section className="mt-section mt-stats">
      <div className="mt-wrap">
        <div className="mt-eyebrow">Muttch Lounge</div>
        <div className="mt-stats-grid">
          {STATS.map(([n, label]) => (
            <div className="mt-stat" key={label}>
              <i className="mt-stat-ico"><b /></i>
              {typeof n === 'number' ? <strong data-count={n}>0</strong> : <strong className="text">{n}</strong>}
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

function Beverage() {
  const [active, setActive] = useState(0)
  const [title, copy, items] = PACKAGES[active]
  return (
    <section className="mt-section mt-beverage">
      <div className="mt-beverage-bg"><img src={img('beverage')} alt="Beverage Experience" loading="lazy" decoding="async" /></div>
      <div className="mt-wrap mt-beverage-inner">
        <div className="mt-eyebrow" style={{ color: 'rgba(255,255,255,.7)' }}>Beverage Experience</div>
        <h2 className="mt-display">Bar packages for private events</h2>
        <p className="mt-lead">From handcrafted cocktails to curated wine selections and premium spirits, our beverage collections are designed to complement every celebration.</p>
        <div className="mt-package-nav">
          {PACKAGES.map(([t], i) => (
            <button key={t} className={`mt-package ${i === active ? 'active' : ''}`} onClick={() => setActive(i)}>{t}</button>
          ))}
        </div>
        <div className="mt-package-content" key={title}>
          <h3>{title}</h3>
          <p className="mt-lead" style={{ color: 'rgba(255,255,255,.68)' }}>{copy}</p>
          <div className="mt-package-list">
            {items.map((it) => <div className="mt-package-item" key={it}><span>{it}</span><span>Included</span></div>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function Enquiry() {
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState(null) // { type: 'success' | 'error', text }

  // auto-hide the toast after 5 seconds
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 5000)
    return () => clearTimeout(t)
  }, [toast])

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data.website) return // honeypot
    setSending(true)
    try {
      await sendEnquiry(data)
      track('generate_lead', { form_name: 'muttch_enquiry' })
      form.reset()
      setToast({ type: 'success', text: 'Thank you! Your enquiry has been sent. Our team will be in touch shortly.' })
    } catch (err) {
      console.error(err)
      setToast({ type: 'error', text: 'Sorry, we could not send your enquiry. Please try again or email info@thechatti.com.' })
    } finally { setSending(false) }
  }

  return (
    <>
      <section className="mt-section mt-inquiry" id="inquire">
        <div className="mt-wrap mt-inquiry-grid">
          <div>
            <div className="mt-eyebrow">Start a conversation</div>
            <h2 className="mt-display">Plan your event</h2>
            <p className="mt-inquiry-note">From private dining in Midtown Manhattan for a small table to a full restaurant buyout, our team shapes the room, the menu and the service around your guests.</p>
            <div className="mt-contact">
              Muttch Lounge at Chatti<br />252 W 37th St, New York, NY 10018<br />
              <a href="tel:+12129949599" onClick={() => track('phone_click', { location: 'muttch' })}>+1 (212) 994 9599</a><br />
              <a href="mailto:info@thechatti.com">info@thechatti.com</a>
            </div>
          </div>
          <form className="mt-form" onSubmit={submit}>
            <input className="mt-hp" tabIndex="-1" autoComplete="off" name="website" aria-hidden="true" />
            <div className="mt-field"><input required placeholder=" " id="name" name="name" /><label htmlFor="name">Your name</label></div>
            <div className="mt-field"><input required type="email" placeholder=" " id="email" name="email" /><label htmlFor="email">Email</label></div>
            <div className="mt-field"><input placeholder=" " id="phone" name="phone" /><label htmlFor="phone">Phone</label></div>
            <div className="mt-field">
              <select id="event" name="event" defaultValue="">
                <option value="">Event type</option>
                <option>Corporate event</option><option>Celebration</option>
                <option>Family / milestone</option><option>Restaurant buyout</option>
              </select>
            </div>
            <div className="mt-field"><input type="number" min="1" placeholder=" " id="guests" name="guests" /><label htmlFor="guests">Approx. guests</label></div>
            <div className="mt-field"><input type="date" id="date" name="date" /><label htmlFor="date" className="mt-date">Preferred date</label></div>
            <div className="mt-field full"><textarea placeholder=" " id="message" name="message" /><label htmlFor="message">Tell us about your event</label></div>
            <div className="mt-field full">
              <button className="mt-btn primary mt-magnetic" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send Enquiry →'}</button>
              <p className="mt-privacy">By sending this enquiry you agree to our <Link to="/privacy">Privacy Policy</Link>.</p>
            </div>
          </form>
        </div>
      </section>

      {/* toast (success / failure) */}
      <div className={`mt-toast ${toast ? 'show' : ''} ${toast ? toast.type : ''}`} role="status" aria-live="polite">
        {toast && (
          <>
            <span className="mt-toast-ico" aria-hidden="true">{toast.type === 'success' ? '✓' : '!'}</span>
            <span className="mt-toast-text">{toast.text}</span>
            <button className="mt-toast-x" onClick={() => setToast(null)} aria-label="Dismiss">×</button>
          </>
        )}
      </div>
    </>
  )
}

export default function Muttch() {
  const root = useRef(null)
  const nav = useRef(null)
  const cursor = useRef(null)

  useLayoutEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = matchMedia('(pointer:fine)').matches
    const html = document.documentElement
    html.style.scrollBehavior = 'smooth'
    document.body.style.overflow = '' // make sure the page can always scroll
    window.scrollTo(0, 0)
    const onScroll = () => nav.current?.classList.toggle('scrolled', window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    const undo = []

    const ctx = gsap.context(() => {
      if (!reduce) {
        // 1) photo shown clearly  2) overlay darkens it  3) logo  4) kicker, headline, text, buttons
        gsap.timeline({ delay: 0.15 })
          .fromTo('.mt-hero-media img', { scale: 1.1 }, { scale: 1, duration: 2.2, ease: 'power2.out' }, 0)
          .to('.mt-hero-overlay', { opacity: 1, duration: 0.8, ease: 'power2.inOut' }, 0.5)
          .fromTo('.mt-hero-brand', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '>-0.4')
          .fromTo('.mt-hero-kicker', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=.4')
          .fromTo('.mt-hero-text', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=.3')
          .fromTo('.mt-hero .mt-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=.4')

        gsap.to('.mt-hero-media', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.mt-hero', start: 'top top', end: 'bottom top', scrub: 1 } })
        gsap.to('.mt-hero-content', { y: -90, opacity: 0.35, ease: 'none', scrollTrigger: { trigger: '.mt-hero', start: 'top top', end: 'bottom top', scrub: 1 } })

        gsap.utils.toArray('.mt-section .mt-eyebrow, .mt-section h2, .mt-section .mt-lead').forEach((el) =>
          gsap.from(el, { y: 35, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }))
        gsap.utils.toArray('.mt-stat strong[data-count]').forEach((el) =>
          gsap.to(el, { textContent: +el.dataset.count, duration: 1.4, ease: 'power2.out', snap: { textContent: 1 }, scrollTrigger: { trigger: el, start: 'top 85%', once: true } }))

        const track = root.current.querySelector('.mt-gallery-track')
        if (track && !matchMedia('(max-width: 800px)').matches && track.scrollWidth > window.innerWidth) {
          gsap.to(track, { x: () => -(track.scrollWidth - window.innerWidth), ease: 'none',
            scrollTrigger: { trigger: '.mt-gallery', start: 'top top', end: () => '+=' + (track.scrollWidth - window.innerWidth + 600), pin: true, scrub: 1, invalidateOnRefresh: true } })
        }
      } else {
        root.current.querySelectorAll('.mt-stat strong[data-count]').forEach((el) => (el.textContent = el.dataset.count))
      }

      if (fine) {
        const c = cursor.current
        const move = (e) => gsap.to(c, { x: e.clientX, y: e.clientY, opacity: 1, duration: 0.18 })
        window.addEventListener('pointermove', move)
        undo.push(() => window.removeEventListener('pointermove', move))
        root.current.querySelectorAll('a,button').forEach((el) => {
          el.addEventListener('mouseenter', () => gsap.to(c, { scale: 2.2, duration: 0.2 }))
          el.addEventListener('mouseleave', () => gsap.to(c, { scale: 1, duration: 0.2 }))
        })
        root.current.querySelectorAll('.mt-magnetic').forEach((btn) => {
          btn.addEventListener('pointermove', (e) => {
            const r = btn.getBoundingClientRect()
            gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.18, y: (e.clientY - r.top - r.height / 2) * 0.18, duration: 0.25 })
          })
          btn.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.4 }))
        })
      }
    }, root)

    return () => {
      ctx.revert(); undo.forEach((f) => f())
      window.removeEventListener('scroll', onScroll)
      html.style.scrollBehavior = ''
    }
  }, [])

  return ( 
    <div className="mt-page" ref={root} id="top">
      <Seo
        title="Muttch Lounge | Private Dining & Event Venue in Midtown Manhattan, NYC"
        description="Muttch Lounge at Chatti is a private dining room and event venue in Midtown Manhattan for up to 70 seated or 100 standing guests. Corporate dinners, celebrations and milestone events."
        path="/muttch-lounge"
        image="/images/muttch/hero.jpg"
        jsonLd={muttchSchema([INSTA, FB])}
      />
      {/* NAV (own header, with Home icon) */}
      <nav className="mt-nav" ref={nav}>
        <a className="mt-logo" href="#top"><img src={img('logo')} alt="Muttch Lounge" width="600" height="300" /></a>
        <div className="mt-nav-links">{NAV.map(([l, h]) => <a key={l} href={h}>{l}</a>)}</div>
        <div className="mt-nav-actions">
          <Link className="mt-icon-link" to="/" aria-label="Back to Chatti home" title="Home"><HomeIcon /></Link>
          <a className="mt-icon-link" href={INSTA} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Insta /></a>
          <a className="mt-nav-cta mt-magnetic" href="#inquire">Plan Your Event</a>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="mt-hero">
          <div className="mt-hero-media">
            <img src={img('hero')} alt="Muttch Lounge private dining room" fetchpriority="high" loading="eager" decoding="async" width="1600" height="900" />
          </div>
          <div className="mt-hero-overlay" />
          <div className="mt-hero-content">
            <div className="mt-hero-brand"><img className="mt-hero-logo" src={img('logo')} alt="Muttch Lounge" width="600" height="300" decoding="async" /></div>
            <h1 className="mt-hero-kicker">Private Dining &amp; Event Venue <br />in Midtown Manhattan</h1>
            <div className="mt-hero-text">
              <p>An elegant private dining room and event space in Midtown Manhattan, NYC, for up to 70 guests seated or 100 standing.</p>
            </div>
            <div className="mt-actions">
              <a className="mt-btn primary mt-magnetic" href="#inquire">Plan Your Event</a>
              <a className="mt-btn mt-magnetic" href={DECK} onClick={() => track('file_download', { file_name: 'Muttch-Event-Deck.pdf' })} target="_blank" rel="noopener noreferrer">Download Event Deck</a>
            </div>
          </div>
                  </section>

        {/* INTRO */}
        <section className="mt-section mt-intro">
          <div className="mt-wrap">
            <div className="mt-intro-grid">
              <div>
                <div className="mt-eyebrow">Muttch Lounge at Chatti</div>
                <h2 className="mt-display">A private dining and event space in Manhattan, designed around your occasion</h2>
              </div>
              <div className="mt-intro-copy">
                <p className="mt-lead">Muttch Lounge is the private dining room and event venue inside Chatti at 252 W 37th St in Midtown Manhattan, a short walk from Penn Station and Times Square. With room for 70 seated or 100 standing guests and a dedicated bar, it is a refined setting for celebrations, corporate dinners, networking events and milestone occasions.</p>
                <p className="mt-lead">From private dining in Midtown Manhattan for a small table to a full restaurant buyout, our team shapes the room, the menu and the service around your guests.</p>
                <div className="mt-intro-image mt-media"><img src={img('intro')} alt="Private dining room at Muttch Lounge in Midtown Manhattan" loading="lazy" decoding="async" /></div>
              </div>
            </div>
          </div>
        </section>

        <Enquiry />

        {/* EXPERIENCE (no hover images) */}
        <section className="mt-section mt-experience" id="experience">
          <div className="mt-wrap mt-experience-grid">
            <div>
              <div className="mt-eyebrow" style={{ color: '#F3EBDD' }}>The Experience</div>
              <h2 className="mt-display">Private dining and events we host</h2>
            </div>
            <div className="mt-experience-list">
              {EXPERIENCE.map(([t, d]) => (
                <div className="mt-experience-item" key={t}>
                  <a href="#inquire"><h3>{t}</h3></a>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Stats />

        {/* DINING */}
        <section className="mt-section mt-dining" id="dining">
          <div className="mt-wrap mt-dining-grid">
            <div>
              <div className="mt-eyebrow">Menus for your event</div>
              <h2 className="mt-display">Private dining menus</h2>
              <p className="mt-lead">Every event is built around your guests. Select from chef-curated lunch and dinner collections featuring authentic Kerala cuisine, handcrafted beverages and personalized enhancements.</p>
              <div className="mt-actions left">
                <a className="mt-btn primary mt-magnetic" href={DECK} onClick={() => track('file_download', { file_name: 'Muttch-Event-Deck.pdf' })} target="_blank" rel="noopener noreferrer">View Event Deck</a>
                <Link className="mt-btn dark mt-magnetic" to="/menu">View Menu</Link>
              </div>
            </div>
            <div className="mt-dining-photo mt-media"><img src={img('dining')} alt="Private dining at Muttch Lounge" loading="lazy" decoding="async" /></div>
          </div>
        </section>

        <Beverage />

        {/* CHEF / AWARDS */}
        <section className="mt-section mt-story" id="chef">
          <div className="mt-wrap mt-story-grid">
            <div className="mt-story-media mt-media"><img src={img('chef')} alt="Chef Regi Mathew, founder of Chatti New York" loading="lazy" decoding="async" /></div>
            <div className="mt-story-copy">
              <h2 className="mt-display mt-awards-title">Awards</h2>
              <div className="mt-eyebrow">The chef behind your menu</div>
              <h3 className="mt-chef-name">Meet Chef Regi Mathew</h3>
              <p className="mt-lead">Visionary chef and founder of Chatti, celebrated for his authentic Kerala cuisine and global culinary excellence.</p>
              <ul className="mt-awards" style={{ listStyle: 'none', padding: 0 }}>
                {AWARDS.map(([n, s, y]) => (
                  <li className="mt-award" key={n}><div><b>{n}</b><small>{s}</small></div><span>{y}</span></li>
                ))}
              </ul>
              <Link className="mt-btn dark mt-magnetic" to="/about#chef">Meet Chef Regi</Link>
            </div>
          </div>
        </section>

        {/* DECK BAND */}
        <section className="mt-deck">
          <div className="mt-wrap mt-deck-inner">
            <div><h2>Download the event deck</h2><p>Explore menus, venue options and curated dining collections.</p></div>
            <a className="mt-btn dark-fill" href={DECK} onClick={() => track('file_download', { file_name: 'Muttch-Event-Deck.pdf' })} target="_blank" rel="noopener noreferrer">Download PDF</a>
          </div>
        </section>

        {/* GALLERY */}
        <section className="mt-section mt-gallery" id="gallery">
          <div className="mt-wrap">
            <div className="mt-eyebrow">Inside Muttch</div>
            <h2 className="mt-display">Inside our private dining room in Midtown Manhattan</h2>
          </div>
          <div className="mt-gallery-track">
            {GALLERY.map(([k, alt, cap]) => (
              <div className="mt-gallery-card" key={k}><img src={img(k)} alt={alt} loading="lazy" decoding="async" /><span>{cap}</span></div>
            ))}
          </div>
        </section>

      </main>

      {/* PAGE FOOTER */}
      <footer className="mt-footer">
        <div className="mt-visit">
          <div className="mt-eyebrow">Visit us</div>
          <p>Muttch Lounge at Chatti<br />252 W 37th St, New York, NY 10018<br />In Midtown Manhattan's Garment District,<br />a short walk from Penn Station and Times Square.</p>
          <p><a href="tel:+12129949599" onClick={() => track('phone_click', { location: 'muttch' })}>+1 (212) 994 9599</a><br /><a href="mailto:info@thechatti.com">info@thechatti.com</a></p>
          <div className="mt-visit-icons">
            <a href={INSTA} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Insta /></a>
            <a href={FB} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8z" fill="currentColor" /></svg></a>
          </div>
        </div>
        <div className="mt-footer-bar">
          <div className="mt-wrap mt-footer-bar-in">
            <span className="mt-footer-mark">Muttch</span>
            <strong>Private Dining &amp; Event Venue · Midtown Manhattan</strong>
            <small>© {new Date().getFullYear()} Muttch Lounge at Chatti</small>
          </div>
        </div>
      </footer>

      <div className="mt-cursor" ref={cursor} />
    </div>
  )
}
