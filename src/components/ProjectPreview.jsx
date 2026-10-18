export default function ProjectPreview({ project }) {
  return (
    <div className="project-preview" data-project-visual>
      {project.preview ? (
        <img src={project.preview} alt={'Screenshot of ' + project.title} loading="lazy" />
      ) : (
        <div
          className="project-preview-placeholder"
          role="img"
          aria-label={'Screenshot or GIF placeholder for ' + project.title}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <rect x="7" y="11" width="50" height="42" rx="5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="23" cy="25" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="m8 45 14-11 10 8 11-14 14 17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <span>Screenshot / GIF</span>
          <strong>Preview coming soon</strong>
        </div>
      )}
      <span className="project-preview-cross" aria-hidden="true">+</span>
    </div>
  )
}
