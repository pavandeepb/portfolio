import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSection } from '../lib/scroll'

export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    const id = decodeURIComponent(hash.slice(1))
    const frame = window.requestAnimationFrame(() => scrollToSection(id))

    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
