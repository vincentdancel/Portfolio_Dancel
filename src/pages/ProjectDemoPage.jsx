import { Link, Navigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LabDemo from '../components/LabDemo'
import { ArrowUpRightIcon, GithubIcon } from '../components/Icons'
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
          <section className="interactive-study" aria-labelledby="study-title">
            <div className="study-header">
              <p className="eyebrow">Interactive study</p>
              <h2 id="study-title">A small interface exploration inspired by the project.</h2>
            </div>
            <LabDemo project={project} />
          </section>
          <div className="detail-actions">
            <a
              className="button button-primary"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              View source <GithubIcon />
            </a>
            <Link className="button button-quiet" to="/#contact">
              Start a conversation <ArrowUpRightIcon />
            </Link>
          </div>
        </div>
      </main>
      <Footer profile={profile} />
    </>
  )
}
