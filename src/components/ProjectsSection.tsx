import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { cn } from '../lib/cn'
import { GitHubIcon } from './BrandIcons'
import { ProjectVisual } from './ProjectVisual'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function ProjectsSection() {
  return (
    <section id="projects" className="section section-rule" aria-labelledby="projects-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="projects-title"
            index="03"
            label="Projects"
            title="Selected projects."
            intro="Three public repositories, described with their real scope: what was implemented, how it was tested, and where the limits are."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => {
            const featured = index === 0

            return (
              <Reveal
                key={project.slug}
                className={cn('h-full', featured && 'lg:col-span-2')}
                delay={index * 60}
              >
                <article
                  className={cn(
                    'project-card group h-full',
                    featured && 'lg:grid lg:grid-cols-[1.04fr_0.96fr]',
                  )}
                >
                  <div
                    className={cn(
                      'project-visual flex items-center justify-center',
                      featured ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[400px]' : 'aspect-[16/11]',
                    )}
                  >
                    <span className="mono absolute left-4 top-4 z-10 text-[9px] text-dim">
                      {project.index}
                    </span>
                    <span className="mono absolute bottom-3.5 right-4 z-10 hidden text-[9px] text-dim sm:block">
                      {project.figure ? project.figure.cardCaption : project.visualCaption}
                    </span>
                    {project.figure ? (
                      <div className="project-media">
                        <img
                          src={project.figure.src}
                          alt={project.figure.alt}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : (
                      <div className="project-visual-inner w-full p-4 sm:p-7 lg:p-8">
                        <ProjectVisual type={project.visual} />
                      </div>
                    )}
                  </div>

                  <div className={cn('flex flex-1 flex-col', featured ? 'p-6 sm:p-8 lg:p-10' : 'p-6 sm:p-7')}>
                    <div className="flex items-center justify-between gap-4">
                      <span className="mono text-[10px] text-dim">{project.category}</span>
                      <ArrowUpRight
                        size={18}
                        className="project-arrow text-dim transition-all duration-300"
                        aria-hidden="true"
                      />
                    </div>

                    <h3
                      className={cn(
                        'mt-5 font-medium tracking-[-0.03em] text-fg',
                        featured ? 'text-2xl sm:text-[1.75rem]' : 'text-xl sm:text-2xl',
                      )}
                    >
                      {project.name}
                    </h3>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{project.summary}</p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {(featured ? project.tags : project.tags.slice(0, 4)).map((tag) => (
                        <li key={tag} className="tag">
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-8">
                      <Link
                        to={`/work/${project.slug}`}
                        aria-label={`Read the case study for ${project.name}`}
                        className="relative inline-flex items-center gap-2 text-[13px] font-medium text-fg transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
                      >
                        Read case study
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>

                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open the ${project.name} repository on GitHub`}
                          className="relative z-10 inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[12px] font-medium text-muted transition-colors hover:border-accent/40 hover:text-fg"
                        >
                          <GitHubIcon className="h-3.5 w-3.5" />
                          Repository
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
