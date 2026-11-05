import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from './Button'
import { BOOKING_URL } from '../config'

const EVENTS = [
  { label: 'KCK Onasadhya', to: '/events/kck-onasadhya' },
  { label: 'KCK Theenmura', to: '/events/kck-theenmura' },
  { label: 'KCK Seafood & Toddy Tales', to: '/events/kck-seafood-toddy-tales' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [eventsOpen, setEventsOpen] = useState(false)
  const { pathname } = useLocation()
  const overHero = pathname === '/'

  // close the menu whenever the page changes
  useEffect(() => { setOpen(false); setEventsOpen(false) }, [pathname])

  // lock page scroll while menu is open + close with Esc
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <nav className={`nav ${overHero ? 'nav--over' : 'nav--solid'}`}>
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
          <li><NavLink to="/menu">Menu</NavLink></li>
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
          <li><NavLink to="/contact">Contact Us</NavLink></li>
        </ul>
      </aside>
    </>
  )
}
