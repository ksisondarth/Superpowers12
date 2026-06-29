import { ExternalLink } from 'lucide-react'
import { portfolio } from '../data/portfolioData'

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-white dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Section header */}
        <div className="mb-16">
          <span className="section-label">Projects</span>
          <h2 className="section-heading">Portfolio</h2>
          <span className="accent-rule" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((project, i) => (
            <div key={i} className="card p-6 flex flex-col group">

              {/* Project number */}
              <span className="text-2xs font-mono text-light-muted dark:text-dark-muted mb-4">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Title */}
              <h3 className="font-semibold text-light-text dark:text-dark-text text-sm mb-3">
                {project.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-light-sub dark:text-dark-sub leading-relaxed mb-5 flex-1">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              {/* CTA */}
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold
                  text-accent-light dark:text-accent
                  hover:gap-2.5 transition-all duration-200"
              >
                View Live Demo
                <ExternalLink size={11} strokeWidth={2} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
