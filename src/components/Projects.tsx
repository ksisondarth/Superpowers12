import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import type { Project } from '../types/portfolio'

const CATEGORY_COLORS: Record<string, string> = {
  AppSheet:             'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800',
  Automation:           'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
  CRM:                  'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  Inventory:            'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
  'Project Management': 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  Dashboards:           'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800',
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  AppSheet:             'from-teal-400/20 to-teal-600/30',
  Automation:           'from-purple-400/20 to-purple-600/30',
  CRM:                  'from-blue-400/20 to-blue-600/30',
  Inventory:            'from-orange-400/20 to-orange-600/30',
  'Project Management': 'from-green-400/20 to-green-600/30',
  Dashboards:           'from-pink-400/20 to-pink-600/30',
}

const FILTERS = ['All', 'AppSheet', 'Automation', 'CRM', 'Inventory', 'Project Management', 'Dashboards']
const INITIAL_SHOW = 6

interface Props { projects: Project[] }

function ProjectPlaceholder({ category, title }: { category: string; title: string }) {
  const gradient = CATEGORY_GRADIENTS[category] ?? 'from-gray-300/20 to-gray-500/30'
  const initials = title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} dark:from-gray-800 dark:to-gray-700 flex items-center justify-center`}>
      <div className="flex flex-col items-center gap-2 opacity-40">
        <div className="w-12 h-12 rounded-xl bg-white/50 dark:bg-white/10 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-700 dark:text-gray-300">{initials}</span>
        </div>
        <span className="text-xs font-mono text-gray-600 dark:text-gray-400 tracking-wider">preview</span>
      </div>
    </div>
  )
}

function ProjectCard({ p }: { p: Project }) {
  const [imgError, setImgError] = useState(false)
  const hasDemo = !!p.demo
  const hasImage = !!p.image && !imgError

  const cardContent = (
    <div className={`group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] flex flex-col overflow-hidden transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30 hover:-translate-y-1 ${hasDemo ? 'cursor-pointer' : ''}`}>

      {/* Image / Placeholder — always shown */}
      <div className="w-full aspect-video overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800/50">
        {hasImage ? (
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <ProjectPlaceholder category={p.category} title={p.title} />
        )}
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${CATEGORY_COLORS[p.category] ?? 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700'}`}>
            {p.category}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs text-gray-400 dark:text-gray-500">{p.date}</span>
            {hasDemo && (
              <ExternalLink size={12} className="text-gray-400 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
        </div>

        <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors" style={{ '--accent': 'var(--accent)' } as React.CSSProperties}>
          {p.title}
        </h3>
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
  )

  if (hasDemo) {
    return (
      <a href={p.demo} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </a>
    )
  }
  return cardContent
}

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
            <ProjectCard key={p.id} p={p} />
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
