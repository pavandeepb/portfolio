import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

interface SectionHeadingProps {
  index: string
  label: string
  title: ReactNode
  intro?: string
  id: string
  className?: string
}

export function SectionHeading({ index, label, title, intro, id, className }: SectionHeadingProps) {
  return (
    <div className={cn('grid gap-8 md:grid-cols-12 md:items-end md:gap-6', className)}>
      <div className="md:col-span-7">
        <p className="eyebrow">
          <span className="eyebrow-num">{index}</span>
          <span className="eyebrow-mark" aria-hidden="true" />
          {label}
        </p>
        <h2 id={id} className="section-title mt-5">
          {title}
        </h2>
      </div>
      {intro ? (
        <p className="max-w-md text-sm leading-7 text-muted md:col-span-4 md:col-start-9 md:pb-1">
          {intro}
        </p>
      ) : null}
    </div>
  )
}
