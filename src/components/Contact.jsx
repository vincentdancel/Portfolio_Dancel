import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRightIcon,
  GithubIcon,
  InstagramIcon,
  MailIcon,
} from './Icons'
import useReducedMotion from '../hooks/useReducedMotion'
import SectionHeading from './SectionHeading'

gsap.registerPlugin(ScrollTrigger)

export default function Contact({ profile }) {
  const root = useRef(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion) return undefined

    const context = gsap.context(() => {
      gsap.from('[data-contact-reveal]', {
        y: 42,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 72%',
          once: true,
        },
      })
    }, root)

    return () => context.revert()
  }, [reducedMotion])

  return (
    <section id="contact" className="contact section-space" ref={root} aria-labelledby="contact-title">
      <div className="shell contact-panel">
        <div data-contact-reveal>
          <SectionHeading
            id="contact-title"
            number="06"
            eyebrow="Contact"
            title="Have an idea that deserves a little more momentum?"
          />
        </div>

        <div className="contact-bottom" data-contact-reveal>
          <div>
            <p className="contact-note">Drop a note. I am always happy to meet a good problem.</p>
            <a className="email-link" href={'mailto:' + profile.email}>
              <span>{profile.email}</span>
              <ArrowUpRightIcon size={32} />
            </a>
          </div>

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
        <p className="contact-watermark" aria-hidden="true" data-contact-reveal>
          LET&apos;S BUILD
        </p>
      </div>
    </section>
  )
}
