import { Download, ExternalLink, MapPin, Briefcase } from 'lucide-react'
import { personal, summary, stats } from '../data/portfolioData'

const HERO_SKILLS = ['AppSheet', 'Google Apps Script', 'Make.com', 'N8N', 'Looker Studio', 'SVG/UI Design']
const BOLD_SKILLS = ['AppSheet', 'Make.com', 'Looker Studio']
const INDUSTRIES = ['Education', 'Furniture & Retail', 'HR & Recruitment', 'SaaS', 'Consulting', 'International Clients']

export default function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Two-column */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-400/40 bg-teal-400/5 text-sm text-teal-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available — open to AppSheet & Automation opportunities
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-3 leading-tight">
              {personal.name}
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-5">{personal.title}</p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-lg">
              {summary.slice(0, 280)}...
            </p>

            {/* Skill pills */}
            <div className="flex flex-wrap gap-2 mb-7">
              {HERO_SKILLS.map(s => (
                <span
                  key={s}
                  className={`px-3 py-1.5 rounded-lg text-sm border ${
                    BOLD_SKILLS.includes(s)
                      ? 'border-teal-400/50 bg-teal-400/10 text-teal-400 font-semibold'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => scrollTo('projects')}
                className="px-5 py-2.5 rounded-lg bg-teal-400 text-gray-900 font-semibold text-sm hover:bg-teal-300 transition-all hover:scale-105"
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:border-teal-400 hover:text-teal-400 transition-all"
              >
                Get in Touch
              </button>
              <a
                href={personal.cvPdf}
                download
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:border-teal-400 hover:text-teal-400 transition-all"
              >
                <Download size={14} /> Resume
              </a>
              <a
                href="https://www.linkedin.com/in/keanu-sison"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:border-teal-400 hover:text-teal-400 transition-all"
              >
                <ExternalLink size={14} /> LinkedIn
              </a>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 dark:border-gray-800 mb-8" />

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-gray-200 dark:divide-gray-800">
              {stats.map(stat => (
                <div key={stat.label} className="px-4 first:pl-0">
                  <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            {/* Photo placeholder */}
            <div className="relative w-72 h-80 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
              <div className="text-gray-400 dark:text-gray-600 text-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
                <p className="text-sm">Profile photo</p>
                <p className="text-xs opacity-60">coming soon</p>
              </div>
              {/* Location overlay */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-gray-700 dark:text-gray-300">
                <MapPin size={12} className="text-teal-400" />
                {personal.location}
              </div>
            </div>

            {/* AppSheet Expert card */}
            <div className="w-72 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-400/10 border border-teal-400/30 flex items-center justify-center">
                <Briefcase size={18} className="text-teal-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">AppSheet Expert</div>
                <div className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Active · 2021–Present
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industries strip */}
        <div className="mt-14 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-4 tracking-widest">INDUSTRIES & DOMAINS</p>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map(ind => (
              <span key={ind} className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
