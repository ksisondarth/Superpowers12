import { useEffect, useRef, useState } from 'react'
import { Zap, Settings, BarChart2, Palette, Database, Code2 } from 'lucide-react'

const SKILL_CATEGORIES = [
  {
    icon: Zap,
    title: 'No-Code / Low-Code Platforms',
    pills: ['AppSheet', 'Google Workspace', 'Google Sites', 'Supabase'],
  },
  {
    icon: Settings,
    title: 'Automation & Integration',
    pills: ['Make.com', 'N8N', 'Google Apps Script', 'AI Agent Development', 'REST APIs', 'Webhooks', 'Aircall'],
  },
  {
    icon: BarChart2,
    title: 'Analytics & Data',
    pills: ['Looker Studio', 'Google Sheets (Advanced)', 'Data Modeling', 'KPI Frameworks', 'ETL'],
  },
  {
    icon: Palette,
    title: 'UI/UX & Design',
    pills: ['AppSheet SVG Design', 'LongText HTML', 'Data URI Encoding', 'CONCATENATE Formula SVGs', 'Dynamic Widgets'],
  },
  {
    icon: Database,
    title: 'Database & Backend Concepts',
    pills: ['Database Design', 'Data Cleaning & Validation', 'Quality Assurance', 'Document Generation'],
  },
  {
    icon: Code2,
    title: 'Languages & Misc Tools',
    pills: ['HTML', 'CSS', 'JavaScript (Intermediate)', 'Gmail API', 'Google Calendar API'],
  },
]

const PROFICIENCIES = [
  { label: 'AppSheet Development', pct: 95 },
  { label: 'SVG / UI-UX Design', pct: 92 },
  { label: 'Automation (Make.com / N8N)', pct: 85 },
  { label: 'Google Sheets & Data', pct: 90 },
  { label: 'Looker Studio', pct: 80 },
  { label: 'Apps Script / JavaScript', pct: 70 },
]

function ProgressBar({ label, pct }: { label: string; pct: number }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth(pct) },
      { threshold: 0.5 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [pct])

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm font-mono text-teal-400">{pct}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-400 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <div className="py-20 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-sm text-teal-400 mb-3">03 / skills</p>
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Technical Expertise</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-12 max-w-xl">
          A breadth of no-code, automation, and analytics tools refined over 7+ years across academic, enterprise, and international client environments.
        </p>

        {/* Category cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {SKILL_CATEGORIES.map(cat => {
            const Icon = cat.icon
            return (
              <div key={cat.title} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Icon size={18} className="text-teal-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.pills.map(p => (
                    <span key={p} className="font-mono text-xs px-2.5 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Core Proficiencies */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Core Proficiencies</h3>
          <div className="grid md:grid-cols-2 gap-x-12">
            {PROFICIENCIES.map(p => (
              <ProgressBar key={p.label} label={p.label} pct={p.pct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
