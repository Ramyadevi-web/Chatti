import { useEffect, useState } from 'react'
import { SEAFOOD_MENU, FALL_MENU } from '../config'
import './PromoBanners.css'

/**
 * Two promo banners shown on first load / page refresh, with one common close icon.
 * Desktop: side by side (horizontal images). Mobile: stacked (vertical images).
 *
 * Images  -> public/images/banners/   (names below)
 * Menu images -> public/menu/        (names below)
 */
const BANNERS = [
  {
    name: 'Seafood Fest & Toddy Tales',
    desktop: '/images/banners/seafood-desktop.jpeg', // horizontal
    mobile: '/images/banners/seafood-mobile.jpeg',   // vertical
    menu: SEAFOOD_MENU,
  },
  {
    name: 'Kerala Fall Comforts',
    desktop: '/images/banners/fall-desktop.webp',
    mobile: '/images/banners/fall-mobile.webp',
    menu: FALL_MENU,
  },
]

// module-level flag: shows once per page load / refresh, not again when moving between pages
let alreadyShown = false

export default function PromoBanners() {
  const [open, setOpen] = useState(() => !alreadyShown)

  useEffect(() => { alreadyShown = true }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [open])

  if (!open) return null

  return (
    <div className="pb-overlay" role="dialog" aria-modal="true" aria-label="Offers" onClick={() => setOpen(false)}>
      <div className="pb-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pb-close" onClick={() => setOpen(false)} aria-label="Close banners">×</button>
        <div className="pb-scroll">
        <div className="pb-grid">
          {BANNERS.map((b) => (
            <div className="pb-card" key={b.name}>
              <picture>
                <source media="(max-width: 768px)" srcSet={b.mobile} />
                <img src={b.desktop} alt={b.name} decoding="async" />
              </picture>
              <a className="pb-menu" href={b.menu} target="_blank" rel="noopener noreferrer">Menu</a>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  )
}
