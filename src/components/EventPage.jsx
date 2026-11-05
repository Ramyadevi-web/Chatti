import { useRef, useState } from 'react'
import '../pages/events/Events.css'

/**
 * Shared layout for the three Events pages (Seafood & Toddy Tales, Theenmura, KCK Onam).
 * Content is passed in as a plain object, see src/pages/events/*.jsx
 */
export default function EventPage({ theme = 'light', heroImage, heroAlt, logo, logoAlt, tag, title, intro, card1, card2 }) {
  const [active, setActive] = useState(0)
  const tabsRef = useRef(null)
  const tabs = card2.tabs
  const pane = tabs[active]

  const scrollRight = (e) => {
    e.preventDefault()
    e.currentTarget.blur()
    tabsRef.current?.scrollBy({ left: 160, behavior: 'smooth' })
  }

  return (
    <div className={`ev-page ev-${theme}`}>
      {heroImage && (
        <div className="ev-hero-img">
          <img src={heroImage} alt={heroAlt || title} fetchpriority="high" decoding="async" />
        </div>
      )}
      <div className="ev-container">
        <header className="ev-hero">
          {logo && (
            <div className="ev-logo"><img src={logo} alt={logoAlt || title} /></div>
          )}
          <span className="ev-tag">{tag}</span>
          <h1 className="ev-title">{title}</h1>
          <div className="ev-divider" />
          <p className="ev-intro">{intro}</p>
        </header>

        <section className="ev-card ev-slide ev-d1">
          <h2 className="ev-card-title">{card1.title}</h2>
          <p className="ev-text">{card1.text}</p>
        </section>

        <section className="ev-card ev-menu-card ev-slide ev-d2">
          <h2 className="ev-card-title">{card2.title}</h2>
          <p className="ev-card-sub">{card2.subtitle}</p>

          <div className="ev-tabs-wrap">
            <button className="ev-scroll-btn" onClick={scrollRight} aria-label="Scroll more menu items">&#8250;</button>
            <div className="ev-tabs" ref={tabsRef} role="tablist" aria-label={card2.title}>
              {tabs.map((t, i) => (
                <button
                  key={t.label}
                  role="tab"
                  aria-selected={i === active}
                  className={`ev-tab ${i === active ? 'active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  {t.label}
                  <span className="ev-badge">{t.badge}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="ev-pane-area">
            <div className={`ev-pane ${pane.accent ? 'accent' : ''}`} role="tabpanel" key={pane.label}>
              <span className="ev-course">{pane.tagline}</span>
              <h3>{pane.heading}</h3>
              <p>{pane.text}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
