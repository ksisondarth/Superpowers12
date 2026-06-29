import { summary, stats, education } from '../data/portfolioData'
import { GraduationCap } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-light-surface dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Section header */}
        <div className="mb-16">
          <span className="section-label">Background</span>
          <h2 className="section-heading">About Me</h2>
          <span className="accent-rule" />
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">

          {/* Summary — 3 cols */}
          <div className="md:col-span-3 space-y-8">
            <p className="text-light-sub dark:text-dark-sub leading-[1.85] text-base md:text-[1.05rem]">
              {summary}
            </p>

            {/* Education */}
            <div className="card p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                bg-green-50 dark:bg-accent/10">
                <GraduationCap size={18} strokeWidth={1.8} className="text-accent-light dark:text-accent" />
              </div>
              <div>
                <p className="font-semibold text-light-text dark:text-dark-text text-sm">{education.degree}</p>
                <p className="text-accent-light dark:text-accent text-xs font-mono mt-0.5">
                  {education.institution} · {education.year}
                </p>
                <p className="text-light-muted dark:text-dark-muted text-xs mt-2 leading-relaxed max-w-sm">
                  {education.note}
                </p>
              </div>
            </div>
          </div>

          {/* Stats — 2 cols */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {stats.map(stat => (
              <div key={stat.label}
                className="card p-6 text-center hover:scale-[1.02] transition-transform duration-200">
                <p className="text-3xl font-extrabold tracking-tight mb-1
                  text-accent-light dark:text-accent">
                  {stat.value}
                </p>
                <p className="text-xs text-light-muted dark:text-dark-muted font-medium leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
