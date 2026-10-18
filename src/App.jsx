import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProjectDemoPage from './pages/ProjectDemoPage'
import NotFoundPage from './pages/NotFoundPage'
import useOpeningLoader from './hooks/useOpeningLoader'

export default function App() {
  const { pathname } = useLocation()
  const { loading, onBackgroundReady } = useOpeningLoader(pathname === '/')

  return (
    <div inert={loading} aria-busy={loading}>
      <Routes>
        <Route path="/" element={<HomePage ready={!loading} onBackgroundReady={onBackgroundReady} />} />
        <Route path="/lab/:projectSlug" element={<ProjectDemoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}
