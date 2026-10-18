import { lazy, Suspense, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion'
import './About.css'

const Lanyard = lazy(() => import('./Lanyard'))

gsap.registerPlugin(ScrollTrigger)

const focusAreas = [
  { name: 'Interface design', detail: 'Clear, considered, easy to use.' },
  { name: 'React development', detail: 'Ideas turned into working interfaces.' },
  { name: 'Motion design', detail: 'Small details that make things flow.' },
  { name: 'Machine learning', detail: 'Exploring what intelligent tools can do.' },
]

export default function About({ profile }) {
  const root = useRef(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion) return undefined

    const context = gsap.context(() => {
      const getPinStart = () => root.current.offsetHeight > window.innerHeight
        ? 'bottom bottom'
        : 'top top'

      gsap.fromTo('[data-about-background]', {
        y: () => Math.min(window.innerHeight * 0.28, 240),
        '--about-curve': '14%',
      }, {
        y: 0,
        '--about-curve': '0%',
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'top 18%',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })

      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: getPinStart,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
        .fromTo('[data-about-glow]', { yPercent: 24, xPercent: 8 }, {
          yPercent: -28,
          xPercent: -8,
        }, 0)

      gsap.from('[data-about-intro]', {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 68%',
          once: true,
        },
      })

      gsap.from('[data-about-item]', {
        y: 18,
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

      // Let Projects cover About without adding extra scroll space between them.
      ScrollTrigger.create({
        trigger: root.current,
        start: getPinStart,
        endTrigger: document.getElementById('work'),
        end: 'top top',
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      })
    }, root)

    return () => context.revert()
  }, [reducedMotion])

  return (
    <section
      id="about"
      className="about about--refined section-space"
      ref={root}
      aria-labelledby="about-title"
    >
      <div className="about-background" data-about-background aria-hidden="true">
        <div className="about-background-glow" data-about-glow />
      </div>
      <div className="shell about-content">
        <div className="about-grid">
          <div className="about-introduction" data-about-intro>
            <p className="section-kicker">
              <span>01</span>
              <span>A little about me</span>
            </p>
            <h2 id="about-title" className="about-title">
              A designer&apos;s eye.
              <br />
              <span>A developer&apos;s mind.</span>
            </h2>

            <div className="about-details">
              <p className="about-specialty">{profile.role}</p>
              <div className="about-biography">
                {profile.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

            </div>
          </div>

          <figure className="about-portrait" data-about-intro>
            <Suspense fallback={<img className="about-portrait-fallback" src="/Myid.png" alt="Portrait of Vince Dancel" width="600" height="600" />}>
              <Lanyard
                frontImage="/Myid.png"
                backImage="/lanyard-back.svg"
                strapImage="/lanyard-band.svg"
                imageFit="cover"
                cardColor="#ffffff"
                orientation="portrait"
                finish="glossy"
                cornerRadius={0.3}
                size={0.6}
                anchor="center"
                strapLength={0.5}
                strapColor="#111111"
                strapWidth={0.65}
                metal="silver"
                gravity={1}
                damping={0.5}
                elasticity={0.5}
                breeze={reducedMotion ? 0 : 0.5}
                interactive
                intro={!reducedMotion}
              />
            </Suspense>
            <figcaption className="sr-only">Portrait of Vince Dancel on an interactive lanyard. Drag the card to swing it or click to see the back.</figcaption>
          </figure>
        </div>

        <aside className="about-focus" data-about-list aria-labelledby="about-focus-title">
          <div className="about-focus-heading">
            <h3 id="about-focus-title">What I&apos;m exploring</h3>
            <span>Always learning. Always making.</span>
          </div>
          <ul className="about-focus-list">
            {focusAreas.map(({ name, detail }, index) => (
              <li key={name} data-about-item>
                <span className="about-focus-number" aria-hidden="true">0{index + 1}</span>
                <h4>{name}</h4>
                <p>{detail}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
