import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <div>
        <p className="eyebrow">404</p>
        <h1>This route wandered off the canvas.</h1>
        <p>The page you are looking for is not part of this portfolio.</p>
        <Link className="button button-primary" to="/">
          Return home
        </Link>
      </div>
    </main>
  )
}
