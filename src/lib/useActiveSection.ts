import { useEffect, useState } from 'react'

const SECTION_IDS = ['about', 'experience', 'projects', 'skills', 'education', 'contact']

export function useActiveSection(enabled: boolean): string {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (!enabled) return

    let frame = 0

    const update = () => {
      frame = 0
      const threshold = window.scrollY + window.innerHeight * 0.32
      let current = ''

      for (const id of SECTION_IDS) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top + window.scrollY <= threshold) {
          current = id
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24

      if (atBottom) {
        current = SECTION_IDS[SECTION_IDS.length - 1] ?? ''
      }

      setActiveSection((previous) => (previous === current ? previous : current))
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [enabled])

  return enabled ? activeSection : ''
}
