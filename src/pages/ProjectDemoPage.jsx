import { Link, Navigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ProjectLinks from '../components/ProjectLinks'
import ProjectPreview from '../components/ProjectPreview'
import { findProject, profile } from '../data/portfolio'

export default function ProjectDemoPage() {
  const { projectSlug } = useParams()
  const project = findProject(projectSlug)

  if (!project) {
    return <Navigate to="/not-found" replace />
  }

  return (
    <>
      <Header />
      <main className="project-detail">
        <div className="shell">
          <Link className="back-link" to="/#work">
            ← Back to selected work
          </Link>
          <div className="detail-hero">
            <div>
              <p className="eyebrow">
                <span>{project.number}</span>
                {project.category}
              </p>
              <h1>{project.title}</h1>
              <p>{project.longDescription}</p>
            </div>
            <aside className="detail-meta">
              <span>Focus</span>
              <strong>{project.outcome}</strong>
              <span>Stack</span>
              <ul>
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </aside>
          </div>
          <section className="project-detail-preview" aria-labelledby="study-title">
            <div className="study-header">
              <p className="eyebrow">Project preview</p>
              <h2 id="study-title">A closer look at {project.title}.</h2>
            </div>
            <ProjectPreview project={project} />
          </section>
          <ProjectLinks project={project} variant="detail" />
        </div>
      </main>
      <Footer profile={profile} />
    </>
  )
}
