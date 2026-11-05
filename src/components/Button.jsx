import { Link } from 'react-router-dom'

// to   -> page inside the site  (e.g. to="/menu")
// href -> external link, opens in new tab (e.g. href="https://...")
export default function Button({ variant = 'line', to, href, className = '', children }) {
  const cls = `btn btn-${variant} ${className}`.trim()
  if (to) return <Link to={to} className={cls}>{children}</Link>
  return <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{children}</a>
}
