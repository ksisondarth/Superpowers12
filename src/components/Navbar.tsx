import { useState, useEffect } from 'react'
import { Menu, X, Download } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { personal } from '../data/portfolioData'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
  { label: 'Community', href: '#community' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const closeMenu = () => setMobileOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-dark-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="text-lg font-bold tracking-tight text-gray-900 dark:text-white hover:text-neon transition-colors"
        >
          KN<span className="text-neon">.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-neon transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-neon group-hover:w-full transition-all duration-300" />
            </a>
          ))}

          {/* PDF download button */}
          <a
            href={personal.cvPdf}
            download="Keanu_Niccolo_Sison_CV.pdf"
            className="btn-neon text-xs px-4 py-2 rounded-md"
          >
            <Download size={14} />
            PDF CV
          </a>

          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href={personal.cvPdf}
            download="Keanu_Niccolo_Sison_CV.pdf"
            className="btn-neon text-xs px-3 py-2 rounded-md"
          >
            <Download size={13} />
            PDF
          </a>
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label="Toggle menu"
            className="w-9 h-9 flex items-center justify-center rounded-md text-gray-600 dark:text-gray-300 hover:text-neon transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border px-4 py-4 flex flex-col gap-3">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-sm font-medium py-2 text-gray-700 dark:text-gray-300 hover:text-neon transition-colors border-b border-gray-100 dark:border-dark-border last:border-0"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
