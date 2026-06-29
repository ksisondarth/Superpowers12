import { ArrowDown, Mail, ExternalLink, MapPin } from 'lucide-react'
import { personal } from '../data/portfolioData'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center dot-grid overflow-hidden"
    >
      {/* Subtle ambient gradient — light and dark */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[400px] rounded-full opacity-20 dark:opacity-10 blur-3xl
          bg-gradient-to-br from-green-100 to-emerald-50
          dark:from-[#39FF14]/10 dark:to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center pt-24 pb-32">

        {/* Status pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium mb-10
          border border-green-200 dark:border-accent/20
          bg-green-50 dark:bg-accent/5
          text-accent-light dark:text-accent">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-light dark:bg-accent animate-pulse" />
          Open to new projects
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]
          text-light-text dark:text-dark-text mb-5">
          {personal.name.split(' ').slice(0, 2).join(' ')}
          <br />
          <span className="text-accent-light dark:text-accent">{personal.name.split(' ')[2]}</span>
        </h1>

        {/* Role */}
        <p className="text-base sm:text-lg text-light-sub dark:text-dark-sub font-medium mb-3 max-w-xl mx-auto leading-relaxed">
          {personal.title}
        </p>

        {/* Location */}
        <p className="inline-flex items-center gap-1.5 text-sm text-light-muted dark:text-dark-muted mb-10">
          <MapPin size={13} strokeWidth={1.8} />
          {personal.location} · {personal.company}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
          <a href="#portfolio" className="btn-primary">
            View My Work
            <ExternalLink size={14} strokeWidth={2} />
          </a>
          <a href="#contact" className="btn-outline">
            <Mail size={14} strokeWidth={2} />
            Get in Touch
          </a>
        </div>

        {/* Scroll cue */}
        <a href="#about"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5
            text-light-muted dark:text-dark-muted hover:text-accent-light dark:hover:text-accent
            transition-colors group">
          <span className="text-2xs font-mono tracking-widest uppercase">Scroll</span>
          <ArrowDown size={14} strokeWidth={1.8} className="animate-bounce" />
        </a>
      </div>
    </section>
  )
}
