import { useState } from 'react'
import type { Project } from '../types/portfolio'

const CATEGORY_COLORS: Record<string, string> = {
  AppSheet:             'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800',
  Automation:           'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
  CRM:                  'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  Inventory:            'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
  'Project Management': 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  Dashboards:           'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800',
}

const FILTERS = ['All', 'AppSheet', 'Automation', 'CRM', 'Inventory', 'Project Management', 'Dashboards']
const INITIAL_SHOW = 6

interface Props { projects: Project[] }

export default function Projects({ projects }: Props) {
  const [active, setActive] = useState('All')
  const [showAll, setShowAll] = useState(false)

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_SHOW)
  const remaining = filtered.length - INITIAL_SHOW

  return (
    <div className="py-20 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-[15px]">
        <p className="section-label">02 / projects</p>
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">What I've Built</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-xl">
          Systems spanning no-code platforms, automation workflows, CRM pipelines, and analytics dashboards across multiple industries.
        </p>

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
            <div
              key={p.id}
              className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] flex flex-col hover:border-gray-300 dark:hover:border-gray-600 transition-all overflow-hidden"
            >
              {/* Header image — only rendered when image URL is provided */}
              {p.image ? (
                <div className="w-full aspect-video overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    onError={e => { (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none' }}
                  />
                </div>
              ) : null}

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${CATEGORY_COLORS[p.category] ?? 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700'}`}>
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
