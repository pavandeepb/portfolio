import { cn } from '../lib/cn'

type BrandMarkProps = {
  className?: string
}

/**
 * Brand badge: the "P" monogram shown in the navbar, mobile menu and footer.
 * The artwork carries its own dark background, so the badge only adds the
 * hairline border and the accent presence dot.
 */
export function BrandMark({ className }: BrandMarkProps) {
  return (
    <span
      className={cn(
        'relative grid size-8 shrink-0 place-items-center rounded-[9px] border border-line-strong bg-surface transition-colors',
        className,
      )}
    >
      <img
        src="/mark-96.png"
        width={96}
        height={96}
        alt=""
        className="size-full rounded-[8px] object-cover"
        aria-hidden="true"
      />
      <span
        className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full border border-ink bg-accent"
        aria-hidden="true"
      />
    </span>
  )
}
