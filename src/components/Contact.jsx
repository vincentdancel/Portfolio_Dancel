import {
  ArrowUpRightIcon,
  GithubIcon,
  InstagramIcon,
  MailIcon,
} from './Icons'
import SectionHeading from './SectionHeading'

export default function Contact({ profile }) {
  return (
    <section id="contact" className="contact section-space" aria-labelledby="contact-title">
      <div className="shell">
        <div className="contact-panel">
          <SectionHeading
            number="03"
            eyebrow="Contact"
            title="Have a project, a question, or an idea worth exploring?"
          />
          <div className="contact-bottom">
            <a className="email-link" href={'mailto:' + profile.email}>
              {profile.email}
              <ArrowUpRightIcon size={28} />
            </a>
            <div className="social-links" aria-label="Social links">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="Vince Dancel on GitHub"
              >
                <GithubIcon />
                GitHub
              </a>
              <a href={'mailto:' + profile.email} aria-label="Email Vince Dancel">
                <MailIcon />
                Email
              </a>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Vince Dancel on Instagram"
              >
                <InstagramIcon />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
