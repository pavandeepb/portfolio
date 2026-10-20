import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScrollManager } from './components/ScrollManager'
import { SiteLayout } from './components/SiteLayout'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="work/:slug" element={<CaseStudyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
