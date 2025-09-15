import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/about.tsx";
import Contact from "./pages/contact.tsx";
import Github from "./pages/github.tsx";
import Services from "./pages/services.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/github" element={<Github />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
