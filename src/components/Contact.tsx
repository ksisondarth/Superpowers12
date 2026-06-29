import { Mail, Globe, MessageCircle, MapPin, Download } from 'lucide-react'
import { personal } from '../data/portfolioData'

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
    external: false,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: personal.phone,
    href: `https://wa.me/${personal.whatsapp.replace('+', '')}`,
    external: true,
    badge: 'Message Now',
  },
  {
    icon: Globe,
    label: 'Website',
    value: 'keansison.com',
    href: personal.website,
    external: true,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: personal.location,
    href: null,
    external: false,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-light-surface dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Section header */}
        <div className="mb-16">
          <span className="section-label">Get in touch</span>
          <h2 className="section-heading">Contact</h2>
          <span className="accent-rule" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Left — intro */}
          <div>
            <p className="text-light-sub dark:text-dark-sub text-base md:text-[1.05rem]
              leading-[1.85] mb-6 max-w-md">
              Ready to automate your workflows, build a custom AppSheet system, or modernize your
              business operations? I'd love to connect.
            </p>
            <p className="text-sm text-light-muted dark:text-dark-muted mb-10">
              Based in{' '}
              <span className="font-mono text-accent-light dark:text-accent">{personal.location}</span>
              {' '}— available for remote work worldwide.
            </p>

            <a
              href={personal.cvPdf}
              download="Keanu_Niccolo_Sison_CV.pdf"
              className="btn-primary w-fit"
            >
              <Download size={15} strokeWidth={2} />
              Download CV (PDF)
            </a>
          </div>

          {/* Right — contact rows */}
          <div className="space-y-3">
            {contacts.map(item => {
              const Icon = item.icon
              return (
                <div key={item.label}
                  className="card px-5 py-4 flex items-center gap-4 group">

                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                    bg-green-50 dark:bg-accent/10">
                    <Icon size={16} strokeWidth={1.8} className="text-accent-light dark:text-accent" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-2xs font-mono text-light-muted dark:text-dark-muted uppercase tracking-wide mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="text-sm font-medium text-light-text dark:text-dark-text
                          hover:text-accent-light dark:hover:text-accent transition-colors truncate block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-light-text dark:text-dark-text">{item.value}</p>
                    )}
                  </div>

                  {'badge' in item && item.badge && (
                    <span className="text-2xs font-mono px-2.5 py-1 rounded-full whitespace-nowrap
                      bg-green-50 dark:bg-accent/10
                      text-accent-light dark:text-accent
                      border border-green-200 dark:border-accent/20">
                      {item.badge}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
