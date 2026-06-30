import { Award, ExternalLink } from 'lucide-react'

// Scaffold: populate with real data in a follow-up
const CERTS: {
  icon?: string
  code: string
  title: string
  issuer: string
  dateRange: string
  credentialUrl?: string
}[] = []

const HIGHLIGHTED = {
  code: 'BADGE-001',
  title: 'Featured Credential',
  issuer: 'To be added',
  dateRange: '—',
  description: 'Your featured certification or badge will appear here.',
}

export default function Certifications() {
  return (
    <div className="py-20 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-sm text-teal-400 mb-3">05 / certifications</p>
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Credentials & Badges</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-12 max-w-xl">
          Professional certifications and badges validating expertise in AppSheet, automation, and analytics platforms.
        </p>

        {CERTS.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {CERTS.map((cert, i) => (
              <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] p-5 flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-teal-400/10 border border-teal-400/30 flex items-center justify-center mb-4">
                  <Award size={22} className="text-teal-400" />
                </div>
                <span className="font-mono text-xs text-teal-400 mb-2">{cert.code}</span>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1 flex-1">{cert.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">{cert.issuer}</p>
                <p className="font-mono text-xs text-gray-400 dark:text-gray-600 mb-4">{cert.dateRange}</p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    View credential <ExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="rounded-xl border border-dashed border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0d1117]/50 p-5 flex flex-col items-center justify-center min-h-48 text-center">
                <Award size={24} className="text-gray-300 dark:text-gray-700 mb-2" />
                <p className="text-xs text-gray-400 dark:text-gray-600">Certification {n}</p>
                <p className="text-xs text-gray-300 dark:text-gray-700">Coming soon</p>
              </div>
            ))}
          </div>
        )}

        {/* Highlighted banner */}
        <div className="rounded-xl border border-teal-400/30 bg-teal-400/5 p-6 flex items-center gap-6">
          <div className="w-14 h-14 rounded-xl bg-teal-400/20 border border-teal-400/40 flex items-center justify-center flex-shrink-0">
            <Award size={28} className="text-teal-400" />
          </div>
          <div className="flex-1">
            <span className="font-mono text-xs text-teal-400">{HIGHLIGHTED.code}</span>
            <h3 className="font-bold text-gray-900 dark:text-white mt-1">{HIGHLIGHTED.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{HIGHLIGHTED.issuer} · {HIGHLIGHTED.dateRange}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{HIGHLIGHTED.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
