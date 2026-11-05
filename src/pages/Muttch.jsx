import { memo, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sendEnquiry } from '../lib/sendEnquiry'
import './Muttch.css'

gsap.registerPlugin(ScrollTrigger)

// All images live in  public/images/muttch/  — upload them there with these names
// (if your file is .png / .webp, just change the extension here).
const IMG_BASE = '/images/muttch/'
const IMG = {
  logo: 'logo-white.webp', hero: 'hero.jpg', intro: 'intro.jpg', chef: 'chef.jpg',
  dining: 'dining.jpg', beverage: 'beverage.jpg',
  g1: 'gallery-1.webp', g2: 'gallery-2.webp', g3: 'gallery-3.webp', g4: 'gallery-4.webp',
}
const img = (k) => IMG_BASE + IMG[k]
const DECK = '/muttch/Muttch-Event-Deck.pdf' // upload to public/muttch/
const INSTA = 'https://www.instagram.com/muttchlounge?stkn=M3p2OWVkNThpZ3V0&utm_source=qr'
const FB = 'https://www.facebook.com/profile.php?id=61594628716149'

const NAV = [['Experience', '#experience'], ['Awards', '#chef'], ['Dining', '#dining'], ['Gallery', '#gallery']]

const EXPERIENCE = [
  ['Corporate Gatherings', 'Corporate dinners, team dinners, client entertaining, networking events and holiday parties in Midtown Manhattan.', 'g3'],
  ['Celebrations', 'Private birthday dinners, engagement parties, anniversaries and milestone celebrations, designed around your guests.', 'g4'],
  ['Family & Milestones', 'Rehearsal dinners, graduation dinners, bridal and baby showers, and intimate family gatherings', 'g1'],
  ['Social Gathering', 'Fundraisers, nonprofit events, reunions and group dinners.', 'g2'],
]
const STATS = [[70, 'Seated guests'], [100, 'Standing guests'], ['Dedicated', 'Bar'], ['Private Dining', 'Experience']]
const PACKAGES = [
  ['Essential', 'Beer, house red and white wine, soft drinks and zero-proof coolers.', ['Beer', 'House red and white wine', 'Soft drinks', 'Zero-proof coolers']],
  ['Signature', "Everything in Essential, plus Chatti's signature cocktails built on Kerala spices. ", ['Everything in Essential', "Chatti's signature cocktails", 'Built on Kerala spices']],
  ['House', 'A wider wine list with house spirits and a menu of classic cocktails.', ['A wider wine list', 'House spirits', 'Classic cocktails']],
  ['Prestige', 'Premium spirits, sparkling wine and a bartender-led cocktail list for your guests.', ['Premium spirits', 'Sparkling wine', 'Bartender-led cocktail list']],
  ['Reserve', "Top-shelf spirits and reserve wines, paired course by course with Chef Regi's menu.", ['Top-shelf spirits', 'Reserve wines', "Paired course by course with Chef Regi's menu"]],
]
const AWARDS = [
  ['Best Chef Milan', 'One Knife', '2025'],
  ['The Best Chef Dubai', 'One Knife', '2024'],
  ['Hospitality Horizon Top Chefs Award', 'Hall of Fame', '2024'],
  ['Zee Zest Unlimit Awards', 'Chef of the Year', '2024'],
  ['Food Superstar', 'Hall of Fame 2024, Chef 2022 & 2023', '2022–24'],
  ['Times Food & Nightlife Awards', 'Chef of the Year', '2019'],
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

/* counters live in a memoised block so React never re-renders over the animation */
const Stats = memo(function Stats() {
  return (
    <section className="mt-stats">
      <div className="mt-container mt-stats-grid">
        {STATS.map(([n, label]) => (
          <div className="mt-stat" key={label}>
            {typeof n === 'number'
              ? <strong className="mt-stat-number" data-count={n}>0</strong>
              : <strong className="mt-stat-number text">{n}</strong>}
            <span className="mt-stat-label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
})

function Beverage() {
  const [active, setActive] = useState(0)
  return (
    <section className="mt-beverage">
      <div className="mt-container">
        <div className="mt-beverage-header">
          <div>
            <div className="mt-eyebrow mt-reveal">Beverage Experience</div>
            <h2 className="mt-title mt-reveal">Bar packages for private events</h2>
          </div>
          <p className="mt-beverage-intro mt-reveal">From handcrafted cocktails to curated wine selections and premium spirits, our beverage collections are designed to complement every celebration.</p>
        </div>
        <div className="mt-tabs">
          {PACKAGES.map(([t], i) => (
            <button key={t} className={`mt-tab ${i === active ? 'active' : ''}`} onClick={() => setActive(i)}>{t}</button>
          ))}
        </div>
        {PACKAGES.map(([t, copy, items], i) => (
          <div key={t} className={`mt-tab-panel ${i === active ? 'active' : ''}`}>
            <div><h3>{t}</h3><p>{copy}</p></div>
            <div className="mt-package-list">
              {items.map((it) => <div className="mt-package-item" key={it}><span>{it}</span><span>Included</span></div>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Enquiry() {
  const [sending, setSending] = useState(false)
  const [thanks, setThanks] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    document.body.style.overflow = thanks ? 'hidden' : ''
    const esc = (e) => e.key === 'Escape' && setThanks(false)
    window.addEventListener('keydown', esc)
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [thanks])

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data.website) return // honeypot: bots fill this hidden field
    setSending(true)
    setError('')
    try {
      const { sent } = await sendEnquiry(data)
      if (sent) { form.reset(); setThanks(true) }
    } catch (err) {
      console.error(err)
      setError('Unable to send your enquiry. Please try again or email info@thechatti.com.')
    } finally { setSending(false) }
  }

  return (
    <>
      <section className="mt-inquiry" id="inquire">
        <div className="mt-container mt-inquiry-grid">
          <div className="mt-inquiry-copy">
            <div className="mt-eyebrow mt-reveal">Start a conversation</div>
            <h2 className="mt-reveal">Plan your event</h2>
            <p className="mt-reveal">From private dining in Midtown Manhattan for a small table to a full restaurant buyout, our team shapes the room, the menu and the service around your guests.</p>
            <div className="mt-contact-details">
              <span>252 W 37th St, New York, NY 10018</span>
              <a href="tel:+12129949599">+1 (212) 994 9599</a>
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
            <div className="mt-field"><input type="date" id="date" name="date" placeholder=" " /><label htmlFor="date" className="mt-date">Preferred date</label></div>
            <div className="mt-field full"><textarea placeholder=" " id="message" name="message" /><label htmlFor="message">Tell us about your event</label></div>
            <div className="mt-form-submit"><button type="submit" className="mt-magnetic" disabled={sending}>{sending ? 'Sending...' : 'Send Enquiry →'}</button>{error && <p className="mt-form-error">{error}</p>}</div>
          </form>
        </div>
      </section>

      <div className={`mt-thanks ${thanks ? 'active' : ''}`}>
        <div className="mt-thanks-overlay" onClick={() => setThanks(false)} />
        <div className="mt-thanks-card">
          <button className="mt-thanks-close" onClick={() => setThanks(false)} aria-label="Close">×</button>
          <div className="mt-thanks-line" />
          <div className="mt-thanks-eyebrow">MUTTCH LOUNGE</div>
          <h3>Thank you.</h3>
          <p>Your enquiry has been received.<br />Our team will be in touch with you shortly.</p>
          <button className="mt-thanks-btn" onClick={() => setThanks(false)}>Close</button>
        </div>
      </div>
    </>
  )
}

export default function Muttch() {
  const root = useRef(null)
  const nav = useRef(null)
  const cursor = useRef(null)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menu])

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = matchMedia('(pointer:fine)').matches
    const html = document.documentElement
    html.style.scrollBehavior = 'smooth'
    window.scrollTo(0, 0)
    const onScroll = () => nav.current?.classList.toggle('is-scrolled', window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    const undo = []

    const ctx = gsap.context(() => {
      if (!reduce) {
        // 1) photo is shown clearly  2) green overlay fades in  3) logo  4) kicker, headline, text, buttons
        gsap.timeline({ delay: 0.3 })
          .fromTo('.mt-hero-media img', { scale: 1.12 }, { scale: 1, duration: 3.2, ease: 'power2.out' }, 0)
          .to('.mt-hero-overlay', { opacity: 1, duration: 1.4, ease: 'power2.inOut' }, 1.8)
          .to('.mt-hero-brand', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '>-0.4')
          .to('.mt-hero-kicker', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=.5')
          .to('.mt-hero-text', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=.4')
          .to('.mt-hero-actions', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=.5')

        gsap.to('.mt-hero-media', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.mt-hero', start: 'top top', end: 'bottom top', scrub: 1 } })
        gsap.to('.mt-hero-content', { y: -80, opacity: 0.3, ease: 'none', scrollTrigger: { trigger: '.mt-hero', start: 'top top', end: 'bottom top', scrub: 1 } })

        gsap.utils.toArray('.mt-reveal').forEach((el) =>
          gsap.from(el, { y: 35, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }))
        gsap.utils.toArray('.mt-stat-number[data-count]').forEach((el) =>
          gsap.to(el, { textContent: +el.dataset.count, duration: 1.4, ease: 'power2.out', snap: { textContent: 1 }, scrollTrigger: { trigger: el, start: 'top 85%', once: true } }))

        const track = root.current.querySelector('.mt-gallery-track')
        if (track && !matchMedia('(max-width: 650px)').matches) {
          gsap.to(track, { x: () => -(track.scrollWidth - window.innerWidth), ease: 'none',
            scrollTrigger: { trigger: '.mt-gallery', start: 'top top', end: () => '+=' + (track.scrollWidth - window.innerWidth + 400), pin: true, scrub: 1, invalidateOnRefresh: true } })
        }
      } else {
        root.current.querySelectorAll('.mt-stat-number[data-count]').forEach((el) => (el.textContent = el.dataset.count))
      }

      if (fine) {
        const c = cursor.current
        const move = (e) => gsap.to(c, { x: e.clientX, y: e.clientY, opacity: 1, duration: 0.18 })
        window.addEventListener('pointermove', move)
        undo.push(() => window.removeEventListener('pointermove', move))
        root.current.querySelectorAll('a,button,.mt-experience-card').forEach((el) => {
          el.addEventListener('mouseenter', () => c.classList.add('is-active'))
          el.addEventListener('mouseleave', () => c.classList.remove('is-active'))
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
      {/* NAV: own header with Home icon */}
      <nav className="mt-nav" ref={nav}>
        <div className="mt-nav-inner">
          <div className="mt-nav-side">
            <div className="mt-nav-links">{NAV.map(([l, h]) => <a key={l} href={h}>{l}</a>)}</div>
          </div>
          <a className="mt-nav-brand" href="#top"><img src={img('logo')} alt="Muttch Lounge" width="600" height="300" /></a>
          <div className="mt-nav-side right">
            <Link className="mt-icon-link" to="/" aria-label="Back to Chatti home" title="Home"><HomeIcon /></Link>
            <a className="mt-icon-link" href={INSTA} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Insta /></a>
            <a href="#inquire" className="mt-nav-book">Plan Your Event</a>
            <button className="mt-nav-toggle" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((v) => !v)}><span /><span /></button>
          </div>
        </div>
      </nav>
      <div className={`mt-mobile-menu ${menu ? 'open' : ''}`} onClick={() => setMenu(false)}>
        {NAV.map(([l, h]) => <a key={l} href={h}>{l}</a>)}
        <a href="#inquire">Plan Your Event</a>
        <Link to="/">Back to Chatti</Link>
      </div>

      <main>
        {/* HERO */}
        <section className="mt-hero">
          <div className="mt-hero-media">
            <img src={img('hero')} alt="Muttch Lounge private dining room" fetchpriority="high" loading="eager" decoding="async" width="1600" height="900" />
          </div>
          <div className="mt-hero-overlay" />
          <div className="mt-hero-content">
            <div className="mt-hero-brand"><img className="mt-hero-logo" src={img('logo')} alt="Muttch Lounge" width="600" height="300" decoding="async" /></div>
            <div className="mt-hero-kicker">Private Dining &amp; Event Venue in Midtown Manhattan</div>
            <div className="mt-hero-text">
              <h1>A room of your own in the heart of Manhattan.</h1>
              <p className="mt-hero-description">An elegant private dining room and event space in Midtown Manhattan, NYC, for up to 70 guests seated or 100 standing.</p>
            </div>
            <div className="mt-hero-actions">
              <a className="mt-btn mt-btn-primary mt-magnetic" href="#inquire">Plan Your Event</a>
              <a className="mt-btn mt-btn-outline mt-magnetic" href={DECK} target="_blank" rel="noopener noreferrer">Download Event Deck</a>
            </div>
          </div>
          <div className="mt-hero-scroll"><span>Scroll</span><i /></div>
        </section>

        {/* INTRO */}
        <section className="mt-intro">
          <div className="mt-container">
            <div className="mt-intro-grid">
              <div>
                <div className="mt-eyebrow mt-reveal">Muttch Lounge at Chatti</div>
                <h2 className="mt-title mt-reveal">A private dining and event space in Manhattan, designed around your occasion</h2>
              </div>
              <div className="mt-intro-copy">
                <p className="mt-lead mt-reveal">Muttch Lounge is the private dining room and event venue inside Chatti at 252 W 37th St in Midtown Manhattan, a short walk from Penn Station and Times Square. With room for 70 seated or 100 standing guests and a dedicated bar, it is a refined setting for celebrations, corporate dinners, networking events and milestone occasions.</p>
                <p className="mt-lead mt-reveal">From private dining in Midtown Manhattan for a small table to a full restaurant buyout, our team shapes the room, the menu and the service around your guests.</p>
              </div>
            </div>
            <div className="mt-intro-image"><img src={img('intro')} alt="Private dining room at Muttch Lounge in Midtown Manhattan" loading="lazy" decoding="async" /></div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="mt-experience" id="experience">
          <div className="mt-container">
            <div className="mt-experience-header">
              <div>
                <div className="mt-eyebrow light mt-reveal">The Experience</div>
                <h2 className="mt-title mt-reveal">Private dining and events we host</h2>
              </div>
              <p className="mt-experience-description mt-reveal">A distinct hospitality experience, culturally rooted, quietly luxurious and designed around the people gathered inside it.</p>
            </div>
            <div className="mt-experience-grid">
              {EXPERIENCE.map(([t, d, k], i) => (
                <a href="#inquire" className="mt-experience-card" key={t}>
                  <div className="mt-experience-card-image"><img src={img(k)} alt="" loading="lazy" decoding="async" /></div>
                  <div className="mt-experience-card-content">
                    <div className="mt-experience-card-number">0{i + 1}</div>
                    <h3>{t}</h3><p>{d}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <Stats />

        {/* CHEF / AWARDS */}
        <section className="mt-craft" id="chef">
          <div className="mt-container mt-craft-grid">
            <div className="mt-craft-image"><img src={img('chef')} alt="Chef Regi Mathew, founder of Chatti New York" loading="lazy" decoding="async" /></div>
            <div className="mt-craft-copy">
              <div className="mt-eyebrow mt-reveal">The chef behind your menu · Awards</div>
              <h2 className="mt-reveal">Meet Chef Regi Mathew</h2>
              <p className="mt-reveal">Visionary chef and founder of Chatti, celebrated for his authentic Kerala cuisine and global culinary excellence.</p>
              <ul className="mt-awards">
                {AWARDS.map(([n, s, y]) => (
                  <li className="mt-award" key={n}><div><b>{n}</b><small>{s}</small></div><span>{y}</span></li>
                ))}
              </ul>
              <Link className="mt-craft-link" to="/about#chef">Meet Chef Regi</Link>
            </div>
          </div>
        </section>

        {/* DINING */}
        <section className="mt-dining" id="dining">
          <div className="mt-container">
            <div className="mt-dining-header">
              <div className="mt-eyebrow light mt-reveal">Menus for your event</div>
              <h2 className="mt-reveal">Private dining menus</h2>
              <p className="mt-reveal">Every event is built around your guests. Select from chef-curated lunch and dinner collections featuring authentic Kerala cuisine, handcrafted beverages and personalized enhancements.</p>
              <div className="mt-dining-actions">
                <a className="mt-btn mt-btn-primary mt-magnetic" href={DECK} target="_blank" rel="noopener noreferrer">View Event Deck</a>
                <Link className="mt-btn mt-btn-outline mt-magnetic" to="/menu">View Menu</Link>
              </div>
            </div>
            <div className="mt-dining-grid">
              <div className="mt-dining-card">
                <img src={img('dining')} alt="Private dining at Muttch Lounge" loading="lazy" decoding="async" />
                <div className="mt-dining-card-content"><h3>Lunch &amp; dinner collections</h3><p>Chef-curated menus featuring authentic Kerala cuisine.</p></div>
              </div>
              <div className="mt-dining-card">
                <img src={img('beverage')} alt="Beverage experience at Muttch Lounge" loading="lazy" decoding="async" />
                <div className="mt-dining-card-content"><h3>Handcrafted beverages</h3><p>Personalized enhancements for every occasion.</p></div>
              </div>
            </div>
          </div>
        </section>

        <Beverage />

        {/* GALLERY */}
        <section className="mt-gallery" id="gallery">
          <div className="mt-gallery-header">
            <div className="mt-eyebrow mt-reveal">Inside Muttch</div>
            <h2 className="mt-reveal">Inside our private dining room in Midtown Manhattan</h2>
          </div>
          <div className="mt-gallery-track">
            {GALLERY.map(([f, alt, cap]) => (
              <div className="mt-gallery-item" key={f}><img src={img(f)} alt={alt} loading="lazy" decoding="async" /><span>{cap}</span></div>
            ))}
          </div>
        </section>

        {/* NORTH STAR (from the brand guidelines) */}
        <section className="mt-testimonials">
          <div className="mt-container mt-testimonial-wrapper">
            <div className="mt-testimonial-mark">“</div>
            <p className="mt-testimonial-quote mt-reveal">Muttch Lounge should never need to announce that it is luxurious.</p>
            <div className="mt-script mt-reveal">The Art of Gathering</div>
            <div className="mt-testimonial-author">Muttch Lounge · Private Dining &amp; Event Venue</div>
          </div>
        </section>

        <Enquiry />
      </main>

      {/* PAGE FOOTER */}
      <footer className="mt-footer">
        <div className="mt-container">
          <div className="mt-footer-top">
            <div className="mt-footer-brand"><img src={img('logo')} alt="Muttch Lounge" loading="lazy" /></div>
            <div className="mt-footer-column">
              <h4>Visit us</h4>
              <p>Muttch Lounge at Chatti<br />252 W 37th St, New York, NY 10018</p>
              <p>In Midtown Manhattan's Garment District, a short walk from Penn Station and Times Square.</p>
            </div>
            <div className="mt-footer-column">
              <h4>Contact</h4>
              <a href="tel:+12129949599">+1 (212) 994 9599</a>
              <a href="mailto:info@thechatti.com">info@thechatti.com</a>
              <a href={DECK} target="_blank" rel="noopener noreferrer">Event deck (PDF)</a>
            </div>
            <div className="mt-footer-column">
              <h4>Follow</h4>
              <a href={INSTA} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href={FB} target="_blank" rel="noopener noreferrer">Facebook</a>
              <Link to="/">Back to Chatti</Link>
            </div>
          </div>
          <div className="mt-footer-bottom">
            <p>© {new Date().getFullYear()} Muttch Lounge at Chatti</p>
            <p>Private Dining &amp; Event Venue · Midtown Manhattan</p>
          </div>
        </div>
      </footer>

      <a className="mt-floating-cta" href="#inquire">Plan Your Event</a>
      <div className="mt-cursor" ref={cursor} />
    </div>
  )
}
