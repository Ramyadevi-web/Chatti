import React from "react";
import { useMobileMenu } from "../userMobileMenu.js";

export default function ChattiHome() {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();

  return (
    <div className="bg-[#121212] text-white font-sans antialiased min-h-screen relative overflow-x-hidden">
      
      {/* MOBILE NAVIGATION DRAWER OVERLAY */}
      <div 
        className={`fixed inset-0 bg-black/80 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-72 bg-[#1a1a1a] z-50 shadow-2xl transform transition-transform duration-300 ease-in-out p-6 flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
            <div>
              <h2 className="text-2xl font-serif tracking-widest text-[#d87a56] font-bold">Chatti</h2>
              <p className="text-[9px] tracking-widest uppercase text-gray-400">by Chef Regi Mathew</p>
            </div>
            <button 
              onClick={closeMenu} 
              className="text-gray-400 hover:text-white p-2 text-xl font-bold focus:outline-none"
              aria-label="Close Menu"
            >
              ✕
            </button>
          </div>

          <ul className="space-y-4 text-sm font-medium tracking-wide">
            <li><a href="#home" onClick={closeMenu} className="block text-gray-200 hover:text-[#d87a56] transition">Home</a></li>
            <li><a href="#about" onClick={closeMenu} className="block text-gray-200 hover:text-[#d87a56] transition">About Chatti</a></li>
            <li><a href="#chef" onClick={closeMenu} className="block text-gray-200 hover:text-[#d87a56] transition">Chef Regi Mathew</a></li>
            <li><a href="#touchings" onClick={closeMenu} className="block text-gray-200 hover:text-[#d87a56] transition">Touchings (Small Plates)</a></li>
            <li><a href="#clock" onClick={closeMenu} className="block text-gray-200 hover:text-[#d87a56] transition">Culinary Clock & Map</a></li>
          </ul>
        </div>

        <button 
          onClick={closeMenu} 
          className="w-full bg-[#bc6c4c] hover:bg-[#a3593b] text-white py-2.5 rounded text-sm font-medium transition duration-300 shadow-md"
        >
          Book Now
        </button>
      </div>

      {/* 1. HERO SECTION */}
      <header id="home" className="relative w-full h-screen min-h-[600px] flex flex-col justify-between overflow-hidden">
        {/* Background Image Overlay matching PDF hero visual */}
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-[0.38]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80')`
          }}
        />

        {/* Top Navigation Bar */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
          {/* Logo / Branding */}
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-serif tracking-widest text-[#d87a56] font-bold">
              Chatti
            </h1>
            <p className="text-[10px] tracking-widest uppercase text-gray-300">
              by Chef Regi Mathew
            </p>
          </div>

          {/* Center / Right Action & Hamburger Controls */}
          <div className="flex items-center space-x-6">
            <button className="hidden sm:inline-block bg-[#bc6c4c] hover:bg-[#a3593b] text-white px-6 py-2.5 rounded text-sm font-medium transition duration-300 shadow-md">
              Book Now
            </button>

            {/* Hamburger Button hooked to JS state */}
            <button 
              onClick={toggleMenu} 
              className="text-white p-2 focus:outline-none hover:text-[#d87a56] transition" 
              aria-label="Toggle Menu"
            >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Hero Bottom Content Copy from PDF[cite: 1] */}
        <div className="relative z-10 p-6 md:p-12 max-w-3xl">
          <span className="text-[#d87a56] text-xs font-semibold tracking-widest uppercase mb-2 block">
            Love Letter to the Toddy Shops[cite: 1]
          </span>
          <h2 className="text-2xl md:text-4xl font-serif leading-tight mb-4 text-gray-100">
            Chatti by Chef Regi Mathew[cite: 1]
          </h2>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-xl">
            The name Chatti refers to the traditional clay pot central to Kerala's toddy shops and homes. 
            This emblem of Kerala's culinary heritage sets the stage for a dining experience that brings 
            the bold flavors and rustic charm of toddy shop food - a micro-cuisine with a cult following, 
            to the heart of New York City...[cite: 1]
          </p>
        </div>
      </header>

      {/* 2. ABOUT CHATTI / TODDY SHOP FOOD CULTURE SECTION */}
      <section id="about" className="py-20 px-6 md:px-16 bg-[#181818] border-t border-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#d87a56] text-xs font-semibold tracking-widest uppercase block mb-2">
              Community Dining <br />Toddy Shop Food Culture[cite: 1]
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
              Toddy Shop Food Culture
            </h2>
            <p className="text-gray-300 leading-relaxed mb-8 text-sm md:text-base">
              Experience Kerala's toddy shop heritage at Chatti, where bold flavors, traditional recipes, 
              and a communal spirit blend to celebrate the vibrant essence of this Southern Indian regional cuisine[cite: 1].
            </p>
            <button className="border border-[#d87a56] text-[#d87a56] hover:bg-[#d87a56] hover:text-white px-6 py-2.5 text-sm uppercase tracking-wider transition duration-300">
              Know More[cite: 1]
            </button>
          </div>

          <div className="relative h-80 md:h-[420px] rounded-lg overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80" 
              alt="Chatti Restaurant Exterior" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. CHEF REGI MATHEW SECTION */}
      <section id="chef" className="py-20 px-6 md:px-16 bg-[#121212]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative h-80 md:h-[450px] rounded-lg overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80" 
              alt="Chef Regi Mathew" 
              className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 transition duration-500"
            />
          </div>

          <div className="order-1 md:order-2">
            <span className="text-[#d87a56] text-xs font-semibold tracking-widest uppercase block mb-2">
              Kerala's Culinary Visionary[cite: 1]
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">
              About Chef Regi Mathew[cite: 3]
            </h2>
            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-6">
              From Kerala's Shores to New York's Heart[cite: 3]
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm mb-6">
              In pursuit of preserving Kerala's rich culinary traditions, Chef Regi embarked on an extensive 
              research journey spanning over three years, visiting 70 toddy shops and 265 homes across the state. 
              Learning from home cooks, toddy shop chefs, and culinary artisans, he meticulously documented over 800 recipes[cite: 3]...
            </p>
            <button className="border border-[#d87a56] text-[#d87a56] hover:bg-[#d87a56] hover:text-white px-6 py-2.5 text-sm uppercase tracking-wider transition duration-300">
              Read More[cite: 3]
            </button>
          </div>
        </div>
      </section>

      {/* 4. TOUCHINGS & SMALL PLATES SECTION */}
      <section id="touchings" className="py-20 px-6 md:px-16 bg-[#181818] border-t border-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#d87a56] text-xs font-semibold tracking-widest uppercase block mb-2">
              Toddy Shop Inspired Small Plates[cite: 3]
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
              Touchings[cite: 3]
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm mb-8">
              Touchings are the Toddy Shop inspired version of small plates packed with bold flavors and perfectly 
              portioned bites. Colloquially called touchings because they are meant to be eaten with your hands, 
              these dishes are rooted in Kerala's unique Toddy Shop dining culture[cite: 3]...
            </p>
            <button className="bg-[#bc6c4c] hover:bg-[#a3593b] text-white px-6 py-2.5 rounded text-sm uppercase tracking-wider transition duration-300">
              View Menu[cite: 3]
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80" 
              alt="Small Plate 1" 
              className="rounded-lg object-cover w-full h-48 md:h-60 shadow-lg"
            />
            <img 
              src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80" 
              alt="Small Plate 2" 
              className="rounded-lg object-cover w-full h-48 md:h-60 shadow-lg mt-6"
            />
          </div>
        </div>
      </section>

      {/* 5. CULINARY CLOCK (TIMINGS TABLE) & MAP LOCATION */}
      <section id="clock" className="py-20 px-6 md:px-16 bg-[#121212]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Timings Table matching PDF[cite: 4] */}
          <div className="bg-[#1c1c1c] p-8 rounded-lg border border-gray-800 shadow-xl">
            <h2 className="text-2xl font-serif text-[#d87a56] mb-6">
              Chatti Awaits: Your Culinary Clock[cite: 4]
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300">
                <thead>
                  <tr className="border-b border-gray-700 text-[#d87a56]">
                    <th className="pb-3 font-semibold">Day[cite: 4]</th>
                    <th className="pb-3 font-semibold">Lunch[cite: 4]</th>
                    <th className="pb-3 font-semibold">Happy Hour[cite: 4]</th>
                    <th className="pb-3 font-semibold">Dinner[cite: 4]</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  <tr><td className="py-2.5 font-medium">Sunday[cite: 4]</td><td>12:00-2:30[cite: 4]</td><td>3:00-6:00[cite: 4]</td><td>5:00-9:00[cite: 4]</td></tr>
                  <tr><td className="py-2.5 font-medium">Monday[cite: 4]</td><td>12:00-2:00[cite: 4]</td><td>3:00-6:00[cite: 4]</td><td>5:00-9:00[cite: 4]</td></tr>
                  <tr><td className="py-2.5 font-medium">Tuesday[cite: 4]</td><td>12:00-2:00[cite: 4]</td><td>3:00-6:00[cite: 4]</td><td>5:00-9:00[cite: 4]</td></tr>
                  <tr><td className="py-2.5 font-medium">Wednesday[cite: 4]</td><td>12:00-2:00[cite: 4]</td><td>3:00-6:00[cite: 4]</td><td>5:00-9:00[cite: 4]</td></tr>
                  <tr><td className="py-2.5 font-medium">Thursday[cite: 4]</td><td>12:00-2:00[cite: 4]</td><td>3:00-6:00[cite: 4]</td><td>5:00-9:00[cite: 4]</td></tr>
                  <tr><td className="py-2.5 font-medium">Friday[cite: 4]</td><td>12:00-2:00[cite: 4]</td><td>3:00-6:00[cite: 4]</td><td>5:00-10:00[cite: 4]</td></tr>
                  <tr><td className="py-2.5 font-medium">Saturday[cite: 4]</td><td>12:00-2:30[cite: 4]</td><td>3:00-6:00[cite: 4]</td><td>5:00-10:00[cite: 4]</td></tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-400 mt-6 pt-4 border-t border-gray-800">
              <span className="font-semibold text-gray-300">Last Seating:</span> 2:00 – 2:30 and 9:00 – 10:00[cite: 4]
            </p>

            <button className="mt-6 w-full bg-[#bc6c4c] hover:bg-[#a3593b] text-white py-2.5 rounded text-sm font-medium transition duration-300">
              Book A Table[cite: 4]
            </button>
          </div>

          {/* Map Location Section matching PDF[cite: 4] */}
          <div className="bg-[#1c1c1c] p-6 rounded-lg border border-gray-800 shadow-xl h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-serif text-white mb-1">252 W 37th St[cite: 4]</h3>
              <p className="text-xs text-gray-400 mb-4">252 W 37th St, New York, NY 10018, USA[cite: 4]</p>
            </div>
            
            <div className="w-full h-72 rounded bg-gray-800 overflow-hidden relative">
              <iframe 
                title="Chatti Location Map"
                src="https://maps.google.com/maps?q=252%20W%2037th%20St,%20New%20York,%20NY%2010018&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                className="w-full h-full border-0" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER SECTION matching PDF layout[cite: 4] */}
      <footer className="bg-[#0b0b0b] border-t border-gray-800 pt-16 pb-8 px-6 md:px-16 text-gray-400 text-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          
          <div>
            <h2 className="text-3xl font-serif text-[#d87a56] font-bold mb-1">Chatti</h2>
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">by Chef Regi Mathew</p>
            <p className="text-xs text-gray-400 max-w-sm">
              Experience the authentic flavors and rich traditions of Kerala in the heart of New York's Garment District.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif text-white mb-4">Information[cite: 4]</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-300 font-medium">Phone:</span> +1 (212) 994-9599[cite: 4]</li>
              <li><span className="text-gray-300 font-medium">Mobile:</span> +1 (646) 598-9393[cite: 4]</li>
              <li><span className="text-gray-300 font-medium">Email:</span> info@thechatti.com[cite: 4]</li>
              <li><span className="text-gray-300 font-medium">Address:</span> 252 W 37th St, New York, NY 10018[cite: 4]</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-400">
          Copyrights 2026 © All rights reserved by Chatti.[cite: 4]
        </div>
      </footer>

    </div>
  );
}