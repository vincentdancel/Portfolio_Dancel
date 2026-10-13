import { GithubIcon, InstagramIcon } from './Icons'

export default function Footer({ profile }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p>© {new Date().getFullYear()} {profile.shortName}</p>
        <p>Designed and built with intention.</p>
        <div>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon size={18} />
          </a>
          <a href={profile.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <InstagramIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
