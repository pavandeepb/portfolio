export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollToSection(id: string): void {
  const element = document.getElementById(id)

  if (!element) return

  const headerOffset = 76
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset

  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}

export function scrollToPageTop(): void {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}
