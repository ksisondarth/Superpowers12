import { Mail, Globe, MessageCircle, MapPin, Download } from 'lucide-react'
import { personal } from '../data/portfolioData'

const contacts = [
  {
    icon: <Mail size={18} className="text-neon" />,
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    icon: <MessageCircle size={18} className="text-neon" />,
    label: 'WhatsApp',
    value: personal.phone,
    href: `https://wa.me/${personal.whatsapp.replace('+', '')}`,
    external: true,
  },
  {
    icon: <Globe size={18} className="text-neon" />,
    label: 'Website',
    value: 'keansison.com',
    href: personal.website,
    external: true,
  },
  {
    icon: <MapPin size={18} className="text-neon" />,
    label: 'Location',
    value: personal.location,
    href: null,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="section-title text-gray-900 dark:text-white">Contact</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Let's Work Together</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left — intro */}
          <div>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
              Ready to automate your workflows, build a custom AppSheet system, or modernize your business operations?
              I'd love to hear from you.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
              Based in <span className="text-neon font-mono">{personal.location}</span> and available for remote work worldwide.
            </p>

            {/* Download CV CTA */}
            <a
              href={personal.cvPdf}
              download="Keanu_Niccolo_Sison_CV.pdf"
              className="btn-neon w-fit"
            >
              <Download size={16} />
              Download My CV (PDF)
            </a>
          </div>

          {/* Right — contact cards */}
          <div className="grid gap-3">
            {contacts.map(item => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-dark-border
                  bg-white dark:bg-dark-card hover:border-neon/50 transition-all duration-300
                  hover:shadow-[0_0_15px_rgba(57,255,20,0.08)] group"
              >
                <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono text-gray-400 dark:text-gray-500">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-neon transition-colors truncate block"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.value}</p>
                  )}
                </div>
                {item.label === 'WhatsApp' && (
                  <span className="ml-auto text-xs bg-neon/10 text-neon border border-neon/20 px-2 py-0.5 rounded-full font-mono whitespace-nowrap">
                    Chat Now
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
