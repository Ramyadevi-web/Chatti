import { SITE_URL } from '../siteConfig'

const DAY = { Sunday: 'Sunday', Monday: 'Monday', Tuesday: 'Tuesday', Wednesday: 'Wednesday', Thursday: 'Thursday', Friday: 'Friday', Saturday: 'Saturday' }

// "3:00" -> "15:00", "12:00" -> "12:00" (restaurant hours are afternoon/evening)
const to24 = (t) => {
  const [h, m] = t.split(':').map(Number)
  return `${String(h < 12 ? h + 12 : h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

// hours rows look like: ['Monday', '12:00-2:00', '3:00-6:00', '5:00-9:00']
function openingHours(rows) {
  const out = []
  rows.forEach(([day, ...slots]) => {
    const ranges = slots.map((s) => s.split('-').map(to24)).sort((a, b) => a[0].localeCompare(b[0]))
    const merged = []
    ranges.forEach(([o, c]) => {
      const last = merged[merged.length - 1]
      if (last && o <= last[1]) last[1] = c > last[1] ? c : last[1]
      else merged.push([o, c])
    })
    merged.forEach(([opens, closes]) =>
      out.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: DAY[day], opens, closes }))
  })
  return out
}

const address = {
  '@type': 'PostalAddress',
  streetAddress: '252 W 37th St',
  addressLocality: 'New York',
  addressRegion: 'NY',
  postalCode: '10018',
  addressCountry: 'US',
}

export function restaurantSchema(hoursRows, instagramUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Chatti by Chef Regi Mathew',
    url: SITE_URL + '/',
    image: SITE_URL + '/images/hero.jpg',
    description: "Kerala toddy shop cuisine by Chef Regi Mathew in Midtown Manhattan, New York.",
    telephone: '+1-212-994-9599',
    email: 'info@thechatti.com',
    servesCuisine: ['Indian', 'Kerala'],
    address,
    hasMenu: SITE_URL + '/menu',
    acceptsReservations: true,
    openingHoursSpecification: openingHours(hoursRows),
    sameAs: [instagramUrl].filter(Boolean),
  }
}

export function muttchSchema(sameAs = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Muttch Lounge at Chatti',
    url: SITE_URL + '/muttch',
    image: SITE_URL + '/images/muttch/hero.jpg',
    description: 'Private dining room and event venue in Midtown Manhattan for up to 70 seated or 100 standing guests.',
    telephone: '+1-212-994-9599',
    email: 'info@thechatti.com',
    address,
    sameAs,
  }
}
