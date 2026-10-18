import { lazy, Suspense, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRightIcon,
  GithubIcon,
  InstagramIcon,
  MailIcon,
} from './Icons'
import useReducedMotion from '../hooks/useReducedMotion'
import useNearViewport from '../hooks/useNearViewport'
import SectionHeading from './SectionHeading'

const LaserFlow = lazy(() => import('./LaserFlow'))

gsap.registerPlugin(ScrollTrigger)

export default function Contact({ profile }) {
  const root = useRef(null)
  const cardRef = useRef(null)
  const laserVisible = useNearViewport(root)
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
      <div className="contact-laser" aria-hidden="true">
        <Suspense fallback={null}>
          {laserVisible && (
            <LaserFlow
              surfaceRef={cardRef}
              beamPosition={0.6}
              color="#3847ff"
              intensity={1.8}
              flare={1.5}
              spread={1.5}
              spill={1}
              fog={0.2}
              dust={1.6}
              beamWidth={1.5}
              streaks={1.5}
              dots={1}
              pulse={1.5}
              speed={1.5}
              seed={3}
              mouseInteraction={!reducedMotion}
              intro={!reducedMotion}
              paused={reducedMotion}
            />
          )}
        </Suspense>
      </div>
      <div className="shell contact-panel" ref={cardRef}>
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
