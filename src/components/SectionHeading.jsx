export default function SectionHeading({ number, eyebrow, title, copy }) {
  return (
    <div className="section-heading">
      <div className="section-kicker">
        <span>{number}</span>
        <span aria-hidden="true" />
        <p>{eyebrow}</p>
      </div>
      <div className="section-heading-copy">
        <h2>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
    </div>
  )
}
