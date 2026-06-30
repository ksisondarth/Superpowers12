import { useState } from 'react'

const PROJECTS = [
  {
    id: 1, title: 'Project Management System', category: 'Project Management', date: '2024 - Present',
    description: 'End-to-end project tracking with task assignment, milestone monitoring, deadline management, and custom SVG dashboard visualizations for a UK-based furniture client.',
    tags: ['AppSheet', 'SVG UI', 'Data Studio', 'Make.com'],
    demo: 'https://www.appsheet.com/start/c334d061-def1-4787-bdab-5d088b5d28fd',
  },
  {
    id: 2, title: 'CRM & Lead Management System', category: 'CRM', date: '2023 - 2024',
    description: 'Advanced CRM for lead tracking and pipeline management with lead scoring, automated Make.com follow-up workflows, conversion tracking, and real-time analytics dashboards.',
    tags: ['AppSheet', 'Make.com', 'Analytics', 'Google Sheets'],
    demo: 'https://www.appsheet.com/start/c1b48401-ad92-478b-98de-5adb9daa7317',
  },
  {
    id: 3, title: 'Order Management & POS System', category: 'Inventory', date: '2024',
    description: 'Complete point-of-sale and order management with item selection, quantity management, automatic total calculation, and streamlined order processing workflows.',
    tags: ['AppSheet', 'Google Sheets', 'Automation', 'SVG UI'],
    demo: 'https://www.appsheet.com/start/d62f57ca-62b0-417b-a39d-e794f7e474b7',
  },
  {
    id: 4, title: 'University Student Affairs System', category: 'AppSheet', date: '2021 - Present',
    description: 'Multi-department management system for Ateneo de Manila University covering student-facing workflows, automated email notifications, and Data Studio reporting.',
    tags: ['AppSheet', 'Google Apps Script', 'Data Studio', 'SVG UI'],
  },
  {
    id: 5, title: 'Enterprise Ticketing System', category: 'Automation', date: '2024 - 2025',
    description: 'Team-integrated ticketing system with webhook-driven notifications, priority escalation, SLA tracking, and real-time status dashboards for full operational oversight.',
    tags: ['AppSheet', 'N8N', 'Webhooks', 'Make.com'],
  },
  {
    id: 6, title: 'AI-Powered Sales Chatbot', category: 'Automation', date: '2025',
    description: "AI sales assistant integrated into the client's CRM pipeline. Improved lead response times and pipeline visibility through intelligent conversation flows and automated handoffs.",
    tags: ['AI Agents', 'N8N', 'Make.com', 'CRM Integration'],
  },
  {
    id: 7, title: 'HR Analytics & Recruitment Dashboard', category: 'Dashboards', date: '2017 - 2019',
    description: 'Comprehensive KPI dashboard tracking headcount, turnover rates, and end-to-end recruitment metrics. Reduced hiring time by 35% through data-driven process optimization.',
    tags: ['Data Studio', 'Google Sheets', 'Data Modeling', 'KPI Frameworks'],
  },
  {
    id: 8, title: 'Logistics Delivery Planning System', category: 'Inventory', date: '2024',
    description: 'Route planning and delivery tracking system providing full operational oversight for a UK furniture retailer, with integrated Data Studio dashboards and vendor management.',
    tags: ['AppSheet', 'Data Studio', 'Google Sheets', 'Automation'],
  },
  {
    id: 9, title: 'Business Website & Lead Gen', category: 'CRM', date: '2023 - 2024',
    description: 'Full business website with optimized user flows, structured content architecture, lead capture integration, and a vendor tracking CRM with automated follow-up sequences.',
    tags: ['Google Sites', 'AppSheet', 'Make.com', 'Analytics'],
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
              <div className="flex items-start justify-between mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${CATEGORY_COLORS[p.category]}`}>
                  {p.category}
                </span>
                <span className="font-mono text-xs text-gray-400 dark:text-gray-500">{p.date}</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{p.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map(tag => (
                  <span key={tag} className="font-mono text-xs px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-500">
                    {tag}
                  </span>
                ))}
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
