import { Download, MapPin, Briefcase } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'
import { personal, stats } from '../data/portfolioData'

const HERO_SKILLS = ['AppSheet', 'Google Apps Script', 'Make.com', 'N8N', 'Data Studio', 'SVG/UI Design']
const BOLD_SKILLS = ['AppSheet', 'Make.com', 'Data Studio']

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
const MARQUEE_ITEMS = [...INDUSTRIES, ...INDUSTRIES]

// Photo served from public/images/ — add keanu-photo.jpg there via GitHub
const PHOTO_SRC = `${import.meta.env.BASE_URL}images/Keanu-Photo.jpg`

export default function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="pt-24 pb-0">
      <div className="max-w-7xl mx-auto px-[15px]">
        <div className="grid lg:grid-cols-2 gap-12 items-start pb-14">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-6"
              style={{ borderColor: 'var(--accent-border)', backgroundColor: 'var(--accent-bg)', color: 'var(--accent)' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available — open to AppSheet & Automation opportunities
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-3 leading-tight">
              {personal.name}
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-5">{personal.title}</p>

            <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-lg">
              Results-driven AppSheet Developer with deep expertise in no-code/low-code systems, SVG UI/UX design,
              workflow automation via <strong className="text-gray-800 dark:text-gray-200">Make.com & N8N</strong>, and
              business intelligence through <strong className="text-gray-800 dark:text-gray-200">Data Studio</strong>.
              Building scalable solutions for academic institutions, international clients, and Google-partnered companies.
            </p>

            <div className="flex flex-wrap gap-2 mb-7">
              {HERO_SKILLS.map(s => (
                <span
                  key={s}
                  className={`px-3 py-1.5 rounded-lg text-sm border ${
                    BOLD_SKILLS.includes(s)
                      ? 'font-semibold'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                  style={BOLD_SKILLS.includes(s) ? {
                    borderColor: 'var(--accent-border)',
                    backgroundColor: 'var(--accent-bg)',
                    color: 'var(--accent)',
                  } : {}}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => scrollTo('projects')} className="btn-primary">
                View Projects
              </button>
              <button onClick={() => scrollTo('contact')} className="btn-outline">
                Get in Touch
              </button>
              <a href={personal.cvPdf} download className="btn-outline flex items-center gap-2">
                <Download size={14} /> Resume
              </a>
              <a
                href="https://www.linkedin.com/in/keanu-sison"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <FaLinkedin size={14} className="text-[#0077b5]" /> LinkedIn
              </a>
            </div>

            <hr className="border-gray-200 dark:border-gray-800 mb-8" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-gray-200 dark:divide-gray-800">
              {stats.map(stat => (
                <div key={stat.label} className="px-4 first:pl-0">
                  <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            <div className="relative w-72 h-80 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
              <img
                src={PHOTO_SRC}
                alt="Keanu Niccolo Sison"
                className="w-full h-full object-cover object-top"
                onError={e => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none'
                }}
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-gray-700 dark:text-gray-300">
                <MapPin size={12} className="text-accent" style={{ color: 'var(--accent)' }} />
                {personal.location}
              </div>
            </div>

            <div className="w-72 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}>
                <Briefcase size={18} style={{ color: 'var(--accent)' }} />
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

      {/* Marquee strip */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-5 bg-gray-50 dark:bg-[#0d1117]">
        <p className="font-mono text-xs text-gray-400 dark:text-gray-600 mb-4 tracking-widest text-center">
          INDUSTRIES & DOMAINS
        </p>
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--fade-from, #f9fafb), transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--fade-from, #f9fafb), transparent)' }} />
          <div className="marquee-track">
            {MARQUEE_ITEMS.map((ind, i) => (
              <div
                key={i}
                className="flex items-center gap-2 mx-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0e14] text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap flex-shrink-0"
              >
                <span>{ind.icon}</span>
                {ind.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
