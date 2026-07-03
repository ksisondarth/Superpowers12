import { useState } from 'react'
import { Sun, Moon, Download, Menu, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import type { NavSection } from '../types/portfolio'

const LOGO_SRC = `${import.meta.env.BASE_URL}logo.svg`

interface Props {
  activeSection: string
  navSections: NavSection[]
  cvPdf: string
}

export default function Navbar({ activeSection, navSections, cvPdf }: Props) {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-[#0a0e14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-[15px] h-16 flex items-center justify-between">

        <button onClick={() => scrollTo('home')} className="flex items-center gap-2.5 group">
          <img src={LOGO_SRC} alt="Kytus Development logo" className="w-8 h-8 object-contain" />
          <span className="text-base font-bold text-gray-900 dark:text-white leading-tight">
            Kytus<span style={{ color: 'var(--accent)' }}> Development</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {navSections.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-sm font-medium transition-colors relative pb-1 ${
                activeSection === link.id
                  ? 'text-gray-900 dark:text-white font-semibold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded" style={{ backgroundColor: 'var(--accent)' }} />
              )}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 transition-all"
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = '' }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href={cvPdf}
            download
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 transition-all"
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = '' }}
          >
            <Download size={16} />
          </a>

          <button
            onClick={() => scrollTo('contact')}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Hire Me
          </button>
        </div>

        <button className="md:hidden p-2 text-gray-600 dark:text-gray-400" onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0e14] px-[15px] py-4 flex flex-col gap-3">
          {navSections.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-left py-1 text-gray-600 dark:text-gray-400"
              style={activeSection === link.id ? { color: 'var(--accent)' } : {}}
            >
              {link.label}
            </button>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-800">
            <button onClick={toggleTheme} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href={cvPdf} download className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500">
              <Download size={16} />
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Hire Me
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
