import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ArrowDownIcon, ArrowUpRightIcon } from './Icons'
import LightPillar from './LightPillar'
import useReducedMotion from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Hero({ profile }) {
  const root = useRef(null)
  const firstMessage = useRef(null)
  const secondMessage = useRef(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion) return undefined

    let firstSplit
    let secondSplit

    const context = gsap.context(() => {
      firstSplit = SplitText.create(firstMessage.current, {
        type: 'lines,words',
        mask: 'lines',
        linesClass: 'hero-title-line',
        wordsClass: 'hero-title-word',
        aria: 'hidden',
      })

      secondSplit = SplitText.create(secondMessage.current, {
        type: 'lines,words',
        mask: 'lines',
        linesClass: 'hero-title-line',
        wordsClass: 'hero-title-word',
        aria: 'hidden',
      })

      gsap.set(secondMessage.current, { autoAlpha: 1 })
      gsap.set(secondSplit.words, { yPercent: -108, autoAlpha: 0 })

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-hero-prelude]', { y: 16, autoAlpha: 0, duration: 0.65 })
        .from(firstSplit.words, { yPercent: 108, duration: 1, stagger: 0.035 }, '-=0.26')
        .from('[data-hero-detail]', { y: 20, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, '-=0.5')
        .from('[data-hero-orbit]', { scale: 0.82, autoAlpha: 0, duration: 0.9 }, '-=0.75')

      const media = gsap.matchMedia()

      media.add('(min-width: 62rem) and (hover: hover)', () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: '10% top',
            end: '74% bottom',
            scrub: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 'labelsDirectional',
              duration: { min: 0.15, max: 0.65 },
              delay: 0.12,
              ease: 'power1.inOut',
            },
          },
        })

        timeline
          .addLabel('intro')
          .to(
            firstSplit.words,
            {
              yPercent: 105,
              autoAlpha: 0,
              stagger: 0.02,
              ease: 'none',
            },
            0,
          )
          .to(
            secondSplit.words,
            {
              yPercent: 0,
              autoAlpha: 1,
              stagger: 0.02,
              ease: 'none',
            },
            0.28,
          )
          .to('[data-hero-detail]', { yPercent: 35, autoAlpha: 0.2, ease: 'none' }, 0)
          .to('[data-hero-orbit]', { scale: 1.38, yPercent: -18, ease: 'none' }, 0)
          .addLabel('handoff')
          .to('[data-hero-status]', { autoAlpha: 0, ease: 'none' }, 0.72)
          .addLabel('outro')
      })

      return () => media.revert()
    }, root)

    return () => {
      context.revert()
      firstSplit?.revert()
      secondSplit?.revert()
    }
  }, [reducedMotion])

  return (
    <section className="hero" ref={root} aria-labelledby="hero-title">
      <div className="hero-stage">
        <LightPillar
          className="hero-light-pillar"
          topColor="#00A89E"
          bottomColor="#00A89E"
          intensity={1}
          glowAmount={0.002}
          bloom={0.5}
          pillarWidth={3}
          pillarHeight={0.4}
          pillarRotation={25}
          rotationSpeed={0.3}
          interactive
          clickPulse
          intro
          quality="high"
          mixBlendMode="screen"
          twist={0.4}
          detail={4}
          flow={1}
          noiseIntensity={0.5}
          fade={0}
          lightMode={false}
          paused={reducedMotion}
        />
        <div className="shell hero-layout">
          <div className="hero-prelude" data-hero-prelude>
            <p>Independent designer &amp; developer</p>
            <p>Philippines / available worldwide</p>
          </div>

          <div className="hero-main">
            <h1 id="hero-title" className="sr-only">
              Vince Dancel, web developer and UI/UX designer
            </h1>
            <div className="hero-title-stack" aria-hidden="true">
              <p className="hero-display hero-display--primary" ref={firstMessage}>
                Interfaces that <span>move people.</span>
              </p>
              <p className="hero-display hero-display--secondary" ref={secondMessage}>
                Useful ideas, <span>made tangible.</span>
              </p>
            </div>

            <div className="hero-bottom-row" data-hero-detail>
              <p className="hero-intro">{profile.intro}</p>
              <div className="hero-actions">
                <a className="hero-text-link" href="#work">
                  Selected work <ArrowDownIcon />
                </a>
                <a className="hero-text-link hero-text-link--quiet" href={'mailto:' + profile.email}>
                  Start a conversation <ArrowUpRightIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="hero-orbit" data-hero-orbit aria-hidden="true">
            <span>VD</span>
            <i>01</i>
            <p>Design / code / motion</p>
          </div>

          <div className="hero-side-label" data-hero-detail>
            <span>Scroll to explore</span>
            <i aria-hidden="true" />
          </div>
        </div>

        <div className="hero-status" data-hero-status>
          <span className="status-dot" aria-hidden="true" />
          <span>Open to thoughtful work</span>
        </div>
      </div>
    </section>
  )
}
