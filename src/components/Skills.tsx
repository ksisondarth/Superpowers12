import { skillCategories } from '../data/portfolioData'

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 bg-gray-100/50 dark:bg-dark-surface/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="section-title text-gray-900 dark:text-white">Core Skills</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Competencies & Technical Expertise</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <GlowCard key={cat.title} delay={i * 0.15}>
              <div className="p-6 h-full bg-white dark:bg-dark-card rounded-xl">
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-4 leading-snug">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(skill => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded-full font-mono
                        bg-gray-100 dark:bg-dark-bg
                        text-gray-600 dark:text-gray-400
                        border border-gray-200 dark:border-dark-border
                        hover:border-neon/50 hover:text-neon transition-colors duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function GlowCard({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <div
      className="glow-card h-full"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="glow-card-inner h-full">
        {children}
      </div>
    </div>
  )
}
