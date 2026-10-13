export default function SectionHeading({ id, number, eyebrow, title, copy }) {
  return (
    <header className="section-heading">
      <p className="section-kicker">
        <span>{number}</span>
        <span>{eyebrow}</span>
      </p>
      <h2 id={id}>{title}</h2>
      {copy ? <p className="section-heading-copy">{copy}</p> : null}
    </header>
  )
}
