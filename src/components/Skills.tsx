import type { ReactNode } from 'react'
import { skillCategories } from '../data/portfolioData'

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-white dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Section header */}
        <div className="mb-16">
          <span className="section-label">Competencies</span>
          <h2 className="section-heading">Core Skills</h2>
          <span className="accent-rule" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <GlowCard key={cat.title} delay={i * 1.3}>
              <div className="skill-card-inner p-7 h-full flex flex-col">
                <span className="text-2xl mb-4">{cat.icon}</span>
                <h3 className="font-semibold text-light-text dark:text-dark-text text-sm leading-snug mb-5">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {cat.skills.map(skill => (
                    <span key={skill} className="tag">{skill}</span>
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

function GlowCard({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <div className="skill-card-wrapper h-full" style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  )
}
