import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import QuotesHimym from './pages/QuotesHimym'
import Photos from './pages/Photos'
import GymRoutine from './pages/GymRoutine'
import Doodle from './pages/Doodle'

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quotes-himym" element={<QuotesHimym />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/gym-routine" element={<GymRoutine />} />
          <Route path="/doodle" element={<Doodle />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
