/**
 * Central profile configuration.
 *
 * PLACEHOLDERS — replace every value marked "PLACEHOLDER" before publishing.
 * The UI detects placeholder links and will not treat them as working links.
 */
export const profile = {
  name: 'Pavandeep B.',
  firstName: 'Pavandeep',
  lastName: 'B.',
  initials: 'PB',

  headline: 'Building useful things with technology.',
  heroIntro: 'I work across web applications, software testing and AI-powered projects.',
  description:
    'Information Science & Engineering graduate with hands-on experience in web application development, functional testing, API validation, debugging, and technical documentation. Interested in building reliable software products and AI-powered applications.',

  contact: {
    // Public address listed in the project READMEs; update in one place if it changes.
    email: 'pavandeep.net@gmail.com',
    linkedin: 'https://www.linkedin.com/in/pavandeepb',
    github: 'https://github.com/pavandeepb',
    location: '',
  },

  contactForm: {
    // Formspree form ID — the <id> in https://formspree.io/f/<id>.
    // Leave empty to keep the form in its explicit "not connected" state
    // (it never fakes a successful send).
    formspreeId: 'moejznjy',
  },

  resumeUrl: '/resume/Pavandeep-B-Resume.pdf',

  // Production origin — used for the case-study canonical URLs.
  // Also update the canonical/og:url tags in index.html if this changes.
  siteUrl: 'https://pavandeep.is-a.dev',

  currently: {
    label: 'Private R&D engagement',
    detail: 'Early-stage product prototype',
  },

  focus: ['Software products', 'Applied AI · validation'],

  about: {
    lede: 'I like the part of software that has to survive contact with real use — the flow behind the screen, the edge case in the API, the fix that needs to be verified.',
    paragraphs: [
      'My background spans web application development, functional testing, API validation, debugging, and technical documentation. I have worked with React.js, Node.js, Express.js, and MongoDB in an internship setting, and I am currently contributing to an early-stage product R&D prototype.',
      "That mix has shaped how I work: I don't just want a feature to render. I want to understand the flow around it, check where it breaks, and leave behind documentation that someone else can follow.",
      'I am especially interested in reliable product experiences and AI-powered applications. I am continuing to build depth in web development, testing, data technologies, and applied AI/ML through hands-on projects.',
    ],
    principles: [
      {
        title: 'Trace the flow',
        detail:
          'Understand the path a user, request, or document takes before changing a line.',
      },
      {
        title: 'Make it repeatable',
        detail:
          'Turn issues into clear reproduction steps; turn fixes into checks that stay useful.',
      },
      {
        title: 'Write it down',
        detail:
          'Documentation is part of the product, not a postscript added after it ships.',
      },
    ],
    learning: ['Web development', 'Testing & QA', 'Data & analytics', 'Applied AI/ML'],
  },

  principles: {
    headline: "The work isn't done when it runs. It's done when it holds up.",
  },
} as const

export type ContactField = 'email' | 'linkedin' | 'github'

export const PLACEHOLDER_EMAIL = 'your.email@example.com'
export const PLACEHOLDER_LINKEDIN = 'https://www.linkedin.com/in/your-profile'
export const PLACEHOLDER_GITHUB = 'https://github.com/your-username'

export function isPlaceholder(value: string): boolean {
  return (
    value === PLACEHOLDER_EMAIL ||
    value === PLACEHOLDER_LINKEDIN ||
    value === PLACEHOLDER_GITHUB ||
    value.trim().length === 0
  )
}

export function getEmailHref(): string | null {
  if (isPlaceholder(profile.contact.email)) return null
  // Gmail's prefilled compose page works in any browser, including machines
  // with no desktop mail client configured. The address itself is also shown
  // as text in the contact section.
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.contact.email)}`
}

export function getSocialHref(field: ContactField): string | null {
  const value = profile.contact[field]
  return isPlaceholder(value) ? null : value
}

export const linksPending =
  isPlaceholder(profile.contact.email) ||
  isPlaceholder(profile.contact.linkedin) ||
  isPlaceholder(profile.contact.github)
