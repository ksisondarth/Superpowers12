import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import type { SiteSettings, SocialLink } from '../types/portfolio'

const API_URL = import.meta.env.VITE_PORTFOLIO_API_URL as string | undefined

interface Props {
  siteSettings: SiteSettings
  socialLinks: SocialLink[]
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  LinkedIn: <FaLinkedin size={18} className="text-[#0077b5]" />,
  GitHub:   <FaGithub size={18} className="text-gray-700 dark:text-gray-300" />,
}

export default function Contact({ siteSettings, socialLinks }: Props) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [sending, setSending] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    setSending(true)
    setSubmitError('')

    try {
      if (!API_URL) throw new Error('No API configured')

      // Deliberately no Content-Type header — Apps Script CORS doesn't handle JSON preflight
      const res = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: 'submitContact',
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      })

      const result = await res.json() as { success: boolean; error?: string }
      if (!result.success) throw new Error(result.error ?? 'Submission failed')

      setSubmitted(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setErrors({})
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      console.error('[Contact] submit failed:', msg)
      setSubmitError('Failed to send message. Please try emailing me directly.')
    } finally {
      setSending(false)
    }
  }

  const set = (field: string) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [field]: ev.target.value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  const inputCls = (field: string) =>
    `w-full px-4 py-3 rounded-lg border text-sm bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-colors ${
      errors[field] ? 'border-red-400 focus:border-red-400' : 'border-gray-200 dark:border-gray-700'
    }`

  return (
    <div className="py-20 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-[15px]">
        <p className="section-label">06 / contact</p>
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Let's Work Together</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-12 max-w-xl">
          Have a project in mind or looking for an AppSheet developer? Reach out and let's discuss how I can help.
        </p>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left */}
          <div className="space-y-5">
            <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-semibold text-green-700 dark:text-green-400 text-sm">Available for new roles</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Open to full-time, contract, and consulting opportunities in no-code development, AppSheet, and process automation.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] p-5 space-y-4">
              {[
                { icon: Mail,   label: 'Email',    value: siteSettings.email,    href: `mailto:${siteSettings.email}` },
                { icon: MapPin, label: 'Location', value: siteSettings.location, href: undefined },
                { icon: Clock,  label: 'Timezone', value: 'PHT, UTC+8',          href: undefined },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <Icon size={16} style={{ color: 'var(--accent)' }} className="flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">{label}</div>
                    {href
                      ? <a href={href} className="text-gray-900 dark:text-white hover:text-accent transition-colors">{value}</a>
                      : <div className="text-gray-900 dark:text-white">{value}</div>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] p-5">
              <p className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-4 tracking-widest">CONNECT</p>
              <div className="space-y-2">
                {socialLinks.map(link => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
                  >
                    {SOCIAL_ICONS[link.platform] ?? null}
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{link.platform}</div>
                    </div>
                    <span className="text-gray-400 text-xs">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] p-6">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle size={48} className="mb-4" style={{ color: 'var(--accent)' }} />
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Message sent!</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm hover:opacity-80 transition-opacity" style={{ color: 'var(--accent)' }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input type="text" placeholder="Your name" value={form.name} onChange={set('name')} className={inputCls('name')} />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input type="email" placeholder="your@email.com" value={form.email} onChange={set('email')} className={inputCls('email')} />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Subject</label>
                  <input type="text" placeholder="What's this about?" value={form.subject} onChange={set('subject')} className={inputCls('subject')} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea rows={5} placeholder="Tell me about your project..." value={form.message} onChange={set('message')} className={`${inputCls('message')} resize-none`} />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

                {submitError && (
                  <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
                    <AlertCircle size={14} />
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white dark:text-gray-900 font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  <Send size={15} />
                  {sending ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
