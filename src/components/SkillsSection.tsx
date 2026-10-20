import { skillGroups } from '../data/skills'
import { cn } from '../lib/cn'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function SkillsSection() {
  return (
    <section id="skills" className="section section-rule" aria-labelledby="skills-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="skills-title"
            index="04"
            label="Skills"
            title="Tools I work with."
            intro="Grouped by how I use them. No score bars or percentage claims — the projects and case studies are the evidence."
          />
        </Reveal>

        <Reveal className="mt-14">
          <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {skillGroups.map((group, index) => (
              <li
                key={group.title}
                className={cn(
                  'bg-ink p-6 sm:p-7 lg:p-8',
                  index === skillGroups.length - 1 && skillGroups.length % 2 !== 0 && 'sm:col-span-2',
                )}
              >
                <div className="flex items-baseline gap-3">
                  <span className="mono text-[10px] text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-sm font-semibold tracking-[-0.01em] text-fg">{group.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
