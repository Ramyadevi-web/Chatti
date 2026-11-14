import { useState } from 'react'
import Button from '../components/Button'
import { BOOKING_URL, INSTAGRAM_URL } from '../config'
import Seo from '../components/Seo'
import { restaurantSchema } from '../lib/schema'

const img = (n) => `/images/${n}`

const DISHES = [
  { name: 'Beef and Green Pepper', src: 'beef-green-pepper.jpg' },
  { name: 'Calicut Mussels', src: 'calicut-mussels.jpg' },
  { name: 'Coconut Clams', src: 'coconut-clams.jpg' },
  { name: 'Filter Coffee Pudding', src: 'filter-coffee.jpg' },
]
const DRINKS = ['drink1.jpg', 'drink2.jpg', 'drink3.jpg']
const HOURS = [
  ['Sunday', '12:00-2:30', '3:00-6:00', '5:00-9:00'],
  ['Monday', '12:00-2:00', '3:00-6:00', '5:00-9:00'],
  ['Tuesday', '12:00-2:00', '3:00-6:00', '5:00-9:00'],
  ['Wednesday', '12:00-2:00', '3:00-6:00', '5:00-9:00'],
  ['Thursday', '12:00-2:00', '3:00-6:00', '5:00-9:00'],
  ['Friday', '12:00-2:00', '3:00-6:00', '5:00-10:00'],
  ['Saturday', '12:00-2:30', '3:00-6:00', '5:00-10:00'],
]

function Hero() {
  return <header className="hero" />
}

function LoveLetter() {
  return (
    <section className="cream split">
      <div className="split-text">
        <p className="eyebrow">Love Letter to the Toddy Shops</p>
        <h2>Chatti by Chef Regi Mathew</h2>
        <p className="body">
          The name <b>Chatti</b> refers to the traditional clay pot central to Kerala's toddy shops and homes.
          This emblem of Kerala's culinary heritage sets the stage for a dining experience that brings the bold
          flavors and rustic charm of toddy shop food - a micro-cuisine with a cult following, to the heart of{' '}
          <b>New York City..</b>
        </p>
        <Button to="/about">About Chatti</Button>
      </div>
      <img className="split-img" src={img('storefront.jpg')} alt="Chatti storefront" />
    </section>
  )
}

function Community() {
  return (
    <section className="cream split reverse">
      <img className="round-plate" src={img('prawns.jpg')} alt="Prawn fry" />
      <div className="split-text narrow">
        <p className="eyebrow">Community Dining</p>
        <h2>Toddy Shop Food Culture</h2>
        <p className="body justify">
          Experience Kerala's toddy shop heritage at Chatti, where bold flavors, traditional recipes, and a
          communal spirit blend to celebrate the vibrant essence of this Southern Indian regional cuisine.
        </p>
        {/* <Button to="/about">Know More</Button> */}
      </div>
    </section>
  )
}

function Chef() {
  return (
    <section className="chef">
      <img src={img('chef.jpg')} alt="Chef Regi Mathew" />
      <div className="chef-text">
        <p className="chef-sub">Chatti by Chef Regi Mathew</p>
        <h2>KERALA'S CULINARY VISIONARY CHEF</h2>
        <p className="quote">
          "As I continue to explore and expand the horizons of Kerala cuisine, my focus remains on preservation,
          innovation, education, and the global promotion of India's diverse flavors. Every dish I create tells a
          story; every flavor evokes a memory, as I strive to bring the essence of Kerala to dining tables around
          the world."
        </p>
        <Button variant="light" to="/about#chef">About Chef Regi Mathew</Button>
      </div>
      <img src={img('chef-dishes.jpg')} alt="Kerala dishes" />
    </section>
  )
}

function Touchings() {
  return (
    <section className="cream split touchings">
      <div className="split-text narrow">
        <p className="eyebrow">Toddy Shop Inspired Small Plates</p>
        <h2>Touchings</h2>
        <p className="body italic justify">
          Touchings are the Toddy Shop inspired version of small plates packed with bold flavors and perfectly
          portioned bites. Colloquially called touchings because they are meant to be eaten with your hands, these
          dishes are rooted in Kerala's unique Toddy Shop dining culture, bringing the true essence of regional
          specialities to your plate.
        </p>
        <Button to="/menu">View Menu</Button>
      </div>
      <img className="round-plate" src={img('beef-fry.jpg')} alt="Beef fry on banana leaf" />
    </section>
  )
}

function Journey() {
  return (
    <section className="journey">
      <div className="journey-inner">
        <p className="eyebrow light">From Kerala's Shores to New York's Heart</p>
        <h2>The Journey</h2>
        <p  className="journey-text">
          In pursuit of preserving Kerala's rich culinary traditions, Chef Regi embarked on an extensive research
          journey spanning over three years, visiting <b>70 toddy shops and 265 homes</b> across the state. Learning
          from home cooks, toddy shop chefs, and culinary artisans, he meticulously documented{' '}
          <b>over 800 recipes</b>, uncovering untold culinary stories, unrecorded food traditions, and regional
          treasures. This deep-rooted research forms the very foundation of both Kappa Chakka Kandhari and Chatti.
        </p>
      </div>
    </section>
  )
}

function Ambience() {
  return (
    <>
      <section className="cream ambience-head">
        <p className="eyebrow">Spacious Dining</p>
        <h3>AMBIENCE</h3>
      </section>
      <section className="ambience">
        <figure>
          <img src={img('bar.jpg')} alt="Restaurant and bar" />
          <figcaption>
            <h4>Restaurant &amp; Bar</h4>
            <p>
              Experience the flavors and traditions of Kerala at Chatti, where heritage meets modernity in the heart
              of New York's Garment District. A true culinary journey awaits!
            </p>
          </figcaption>
        </figure>
        <figure><img src={img('dining.jpg')} alt="Dining room" /></figure>
        <figure><img src={img('banquet.jpg')} alt="Banquet room" /></figure>
      </section>
    </>
  )
}

function Dishes() {
  const [page, setPage] = useState(0)
  return (
    <section className="cream dishes">
      <h3 className="terracotta">TRADITIONAL FLAVORS, MODERN TWIST</h3>
      <div className="cards">
        {DISHES.map((d) => (
          <figure key={d.name}>
            <img src={img(d.src)} alt={d.name} />
            <figcaption>{d.name}</figcaption>
          </figure>
        ))}
      </div>
      <div className="dots">
        {Array.from({ length: 7 }, (_, i) => (
          <i key={i} className={i === page ? 'on' : ''} onClick={() => setPage(i)} />
        ))}
      </div>
      <Button to="/menu">View Menu</Button>
    </section>
  )
}

function Beverages() {
  return (
    <section className="cream bevs">
      <p className="eyebrow">Beverages</p>
      <h3>SIP, SAVOR , AND CELEBRATE</h3>
      <div className="bev-grid">
        {DRINKS.map((d) => <img key={d} src={img(d)} alt="" />)}
      </div>
      <Button to="/menu">View Menu</Button>
    </section>
  )
}

function Hours() {
  return (
    <section className="hours" id="book">
      <img className="hours-img" src={img('lobster.jpg')} alt="Grilled lobster skewers" />
      <div className="hours-box">
        <h3>Chatti Awaits: Your Culinary Clock</h3>
        <Button href={BOOKING_URL}>Book A Table</Button>
        <table>
          <thead>
            <tr><th>Day</th><th>Lunch</th><th>Happy Hour</th><th>Dinner</th></tr>
          </thead>
          <tbody>
            {HOURS.map(([day, ...slots]) => (
              <tr key={day}><td>{day}</td>{slots.map((s, i) => <td key={i}>{s}</td>)}</tr>
            ))}
          </tbody>
        </table>
        <p className="last-seating">Last Seating: 2:00 – 2:30 and 9:00 – 10:00</p>
      </div>
      <div className="map">
        <iframe
          title="Map"
          loading="lazy"
          src="https://www.google.com/maps?q=252+W+37th+St,+New+York,+NY+10018&output=embed"
        />
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Seo
        title="Chatti by Chef Regi Mathew | Kerala Toddy Shop Restaurant in Midtown Manhattan, NYC"
        description="Authentic Kerala cuisine and toddy shop small plates by Chef Regi Mathew at 252 W 37th St, Midtown Manhattan. View the menu, hours and book a table."
        path="/"
        jsonLd={restaurantSchema(HOURS, INSTAGRAM_URL)}
      />
      <Hero />
      <LoveLetter />
      <Community />
      <Chef />
      <Touchings />
      <Journey />
      <Ambience />
      <Dishes />
      <Beverages />
      <Hours />
    </>
  )
}
