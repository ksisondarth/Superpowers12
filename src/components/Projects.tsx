import { useState, useEffect, useRef } from 'react'

const BASE = import.meta.env.BASE_URL

const PROJECTS = [
  {
    id: 1, title: 'Project Management System', category: 'Project Management', date: '2024 - Present',
    description: 'End-to-end project tracking with task assignment, milestone monitoring, deadline management, and custom SVG dashboard visualizations for a UK-based furniture client.',
    tags: ['AppSheet', 'SVG UI', 'Data Studio', 'Make.com'],
    demo: 'https://www.appsheet.com/start/c334d061-def1-4787-bdab-5d088b5d28fd',
    images: [
      `${BASE}images/projects/pm-1.jpg`,
      `${BASE}images/projects/pm-2.jpg`,
      `${BASE}images/projects/pm-3.jpg`,
    ],
  },
  {
    id: 2, title: 'CRM & Lead Management System', category: 'CRM', date: '2023 - 2024',
    description: 'Advanced CRM for lead tracking and pipeline management with lead scoring, automated Make.com follow-up workflows, conversion tracking, and real-time analytics dashboards.',
    tags: ['AppSheet', 'Make.com', 'Analytics', 'Google Sheets'],
    demo: 'https://www.appsheet.com/start/c1b48401-ad92-478b-98de-5adb9daa7317',
    images: [
      `${BASE}images/projects/crm-1.jpg`,
      `${BASE}images/projects/crm-2.jpg`,
    ],
  },
  {
    id: 3, title: 'Order Management & POS System', category: 'Inventory', date: '2024',
    description: 'Complete point-of-sale and order management with item selection, quantity management, automatic total calculation, and streamlined order processing workflows.',
    tags: ['AppSheet', 'Google Sheets', 'Automation', 'SVG UI'],
    demo: 'https://www.appsheet.com/start/d62f57ca-62b0-417b-a39d-e794f7e474b7',
    images: [
      `${BASE}images/projects/pos-1.jpg`,
    ],
  },
  {
    id: 4, title: 'University Student Affairs System', category: 'AppSheet', date: '2021 - Present',
    description: 'Multi-department management system for Ateneo de Manila University covering student-facing workflows, automated email notifications, and Data Studio reporting.',
    tags: ['AppSheet', 'Google Apps Script', 'Data Studio', 'SVG UI'],
    images: [],
  },
  {
    id: 5, title: 'Enterprise Ticketing System', category: 'Automation', date: '2024 - 2025',
    description: 'Team-integrated ticketing system with webhook-driven notifications, priority escalation, SLA tracking, and real-time status dashboards for full operational oversight.',
    tags: ['AppSheet', 'N8N', 'Webhooks', 'Make.com'],
    images: [],
  },
  {
    id: 6, title: 'AI-Powered Sales Chatbot', category: 'Automation', date: '2025',
    description: "AI sales assistant integrated into the client's CRM pipeline. Improved lead response times and pipeline visibility through intelligent conversation flows and automated handoffs.",
    tags: ['AI Agents', 'N8N', 'Make.com', 'CRM Integration'],
    images: [],
  },
  {
    id: 7, title: 'HR Analytics & Recruitment Dashboard', category: 'Dashboards', date: '2017 - 2019',
    description: 'Comprehensive KPI dashboard tracking headcount, turnover rates, and end-to-end recruitment metrics. Reduced hiring time by 35% through data-driven process optimization.',
    tags: ['Data Studio', 'Google Sheets', 'Data Modeling', 'KPI Frameworks'],
    images: [],
  },
  {
    id: 8, title: 'Logistics Delivery Planning System', category: 'Inventory', date: '2024',
    description: 'Route planning and delivery tracking system providing full operational oversight for a UK furniture retailer, with integrated Data Studio dashboards and vendor management.',
    tags: ['AppSheet', 'Data Studio', 'Google Sheets', 'Automation'],
    images: [],
  },
  {
    id: 9, title: 'Business Website & Lead Gen', category: 'CRM', date: '2023 - 2024',
    description: 'Full business website with optimized user flows, structured content architecture, lead capture integration, and a vendor tracking CRM with automated follow-up sequences.',
    tags: ['Google Sites', 'AppSheet', 'Make.com', 'Analytics'],
    images: [],
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  AppSheet:           'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800',
  Automation:         'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
  CRM:                'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  Inventory:          'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
  'Project Management': 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  Dashboards:         'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800',
}

const FILTERS = ['All', 'AppSheet', 'Automation', 'CRM', 'Inventory', 'Project Management', 'Dashboards']
const INITIAL_SHOW = 6

function ProjectCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = () => {
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % images.length)
    }, 2000)
  }

  useEffect(() => {
    start()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [images.length])

  const goTo = (i: number) => {
    setCurrent(i)
    if (timerRef.current) clearInterval(timerRef.current)
    start()
  }

  return (
    <div className="relative w-full h-44 rounded-lg overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800 group">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-4 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function PlaceholderImage() {
  return (
    <div className="w-full h-44 rounded-lg mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
      <svg className="w-10 h-10 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  )
}

export default function Projects() {
  const [active, setActive] = useState('All')
  const [showAll, setShowAll] = useState(false)

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active)
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_SHOW)
  const remaining = filtered.length - INITIAL_SHOW

  return (
    <div className="py-20 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-[15px]">
        <p className="section-label">02 / projects</p>
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">What I've Built</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-xl">
          9+ systems spanning no-code platforms, automation workflows, CRM pipelines, and analytics dashboards across multiple industries.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => { setActive(f); setShowAll(false) }}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                active === f
                  ? 'text-white dark:text-gray-900 border-transparent'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-accent hover:text-accent'
              }`}
              style={active === f ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : {}}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {visible.map(p => (
            <div key={p.id} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] p-5 flex flex-col hover:border-gray-300 dark:hover:border-gray-600 transition-all">
              {/* Image area */}
              {p.images.length > 0 ? (
                <ProjectCarousel images={p.images} />
              ) : (
                <PlaceholderImage />
              )}

              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${CATEGORY_COLORS[p.category]}`}>
                  {p.category}
                </span>
                <span className="font-mono text-xs text-gray-400 dark:text-gray-500">{p.date}</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{p.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {p.tags.map(tag => (
                  <span key={tag} className="font-mono text-xs px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-500">
                    {tag}
                  </span>
                ))}
                {'demo' in p && (p as { demo?: string }).demo && (
                  <a
                    href={(p as { demo?: string }).demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-xs font-medium transition-colors hover:opacity-80"
                    style={{ color: 'var(--accent)' }}
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {!showAll && remaining > 0 && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm font-medium hover:border-accent hover:text-accent transition-all"
            >
              Load More Projects ({remaining} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
