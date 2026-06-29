import { ArrowDown, Mail, ExternalLink } from 'lucide-react'
import { personal } from '../data/portfolioData'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden dot-grid"
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: '#39FF14' }} />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full opacity-5 blur-3xl"
        style={{ background: '#39FF14' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium mb-6
          border border-neon/30 text-neon bg-neon/5">
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
          Available for Projects
        </div>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-4
          text-gray-900 dark:text-white leading-tight">
          {personal.name.split(' ').slice(0, 2).join(' ')}
          <br />
          <span className="text-neon" style={{ textShadow: '0 0 30px rgba(57,255,20,0.4)' }}>
            {personal.name.split(' ')[2]}
          </span>
        </h1>

        {/* Title */}
        <p className="text-base sm:text-lg md:text-xl font-medium text-gray-500 dark:text-gray-400 mb-2 font-mono">
          {personal.title}
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8 flex items-center justify-center gap-1.5">
          <span>📍</span> {personal.location} · {personal.company}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a href="#portfolio" className="btn-neon">
            View My Work
            <ExternalLink size={15} />
          </a>
          <a href="#contact" className="btn-outline-neon">
            <Mail size={15} />
            Contact Me
          </a>
        </div>

        {/* Scroll indicator */}
        <a
          href="#about"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 hover:text-neon transition-colors group"
        >
          <span className="text-xs font-mono">scroll down</span>
          <ArrowDown size={16} className="animate-bounce group-hover:text-neon" />
        </a>
      </div>
    </section>
  )
}
