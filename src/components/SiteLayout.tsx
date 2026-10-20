import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function SiteLayout() {
  return (
    <div className="relative min-h-dvh">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
