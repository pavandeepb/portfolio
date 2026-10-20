import { useEffect, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getProject, projects, type DetailItem, type Project } from '../data/projects'
import { profile } from '../data/profile'
import { cn } from '../lib/cn'
import { SectionLink } from '../components/SectionLink'
import { ProjectVisual } from '../components/ProjectVisual'
import { NotFoundPage } from './NotFoundPage'

const contents = [
  { id: 'overview', index: '01', label: 'Overview' },
  { id: 'problem', index: '02', label: 'Problem' },
  { id: 'contribution', index: '03', label: 'My contribution' },
  { id: 'approach', index: '04', label: 'Technical approach' },
  { id: 'decisions', index: '05', label: 'Decisions' },
  { id: 'challenges', index: '06', label: 'Challenges' },
  { id: 'validation', index: '07', label: 'Validation' },
  { id: 'outcomes', index: '08', label: 'Outcomes' },
  { id: 'stack', index: '09', label: 'Stack & links' },
]

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined

  useEffect(() => {
    if (!project) return

    const previousTitle = document.title
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = description?.getAttribute('content') ?? ''
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const previousCanonical = canonical?.getAttribute('href') ?? ''

    document.title = `${project.name} — Pavandeep B.`
    description?.setAttribute('content', project.summary)
    canonical?.setAttribute('href', `${profile.siteUrl}/work/${project.slug}`)

    return () => {
      document.title = previousTitle
      if (description) description.setAttribute('content', previousDescription)
      if (canonical) canonical.setAttribute('href', previousCanonical)
    }
  }, [project])

  if (!project) {
    return <NotFoundPage />
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug)
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <article>
      <header className="shell pt-[7.5rem] lg:pt-[9.5rem]">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-[12px] font-medium text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          All projects
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <p className="eyebrow">
              <span className="eyebrow-num">{project.index}</span>
              <span className="eyebrow-mark" aria-hidden="true" />
              {project.category}
            </p>
            <h1 className="mt-5 max-w-3xl text-[clamp(2.1rem,5vw,3.9rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-fg">
              {project.name}
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-muted sm:text-base">
              {project.summary}
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <dl className="grid content-start gap-5 border-t border-line pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1">
            <MetaRow label="Role" value={project.role} />
            <MetaRow label="Focus" value={project.focus} />
            <MetaRow label="Type" value={project.status} />
            <MetaRow
              label="Repository"
              value={project.repoUrl ? 'Published' : 'Not published yet'}
            />
          </dl>
        </div>
      </header>

      <div className="shell mt-14 lg:mt-16">
        <figure className="overflow-hidden rounded-xl border border-line bg-surface">
          <div className="project-visual">
            <div className="project-visual-inner p-5 sm:p-9 lg:p-11">
              {project.figure ? (
                <img
                  src={project.figure.src}
                  alt={project.figure.alt}
                  className="mx-auto h-auto w-auto max-w-full rounded-lg border border-line max-h-[540px]"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <ProjectVisual type={project.visual} />
              )}
            </div>
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-5 py-3.5">
            <span className="mono text-[9px] text-dim">
              {project.figure ? project.figure.caption : project.visualCaption}
            </span>
            <span className="mono text-[9px] text-dim">
              {project.figure ? 'Figure — public project repository' : 'Diagram — not a screenshot'}
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="shell mt-16 lg:mt-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,210px)_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Case study contents" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="mono text-[10px] text-dim">Contents</p>
              <ul className="mt-4 space-y-1">
                {contents.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="contents-link">
                      {section.index} — {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="prose-case max-w-3xl">
            <CaseSection id="overview" index="01" title="Overview">
              {project.caseStudy.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </CaseSection>

            <CaseSection id="problem" index="02" title="Problem">
              {project.caseStudy.problem.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </CaseSection>

            <CaseSection id="contribution" index="03" title="My contribution">
              {project.caseStudy.contribution.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </CaseSection>

            <CaseSection id="approach" index="04" title="Technical approach">
              <DetailList items={project.caseStudy.approach} />
            </CaseSection>

            <CaseSection id="decisions" index="05" title="Implementation decisions">
              <DetailList items={project.caseStudy.decisions} />
            </CaseSection>

            <CaseSection id="challenges" index="06" title="Challenges">
              <DetailList items={project.caseStudy.challenges} />
            </CaseSection>

            <CaseSection id="validation" index="07" title="Testing & validation">
              <CheckList items={project.caseStudy.validation} />
            </CaseSection>

            <CaseSection id="outcomes" index="08" title="Verified outcomes">
              <CheckList items={project.caseStudy.outcomes} />
            </CaseSection>

            <CaseSection id="stack" index="09" title="Stack & links">
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
              <ProjectLinks project={project} />
            </CaseSection>
          </div>
        </div>
      </div>

      <div className="shell mt-16 lg:mt-20">
        <nav aria-label="More projects" className="border-t border-line pt-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {previousProject ? (
              <ProjectNavCard project={previousProject} direction="previous" />
            ) : (
              <span aria-hidden="true" />
            )}
            {nextProject ? <ProjectNavCard project={nextProject} direction="next" /> : null}
          </div>
        </nav>
      </div>

      <div className="shell mt-16 pb-20 lg:mt-20">
        <div className="flex flex-col gap-6 rounded-xl border border-line bg-surface p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-mark" aria-hidden="true" />
              Next step
            </p>
            <p className="mt-3 text-lg font-medium tracking-[-0.02em] text-fg">
              Questions about this project, or want to work together?
            </p>
          </div>
          <SectionLink id="contact" className="btn btn-primary shrink-0">
            Get in touch
            <ArrowUpRight size={15} aria-hidden="true" />
          </SectionLink>
        </div>
      </div>
    </article>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mono text-[10px] text-dim">{label}</dt>
      <dd className="mt-1.5 text-[13px] leading-6 text-muted">{value}</dd>
    </div>
  )
}

interface CaseSectionProps {
  id: string
  index: string
  title: string
  children: ReactNode
}

function CaseSection({ id, index, title, children }: CaseSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mt-12 scroll-mt-28 border-t border-line pt-10 first:mt-0 first:border-t-0 first:pt-0"
    >
      <p className="eyebrow">
        <span className="eyebrow-num">{index}</span>
        <span className="eyebrow-mark" aria-hidden="true" />
        Section
      </p>
      <h2
        id={`${id}-title`}
        className="mt-4 text-[1.6rem] font-medium tracking-[-0.03em] text-fg"
      >
        {title}
      </h2>
      <div className="mt-6 space-y-4">{children}</div>
    </section>
  )
}

function DetailList({ items }: { items: DetailItem[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <li key={item.title} className="grid gap-2 py-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6">
          <h3 className="text-sm font-semibold leading-6 text-fg">{item.title}</h3>
          <p className="text-sm leading-7 text-muted">{item.detail}</p>
        </li>
      ))}
    </ul>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check size={14} className="mt-[7px] shrink-0 text-accent" aria-hidden="true" />
          <span className="text-sm leading-7 text-muted">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ProjectLinks({ project }: { project: Project }) {
  const hasLinks = Boolean(project.repoUrl || project.demoUrl)

  if (!hasLinks) {
    return (
      <p className="mt-6 rounded-lg border border-line bg-surface p-4 text-[12.5px] leading-6 text-dim">
        The repository and demo are not published yet. This case study describes only the
        implemented scope; links can be added in{' '}
        <code className="rounded bg-raised px-1.5 py-0.5 font-mono text-[11px] text-muted">
          src/data/projects.ts
        </code>{' '}
        once they are available publicly.
      </p>
    )
  }

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {project.repoUrl ? (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Repository
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      ) : null}
      {project.demoUrl ? (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Live demo
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      ) : null}
    </div>
  )
}

interface ProjectNavCardProps {
  project: Project
  direction: 'previous' | 'next'
}

function ProjectNavCard({ project, direction }: ProjectNavCardProps) {
  const isNext = direction === 'next'

  return (
    <Link
      to={`/work/${project.slug}`}
      className={cn(
        'group rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent/40',
        isNext && 'sm:text-right',
      )}
    >
      <span
        className={cn(
          'flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-dim',
          isNext && 'sm:justify-end',
        )}
      >
        {isNext ? null : <ArrowLeft size={13} aria-hidden="true" />}
        {isNext ? 'Next project' : 'Previous project'}
        {isNext ? <ArrowRight size={13} aria-hidden="true" /> : null}
      </span>
      <span className="mt-3 block text-lg font-medium tracking-[-0.02em] text-fg transition-colors group-hover:text-accent">
        {project.name}
      </span>
    </Link>
  )
}
