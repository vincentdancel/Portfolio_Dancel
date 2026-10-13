import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import useReducedMotion from '../hooks/useReducedMotion'

function ArtClassifierLab() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState('Ready to analyze')

  const runAnalysis = () => {
    setIsAnalyzing(true)
    setResult('Reading color, form, and composition…')
    window.setTimeout(() => {
      setIsAnalyzing(false)
      setResult('Impressionism — 92.4% confidence')
    }, 750)
  }

  return (
    <div className="lab-interface art-lab">
      <div className="lab-artboard" aria-hidden="true">
        <span className="paint-sun" />
        <span className="paint-hill hill-one" />
        <span className="paint-hill hill-two" />
      </div>
      <div className="lab-output">
        <span className="lab-label">Prototype result</span>
        <strong>{result}</strong>
        <p>This interactive study demonstrates the image-to-prediction flow.</p>
        <button className="button button-primary lab-button" type="button" onClick={runAnalysis} disabled={isAnalyzing}>
          {isAnalyzing ? 'Analyzing…' : 'Run analysis'}
        </button>
      </div>
    </div>
  )
}

function EmotionLab() {
  const emotions = [
    { name: 'Happy', value: 87, color: 'lime' },
    { name: 'Neutral', value: 34, color: 'lilac' },
    { name: 'Surprised', value: 18, color: 'pink' },
  ]
  const [active, setActive] = useState(emotions[0].name)

  return (
    <div className="lab-interface emotion-lab">
      <div className="face-scan" aria-hidden="true">
        <div className="face-oval">
          <span className="face-eye eye-left" />
          <span className="face-eye eye-right" />
          <span className="face-mouth" />
        </div>
        <i className="scan-line" />
      </div>
      <div className="emotion-output">
        <span className="lab-label">Emotion signals</span>
        {emotions.map((emotion) => (
          <button
            type="button"
            className={'emotion-row' + (active === emotion.name ? ' is-active' : '')}
            key={emotion.name}
            onClick={() => setActive(emotion.name)}
          >
            <span>{emotion.name}</span>
            <i className={emotion.color} style={{ '--bar': emotion.value + '%' }} />
            <b>{emotion.value}%</b>
          </button>
        ))}
        <p>Choose a signal to inspect the confidence hierarchy.</p>
      </div>
    </div>
  )
}

function PersonalWebsiteLab() {
  const [view, setView] = useState('Work')
  const tabs = ['Home', 'Work', 'Contact']

  return (
    <div className="lab-interface website-lab">
      <div className="mini-browser">
        <div className="mini-browser-bar">
          <span />
          <span />
          <span />
          <i>vince.design</i>
        </div>
        <div className="mini-browser-content">
          <p>HELLO, I'M VINCE</p>
          <strong>{view === 'Home' ? 'A clear place to begin.' : view === 'Work' ? 'Selected creative work.' : 'Let’s build something useful.'}</strong>
          <em />
        </div>
      </div>
      <div className="website-output">
        <span className="lab-label">Page hierarchy study</span>
        <div className="lab-tabs" role="tablist" aria-label="Website preview sections">
          {tabs.map((tab) => (
            <button
              type="button"
              role="tab"
              aria-selected={view === tab}
              className={view === tab ? 'is-active' : ''}
              key={tab}
              onClick={() => setView(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <p>A small interaction study on the route from introduction to action.</p>
      </div>
    </div>
  )
}

export default function LabDemo({ project }) {
  const root = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return undefined

    const context = gsap.context(() => {
      gsap.from('[data-lab-reveal]', {
        y: 18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }, root)

    return () => context.revert()
  }, [reducedMotion, project.slug])

  return (
    <div className="lab-demo" ref={root}>
      <div data-lab-reveal>
        {project.slug === 'art-classifier' ? <ArtClassifierLab /> : null}
        {project.slug === 'face-emotion-detection' ? <EmotionLab /> : null}
        {project.slug === 'personal-website' ? <PersonalWebsiteLab /> : null}
      </div>
    </div>
  )
}
