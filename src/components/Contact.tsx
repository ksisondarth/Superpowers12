import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { personal } from '../data/portfolioData'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    // TODO: plug in EmailJS or backend endpoint here
    console.log('Contact form submitted:', form)
    setSubmitted(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setErrors({})
  }

  const set = (field: string) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [field]: ev.target.value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  const inputCls = (field: string) =>
    `w-full px-4 py-3 rounded-lg border text-sm bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-colors ${
      errors[field]
        ? 'border-red-400 focus:border-red-400'
        : 'border-gray-200 dark:border-gray-700 focus:border-teal-400'
    }`

  return (
    <div className="py-20 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-[15px]">
        <p className="font-mono text-sm text-teal-400 mb-3">06 / contact</p>
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Let's Work Together</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-12 max-w-xl">
          Have a project in mind or looking for an AppSheet developer? Reach out and let's discuss how I can help.
        </p>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left */}
          <div className="space-y-5">
            {/* Availability */}
            <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-semibold text-green-700 dark:text-green-400 text-sm">Available for new roles</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Currently open to full-time, contract, and consulting opportunities in no-code development, AppSheet, and process automation.
              </p>
            </div>

            {/* Info */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] p-5 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-teal-400 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">Email</div>
                  <a href={`mailto:${personal.email}`} className="text-gray-900 dark:text-white hover:text-teal-400 transition-colors">{personal.email}</a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-teal-400 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">Location</div>
                  <div className="text-gray-900 dark:text-white">{personal.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock size={16} className="text-teal-400 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">Timezone</div>
                  <div className="text-gray-900 dark:text-white">PHT, UTC+8</div>
                </div>
              </div>
            </div>

            {/* Connect */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] p-5">
              <p className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-4 tracking-widest">CONNECT</p>
              <div className="space-y-3">
                <a
                  href="https://www.linkedin.com/in/keanu-sison"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-teal-400/40 transition-all group"
                >
                  <FaLinkedin size={18} className="text-[#0077b5] group-hover:text-teal-400" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">LinkedIn</div>
                    <div className="text-xs text-gray-500">Keanu Niccolo Sison</div>
                  </div>
                  <span className="text-gray-400 group-hover:text-teal-400 text-xs">↗</span>
                </a>
                <a
                  href="https://github.com/keansison"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-teal-400/40 transition-all group"
                >
                  <FaGithub size={18} className="text-gray-700 dark:text-gray-300 group-hover:text-teal-400" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">GitHub</div>
                    <div className="text-xs text-gray-500">keansison</div>
                  </div>
                  <span className="text-gray-400 group-hover:text-teal-400 text-xs">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right — Contact form */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d1117] p-6">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle size={48} className="text-teal-400 mb-4" />
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Message sent!</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm text-teal-400 hover:text-teal-300 transition-colors">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={set('name')}
                    className={inputCls('name')}
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={set('email')}
                    className={inputCls('email')}
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Subject</label>
                  <input
                    type="text"
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={set('subject')}
                    className={inputCls('subject')}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={set('message')}
                    className={`${inputCls('message')} resize-none`}
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-teal-400 text-gray-900 font-semibold text-sm hover:bg-teal-300 transition-all"
                >
                  <Send size={15} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
