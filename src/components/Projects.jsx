import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion'
import ProjectCard from './ProjectCard'
import SectionHeading from './SectionHeading'

gsap.registerPlugin(ScrollTrigger)

export default function Projects({ projects }) {
  const root = useRef(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion) return undefined

    const context = gsap.context(() => {
      gsap.from('[data-project-card]', {
        y: 48,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
          once: true,
        },
      })
    }, root)

    return () => context.revert()
  }, [reducedMotion])

  return (
    <section id="work" className="work section-space" ref={root} aria-labelledby="work-title">
      <div className="shell">
        <SectionHeading
          number="02"
          eyebrow="Selected work"
          title="Projects that connect technology with a clear next step."
          copy="Each card links to a working source repository and a small interactive project study inside this portfolio."
        />
        <div className="project-grid">
          {projects.map((project) => (
            <div key={project.slug} data-project-card>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
