// ---- Site settings (edit these) ----
  export const BOOKING_URL = 'https://resy.com/cities/new-york-ny/venues/the-chatti'
  export const INSTAGRAM_URL = 'https://www.instagram.com/chatti.newyork/'    // restaurant Instagram

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
  templateId: 'template_leiv8e4', // Muttch Forms
  templateIdContact: 'template_gt89tcr', //Chatti Form
  publicKey: 'IkO51xxVU5sdYQXCt',
}

// ---- Menu links (used by the navbar dropdown and the popup banners) ----
// Put the files in public/menu/
export const SEAFOOD_MENU = '/menu/seafood-menu.webp'
export const FALL_MENU = '/menu/fall-menu.webp'
export const BAR_MENU_IMAGE = '/menu/bar-menu.jpg'   // upload your bar menu image here



const SECRET = 'muttchlounge excel'; // same value goes in src/config.js

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.secret !== SECRET) return out({ ok: false, error: 'unauthorized' });
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      new Date(), d.name || '', d.email || '', d.phone || '', d.event || '',
      d.guests || '', d.date || '', d.message || '',
      d.page || '', d.utm_source || '', d.utm_campaign || ''
    ]);
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}
function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}


export const SHEET = {
  url: 'https://script.google.com/macros/s/AKfycbw_uWjbdVdsJpyWg5u_m756eK71AqsyWXf3YzH7naQDvYg-E_OlSuPy685i_Jgt4OYx/exec',
  secret: 'muttchlounge excel', // Apps Script-la irukkura SECRET-oda same-a irukkanum
}