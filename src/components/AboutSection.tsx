import { profile } from '../data/profile'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function AboutSection() {
  return (
    <section id="about" className="section section-rule" aria-labelledby="about-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="about-title"
            index="01"
            label="About"
            title="A product-minded engineer with a tester's eye."
            intro="Early-career, hands-on, and clear about what I know and what I am still learning."
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <p className="statement">{profile.about.lede}</p>
            <div className="mt-7 space-y-4">
              {profile.about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-7 text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <blockquote className="mt-8 border-l border-accent/45 pl-4 text-[15px] leading-7 text-muted">
              {profile.principles.headline}
            </blockquote>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={90}>
            <div className="card p-6 sm:p-7">
              <p className="eyebrow">
                <span className="eyebrow-mark" aria-hidden="true" />
                How I work
              </p>
              <ul className="mt-1 divide-y divide-line">
                {profile.about.principles.map((principle, index) => (
                  <li key={principle.title} className="py-5 last:pb-0">
                    <div className="flex gap-4">
                      <span className="mono pt-0.5 text-[10px] text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-fg">{principle.title}</h3>
                        <p className="mt-1.5 text-[13px] leading-6 text-muted">
                          {principle.detail}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7">
              <p className="eyebrow">
                <span className="eyebrow-mark" aria-hidden="true" />
                Continuing to learn
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.about.learning.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
