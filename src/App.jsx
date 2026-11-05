import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
// import About from './pages/About'
import MenuPage from './pages/Menu'
import Media from './pages/Muttch'
// import Contact from './pages/Contact'
// import KckOnasadhya from './pages/events/KckOnasadhya'
// import KckTheenmura from './pages/events/KckTheenmura'
// import KckSeafoodToddyTales from './pages/events/KckSeafoodToddyTales'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/events/kck-onasadhya" element={<Home />} />
        <Route path="/events/kck-theenmura" element={<Home />} />
        <Route path="/events/kck-seafood-toddy-tales" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Route>
       <Route path="/media" element={<Media />} />
       
    </Routes>
  )
}
