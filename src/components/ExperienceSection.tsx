import { Check, LockKeyhole } from 'lucide-react'
import { experience } from '../data/experience'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section section-rule"
      aria-labelledby="experience-title"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="experience-title"
            index="02"
            label="Experience"
            title="Work so far."
            intro="A current R&D prototype engagement and a full stack development internship."
          />
        </Reveal>

        <div className="mt-14 border-b border-line">
          {experience.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 70}>
              <article className="grid gap-7 border-t border-line py-10 md:grid-cols-[170px_minmax(0,1fr)] md:gap-10 lg:py-12">
                <div>
                  <p className="mono text-[10px] text-dim">{entry.period}</p>
                  <p className="mt-2.5 text-[13px] text-muted">{entry.type}</p>
                  {entry.location ? (
                    <p className="mt-1 text-[12px] text-dim">{entry.location}</p>
                  ) : null}
                  {entry.current ? (
                    <span className="mt-3.5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-accent">
                      <span className="size-1 rounded-full bg-accent" aria-hidden="true" />
                      Current
                    </span>
                  ) : null}
                </div>

                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-medium tracking-[-0.03em] text-fg md:text-2xl">
                        {entry.role}
                      </h3>
                      <p className="mt-2 text-sm text-muted">{entry.company}</p>
                    </div>
                    {entry.current ? (
                      <span
                        className="text-dim"
                        title="Public details are limited while this engagement is private"
                      >
                        <LockKeyhole size={15} aria-hidden="true" />
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">{entry.summary}</p>

                  <ul className="mt-6 space-y-3">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <Check
                          size={14}
                          className="mt-[7px] shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-7 text-muted">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {entry.stack.map((item) => (
                      <li key={item} className="tag">
                        {item}
                      </li>
                    ))}
                  </ul>

                  {entry.note ? (
                    <p className="mt-7 border-l border-line pl-4 text-[12.5px] leading-6 text-dim">
                      {entry.note}
                    </p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
