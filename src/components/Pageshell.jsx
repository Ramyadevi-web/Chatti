// Temporary wrapper for the new pages. Replace the content as you share each design.
export default function Pageshell({ title, children }) {
  return (
    <section className="cream page-shell">
      <h1>{title}</h1>
      {children || <p className="body">Design for this page will be added here.</p>}
    </section>
  )
}
