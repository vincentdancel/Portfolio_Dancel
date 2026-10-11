import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CloseIcon, MenuIcon } from './Icons'

const links = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const onHomePage = location.pathname === '/'

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" to="/" aria-label="Vince Dancel home">
          <span>V</span>D
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-controls="site-navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
        <nav
          id="site-navigation"
          className={'site-nav' + (open ? ' is-open' : '')}
          aria-label="Primary navigation"
        >
          {links.map((link) =>
            onHomePage ? (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} to={'/' + link.href} onClick={closeMenu}>
                {link.label}
              </Link>
            ),
          )}
          <a
            className="nav-cta"
            href="mailto:vincentdancel@g.cjc.edu.ph"
            onClick={closeMenu}
          >
            Let's talk
          </a>
        </nav>
      </div>
    </header>
  )
}
