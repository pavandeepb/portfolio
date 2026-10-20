import type { CSSProperties } from 'react'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { getSocialHref, profile } from '../data/profile'
import { GitHubIcon } from './BrandIcons'
import { SectionLink } from './SectionLink'

const capabilities = [
  'Application development',
  'Functional testing',
  'API validation',
  'Technical documentation',
]

export function Hero() {
  const year = new Date().getFullYear()
  const githubHref = getSocialHref('github')

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-aurora pointer-events-none" aria-hidden="true" />
      <div className="hero-grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="shell relative">
        <div className="pt-[8.5rem] lg:pt-[10.5rem]">
          <div
            className="hero-enter flex items-center justify-between gap-4"
            style={{ '--enter-delay': '40ms' } as CSSProperties}
          >
            <p className="eyebrow">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              Software · Product · Applied AI
            </p>
            <p className="mono hidden text-[10px] text-dim sm:block">Portfolio / {year}</p>
          </div>

          <h1
            id="hero-title"
            className="hero-enter mt-8"
            style={{ '--enter-delay': '100ms' } as CSSProperties}
          >
            <span className="mono block text-[11px] tracking-[0.14em] text-dim">
              {profile.name}
            </span>
            <span className="mt-5 block max-w-[16ch] text-[clamp(2.7rem,7.2vw,5.9rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-fg">
              Building useful things with technology
              <span className="text-accent">.</span>
            </span>
          </h1>

          <div className="mt-12 grid gap-12 border-t border-line pt-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.6fr)] lg:gap-14">
            <div>
              <p
                className="hero-enter max-w-[52ch] text-[clamp(1.05rem,1.7vw,1.3rem)] font-medium leading-relaxed tracking-[-0.015em] text-muted"
                style={{ '--enter-delay': '180ms' } as CSSProperties}
              >
                {profile.heroIntro}
              </p>

              <div
                className="hero-enter mt-9 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center"
                style={{ '--enter-delay': '240ms' } as CSSProperties}
              >
                <SectionLink id="projects" className="btn btn-primary">
                  Explore my work
                  <ArrowUpRight size={16} aria-hidden="true" />
                </SectionLink>
                <a href={profile.resumeUrl} download className="btn btn-secondary">
                  <Download size={15} aria-hidden="true" />
                  Download resume
                  <span className="sr-only"> (PDF)</span>
                </a>
                {githubHref ? (
                  <a
                    href={githubHref}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                  >
                    <GitHubIcon className="size-4" />
                    GitHub
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            </div>

            <aside aria-label="Current focus" className="hero-enter" style={{ '--enter-delay': '300ms' } as CSSProperties}>
              <div className="card p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="mono text-[10px] text-dim">Currently</p>
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                </div>
                <p className="mt-4 text-[15px] font-medium leading-snug text-fg">
                  {profile.currently.label}
                </p>
                <p className="mt-1 text-[13px] text-muted">{profile.currently.detail}</p>

                <div className="mt-6 border-t border-line pt-5">
                  <p className="mono text-[10px] text-dim">Focus</p>
                  <ul className="mt-3 space-y-1.5">
                    {profile.focus.map((item) => (
                      <li key={item} className="text-[13px] leading-6 text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <blockquote className="mt-6 border-l border-accent/45 pl-4 text-[13px] leading-6 text-muted">
                  {profile.principles.headline}
                </blockquote>
              </div>
            </aside>
          </div>

          <div
            className="hero-enter mt-14 grid grid-cols-2 gap-px border-y border-line bg-line lg:grid-cols-4"
            style={{ '--enter-delay': '360ms' } as CSSProperties}
          >
            {capabilities.map((capability, index) => (
              <div key={capability} className="flex items-baseline gap-3 bg-ink px-1 py-5 sm:px-4">
                <span className="mono text-[9px] text-dim">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-[12px] font-medium leading-5 text-muted sm:text-[13px]">
                  {capability}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center pb-8 pt-10">
            <a
              href="#about"
              className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-dim transition-colors hover:text-fg"
            >
              Scroll to explore
              <ArrowDown
                size={13}
                className="transition-transform duration-300 group-hover:translate-y-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
