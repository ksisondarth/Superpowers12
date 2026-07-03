import { useEffect, useRef, useState } from 'react'
import { Zap, Settings, BarChart2, Palette, Database, Code2, Layers, type LucideIcon } from 'lucide-react'
import type { SkillCategory, Proficiency } from '../types/portfolio'

const ICON_MAP: Record<string, LucideIcon> = {
  Zap, Settings, BarChart2, Palette, Database, Code2, Layers,
}

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
        <span className="text-sm font-mono" style={{ color: 'var(--accent)' }}>{pct}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, backgroundColor: 'var(--accent)' }}
        />
      </div>
    </div>
  )
}

interface Props {
  skills: SkillCategory[]
  proficiencies: Proficiency[]
}

export default function Skills({ skills, proficiencies }: Props) {
  return (
    <div className="py-20 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-[15px]">
        <p className="section-label">03 / skills</p>
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Technical Expertise</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-12 max-w-xl">
          A breadth of no-code, automation, design, and analytics tools refined over 6+ years across academic, enterprise, and international client environments.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {skills.map(cat => {
            const Icon = ICON_MAP[cat.icon] ?? Zap
            return (
              <div key={cat.title} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Icon size={18} style={{ color: 'var(--accent)' }} />
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

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Core Proficiencies</h3>
          <div className="grid md:grid-cols-2 gap-x-12">
            {proficiencies.map(p => (
              <ProgressBar key={p.label} label={p.label} pct={p.pct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
