import { useState } from 'react'
import { Sun, Moon, Download, Menu, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { personal } from '../data/portfolioData'

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar({ activeSection }: { activeSection: string }) {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-[#0a0e14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-[15px] h-16 flex items-center justify-between">
        <button onClick={() => scrollTo('home')} className="text-xl font-bold text-gray-900 dark:text-white">
          KeanSison<span className="text-sm font-normal text-accent">.com</span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-sm font-medium transition-colors relative pb-1 ${
                activeSection === link.id
                  ? 'text-gray-900 dark:text-white font-semibold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              style={activeSection === link.id ? {
                '--tw-after-content': '""',
              } as React.CSSProperties : {}}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded bg-accent" />
              )}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-accent hover:text-accent transition-all"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href={personal.cvPdf}
            download
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-accent hover:text-accent transition-all"
          >
            <Download size={16} />
          </a>
          <button
            onClick={() => scrollTo('contact')}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90 text-white dark:text-gray-900"
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
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-sm font-medium text-left py-1 ${activeSection === link.id ? 'text-accent' : 'text-gray-600 dark:text-gray-400'}`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-800">
            <button onClick={toggleTheme} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href={personal.cvPdf} download className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500">
              <Download size={16} />
            </a>
            <button onClick={() => scrollTo('contact')} className="px-4 py-2 rounded-lg text-sm font-semibold text-white dark:text-gray-900" style={{ backgroundColor: 'var(--accent)' }}>
              Hire Me
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
