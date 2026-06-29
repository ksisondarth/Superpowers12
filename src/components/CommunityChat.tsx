import { useState, useEffect, useRef } from 'react'
import { Send, MessageSquare, Trash2 } from 'lucide-react'

interface Message {
  id: string
  name: string
  text: string
  timestamp: number
}

const STORAGE_KEY = 'portfolio-community-chat'

function loadMessages(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveMessages(msgs: Message[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs))
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || '?'
}

const AVATAR_PALETTE = [
  '#16A34A','#0284C7','#DC2626','#D97706',
  '#7C3AED','#DB2777','#0891B2',
]

function avatarColor(name: string) {
  let hash = 0
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length]
}

export default function CommunityChat() {
  const [messages, setMessages] = useState<Message[]>(loadMessages)
  const [name, setName]         = useState('')
  const [text, setText]         = useState('')
  const [error, setError]       = useState('')
  const bottomRef               = useRef<HTMLDivElement>(null)

  useEffect(() => { saveMessages(messages) }, [messages])
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const n = name.trim(), t = text.trim()
    if (!n) { setError('Please enter your name.'); return }
    if (!t) { setError('Please write a message.'); return }
    if (t.length > 500) { setError('Max 500 characters.'); return }
    setError('')
    setMessages(prev => [...prev, {
      id: `${Date.now()}-${Math.random()}`,
      name: n, text: t, timestamp: Date.now(),
    }])
    setText('')
  }

  return (
    <section id="community" className="py-24 md:py-32 bg-white dark:bg-dark-bg">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">

        {/* Section header */}
        <div className="mb-12">
          <span className="section-label">Say hello</span>
          <h2 className="section-heading">Community Wall</h2>
          <span className="accent-rule" />
          <p className="text-sm text-light-muted dark:text-dark-muted mt-5">
            Leave a message, ask a question, or share feedback. Messages persist in your browser.
          </p>
        </div>

        <div className="card overflow-hidden">

          {/* Header bar */}
          <div className="flex items-center gap-2.5 px-5 py-3.5
            border-b border-light-border dark:border-dark-border
            bg-light-surface dark:bg-dark-surface">
            <MessageSquare size={14} strokeWidth={1.8} className="text-accent-light dark:text-accent" />
            <span className="text-sm font-semibold text-light-text dark:text-dark-text">Messages</span>
            <span className="ml-auto text-2xs font-mono text-light-muted dark:text-dark-muted">
              {messages.length} {messages.length === 1 ? 'entry' : 'entries'}
            </span>
          </div>

          {/* Message list */}
          <div className="h-72 overflow-y-auto px-5 py-5 space-y-5
            bg-white dark:bg-dark-card">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center gap-3
                text-light-muted dark:text-dark-muted">
                <MessageSquare size={28} strokeWidth={1.2} />
                <p className="text-sm">No messages yet — be the first!</p>
              </div>
            )}
            {messages.map(msg => {
              const color = avatarColor(msg.name)
              return (
                <div key={msg.id} className="flex items-start gap-3 group">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center
                      text-2xs font-bold flex-shrink-0 text-white"
                    style={{ background: color }}
                  >
                    {getInitial(msg.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-semibold text-light-text dark:text-dark-text">
                        {msg.name}
                      </span>
                      <span className="text-2xs font-mono text-light-muted dark:text-dark-muted">
                        {timeAgo(msg.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-light-sub dark:text-dark-sub leading-relaxed break-words">
                      {msg.text}
                    </p>
                  </div>
                  <button
                    onClick={() => setMessages(p => p.filter(m => m.id !== msg.id))}
                    title="Delete"
                    className="opacity-0 group-hover:opacity-100 p-1 rounded
                      text-light-muted dark:text-dark-muted hover:text-red-400 transition-opacity"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              )
            })}
            <div ref={bottomRef} />
          </div>

          {/* Composer */}
          <div className="border-t border-light-border dark:border-dark-border px-5 py-4
            bg-light-surface dark:bg-dark-surface">
            {error && (
              <p className="text-xs text-red-500 dark:text-red-400 font-mono mb-2">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                maxLength={40}
                className="field sm:w-36"
              />
              <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Write something…"
                maxLength={500}
                className="field flex-1"
              />
              <button type="submit" className="btn-primary px-4 py-2.5 text-sm justify-center">
                <Send size={14} strokeWidth={2} />
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
