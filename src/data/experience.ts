export interface ExperienceEntry {
  id: string
  role: string
  company: string
  period: string
  type: string
  location?: string
  summary: string
  highlights: string[]
  stack: string[]
  note?: string
  current?: boolean
}

export const experience: ExperienceEntry[] = [
  {
    id: 'product-rnd',
    role: 'Product R&D',
    company: 'Confidential startup',
    period: 'Ongoing',
    type: 'Prototype engagement',
    summary:
      'Contributing to an early-stage product prototype in a private R&D engagement. The work is hands-on and focused on how the product behaves, not on public-facing claims.',
    highlights: [
      'Supporting product functionality and interface behavior in an early-stage prototype.',
      'Testing implemented flows, reproducing issues, and documenting expected versus actual behavior.',
      'Assisting with debugging, verification, and technical documentation.',
    ],
    stack: ['Product development', 'Functional testing', 'Technical documentation'],
    note:
      'Details are intentionally limited. Company name, official role title, and dates remain private until disclosure is confirmed. This is a prototype-focused engagement, not a permanent full-time role.',
    current: true,
  },
  {
    id: 'suprmentr',
    role: 'Full Stack Developer Intern',
    company: 'SuprMentr Technologies Pvt. Ltd.',
    period: 'Jan 2026 — May 2026',
    type: 'Internship',
    location: 'Bengaluru, India',
    summary:
      'Worked across the front end and API layer of a MERN application, with a focus on testing behavior, validating data, and documenting issues clearly.',
    highlights: [
      'Worked with React.js, Node.js, Express.js, and MongoDB across application features.',
      'Tested application functionality and REST APIs.',
      'Reproduced and documented technical issues.',
      'Performed API and database validation using Postman and related tools.',
      'Assisted with debugging, fix verification, and technical documentation.',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Postman'],
  },
]
