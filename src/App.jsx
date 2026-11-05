import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
// import About from './pages/About'
import MenuPage from './pages/Menu'
import Muttch from './pages/Muttch'
import Media from './pages/Media'
// import Contact from './pages/Contact'
import KckOnasadhya from './pages/events/KckOnasadhya'
import KckTheenmura from './pages/events/KckTheenmura'
import KckSeafoodToddyTales from './pages/events/KckSeafoodToddyTales'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/events/kck-onasadhya" element={<KckOnasadhya />} />
        <Route path="/events/kck-theenmura" element={<KckTheenmura />} />
        <Route path="/events/kck-seafood-toddy-tales" element={<KckSeafoodToddyTales />} />
        <Route path="/media" element={<Media />} />
        <Route path="/contact" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Route>
       <Route path="/muttch" element={<Muttch />} />
       
    </Routes>
  )
}
