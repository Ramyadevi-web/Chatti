import Button from './Button'
import { BOOKING_URL } from '../config'

/**
 * Shared layout for the Food Menu and Bar Menu pages:
 * hero strip + text on the left / menu on the right + two-image band.
 * `children` is the menu itself (flipbook PDF or an image).
 */
export default function MenuLayout({ title, text, children }) {
  return (
    <>
      <header className="page-hero menu-hero" />

      <section className="cream menu-intro">
        <div className="menu-text">
          <p className="eyebrow">Chatti by Regi Mathew</p>
          <h2>{title}</h2>
          <p className="body">{text}</p>
        </div>
        <div className="menu-book">{children}</div>
      </section>

      <section className="menu-band">
        <div className="band-left">
          <img src="/images/menu-curry.jpg" alt="Seafood curry in a clay pot" />
        </div>
        <div className="band-right">
          <img src="/images/menu-dining.jpg" alt="Cocktails and Kerala dishes" />
          <div className="band-text">
            <h3>Chatti Awaits: Your Culinary Clock</h3>
            <p><b>Dining Hours:</b> 5:00PM to 11: 00PM</p>
            <Button variant="light" href={BOOKING_URL}>Book A Table Now</Button>
          </div>
        </div>
      </section>
    </>
  )
}
