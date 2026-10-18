import { ArrowUpRightIcon, GithubIcon } from './Icons'

export default function ProjectLinks({ project, variant = 'card' }) {
  return (
    <div className={variant === 'detail' ? 'detail-actions' : 'project-links'}>
      {project.links.map((link, index) => (
        <a
          key={link.label}
          className={variant === 'detail'
            ? 'button ' + (index === 0 ? 'button-primary' : 'button-quiet')
            : link.icon === 'github' ? 'icon-link' : 'text-link'}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label + ' for ' + project.title + ' (opens in a new tab)'}
        >
          <span>{link.label}</span>
          {link.icon === 'github' ? <GithubIcon /> : <ArrowUpRightIcon />}
        </a>
      ))}
    </div>
  )
}
