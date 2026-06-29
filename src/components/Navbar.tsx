import { useState, useEffect } from 'react'
import { Menu, X, Download } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { personal } from '../data/portfolioData'

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Portfolio',  href: '#portfolio' },
  { label: 'Contact',    href: '#contact' },
  { label: 'Community',  href: '#community' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-dark-bg/95 backdrop-blur-sm border-b border-light-border dark:border-dark-border shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#hero" className="text-base font-bold tracking-tight text-light-text dark:text-dark-text
          hover:text-accent-light dark:hover:text-accent transition-colors">
          Keanu<span className="text-accent-light dark:text-accent">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-light-sub dark:text-dark-sub
                hover:text-light-text dark:hover:text-dark-text transition-colors
                relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent-light dark:bg-accent
                group-hover:w-full transition-all duration-250" />
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={personal.cvPdf}
            download="Keanu_Niccolo_Sison_CV.pdf"
            className="btn-outline text-xs px-4 py-2"
          >
            <Download size={13} strokeWidth={2} />
            Download CV
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile actions */}
        <div className="flex md:hidden items-center gap-2.5">
          <a
            href={personal.cvPdf}
            download="Keanu_Niccolo_Sison_CV.pdf"
            className="btn-outline text-xs px-3 py-2"
          >
            <Download size={13} strokeWidth={2} />
            CV
          </a>
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(p => !p)}
            aria-label="Toggle navigation"
            className="w-9 h-9 flex items-center justify-center rounded-lg
              border border-light-border dark:border-dark-border
              text-light-sub dark:text-dark-sub
              hover:text-light-text dark:hover:text-dark-text transition-colors"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-light-border dark:border-dark-border
          bg-white dark:bg-dark-surface px-5 py-3 flex flex-col">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm font-medium text-light-sub dark:text-dark-sub
                hover:text-accent-light dark:hover:text-accent transition-colors
                border-b border-light-border dark:border-dark-border last:border-0"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
