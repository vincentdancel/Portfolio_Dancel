import { lazy, Suspense, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion'
import useNearViewport from '../hooks/useNearViewport'
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
  const portrait = useRef(null)
  const portraitVisible = useNearViewport(portrait)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion) return undefined

    const context = gsap.context(() => {
      const getPinStart = () => root.current.offsetHeight > window.innerHeight
        ? 'bottom bottom'
        : 'top top'

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

      gsap.fromTo('[data-about-text]', {
        x: () => -Math.min(window.innerWidth * 0.24, 280),
      }, {
        x: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'top 35%',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })

      gsap.utils.toArray('[data-about-intro]').forEach((element) => gsap.from(element, {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 68%',
          end: 'bottom top',
          toggleActions: 'restart none restart none',
        },
      }))

      gsap.utils.toArray('[data-about-item]').forEach((element) => gsap.from(element, {
        y: 18,
        autoAlpha: 0,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 78%',
          end: 'bottom top',
          toggleActions: 'restart none restart none',
        },
      }))

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

  const portraitFallback = (
    <img
      className="about-portrait-fallback"
      src="/Myid.png"
      alt="Portrait of Vince Dancel"
      width="600"
      height="600"
      loading="lazy"
      decoding="async"
    />
  )

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
          <div className="about-introduction" data-about-text>
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

          <figure className="about-portrait" ref={portrait} data-about-intro>
            <Suspense fallback={portraitFallback}>
              {portraitVisible ? (
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
                  breeze={0}
                  interactive
                  intro={false}
                  flipOnMount
                />
              ) : portraitFallback}
            </Suspense>
            <figcaption className="sr-only">Portrait of Vince Dancel on an ID lanyard. The card briefly flips to its back, then returns to the front.</figcaption>
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
