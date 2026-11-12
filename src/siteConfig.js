// ---- Extra site settings (SEO + analytics). config.js is untouched. ----
// Main web address of the live site (used for canonical links, sitemap, structured data).
// If your live site is https://www.chattinewyork.com, change it here AND in public/sitemap.xml / robots.txt.
export const SITE_URL = 'https://chattinewyork.com'

export const ANALYTICS = {
  gaId: 'G-H2T73FK8RZ',        // Google Analytics 4
  clarityId: 'z9jp63dxq0',     // Microsoft Clarity
  // true  = analytics + session recording load ONLY after the visitor clicks "Accept"
  // false = they load for everyone (a Privacy Policy link is still shown in the footer)
  requireConsent: true,
}

// Email shown on the Contact and Privacy pages (display only)
export const GENERAL_EMAIL = 'info@thechatti.com'