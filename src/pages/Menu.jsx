import FlipbookPdf from '../components/FlipbookPdf'
import Button from '../components/Button'
import { BOOKING_URL } from '../config'

export default function MenuPage() {
  return (
    <>
      {/* hero strip (navbar sits on top of it) */}
      <header className="hero" />

      {/* intro text + flippable PDF */}
      <section className="cream menu-intro">
        <div className="menu-text">
          <p className="eyebrow">Chatti by Regi Mathew</p>
          <h2>Food Menu</h2>
          <p className="body">
            Chatti’s menu brings the bold, aromatic flavors of Kerala’s toddy shops to life. From delicate seafood
            and spiced meats to signature Kerala breads and comforting curries, each dish is a tribute to
            time-honored traditions and regional ingredients.
          </p>
        </div>
        <div className="menu-book">
          {/* put your PDF at public/menu/chatti-menu.pdf */}
          <FlipbookPdf url="/menu/chatti-menu.pdf" />
        </div>
      </section>

      {/* two images: left + right (stack on mobile) */}
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
