import { Link } from 'react-router-dom'
import { ArrowUpRightIcon, GithubIcon } from './Icons'

export default function ProjectCard({ project }) {
  return (
    <article className={'project-card project-' + project.accent}>
      <div className="project-preview">
        <img
          src={project.preview}
          alt={'Interface preview for ' + project.title}
          loading="lazy"
        />
        <p>{project.category}</p>
      </div>
      <div className="project-card-body">
        <div className="project-card-topline">
          <span>{project.number}</span>
          <span>{project.outcome}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <ul className="tech-list" aria-label={'Technologies used in ' + project.title}>
          {project.tech.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="project-links">
          <Link className="text-link" to={'/lab/' + project.slug}>
            Interactive preview <ArrowUpRightIcon />
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
    </article>
  )
}
