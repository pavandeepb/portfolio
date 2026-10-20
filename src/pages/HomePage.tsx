import { AboutSection } from '../components/AboutSection'
import { ContactSection } from '../components/ContactSection'
import { EducationSection } from '../components/EducationSection'
import { ExperienceSection } from '../components/ExperienceSection'
import { Hero } from '../components/Hero'
import { ProjectsSection } from '../components/ProjectsSection'
import { SkillsSection } from '../components/SkillsSection'

export function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </>
  )
}
