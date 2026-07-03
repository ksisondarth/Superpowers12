import { useEffect, useState } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { usePortfolioData } from './hooks/usePortfolioData'

function PortfolioApp() {
  const { data } = usePortfolioData()
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState('home')

  // Apply theme colors from API as CSS variables
  useEffect(() => {
    const colors = theme === 'dark' ? data.theme.dark : data.theme.light
    const root = document.documentElement
    root.style.setProperty('--accent', colors.accent)
    root.style.setProperty('--accent-hover', colors.accentHover)
    root.style.setProperty('--accent-bg', colors.accentBg)
    root.style.setProperty('--accent-border', colors.accentBorder)
  }, [theme, data.theme])

  // Scroll-spy
  useEffect(() => {
    const ids = data.navSections.map(s => s.id)
    const observers: IntersectionObserver[] = []
    ids.forEach(id => {
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
  }, [data.navSections])

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0e14] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar
        activeSection={activeSection}
        navSections={data.navSections}
        cvPdf={data.siteSettings.cvPdf}
        logo={data.siteSettings.logo}
      />
      <main>
        <section id="home">
          <Hero siteSettings={data.siteSettings} stats={data.stats} />
        </section>
        <section id="projects">
          <Projects projects={data.projects} />
        </section>
        <section id="skills">
          <Skills skills={data.skills} proficiencies={data.proficiencies} />
        </section>
        <section id="experience">
          <Experience experience={data.experience} education={data.education} />
        </section>
        <section id="contact">
          <Contact siteSettings={data.siteSettings} socialLinks={data.socialLinks} />
        </section>
      </main>
      <Footer siteSettings={data.siteSettings} />
      <ScrollToTop />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  )
}
