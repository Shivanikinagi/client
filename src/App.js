import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginForm from './pages/Login' // Ensure this file exists and is exported correctly
import Home from './pages/Home' // Ensure this file exists and is exported correctly
import ArchitectHome from './pages/ArchitectHome' // Ensure this file exists and is exported correctly
import UserFlow from './components/UserFlow' // Adjust the path if needed
import ArchitectFlow from './components/ArchitectFlow'
import HowItWorks from './components/HowItWorks'
import KeyFeatures from './components/KeyFeatures'
import LivePreview from './components/LivePreview'
import CTA from './components/CTA'
import Footer from './components/Footer'
import { Navigate } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/architect-home" element={<ArchitectHome />} />
        <Route path="/architect-flow" element={<ArchitectFlow />} />
        <Route path="/user-flow" element={<UserFlow />} />
        <Route path="/key-features" element={<KeyFeatures />} />
        <Route path="/live-preview" element={<LivePreview />} />
        <Route path="/cta" element={<CTA />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
