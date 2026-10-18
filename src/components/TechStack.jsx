import { useState } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'
import ScrollVelocity from './ScrollVelocity'
import './TechStack.css'

const technologyRows = [
  [
    { name: 'HTML', file: 'html.svg' },
    { name: 'CSS', file: 'css.svg' },
    { name: 'JavaScript', file: 'javascript.svg' },
    { name: 'PHP', file: 'php.svg' },
    { name: 'MySQL', file: 'mysql.svg' },
    { name: 'WordPress', file: 'wordpress.svg' },
    { name: 'GitHub', file: 'github.svg' },
  ],
  [
    { name: 'Python', file: 'python.svg' },
    { name: 'Java', file: 'java.svg' },
    { name: 'Flutter', file: 'flutter.svg' },
    { name: 'Supabase', file: 'supabase.svg' },
    { name: 'Figma', file: 'figma.svg' },
    { name: 'Unity', file: 'unity.svg' },
    { name: 'Excel', file: 'excel.svg' },
  ],
]

const technologyContent = technologyRows.map((technologies, index) => (
  <span className="tech-stack-group" key={index}>
    {technologies.map(({ name, file }) => (
      <span className="tech-stack-item" key={name}>
        <img
          className="tech-stack-logo"
          src={`/tech/${file}`}
          alt={`${name} logo`}
          width="80"
          height="80"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </span>
    ))}
  </span>
))

export default function TechStack() {
  const [paused, setPaused] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <section id="tech-stack" className="tech-stack" aria-labelledby="tech-stack-title">
      <div className="shell tech-stack-heading">
        <div>
          <p className="tech-stack-eyebrow">Tech stack</p>
          <h2 id="tech-stack-title">Tools I work with.</h2>
        </div>
        {!reducedMotion && (
          <button
            className="tech-stack-pause"
            type="button"
            aria-pressed={paused}
            aria-controls="tech-stack-rows"
            onClick={() => setPaused(value => !value)}
          >
            {paused ? 'Resume motion' : 'Pause motion'}
          </button>
        )}
      </div>

      <div id="tech-stack-rows">
        <ScrollVelocity
          texts={technologyContent}
          velocity={100}
          skewWithVelocity={0}
          scaleWithVelocity={0}
          draggable
          fontSize={80}
          fontWeight={700}
          className="tech-stack-copy"
          numCopies={6}
          damping={50}
          stiffness={400}
          separator=""
          fadeEdges={false}
          outlineAlternate={false}
          gap={0}
          pauseOnHover={false}
          paused={paused}
        />
      </div>
    </section>
  )
}
