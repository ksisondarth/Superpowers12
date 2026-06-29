import { ExternalLink, Code2 } from 'lucide-react'
import { portfolio } from '../data/portfolioData'

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-28 bg-gray-100/50 dark:bg-dark-surface/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="section-title text-gray-900 dark:text-white">Portfolio</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Selected Project Highlights</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((project, i) => (
            <div
              key={i}
              className="flex flex-col p-5 rounded-xl border border-gray-200 dark:border-dark-border
                bg-white dark:bg-dark-card
                hover:border-neon/50 hover:shadow-[0_0_24px_rgba(57,255,20,0.1)]
                transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center mb-4">
                <Code2 size={18} className="text-neon" />
              </div>

              {/* Title */}
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">
                {project.name}
              </h3>

              {/* Description */}
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full font-mono
                      bg-neon/5 text-neon border border-neon/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Demo link */}
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neon
                  hover:underline group-hover:gap-2 transition-all"
              >
                View Live Demo
                <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
