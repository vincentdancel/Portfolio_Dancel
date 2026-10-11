import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProjectDemoPage from './pages/ProjectDemoPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lab/:projectSlug" element={<ProjectDemoPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
