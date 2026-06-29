import { ArrowUp, Mail, MessageCircle, Globe } from 'lucide-react'
import { personal } from '../data/portfolioData'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Branding */}
          <div className="text-center md:text-left">
            <div className="text-lg font-black text-gray-900 dark:text-white mb-1">
              KN<span className="text-neon">.</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">
              {personal.name} · {personal.company}
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${personal.email}`}
              className="w-9 h-9 rounded-full border border-gray-200 dark:border-dark-border flex items-center justify-center
                text-gray-500 hover:text-neon hover:border-neon/50 transition-all duration-200"
              aria-label="Email"
            >
              <Mail size={15} />
            </a>
            <a
              href={`https://wa.me/${personal.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-gray-200 dark:border-dark-border flex items-center justify-center
                text-gray-500 hover:text-neon hover:border-neon/50 transition-all duration-200"
              aria-label="WhatsApp"
            >
              <MessageCircle size={15} />
            </a>
            <a
              href={personal.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-gray-200 dark:border-dark-border flex items-center justify-center
                text-gray-500 hover:text-neon hover:border-neon/50 transition-all duration-200"
              aria-label="Website"
            >
              <Globe size={15} />
            </a>
          </div>

          {/* Back to top */}
          <a
            href="#hero"
            className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-neon transition-colors group"
          >
            Back to top
            <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-dark-border text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600 font-mono">
            © {new Date().getFullYear()} {personal.name}. Built with React, Vite & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
