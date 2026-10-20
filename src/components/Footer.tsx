import { ArrowUp } from 'lucide-react'
import { getEmailHref, getSocialHref, profile } from '../data/profile'
import { scrollToPageTop } from '../lib/scroll'
import { SectionLink } from './SectionLink'
import { SocialLinks } from './SocialLinks'

const footerLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const elsewhere = [
  { label: 'Email', href: getEmailHref(), external: true },
  { label: 'LinkedIn', href: getSocialHref('linkedin'), external: true },
  { label: 'GitHub', href: getSocialHref('github'), external: true },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative grid size-8 place-items-center rounded-[9px] border border-line-strong bg-surface font-mono text-[10px]">
                {profile.initials}
                <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full border border-ink bg-accent" />
              </span>
              <p className="text-sm font-semibold">{profile.name}</p>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted">
              Information Science &amp; Engineering graduate working across application
              development, functional testing, API validation, and AI-powered applications.
            </p>
            <SocialLinks className="mt-6" />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <nav aria-label="Footer navigation">
              <p className="mono text-[10px] text-dim">Explore</p>
              <ul className="mt-4 space-y-2.5">
                {footerLinks.map((link) => (
                  <li key={link.id}>
                    <SectionLink id={link.id} className="footer-link">
                      {link.label}
                    </SectionLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="mono text-[10px] text-dim">Elsewhere</p>
              <ul className="mt-4 space-y-2.5">
                {elsewhere.map((item) =>
                  item.href ? (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="footer-link"
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                      >
                        {item.label}
                      </a>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <span
                        className="footer-link cursor-not-allowed opacity-45"
                        title={`Add the ${item.label} link in src/data/profile.ts`}
                        aria-disabled="true"
                      >
                        {item.label}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-dim">
            © {year} {profile.name} All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollToPageTop}
            className="inline-flex items-center gap-2 text-[12px] font-medium text-muted transition-colors hover:text-fg"
          >
            Back to top
            <ArrowUp size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
