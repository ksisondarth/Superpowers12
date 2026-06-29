import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300
        border-gray-300 dark:border-dark-border
        bg-white dark:bg-dark-card
        hover:border-neon hover:shadow-[0_0_12px_rgba(57,255,20,0.4)]
        text-gray-600 dark:text-gray-300 hover:text-neon"
    >
      {theme === 'dark' ? (
        <Sun size={18} strokeWidth={2} />
      ) : (
        <Moon size={18} strokeWidth={2} />
      )}
    </button>
  )
}
