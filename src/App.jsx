import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import useOpeningLoader from './hooks/useOpeningLoader'

const ProjectDemoPage = lazy(() => import('./pages/ProjectDemoPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  const { pathname } = useLocation()
  const loading = useOpeningLoader(pathname === '/')

  return (
    <div inert={loading} aria-busy={loading}>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage ready={!loading} />} />
          <Route path="/lab/:projectSlug" element={<ProjectDemoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}
