import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '../data/profile'
import { useActiveSection } from '../lib/useActiveSection'
import { cn } from '../lib/cn'
import { scrollToSection } from '../lib/scroll'
import { SectionLink } from './SectionLink'
import { SocialLinks } from './SocialLinks'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const activeSection = useActiveSection(isHome)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className="site-header fixed inset-x-0 top-0 z-50" data-scrolled={scrolled}>
        <div className="shell flex h-[74px] items-center justify-between gap-6">
          <SectionLink id="top" className="group flex shrink-0 items-center gap-3">
            <span className="relative grid size-8 place-items-center rounded-[9px] border border-line-strong bg-surface font-mono text-[10px] tracking-[0.04em] text-fg transition-colors group-hover:border-accent/70">
              {profile.initials}
              <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full border border-ink bg-accent" />
            </span>
            <span className="text-sm font-semibold tracking-[-0.015em] text-fg">
              {profile.name}
            </span>
          </SectionLink>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-7">
              {navItems.map((item) => (
                <li key={item.id}>
                  <SectionLink
                    id={item.id}
                    className="nav-link"
                    current={activeSection === item.id}
                  >
                    {item.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <a
              href={profile.resumeUrl}
              download
              className="btn btn-secondary btn-compact hidden sm:inline-flex"
            >
              <Download size={14} aria-hidden="true" />
              Resume
              <span className="sr-only"> (PDF download)</span>
            </a>
            <button
              type="button"
              className="icon-btn lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? <MobileMenu activeSection={activeSection} onClose={closeMenu} /> : null}
    </>
  )
}

interface MobileMenuProps {
  activeSection: string
  onClose: () => void
}

function MobileMenu({ activeSection, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const panel = panelRef.current
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panel) return

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null)

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [onClose])

  const handleHomeLink = (event: MouseEvent<HTMLAnchorElement>) => {
    onClose()

    if (window.location.pathname === '/') {
      event.preventDefault()
      window.history.replaceState(null, '', '/')
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
      })
    }
  }

  const navigateToSection = (id: string, event: MouseEvent<HTMLAnchorElement>) => {
    onClose()

    if (window.location.pathname !== '/') return

    event.preventDefault()
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scrollToSection(id))
    })
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <div
      id="mobile-navigation"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="menu-in fixed inset-0 z-[60] flex h-dvh flex-col overflow-y-auto bg-ink lg:hidden"
    >
      <div className="shell flex h-[74px] shrink-0 items-center justify-between border-b border-line">
        <Link
          to="/"
          onClick={handleHomeLink}
          className="flex items-center gap-3"
          aria-label="Pavandeep B. — home"
        >
          <span className="relative grid size-8 place-items-center rounded-[9px] border border-line-strong bg-surface font-mono text-[10px] tracking-[0.04em]">
            {profile.initials}
            <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full border border-ink bg-accent" />
          </span>
          <span className="text-sm font-semibold">{profile.name}</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <ThemeToggle className="border-line" />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="icon-btn border-line"
            aria-label="Close navigation menu"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav aria-label="Mobile" className="shell flex-1 py-6">
        <ul className="border-t border-line">
          {navItems.map((item, index) => (
            <li key={item.id} className="border-b border-line">
              <a
                href={`#${item.id}`}
                onClick={(event) => {
                  navigateToSection(item.id, event)
                }}
                data-active={activeSection === item.id ? 'true' : 'false'}
                aria-current={activeSection === item.id ? 'location' : undefined}
                className="group flex items-baseline justify-between gap-6 py-5 text-[1.65rem] font-medium tracking-[-0.03em] text-fg transition-colors hover:text-accent"
              >
                <span className="flex items-baseline gap-4">
                  <span className="mono text-[10px] text-dim">{String(index + 1).padStart(2, '0')}</span>
                  {item.label}
                </span>
                <span
                  className={cn(
                    'size-1.5 rounded-full transition-colors',
                    activeSection === item.id ? 'bg-accent' : 'bg-transparent',
                  )}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-4">
          <a href={profile.resumeUrl} download className="btn btn-primary w-full">
            <Download size={16} aria-hidden="true" />
            Download resume
            <span className="sr-only"> (PDF)</span>
          </a>
          <div className="flex items-center justify-between gap-4 pt-1">
            <p className="mono max-w-[180px] text-[10px] leading-relaxed text-dim">
              Software &amp; product engineering
              <br />
              AI-powered applications
            </p>
            <SocialLinks />
          </div>
        </div>
      </nav>
    </div>
  )
}
