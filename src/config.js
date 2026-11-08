// ---- Site settings (edit these) ----
export const BOOKING_URL = 'https://www.opentable.com/'      // reservation page for "Book Now"
export const INSTAGRAM_URL = 'https://www.instagram.com/'    // restaurant Instagram

// ---- Muttch enquiry form (no WordPress involved) ----
// Where enquiries are delivered:
export const ENQUIRY_TO = 'muttchlounge@thechatti.com'

// Contact page form: delivered to BOTH addresses (comma separated). Muttch form still uses ENQUIRY_TO only.
export const CONTACT_TO = 'info@thechatti.com, mo.newyork@thechatti.com'   // <-- put your two emails here

// Free email service that works straight from React (https://www.emailjs.com):
// create an account -> add an email service -> create a template -> paste the 3 values here.
// Leave them empty and the form falls back to opening the visitor's email app.
export const EMAILJS = {
  serviceId: 'service_zhhosqa',
  templateId: 'template_leiv8e4',
  publicKey: 'IkO51xxVU5sdYQXCt',
}

// ---- Menu links (used by the navbar dropdown and the popup banners) ----
// Put the files in public/menu/
export const SEAFOOD_MENU = '/menu/seafood-menu.webp'
export const FALL_MENU = '/menu/fall-menu.webp'
export const BAR_MENU_IMAGE = '/menu/bar-menu.jpg'   // upload your bar menu image here
