import { ANALYTICS } from '../siteConfig'

const KEY = 'chatti-analytics-consent' // 'granted' | 'denied'
let loaded = false

export const getConsent = () => { try { return localStorage.getItem(KEY) } catch { return null } }

export function setConsent(value) {
  try { localStorage.setItem(KEY, value) } catch { /* ignore */ }
  if (value === 'granted') loadAnalytics()
}

// Loads Google Analytics + Microsoft Clarity (live site only, never on localhost).
export function loadAnalytics() {
  if (loaded || typeof window === 'undefined') return
  const host = window.location.hostname
  if (host === 'localhost' || host === '127.0.0.1') return
  loaded = true

  const { gaId, clarityId } = ANALYTICS
  if (gaId) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    window.gtag = function () { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', gaId)
  }
  if (clarityId) {
    ;(function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y)
    })(window, document, 'clarity', 'script', clarityId)
  }
}

// Call once when the app starts.
export function initAnalytics() {
  if (!ANALYTICS.requireConsent || getConsent() === 'granted') loadAnalytics()
}

// Send a custom event (does nothing if analytics is not loaded / not consented).
export function track(name, params = {}) {
  try {
    if (typeof window.gtag === 'function') window.gtag('event', name, params)
    if (typeof window.clarity === 'function') window.clarity('event', name)
  } catch { /* never break the page because of tracking */ }
}
