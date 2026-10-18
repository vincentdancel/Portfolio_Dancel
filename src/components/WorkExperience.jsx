import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { workExperience } from '../data/experience'
import useReducedMotion from '../hooks/useReducedMotion'
import SectionHeading from './SectionHeading'
import SpotlightCard from './SpotlightCard'
import './WorkExperience.css'

gsap.registerPlugin(ScrollTrigger)

export default function WorkExperience() {
  const root = useRef(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion) return undefined

    const context = gsap.context(() => {
      const timeline = root.current.querySelector('.experience-timeline')

      gsap.from('.experience-heading .section-heading > *, .experience-range', {
        y: 24,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.experience-heading',
          start: 'top 85%',
          once: true,
        },
      })

      gsap.fromTo(timeline, { '--experience-progress': 0 }, {
        '--experience-progress': 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 75%',
          end: 'bottom 70%',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })

      const media = gsap.matchMedia()

      media.add({
        desktop: '(min-width: 48rem)',
        mobile: '(max-width: 47.999rem)',
      }, ({ conditions }) => {
        gsap.utils.toArray('.experience-item').forEach((item, index) => {
          const card = item.querySelector('[data-experience-card]')
          const date = item.querySelector('.experience-date')
          const marker = item.querySelector('.experience-marker')
          const copy = card.querySelectorAll('.experience-card-summary > *')
          const direction = index % 2 === 0 ? -1 : 1

          gsap.timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
            .from(marker, {
              scale: 0,
              autoAlpha: 0,
              duration: 0.5,
              ease: 'back.out(1.7)',
            })
            .from(date, {
              x: conditions.desktop ? direction * -20 : 0,
              y: conditions.desktop ? 0 : 12,
              autoAlpha: 0,
              duration: 0.6,
            }, 0.05)
            .from(card, {
              x: conditions.desktop ? direction * 48 : 0,
              y: 28,
              autoAlpha: 0,
              duration: 0.85,
            }, 0.1)
            .from(copy, {
              y: 14,
              autoAlpha: 0,
              duration: 0.6,
              stagger: 0.07,
            }, 0.25)
        })
      })

      return () => media.revert()
    }, root)

    return () => context.revert()
  }, [reducedMotion])

  return (
    <section
      id="experience"
      className="work-experience section-space"
      ref={root}
      aria-labelledby="experience-title"
    >
      <div className="shell">
        <div className="experience-heading">
          <SectionHeading
            id="experience-title"
            number="03"
            eyebrow="Work Experience"
            title="Experience along the way."
            copy="From sales and teaching to geospatial data and client support, every role has shaped how I work."
          />
          <p className="experience-range">2020 — 2026</p>
        </div>

        <ol className="experience-timeline" aria-label="Work experience, from 2020 to 2026">
          {workExperience.map((experience, index) => (
            <li className="experience-item" key={experience.id}>
              <p className="experience-date">
                <time dateTime={experience.start.dateTime}>{experience.start.label}</time>
                {experience.end ? (
                  <>
                    {' – '}
                    <time dateTime={experience.end.dateTime}>{experience.end.label}</time>
                  </>
                ) : null}
              </p>
              <span className="experience-marker" aria-hidden="true" />
              <SpotlightCard
                className="experience-card"
                data-experience-card
                theme="dark"
                spotlightColor="#ffffff"
                intensity={0.15}
                spotlightSize={240}
                softness={0.7}
                shape="circle"
                borderGlow={0.6}
                proximity={80}
                smoothing={0.3}
                grain={0}
                ambient={false}
                flare
              >
                <details
                  className="experience-card-details"
                  aria-labelledby={`${experience.id}-title`}
                  onToggle={() => ScrollTrigger.refresh()}
                >
                  <summary className="experience-card-summary">
                    <span className="experience-number" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 id={`${experience.id}-title`}>{experience.role}</h3>
                    {experience.company ? <p className="experience-company">{experience.company}</p> : null}
                    <span className="experience-card-toggle">
                      <span className="experience-show-label">View responsibilities</span>
                      <span className="experience-hide-label">Hide responsibilities</span>
                      <span className="experience-toggle-icon" aria-hidden="true" />
                    </span>
                  </summary>
                  <ul className="experience-responsibilities">
                    {experience.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </details>
              </SpotlightCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
