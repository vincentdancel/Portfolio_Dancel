import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const orbImages = ['/elevate.jpg', '/design.jpg', '/develop.jpg']

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
  const [activeImage, setActiveImage] = useState(0)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion) {
      setActiveImage(0)
      return undefined
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add({ desktop: '(min-width: 62rem) and (hover: hover)', all: 'all' }, ({ conditions }) => {
        const animatedDesktop = conditions.desktop
        const imageProgress = { value: 0 }
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: animatedDesktop ? 'top top' : 'top bottom',
            end: animatedDesktop ? 'bottom bottom' : 'bottom top',
            scrub: 1.4,
            invalidateOnRefresh: true,
          },
        })

        // Image changes follow the smoothed timeline, including on touch screens.
        timeline.fromTo(imageProgress, { value: 0 }, {
          value: 1,
          duration: 1,
          ease: 'none',
          onUpdate: () => {
            setActiveImage(Math.min(orbImages.length - 1, Math.floor(imageProgress.value * orbImages.length)))
          },
        }, 0)

        if (!animatedDesktop) return

        timeline
          .fromTo(
            '[data-services-orb]',
            { scale: 0.9, yPercent: 0 },
            { scale: 1.15, yPercent: -8, duration: 1, ease: 'none' },
            0,
          )
          .to('[data-services-marquee]', { xPercent: -8, duration: 1, ease: 'none' }, 0)
          .to('[data-services-eyebrow]', { autoAlpha: 0.5, yPercent: -20, duration: 1, ease: 'none' }, 0)
      })

      gsap.utils.toArray('[data-service-card]').forEach((card) => {
        gsap.from(card, {
          y: 44,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            end: 'bottom top',
            toggleActions: 'restart none restart none',
          },
        })
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
          {orbImages.map((src, index) => (
            <img
              key={src}
              className={`services-orb-image${index === activeImage ? ' is-active' : ''}`}
              src={src}
              alt=""
              decoding="async"
            />
          ))}
        </div>

        <div className="shell services-layout">
          <header className="services-heading">
            <p className="services-eyebrow" data-services-eyebrow>
              <span>05</span>
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
