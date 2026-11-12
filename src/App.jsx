import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ConsentBanner from './components/ConsentBanner'
import Home from './pages/Home'

// every other page loads only when it is opened (keeps the first download small;
// the PDF viewer code is only fetched on the Food Menu page)
const About = lazy(() => import('./pages/About'))
const MenuPage = lazy(() => import('./pages/menu/Menu'))
const BarMenu = lazy(() => import('./pages/menu/BarMenu'))
const Media = lazy(() => import('./pages/Media'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Muttch = lazy(() => import('./pages/Muttch'))
const NotFound = lazy(() => import('./pages/NotFound'))
const KckOnasadhya = lazy(() => import('./pages/events/KckOnasadhya'))
const KckTheenmura = lazy(() => import('./pages/events/KckTheenmura'))
const KckSeafoodToddyTales = lazy(() => import('./pages/events/KckSeafoodToddyTales'))

export default function App() {
  return (
    <>
      <Suspense fallback={<div style={{ minHeight: '70vh', background: '#F5F0E6' }} />}>
        <Routes>
          {/* standalone page: own navbar + footer */}
          <Route path="/muttch-lounge" element={<Muttch />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/menu/bar" element={<BarMenu />} />
            <Route path="/events/kck-onasadhya" element={<KckOnasadhya />} />
            <Route path="/events/kck-theenmura" element={<KckTheenmura />} />
            <Route path="/events/kck-seafood-toddy-tales" element={<KckSeafoodToddyTales />} />
            <Route path="/media" element={<Media />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <ConsentBanner />
    </>
  )
}
