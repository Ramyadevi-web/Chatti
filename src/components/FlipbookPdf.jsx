import { forwardRef, useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import * as pdfjsLib from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

// every page of the flipbook must be a forwardRef component
const Page = forwardRef(({ src, n }, ref) => (
  <div className="flip-page" ref={ref}>
    <img src={src} alt={`Menu page ${n}`} draggable={false} />
  </div>
))

export default function FlipbookPdf({ url, downloadName = 'Chatti-Menu.pdf' }) {
  const [pages, setPages] = useState([])
  const [ratio, setRatio] = useState(1.414) // page height / width
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [current, setCurrent] = useState(0)
  const book = useRef(null)

  // turn every PDF page into an image
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const pdf = await pdfjsLib.getDocument(url).promise
        const out = []
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const vp = page.getViewport({ scale: 1.6 })
          if (i === 1) setRatio(vp.height / vp.width)
          const canvas = document.createElement('canvas')
          canvas.width = vp.width
          canvas.height = vp.height
          await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise
          out.push(canvas.toDataURL('image/jpeg', 0.85))
          if (cancelled) return
        }
        setPages(out)
        setStatus('ready')
      } catch (e) {
        console.error('Menu PDF error:', e)
        if (!cancelled) setStatus('error')
      }
    })()
    return () => { cancelled = true }
  }, [url])

  return (
    <div className="flip-wrap">
      {status === 'loading' && <p className="flip-msg">Loading menu…</p>}
      {status === 'error' && (
        <p className="flip-msg">
          Menu preview isn't available right now. You can still{' '}
          <a href={url} download={downloadName}>download the menu</a>.
        </p>
      )}

      {status === 'ready' && (
        <>
          <HTMLFlipBook
            ref={book}
            width={500}
            height={Math.round(500 * ratio)}
            size="stretch"
            minWidth={240}
            maxWidth={620}
            minHeight={Math.round(240 * ratio)}
            maxHeight={Math.round(620 * ratio)}
            showCover
            usePortrait
            mobileScrollSupport
            drawShadow
            maxShadowOpacity={0.5}
            flippingTime={800}
            onFlip={(e) => setCurrent(e.data)}
            className="flipbook"
          >
            {pages.map((src, i) => <Page key={i} src={src} n={i + 1} />)}
          </HTMLFlipBook>

          <div className="flip-controls">
            <button onClick={() => book.current.pageFlip().flipPrev()} aria-label="Previous page">‹</button>
            <span>{Math.min(current + 1, pages.length)} / {pages.length}</span>
            <button onClick={() => book.current.pageFlip().flipNext()} aria-label="Next page">›</button>
          </div>
        </>
      )}

      <a className="btn btn-fill flip-download" href={url} download={downloadName}>
        Download Menu (PDF)
      </a>
    </div>
  )
}
