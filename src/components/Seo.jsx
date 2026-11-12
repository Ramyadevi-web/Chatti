import { useEffect } from 'react'
import { SITE_URL } from '../siteConfig'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.setAttribute('content', content)
}

/**
 * Per-page SEO: <title>, description, canonical, Open Graph / Twitter, robots, JSON-LD.
 * Usage:  <Seo title="..." description="..." path="/menu" />
 */
export default function Seo({ title, description, path = '/', image = '/images/hero.jpg', noindex = false, jsonLd }) {
  const ld = jsonLd ? JSON.stringify(jsonLd) : ''
  useEffect(() => {
    const url = SITE_URL + path
    const img = image.startsWith('http') ? image : SITE_URL + image
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', img)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', img)

    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link) }
    link.setAttribute('href', url)

    let robots = document.head.querySelector('meta[name="robots"]')
    if (noindex) {
      if (!robots) { robots = document.createElement('meta'); robots.setAttribute('name', 'robots'); document.head.appendChild(robots) }
      robots.setAttribute('content', 'noindex,follow')
    } else if (robots) robots.remove()

    let script = document.getElementById('seo-jsonld')
    if (ld) {
      if (!script) { script = document.createElement('script'); script.id = 'seo-jsonld'; script.type = 'application/ld+json'; document.head.appendChild(script) }
      script.textContent = ld
    } else if (script) script.remove()

    return () => { document.getElementById('seo-jsonld')?.remove() }
  }, [title, description, path, image, noindex, ld])

  return null
}
