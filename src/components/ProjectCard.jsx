import { Link } from 'react-router-dom'
import { ArrowUpRightIcon, GithubIcon } from './Icons'

export default function ProjectCard({ project }) {
  return (
    <article className={'project-card project-' + project.accent} data-project-card>
      <div className="project-card-meta">
        <span>{project.number}</span>
        <span>{project.category}</span>
      </div>

      <div className="project-preview" data-project-visual>
        <img src={project.preview} alt={'Interface preview for ' + project.title} loading="lazy" />
        <p>{project.outcome}</p>
        <span className="project-preview-cross" aria-hidden="true">+</span>
      </div>

      <div className="project-card-body" data-project-copy>
        <div>
          <h3>{project.title}</h3>
          <p className="project-description">{project.description}</p>
        </div>
        <div className="project-card-footer">
          <ul className="tech-list" aria-label={'Technologies used in ' + project.title}>
            {project.tech.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          <div className="project-links">
            <Link className="text-link" to={'/lab/' + project.slug}>
              View case study <ArrowUpRightIcon />
            </Link>
            <a
              className="icon-link"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={'Open ' + project.title + ' on GitHub'}
            >
              <GithubIcon />
              <span>Source</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
