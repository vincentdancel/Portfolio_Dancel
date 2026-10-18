import ProjectLinks from './ProjectLinks'
import ProjectPreview from './ProjectPreview'

export default function ProjectCard({ project }) {
  return (
    <article className={'project-card project-' + project.accent} data-project-card>
      <div className="project-card-meta">
        <span>{project.number}</span>
        <span>{project.category}</span>
      </div>

      <ProjectPreview project={project} />

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
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  )
}
