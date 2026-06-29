import { experience } from '../data/portfolioData'

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 bg-light-surface dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Section header */}
        <div className="mb-16">
          <span className="section-label">Career</span>
          <h2 className="section-heading">Experience</h2>
          <span className="accent-rule" />
        </div>

        <div className="relative">
          {/* Timeline rail */}
          <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2
            w-px bg-light-border dark:bg-dark-border" />

          <div className="space-y-10">
            {experience.map((role, i) => (
              <div key={i} className="relative pl-8 md:pl-12 group">

                {/* Timeline node */}
                <div className="absolute left-0 top-[22px] w-3.5 h-3.5 rounded-full
                  border-2 border-accent-light dark:border-accent
                  bg-white dark:bg-dark-bg
                  group-hover:scale-125 group-hover:shadow-[0_0_0_4px_rgba(22,163,74,0.12)]
                  dark:group-hover:shadow-[0_0_0_4px_rgba(57,255,20,0.1)]
                  transition-all duration-250" />

                <div className="card p-6 md:p-7">

                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-semibold text-light-text dark:text-dark-text text-[0.95rem]">
                        {role.title}
                      </h3>
                      <p className="text-accent-light dark:text-accent text-xs font-mono mt-0.5">
                        {role.company}
                      </p>
                    </div>
                    <span className="self-start text-2xs font-mono px-2.5 py-1 rounded-full
                      bg-light-surface dark:bg-dark-surface
                      border border-light-border dark:border-dark-border
                      text-light-muted dark:text-dark-muted whitespace-nowrap">
                      {role.period}
                    </span>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2">
                    {role.highlights.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm
                        text-light-sub dark:text-dark-sub">
                        <span className="mt-[5px] w-1 h-1 rounded-full flex-shrink-0
                          bg-accent-light dark:bg-accent" />
                        <span className="leading-relaxed">{pt}</span>
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
