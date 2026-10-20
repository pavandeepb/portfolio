export interface EducationEntry {
  qualification: string
  institution: string
  period: string
  detail?: string
}

export const education: EducationEntry[] = [
  {
    qualification: 'B.E. Information Science & Engineering',
    institution: 'Bapuji Institute of Engineering & Technology',
    period: '2022 — 2026',
    detail: 'CGPA 7.67 / 10',
  },
  {
    qualification: 'PUC Science (PCMB)',
    institution: 'Vision PU College',
    period: '2019 — 2021',
  },
  {
    qualification: 'School',
    institution: 'Vidyadayini School, Harihar',
    period: '2018 — 2019',
  },
]

export interface CertificationEntry {
  title: string
  issuer: string
  /** Add a verified date and credential URL only after confirming them. */
  date?: string
  credentialUrl?: string
}

export const certifications: CertificationEntry[] = [
  {
    title: 'AI/ML for Geodata Analytics',
    issuer: 'ISRO / IIRS',
  },
  {
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services',
  },
  {
    title: 'Microsoft Power BI',
    issuer: 'Microsoft',
  },
]
