import { GraduationCap } from 'lucide-react'
import { experience, education } from '../data/portfolioData'

const ROLE_TAGS: Record<string, string[]> = {
  'Technology Solutions Consultant': ['AppSheet', 'Make.com', 'N8N', 'SVG UI', 'Google Workspace', 'Document Generation'],
  'Database & Process Automation Specialist': ['AppSheet', 'Data Studio', 'Google Apps Script', 'SVG UI', 'Data Analytics'],
  'Tech Lead': ['AppSheet', 'Make.com', 'N8N', 'Data Studio', 'AI Chatbot', 'Webhooks', 'CRM'],
  'Website & AppSheet Developer': ['AppSheet', 'Google Sites', 'Make.com', 'CRM', 'Analytics'],
  'HR Data Analytics Specialist': ['Google Sheets', 'Data Studio', 'KPI Frameworks', 'Data Modeling'],
}

const ROLE_TYPE: Record<string, string> = {
  'Technology Solutions Consultant': 'Consultant',
  'Database & Process Automation Specialist': 'Full-time',
  'Tech Lead': 'Contract',
  'Website & AppSheet Developer': 'Consultant',
  'HR Data Analytics Specialist': 'Full-time',
}

const TYPE_COLORS: Record<string, string> = {
  'Full-time': 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
  Contract:    'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  Consultant:  'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800',
}

export default function Experience() {
  return (
    <div className="py-20 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-[15px]">
        <p className="section-label">04 / experience</p>
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Work History</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-12 max-w-xl">
          6+ years building no-code systems across academic, enterprise, and international client environments.
        </p>

        <div className="space-y-5 mb-12">
          {experience.map((job, i) => {
            const type = ROLE_TYPE[job.title] || 'Full-time'
            const tags = ROLE_TAGS[job.title] || []
            return (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-8 mt-5">
                  <span className="font-mono text-sm text-gray-400 dark:text-gray-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex-1 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{job.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-0.5">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs px-2.5 py-1 rounded-md border font-medium ${TYPE_COLORS[type]}`}>
                        {type}
                      </span>
                      <span className="font-mono text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">{job.period}</span>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-1.5">
                    {job.highlights.slice(0, 4).map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {tags.map(tag => (
                        <span key={tag} className="font-mono text-xs px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] p-5 flex gap-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}>
            <GraduationCap size={18} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{education.degree}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-500">{education.institution} · Graduated {education.year}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{education.note}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
