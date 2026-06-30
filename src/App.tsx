import { useEffect, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = ['home', 'projects', 'skills', 'experience', 'certifications', 'contact']
    const observers: IntersectionObserver[] = []

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[#0a0e14] text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar activeSection={activeSection} />
        <main>
          <section id="home"><Hero /></section>
          <section id="projects"><Projects /></section>
          <section id="skills"><Skills /></section>
          <section id="experience"><Experience /></section>
          <section id="certifications"><Certifications /></section>
          <section id="contact"><Contact /></section>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  )
}
