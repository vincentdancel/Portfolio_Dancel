import About from '../components/About'
import Achievements from '../components/Achievements'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Services from '../components/Services'
import { profile, projects } from '../data/portfolio'

export default function HomePage() {
  return (
    <div className="portfolio-home sav1n-experience">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero profile={profile} />
        <About profile={profile} />
        <Projects projects={projects} />
        <Achievements />
        <Services />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  )
}
