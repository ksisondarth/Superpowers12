import { experience } from '../data/portfolioData'
import { Briefcase } from 'lucide-react'

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="section-title text-gray-900 dark:text-white">Experience</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Professional Journey</p>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gray-200 dark:bg-dark-border" />

          <div className="space-y-8">
            {experience.map((role, i) => (
              <div key={i} className="relative pl-12 md:pl-20 group">
                {/* Timeline dot */}
                <div
                  className="absolute left-2.5 md:left-6 top-5 w-3 h-3 rounded-full border-2 border-neon bg-white dark:bg-dark-bg
                    group-hover:shadow-[0_0_10px_rgba(57,255,20,0.7)] transition-all duration-300"
                  style={{ boxShadow: '0 0 0 3px rgba(57,255,20,0.15)' }}
                />

                <div
                  className="p-5 md:p-6 rounded-xl border border-gray-200 dark:border-dark-border
                    bg-white dark:bg-dark-card transition-all duration-300
                    group-hover:border-neon/40 group-hover:shadow-[0_0_20px_rgba(57,255,20,0.08)]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div className="flex items-start gap-2">
                      <Briefcase size={15} className="text-neon mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm md:text-base">
                          {role.title}
                        </h3>
                        <p className="text-neon text-xs font-mono mt-0.5">{role.company}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-gray-400 dark:text-gray-500 whitespace-nowrap
                      bg-gray-100 dark:bg-dark-bg px-2.5 py-1 rounded-full border border-gray-200 dark:border-dark-border self-start">
                      {role.period}
                    </span>
                  </div>

                  <ul className="space-y-1.5 mt-3">
                    {role.highlights.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                        <span className="text-neon mt-1 flex-shrink-0">›</span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
