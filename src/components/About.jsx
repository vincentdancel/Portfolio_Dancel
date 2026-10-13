import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion'
import SectionHeading from './SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const focusAreas = [
  'Interface design',
  'React foundations',
  'Motion systems',
  'Machine learning',
]

export default function About({ profile }) {
  const root = useRef(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion) return undefined

    const context = gsap.context(() => {
      gsap.from('[data-about-intro]', {
        y: 52,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 68%',
          once: true,
        },
      })

      gsap.from('[data-about-item]', {
        x: 28,
        autoAlpha: 0,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '[data-about-list]',
          start: 'top 78%',
          once: true,
        },
      })
    }, root)

    return () => context.revert()
  }, [reducedMotion])

  return (
    <section id="about" className="about section-space" ref={root} aria-labelledby="about-title">
      <div className="shell">
        <SectionHeading
          id="about-title"
          number="03"
          eyebrow="A little about me"
          title="Thoughtful systems, expressive details, and a reason behind every motion."
        />

        <div className="about-layout">
          <div className="about-statement" data-about-intro>
            <p className="about-role">{profile.role}</p>
            <p>
              I make digital work that stays clear at speed. The aim is a visual language that
              earns attention, then makes the next step feel natural.
            </p>
          </div>

          <div className="about-copy" data-about-intro>
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className="focus-card" data-about-list aria-label="Current focus areas">
            <p className="card-label">Current focus</p>
            <ul>
              {focusAreas.map((area, index) => (
                <li key={area} data-about-item>
                  <span>0{index + 1}</span>
                  <strong>{area}</strong>
                  <i aria-hidden="true">↗</i>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
