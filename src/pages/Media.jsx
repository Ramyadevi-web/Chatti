import { PRESS } from './pressData'
import './Media.css'

export default function Media() {
  return (
    <div className="md-page">
      <header className="md-hero">
        <div className="md-hero-inner">
          <p className="md-kicker">Press &amp; Media</p>
          <h1>Chatti in the Press</h1>
          <span className="md-rule" />
          <p className="md-sub">Press coverage received for Chatti in 2026</p>
        </div>
      </header>

      <section className="md-wrap">
        <p className="md-count">{PRESS.length} features</p>
        <div className="md-grid">
          {PRESS.map((p, i) => (
            <article className="md-card" key={p.url}>
              <span className="md-num">{String(i + 1).padStart(2, '0')}</span>
              <h2>{p.heading}</h2>
              <p>{p.text}</p>
              <a className="md-more" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Read more: ${p.heading}`}>
                Read more <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
