import type { MouseEvent, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { scrollToPageTop, scrollToSection } from '../lib/scroll'

interface SectionLinkProps {
  id: string
  children: ReactNode
  className?: string
  onNavigate?: () => void
  current?: boolean
}

export function SectionLink({ id, children, className, onNavigate, current }: SectionLinkProps) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) {
      onNavigate?.()
      return
    }

    event.preventDefault()

    if (id === 'top') {
      scrollToPageTop()
      window.history.replaceState(null, '', window.location.pathname)
    } else {
      scrollToSection(id)
      window.history.replaceState(null, '', `#${id}`)
    }

    onNavigate?.()
  }

  const href = isHome ? (id === 'top' ? '/' : `#${id}`) : `/#${id}`

  return (
    <Link
      to={href}
      onClick={handleClick}
      className={className}
      aria-current={current ? 'location' : undefined}
      data-active={current ? 'true' : 'false'}
    >
      {children}
    </Link>
  )
}
