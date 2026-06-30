import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full text-white dark:text-gray-900 flex items-center justify-center shadow-lg hover:opacity-90 transition-all hover:scale-110"
      style={{ backgroundColor: 'var(--accent)' }}
    >
      <ChevronUp size={18} />
    </button>
  )
}
