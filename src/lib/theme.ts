import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'pavandeep-theme'

const themeColor: Record<Theme, string> = {
  light: '#f5f5f7',
  dark: '#090a0c',
}

function isTheme(value: string | null | undefined): value is Theme {
  return value === 'light' || value === 'dark'
}

function apply(theme: Theme): void {
  document.documentElement.dataset.theme = theme

  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (meta) meta.content = themeColor[theme]
}

function readStored(): Theme | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return isTheme(value) ? value : null
  } catch {
    return null
  }
}

function readInitial(): Theme {
  // The inline script in index.html sets data-theme before first paint.
  const fromDocument = document.documentElement.dataset.theme
  if (isTheme(fromDocument)) return fromDocument
  return readStored() ?? 'light'
}

let current: Theme = readInitial()
const listeners = new Set<() => void>()

export function getTheme(): Theme {
  return current
}

export function setTheme(theme: Theme): void {
  if (theme === current) return
  current = theme

  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage can be unavailable (private mode); the toggle still works for the session.
  }

  apply(theme)
  for (const listener of listeners) listener()
}

export function toggleTheme(): void {
  setTheme(current === 'dark' ? 'light' : 'dark')
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getTheme, getTheme)
}
