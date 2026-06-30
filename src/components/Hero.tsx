import { Download, MapPin } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'
import { personal, stats } from '../data/portfolioData'

const HERO_SKILLS = ['AppSheet', 'Google Apps Script', 'Make.com', 'N8N', 'Data Studio', 'SVG/UI Design']
const BOLD_SKILLS = ['AppSheet', 'Make.com', 'Data Studio']

// Photo from Google Drive — direct view URL
const PHOTO_URL = 'https://drive.google.com/uc?export=view&id=1z16npyynppgo1j5vZujteGZur_E22HGu'
const ICON_URL  = 'https://drive.google.com/uc?export=view&id=1IWetbND5ltiyWAKbQxx9iayXNw5Zzt4A'

const INDUSTRIES = [
  { label: 'Education', icon: '🎓' },
  { label: 'Furniture & Retail', icon: '🪑' },
  { label: 'HR & Recruitment', icon: '👥' },
  { label: 'SaaS', icon: '☁️' },
  { label: 'Consulting', icon: '💼' },
  { label: 'IT Ticketing', icon: '🎟️' },
  { label: 'Logistics & Operations', icon: '🚚' },
  { label: 'International Clients', icon: '🌏' },
  { label: 'Process Automation', icon: '⚙️' },
  { label: 'Data Analytics', icon: '📊' },
]

// Duplicate for seamless infinite loop
const MARQUEE_ITEMS = [...INDUSTRIES, ...INDUSTRIES]

export default function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="pt-24 pb-0">
      <div className="max-w-7xl mx-auto px-[15px]">
        {/* Two-column */}
        <div className="grid lg:grid-cols-2 gap-12 items-start pb-12">
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

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-lg text-[15px]">
              Results-driven AppSheet Developer with deep expertise in no-code/low-code systems, SVG UI/UX design,
              workflow automation via <strong className="text-gray-800 dark:text-gray-200">Make.com & N8N</strong>, and
              business intelligence through <strong className="text-gray-800 dark:text-gray-200">Data Studio</strong>.
              Building scalable solutions for academic institutions, international clients, and Google-partnered companies.
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
                <FaLinkedin size={14} /> LinkedIn
              </a>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 dark:border-gray-800 mb-8" />

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-gray-200 dark:divide-gray-800">
              {stats.map(stat => (
                <div key={stat.label} className="px-4 first:pl-0">
                  <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            {/* Profile photo */}
            <div className="relative w-72 h-80 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
              <img
                src={PHOTO_URL}
                alt="Keanu Niccolo Sison"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const t = e.currentTarget
                  t.style.display = 'none'
                  const parent = t.parentElement
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <div class="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-3">
                          <span class="text-4xl">👤</span>
                        </div>
                        <p class="text-sm">Photo loading...</p>
                      </div>
                    `
                  }
                }}
              />
              {/* Location overlay */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-gray-700 dark:text-gray-300">
                <MapPin size={12} className="text-teal-400" />
                {personal.location}
              </div>
            </div>

            {/* AppSheet Expert card */}
            <div className="w-72 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-teal-400/30 bg-teal-400/10 flex-shrink-0">
                <img
                  src={ICON_URL}
                  alt="AppSheet"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    const parent = e.currentTarget.parentElement
                    if (parent) {
                      const icon = document.createElement('div')
                      icon.className = 'w-full h-full flex items-center justify-center'
                      icon.innerHTML = '<span class="text-teal-400"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></span>'
                      parent.appendChild(icon)
                    }
                  }}
                />
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
      </div>

      {/* Industries marquee strip — full width */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-6 overflow-hidden bg-gray-50 dark:bg-[#0d1117]">
        <p className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-4 tracking-widest text-center">
          INDUSTRIES & DOMAINS
        </p>
        <div className="overflow-hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 dark:from-[#0d1117] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 dark:from-[#0d1117] to-transparent z-10 pointer-events-none" />
          <div className="marquee-track">
            {MARQUEE_ITEMS.map((ind, i) => (
              <div
                key={i}
                className="flex items-center gap-2 mx-3 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0e14] text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap flex-shrink-0"
              >
                <span className="text-base">{ind.icon}</span>
                {ind.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
