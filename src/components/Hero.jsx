import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowDownIcon, ArrowUpRightIcon } from './Icons'
import useReducedMotion from '../hooks/useReducedMotion'

export default function Hero({ profile }) {
  const root = useRef(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion) return undefined

    const context = gsap.context(() => {
      gsap.from('[data-hero-reveal]', {
        y: 30,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.1,
      })
      gsap.from('[data-orbit]', {
        scale: 0.7,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.35,
      })
    }, root)

    return () => context.revert()
  }, [reducedMotion])

  return (
    <section className="hero" ref={root} aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow" data-hero-reveal>
            <span className="live-dot" aria-hidden="true" />
            Available for thoughtful web work
          </p>
          <h1 id="hero-title" data-hero-reveal>
            Digital experiences
            <span>with intention.</span>
          </h1>
          <p className="hero-intro" data-hero-reveal>
            {profile.intro}
          </p>
          <div className="hero-actions" data-hero-reveal>
            <a className="button button-primary" href="#work">
              View my work <ArrowDownIcon />
            </a>
            <a
              className="button button-quiet"
              href={'mailto:' + profile.email}
            >
              Contact me <ArrowUpRightIcon />
            </a>
          </div>
          <div className="hero-meta" data-hero-reveal>
            <span>{profile.role}</span>
            <span>{profile.location}</span>
          </div>
        </div>
        <div className="hero-art" data-orbit>
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <div className="avatar-card">
            <div className="avatar-eyes" aria-hidden="true">
              <span />
              <span />
            </div>
            <div className="avatar-monogram" aria-label="VD monogram">
              VD
            </div>
            <div className="avatar-smile" aria-hidden="true" />
          </div>
          <div className="art-note note-top">clarity / curiosity</div>
          <div className="art-note note-bottom">React · motion · ML</div>
        </div>
      </div>
      <div className="shell scroll-cue" aria-hidden="true">
        <span>Scroll to explore</span>
        <i />
      </div>
    </section>
  )
}
