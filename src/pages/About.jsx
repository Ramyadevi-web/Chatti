import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../components/Button'
import Seo from '../components/Seo'
import { AWARDS } from '../data/awards'
import './About.css'

const img = (n) => `/images/${n}`

export default function About() {
  const { hash } = useLocation()

  // jump to #chef / #journey (the page may still be loading, so retry briefly)
  useEffect(() => {
    if (!hash) return
    let tries = 0
    const t = setInterval(() => {
      const el = document.getElementById(hash.slice(1))
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); clearInterval(t) }
      else if (++tries > 20) clearInterval(t)
    }, 100)
    return () => clearInterval(t)
  }, [hash])

  return (
    <>
      <Seo
        title="About Chatti | Kerala Toddy Shop Cuisine by Chef Regi Mathew, NYC"
        description="The story of Chatti: Chef Regi Mathew's love letter to Kerala's toddy shops, brought to Midtown Manhattan, New York. Meet the chef and read about the journey."
        path="/about"
      />
      <header className="page-hero menu-hero" />

      <section className="cream split about-story" id="story">
        <div className="split-text">
          <p className="eyebrow">Love Letter to the Toddy Shops</p>
          <h1 className="about-h1">About Chatti</h1>
          <p className="body">
            The name <b>Chatti</b> refers to the traditional clay pot central to Kerala's toddy shops and homes.
            This emblem of Kerala's culinary heritage sets the stage for a dining experience that brings the bold
            flavors and rustic charm of toddy shop food - a micro-cuisine with a cult following, to the heart of{' '}
            <b>New York City</b>.
          </p>
        </div>
        <img className="split-img" src={img('storefront.jpg')} alt="Chatti storefront in Midtown Manhattan" />
      </section>

      <section className="cream split reverse about-community">
        <img className="round-plate" src={img('prawns.jpg')} alt="Kerala prawn fry" />
        <div className="split-text narrow">
          <p className="eyebrow">Community Dining</p>
          <h2>Toddy Shop Food Culture</h2>
          <p className="body justify">
            Experience Kerala's toddy shop heritage at Chatti, where bold flavors, traditional recipes, and a
            communal spirit blend to celebrate the vibrant essence of this Southern Indian regional cuisine.
          </p>
          <Button to="/menu">View Menu</Button>
        </div>
      </section>

      <section className="about-chef" id="chef">
        <img src={img('chef.jpg')} alt="Chef Regi Mathew" />
        <div className="about-chef-text">
          <p className="chef-sub">Chatti by Chef Regi Mathew</p>
          <h2>Kerala's Culinary Visionary Chef</h2>
          <p className="quote">
            "As I continue to explore and expand the horizons of Kerala cuisine, my focus remains on preservation,
            innovation, education, and the global promotion of India's diverse flavors. Every dish I create tells a
            story; every flavor evokes a memory, as I strive to bring the essence of Kerala to dining tables around
            the world."
          </p>
          <ul className="about-awards">
            {AWARDS.map(([name, sub, year]) => (
              <li key={name}><div><b>{name}</b><small>{sub}</small></div><span>{year}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="journey about-journey" id="journey">
        <div className="journey-inner">
          <p className="eyebrow light">From Kerala's Shores to New York's Heart</p>
          <h2>The Journey</h2>
          <p>
            In pursuit of preserving Kerala's rich culinary traditions, Chef Regi embarked on an extensive research
            journey spanning over three years, visiting <b>70 toddy shops and 265 homes</b> across the state. Learning
            from home cooks, toddy shop chefs, and culinary artisans, he meticulously documented{' '}
            <b>over 800 recipes</b>, uncovering untold culinary stories, unrecorded food traditions, and regional
            treasures. This deep-rooted research forms the very foundation of both Kappa Chakka Kandhari and Chatti.
          </p>
        </div>
      </section>
    </>
  )
}
