import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: '01',
    title: 'Interface design',
    copy: 'Clear visual systems that help a product feel considered from the first click.',
  },
  {
    number: '02',
    title: 'Front-end build',
    copy: 'Responsive React interfaces with an eye on the details that make them feel alive.',
  },
  {
    number: '03',
    title: 'Motion systems',
    copy: 'Purposeful transitions that explain hierarchy, feedback, and the next possible move.',
  },
  {
    number: '04',
    title: 'Creative prototypes',
    copy: 'Fast experiments for testing an idea before it becomes a larger product decision.',
  },
]

export default function Services() {
  const root = useRef(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion) return undefined

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add('(min-width: 62rem) and (hover: hover)', () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        })

        timeline
          .fromTo(
            '[data-services-orb]',
            { scale: 0.7, yPercent: 0 },
            { scale: 1.4, yPercent: -18, ease: 'none' },
            0,
          )
          .to('[data-services-marquee]', { xPercent: -14, ease: 'none' }, 0)
          .to('[data-services-eyebrow]', { autoAlpha: 0.25, yPercent: -45, ease: 'none' }, 0)
      })

      gsap.from('[data-service-card]', {
        y: 44,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: {
          trigger: '[data-services-cards]',
          start: 'top 82%',
          once: true,
        },
      })

      return () => media.revert()
    }, root)

    return () => context.revert()
  }, [reducedMotion])

  return (
    <section className="services" id="services" ref={root} aria-labelledby="services-title">
      <div className="services-stage">
        <div className="services-noise" aria-hidden="true" />
        <div className="services-orb" data-services-orb aria-hidden="true">
          <span>VD</span>
          <i />
          <i />
        </div>

        <div className="shell services-layout">
          <header className="services-heading">
            <p className="services-eyebrow" data-services-eyebrow>
              <span>01</span>
              What I make
            </p>
            <h2 id="services-title">
              A useful idea should feel{' '}
              <span>clear before it feels clever.</span>
            </h2>
          </header>

          <p className="services-marquee" data-services-marquee aria-hidden="true">
            <span>Elevate</span>
            <i>•</i>
            <span>Design</span>
            <i>•</i>
            <span>Develop</span>
            <i>•</i>
            <span>Elevate</span>
            <i>•</i>
            <span>Design</span>
            <i>•</i>
            <span>Develop</span>
          </p>

          <ol className="service-cards" data-services-cards>
            {services.map((service) => (
              <li key={service.number} data-service-card>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <i aria-hidden="true">↗</i>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
