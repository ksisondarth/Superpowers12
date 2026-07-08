import { useState, useEffect } from 'react'
import type { PortfolioData } from '../types/portfolio'
import { FALLBACK_DATA } from '../data/portfolioData'

const API_URL = import.meta.env.VITE_PORTFOLIO_API_URL as string | undefined
const BASE = import.meta.env.BASE_URL

const REQUIRED_KEYS: (keyof PortfolioData)[] = [
  'siteSettings', 'theme', 'navSections', 'stats', 'skills',
  'proficiencies', 'experience', 'projects', 'education', 'socialLinks',
]

function resolveRelativePaths(data: PortfolioData): PortfolioData {
  const s = data.siteSettings
  const abs = (p: string) => !p || p.startsWith('http') || p.startsWith('/')
  const rel = (p: string) => abs(p) ? p : `${BASE}${p}`
  return {
    ...data,
    siteSettings: {
      ...s,
      cvPdf:        rel(s.cvPdf),
      profilePhoto: rel(s.profilePhoto),
      logo:         rel(s.logo),
      favicon:      rel(s.favicon),
    },
    projects: data.projects.map(p => ({
      ...p,
      image: rel(p.image ?? ''),
    })),
  }
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(FALLBACK_DATA)
  const [isLoading, setIsLoading] = useState(!!API_URL)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!API_URL) return

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)

    fetch(API_URL, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((raw: unknown) => {
        const payload = raw as Record<string, unknown>
        const missing = REQUIRED_KEYS.filter(k => !(k in payload))
        if (missing.length) throw new Error(`Incomplete payload, missing: ${missing.join(', ')}`)
        setData(resolveRelativePaths(payload as unknown as PortfolioData))
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.warn('[Portfolio] API fetch failed, using fallback data:', err.message)
          setError(err.message)
        }
      })
      .finally(() => {
        clearTimeout(timer)
        setIsLoading(false)
      })

    return () => { clearTimeout(timer); controller.abort() }
  }, [])

  return { data, isLoading, error }
}
