import { Moon, Sun } from 'lucide-react'
import { cn } from '../lib/cn'
import { toggleTheme, useTheme } from '../lib/theme'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const theme = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn('icon-btn', className)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      {theme === 'dark' ? (
        <Sun size={17} strokeWidth={1.8} aria-hidden="true" />
      ) : (
        <Moon size={17} strokeWidth={1.8} aria-hidden="true" />
      )}
    </button>
  )
}
