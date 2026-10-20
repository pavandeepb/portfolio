import { FileText } from 'lucide-react'
import { certifications, education } from '../data/education'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function EducationSection() {
  return (
    <section id="education" className="section section-rule" aria-labelledby="education-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="education-title"
            index="05"
            label="Education"
            title="Education & credentials."
            intro="Formal background in information science, plus coursework and certifications."
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <ul className="border-t border-line">
              {education.map((entry) => (
                <li
                  key={entry.qualification}
                  className="grid gap-3 border-b border-line py-6 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6"
                >
                  <p className="mono pt-1 text-[10px] text-dim">{entry.period}</p>
                  <div>
                    <h3 className="text-base font-semibold tracking-[-0.015em] text-fg">
                      {entry.qualification}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted">{entry.institution}</p>
                    {entry.detail ? (
                      <span className="tag mt-3.5 inline-flex">{entry.detail}</span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={90}>
            <div className="card p-6 sm:p-7">
              <p className="eyebrow">
                <span className="eyebrow-mark" aria-hidden="true" />
                Certifications &amp; coursework
              </p>
              <ul className="mt-2 divide-y divide-line">
                {certifications.map((certification) => (
                  <li key={certification.title} className="flex gap-4 py-5 last:pb-0">
                    <FileText size={15} className="mt-0.5 shrink-0 text-dim" aria-hidden="true" />
                    <div>
                      <h3 className="text-sm font-medium leading-6 text-fg">
                        {certification.title}
                      </h3>
                      <p className="mt-1 text-[13px] text-muted">{certification.issuer}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-line pt-4 text-[11.5px] leading-5 text-dim">
                Dates and credential links are added once verification is complete.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
