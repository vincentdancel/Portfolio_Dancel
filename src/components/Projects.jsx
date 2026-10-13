import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import useReducedMotion from '../hooks/useReducedMotion'
import ProjectCard from './ProjectCard'
import SectionHeading from './SectionHeading'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Projects({ projects }) {
  const root = useRef(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion) return undefined

    let titleSplit

    const context = gsap.context(() => {
      const title = root.current.querySelector('[data-work-title] h2')
      const cards = gsap.utils.toArray('[data-project-card]')
      const rail = root.current.querySelector('[data-project-rail]')
      const track = root.current.querySelector('[data-project-track]')
      const progress = root.current.querySelector('[data-project-progress]')

      titleSplit = SplitText.create(title, {
        type: 'chars',
        charsClass: 'work-title-char',
        aria: 'auto',
      })

      gsap.from(titleSplit.chars, {
        xPercent: 72,
        autoAlpha: 0,
        duration: 0.72,
        ease: 'power3.out',
        stagger: 0.018,
        scrollTrigger: {
          trigger: title,
          start: 'top 76%',
          once: true,
        },
      })

      const media = gsap.matchMedia()

      media.add('(min-width: 62rem) and (hover: hover)', () => {
        const getDistance = () => Math.max(0, track.scrollWidth - rail.clientWidth + window.innerWidth * 0.24)

        const railTween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: rail,
            start: 'top top',
            end: () => '+=' + (getDistance() + window.innerHeight),
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress) gsap.set(progress, { scaleX: self.progress })
            },
          },
        })

        cards.forEach((card) => {
          const visual = card.querySelector('[data-project-visual]')
          const copy = card.querySelector('[data-project-copy]')

          gsap.fromTo(
            visual,
            { scale: 0.94, autoAlpha: 0.64 },
            {
              scale: 1,
              autoAlpha: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: railTween,
                start: 'left 86%',
                end: 'center 55%',
                scrub: true,
              },
            },
          )

          gsap.fromTo(
            copy,
            { y: 26, autoAlpha: 0.45 },
            {
              y: 0,
              autoAlpha: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: railTween,
                start: 'left 84%',
                end: 'left 47%',
                scrub: true,
              },
            },
          )
        })
      })

      media.add('(max-width: 61.99rem), (hover: none)', () => {
        gsap.from(cards, {
          y: 48,
          autoAlpha: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: root.current.querySelector('[data-project-track]'),
            start: 'top 82%',
            once: true,
          },
        })
      })

      const refresh = () => ScrollTrigger.refresh()
      window.addEventListener('load', refresh, { once: true })

      return () => {
        window.removeEventListener('load', refresh)
        media.revert()
      }
    }, root)

    return () => {
      context.revert()
      titleSplit?.revert()
    }
  }, [reducedMotion])

  return (
    <section id="work" className="work" ref={root} aria-labelledby="work-title">
      <div className="shell work-intro" data-work-title>
        <div className="work-heading">
          <SectionHeading
            id="work-title"
            number="02"
            eyebrow="Selected projects"
            title="Built to be useful, made to be remembered."
            copy="A small collection of product explorations, interface studies, and working prototypes."
          />
          <p className="work-count">0{projects.length} / SELECTED PROJECTS</p>
        </div>
      </div>

      <div className="project-rail" data-project-rail>
        <div className="project-rail-track" data-project-track>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="project-rail-progress" aria-hidden="true">
          <i data-project-progress />
        </div>
      </div>
    </section>
  )
}
