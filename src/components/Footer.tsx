import { ArrowUp, Mail, MessageCircle, Globe } from 'lucide-react'
import { personal } from '../data/portfolioData'

export default function Footer() {
  return (
    <footer className="border-t border-light-border dark:border-dark-border
      bg-light-surface dark:bg-dark-surface py-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-sm font-bold text-light-text dark:text-dark-text tracking-tight">
              Keanu<span className="text-accent-light dark:text-accent">.</span>
            </p>
            <p className="text-xs text-light-muted dark:text-dark-muted font-mono mt-0.5">
              {personal.company}
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { href: `mailto:${personal.email}`, icon: Mail, label: 'Email' },
              { href: `https://wa.me/${personal.whatsapp.replace('+','')}`, icon: MessageCircle, label: 'WhatsApp', ext: true },
              { href: personal.website, icon: Globe, label: 'Website', ext: true },
            ].map(({ href, icon: Icon, label, ext }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="w-8 h-8 rounded-full flex items-center justify-center
                  border border-light-border dark:border-dark-border
                  text-light-muted dark:text-dark-muted
                  hover:border-accent-light dark:hover:border-accent
                  hover:text-accent-light dark:hover:text-accent
                  transition-all duration-200"
              >
                <Icon size={14} strokeWidth={1.8} />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <a href="#hero"
            className="flex items-center gap-1.5 text-xs font-mono
              text-light-muted dark:text-dark-muted
              hover:text-accent-light dark:hover:text-accent
              transition-colors group">
            Back to top
            <ArrowUp size={12} strokeWidth={2}
              className="group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="mt-10 pt-6 border-t border-light-border dark:border-dark-border text-center">
          <p className="text-2xs font-mono text-light-muted dark:text-dark-muted">
            © {new Date().getFullYear()} {personal.name}. Built with React + Vite + Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
