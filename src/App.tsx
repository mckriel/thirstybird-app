import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Auth from './pages/auth'
import Deals from './pages/deals'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/deals" element={<Deals />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App