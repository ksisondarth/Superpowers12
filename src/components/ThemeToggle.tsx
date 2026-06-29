import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-200
        border-light-border dark:border-dark-border
        bg-light-surface dark:bg-dark-surface
        text-light-sub dark:text-dark-sub
        hover:border-accent-light dark:hover:border-accent
        hover:text-accent-light dark:hover:text-accent"
    >
      {theme === 'dark'
        ? <Sun size={16} strokeWidth={1.8} />
        : <Moon size={16} strokeWidth={1.8} />
      }
    </button>
  )
}
