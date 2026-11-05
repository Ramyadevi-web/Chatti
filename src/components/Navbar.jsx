import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from './Button'
import { BOOKING_URL, SEAFOOD_MENU, FALL_MENU } from '../config'

const EVENTS = [
  { label: 'KCK Onasadhya', to: '/events/kck-onasadhya' },
  { label: 'KCK Theenmura', to: '/events/kck-theenmura' },
  { label: 'KCK Seafood & Toddy Tales', to: '/events/kck-seafood-toddy-tales' },
]

const MENUS = [
  { label: 'Food Menu', to: '/menu' },
  { label: 'Bar Menu', to: '/menu/bar' },
  { label: 'Seafood Menu', href: SEAFOOD_MENU },  // opens the seafood menu image in a new tab
  { label: 'Fall Menu', href: FALL_MENU },        // opens the fall menu image in a new tab
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [eventsOpen, setEventsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isEvent = true // every page: transparent at the top, solid after scrolling
  const overHero = true
  const [scrolled, setScrolled] = useState(false)

  // events pages: transparent at the top, solid once the user scrolls
  useEffect(() => {
    if (!isEvent) { setScrolled(false); return }
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isEvent, pathname])

  // close the menu whenever the page changes
  useEffect(() => { setOpen(false); setEventsOpen(false); setMenuOpen(false) }, [pathname])

  // lock page scroll while menu is open + close with Esc
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <nav className={`nav ${overHero ? 'nav--over' : 'nav--solid'} ${isEvent ? 'nav--fixed' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
        <Link to="/"><img className="nav-logo" src="/images/logo.png" alt="Chatti by Regi Mathew" /></Link>
        <Button variant="fill" href={BOOKING_URL} className="nav-book">Book Now</Button>
        <button
          className="nav-burger"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* dark backdrop + slide-in menu */}
      <div className={`menu-backdrop ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`menu-panel ${open ? 'show' : ''}`} aria-hidden={!open}>
        <button className="menu-close" aria-label="Close menu" onClick={() => setOpen(false)}>×</button>
        <ul>
          <li><NavLink to="/about">About</NavLink></li>
          <li>
            <button
              className={`menu-drop ${menuOpen ? 'open' : ''}`}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              Menu <span className="caret">▾</span>
            </button>
            <ul className={`submenu ${menuOpen ? 'open' : ''}`}>
              {MENUS.map((m) => (
                <li key={m.label}>
                  {m.to
                    ? <NavLink to={m.to} end>{m.label}</NavLink>
                    : <a href={m.href} target="_blank" rel="noopener noreferrer">{m.label}</a>}
                </li>
              ))}
            </ul>
          </li>
          <li>
            <button
              className={`menu-drop ${eventsOpen ? 'open' : ''}`}
              aria-expanded={eventsOpen}
              onClick={() => setEventsOpen((v) => !v)}
            >
              Events <span className="caret">▾</span>
            </button>
            <ul className={`submenu ${eventsOpen ? 'open' : ''}`}>
              {EVENTS.map((e) => (
                <li key={e.to}><NavLink to={e.to}>{e.label}</NavLink></li>
              ))}
            </ul>
          </li>
          <li><NavLink to="/media">Media</NavLink></li>
          <li><NavLink to="/contact#contact-form">Contact Us</NavLink></li>
          <li><NavLink to="/muttch">Muttch</NavLink></li>
        </ul>
      </aside>
    </>
  )
}
