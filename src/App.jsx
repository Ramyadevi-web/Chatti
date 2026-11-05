import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
// import About from './pages/About'
import MenuPage from './pages/menu/Menu'
import BarMenu from './pages/menu/BarMenu'
import Media from './pages/Media'
import Contact from './pages/Contact'
import Muttch from './pages/Muttch'
import KckOnasadhya from './pages/events/KckOnasadhya'
import KckTheenmura from './pages/events/KckTheenmura'
import KckSeafoodToddyTales from './pages/events/KckSeafoodToddyTales'

export default function App() {
  return (
    <Routes>
      {/* standalone page: own navbar + footer */}
      <Route path="/muttch" element={<Muttch />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/bar" element={<BarMenu />} />
        <Route path="/events/kck-onasadhya" element={<KckOnasadhya />} />
        <Route path="/events/kck-theenmura" element={<KckTheenmura />} />
        <Route path="/events/kck-seafood-toddy-tales" element={<KckSeafoodToddyTales />} />
        <Route path="/media" element={<Media />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
