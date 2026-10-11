import SectionHeading from './SectionHeading'

const focusAreas = [
  'Interface design',
  'React foundations',
  'Motion systems',
  'Machine learning',
]

export default function About({ profile }) {
  return (
    <section id="about" className="about section-space" aria-labelledby="about-title">
      <div className="shell">
        <SectionHeading
          number="01"
          eyebrow="About"
          title="A practical maker with an eye for the feeling of an interface."
        />
        <div className="about-layout">
          <div className="about-copy">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <aside className="focus-card" aria-label="Current focus areas">
            <p className="card-label">In the studio</p>
            <ul>
              {focusAreas.map((area, index) => (
                <li key={area}>
                  <span>0{index + 1}</span>
                  {area}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
