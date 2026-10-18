import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { achievements } from '../data/achievements'
import { ArrowUpRightIcon } from './Icons'
import SectionHeading from './SectionHeading'
import './Achievements.css'

const FlexCarousel = lazy(() => import('./FlexCarousel'))

export default function Achievements() {
  const gallery = useRef(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setVisible(true)
      observer.disconnect()
    }, { rootMargin: '150px' })

    observer.observe(gallery.current)
    return () => observer.disconnect()
  }, [])

  const placeholder = (
    <div className="achievements-placeholder">
      <img src={achievements[0].src} alt={achievements[0].alt} loading="lazy" />
    </div>
  )

  return (
    <section id="achievements" className="achievements section-space" aria-labelledby="achievements-title">
      <div className="shell">
        <div className="achievements-heading">
          <SectionHeading
            id="achievements-title"
            number="04"
            eyebrow="Achievements"
            title="Milestones along the way."
            copy="Competition wins, academic recognition, and the learning that keeps me moving forward."
          />
          <p className="achievements-total">{String(achievements.length).padStart(2, '0')} / SELECTED MOMENTS</p>
        </div>

        <div className="achievements-gallery" ref={gallery}>
          {visible ? (
            <Suspense fallback={placeholder}>
              <FlexCarousel
                items={achievements}
                preset="liquid"
                intro="rise"
                cardHeight={0.5}
                gap={12}
                squeeze={0.2}
                focusOnClick
                captions
                fit="natural"
                radius={0}
                lensWidth={0.74}
                lensHeight={1.18}
                tilt={62}
                roundness={1}
                bend={0.34}
                reach={0.38}
                curl="twist"
                dispersion={0.45}
                liquid={0}
                followCursor={false}
                autoplay={false}
                interval={4}
                captureWheel
                controls
                ariaLabel="Achievements and certificates"
                onChange={setActive}
              />
            </Suspense>
          ) : placeholder}
        </div>

        <div className="achievements-gallery-footer">
          <p>Drag or use the arrows to explore. Select a certificate to focus.</p>
          <a href={achievements[active].href || achievements[active].src} target="_blank" rel="noreferrer">
            View original <span className="sr-only">{achievements[active].title} (opens in a new tab)</span>
            <ArrowUpRightIcon size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
