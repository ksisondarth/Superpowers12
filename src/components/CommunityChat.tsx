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

function avatarColor(name: string) {
  const colors = [
    '#39FF14', '#00bfff', '#ff6b6b', '#ffd700',
    '#b06aff', '#ff9f43', '#1dd1a1',
  ]
  let hash = 0
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff
  return colors[Math.abs(hash) % colors.length]
}

export default function CommunityChat() {
  const [messages, setMessages] = useState<Message[]>(loadMessages)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    saveMessages(messages)
  }, [messages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanName = name.trim()
    const cleanText = text.trim()
    if (!cleanName) { setError('Please enter your name.'); return }
    if (!cleanText) { setError('Please enter a message.'); return }
    if (cleanText.length > 500) { setError('Message too long (max 500 chars).'); return }
    setError('')
    const msg: Message = {
      id: `${Date.now()}-${Math.random()}`,
      name: cleanName,
      text: cleanText,
      timestamp: Date.now(),
    }
    setMessages(prev => [...prev, msg])
    setText('')
  }

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id))
  }

  return (
    <section id="community" className="py-20 md:py-28 bg-gray-100/50 dark:bg-dark-surface/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="section-title text-gray-900 dark:text-white">Community</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Leave a message, feedback, or just say hi! Messages are stored locally in your browser.
          </p>
        </div>

        {/* Chat window */}
        <div className="rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card overflow-hidden shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg">
            <MessageSquare size={16} className="text-neon" />
            <span className="text-sm font-semibold text-gray-800 dark:text-white">Community Wall</span>
            <span className="ml-auto text-xs font-mono text-gray-400">{messages.length} message{messages.length !== 1 ? 's' : ''}</span>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto px-5 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-600 gap-2">
                <MessageSquare size={32} strokeWidth={1.2} />
                <p className="text-sm">No messages yet. Be the first to say something!</p>
              </div>
            )}
            {messages.map(msg => {
              const color = avatarColor(msg.name)
              return (
                <div key={msg.id} className="flex items-start gap-3 group">
                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-black"
                    style={{ background: color }}
                  >
                    {getInitial(msg.name)}
                  </div>
                  {/* Bubble */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{msg.name}</span>
                      <span className="text-xs text-gray-400 font-mono">{timeAgo(msg.timestamp)}</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words">{msg.text}</p>
                  </div>
                  {/* Delete (visible on hover) */}
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    title="Remove message"
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded text-gray-400 hover:text-red-400"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              )
            })}
            <div ref={bottomRef} />
          </div>

          {/* Composer */}
          <div className="border-t border-gray-200 dark:border-dark-border p-4">
            {error && (
              <p className="text-xs text-red-400 mb-2 font-mono">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                maxLength={40}
                className="w-full sm:w-32 px-3 py-2 rounded-lg text-sm border border-gray-200 dark:border-dark-border
                  bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-gray-200 placeholder-gray-400
                  focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-colors"
              />
              <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Write a message, feedback, or anything…"
                maxLength={500}
                className="flex-1 px-3 py-2 rounded-lg text-sm border border-gray-200 dark:border-dark-border
                  bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-gray-200 placeholder-gray-400
                  focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-colors"
              />
              <button
                type="submit"
                className="btn-neon px-4 py-2 rounded-lg text-sm flex items-center gap-1.5 justify-center"
              >
                <Send size={14} />
                Send
              </button>
            </form>
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-2 font-mono">
              Messages are saved in your browser's local storage.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
