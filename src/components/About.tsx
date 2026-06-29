import { summary, stats, education } from '../data/portfolioData'
import { GraduationCap } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="section-title text-gray-900 dark:text-white">About Me</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Background & Overview</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Summary */}
          <div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg">
              {summary}
            </p>

            {/* Education card */}
            <div className="mt-8 p-5 rounded-xl border border-gray-200 dark:border-dark-border
              bg-white dark:bg-dark-card hover:border-neon/40 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-neon/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={18} className="text-neon" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{education.degree}</p>
                  <p className="text-neon text-xs font-mono mt-0.5">{education.institution} · {education.year}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 leading-relaxed">{education.note}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(stat => (
              <div
                key={stat.label}
                className="p-6 rounded-xl border border-gray-200 dark:border-dark-border
                  bg-white dark:bg-dark-card text-center group hover:border-neon/50 transition-all duration-300
                  hover:shadow-[0_0_20px_rgba(57,255,20,0.1)]"
              >
                <div
                  className="text-3xl md:text-4xl font-black mb-1"
                  style={{ color: '#39FF14', textShadow: '0 0 20px rgba(57,255,20,0.4)' }}
                >
                  {stat.value}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
