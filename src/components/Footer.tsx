import type { SiteSettings } from '../types/portfolio'

interface Props { siteSettings: SiteSettings }

export default function Footer({ siteSettings }: Props) {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0e14]">
      <div className="max-w-7xl mx-auto px-[15px] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-500">
          {siteSettings.name} — {siteSettings.title}
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-500 hover:text-accent transition-colors"
          >
            ↑ Back to top
          </button>
          <span className="text-gray-300 dark:text-gray-700">|</span>
          <span className="text-sm text-gray-500 dark:text-gray-500">© 2026</span>
        </div>
      </div>
    </footer>
  )
}
