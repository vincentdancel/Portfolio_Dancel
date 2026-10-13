import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ArrowDownIcon, ArrowUpRightIcon } from './Icons'
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
          .to('[data-hero-grid]', { y: () => -window.innerHeight * 0.4, ease: 'none' }, 0)
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
        <div className="hero-grid-overlay" data-hero-grid aria-hidden="true" />
        <div className="hero-halo" aria-hidden="true" />

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

        <svg
          className="hero-wire"
          viewBox="0 0 1600 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M-52 292C166 202 247 113 442 144C642 176 698 280 866 219C1020 163 1071 58 1283 93C1410 114 1508 183 1650 47" />
          <path d="M-78 334C184 218 364 330 530 278C753 208 796 104 966 135C1154 170 1215 330 1446 195C1522 151 1583 92 1668 31" />
        </svg>

        <div className="hero-status" data-hero-status>
          <span className="status-dot" aria-hidden="true" />
          <span>Open to thoughtful work</span>
        </div>
      </div>
    </section>
  )
}
