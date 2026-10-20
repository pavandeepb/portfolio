import type { ComponentType } from 'react'
import { Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './BrandIcons'
import { getEmailHref, getSocialHref } from '../data/profile'
import { cn } from '../lib/cn'

type SocialKey = 'linkedin' | 'github' | 'email'

interface SocialItem {
  key: SocialKey
  label: string
  href: string | null
  Icon: ComponentType<{ className?: string }>
  external: boolean
}

const socialItems: SocialItem[] = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: getSocialHref('linkedin'),
    Icon: LinkedInIcon,
    external: true,
  },
  {
    key: 'github',
    label: 'GitHub',
    href: getSocialHref('github'),
    Icon: GitHubIcon,
    external: true,
  },
  {
    key: 'email',
    label: 'Email',
    href: getEmailHref(),
    Icon: Mail,
    external: true,
  },
]

interface SocialLinksProps {
  className?: string
  iconClassName?: string
}

export function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {socialItems.map(({ key, label, href, Icon, external }) => {
        if (!href) {
          return (
            <span
              key={key}
              className={cn('icon-btn', iconClassName)}
              aria-disabled="true"
              aria-label={`${label} link not configured`}
              title={`${label} link not configured — add it in src/data/profile.ts`}
            >
              <Icon className="size-[17px] shrink-0" />
              <span className="sr-only">{label} link not configured</span>
            </span>
          )
        }

        return (
          <a
            key={key}
            href={href}
            className={cn('icon-btn', iconClassName)}
            aria-label={label}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            <Icon className="size-[17px] shrink-0" />
          </a>
        )
      })}
    </div>
  )
}
