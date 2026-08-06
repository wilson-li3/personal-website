import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pixel/Landing'
import Site from './pixel/Site'
import { legacyRoutes } from './content'

/*
 * Two views: the pixel landing screen, and the clubhouse behind TEE OFF.
 * Old Notes-era routes drop straight into their section.
 */
function Screen({ anchor }) {
  const [target, setTarget] = useState(anchor ?? null)

  if (!target) return <Landing onEnter={setTarget} />
  return <Site target={target} onHome={() => setTarget(null)} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Screen />} />
        {Object.entries(legacyRoutes).map(([path, anchor]) => (
          <Route key={path} path={path} element={<Screen anchor={anchor} />} />
        ))}
        <Route path="*" element={<Screen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
