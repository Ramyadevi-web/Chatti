import { Link } from 'react-router-dom'
import Pageshell from '../components/PageShell'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | Chatti by Chef Regi Mathew" description="This page could not be found." path="/404" noindex />
      <PageShell title="Page not found">
        <p className="body">The page you are looking for doesn't exist or has moved.</p>
        <p style={{ marginTop: 20 }}><Link className="btn btn-fill" to="/">Back to Chatti</Link></p>
      </PageShell>
    </>
  )
}
