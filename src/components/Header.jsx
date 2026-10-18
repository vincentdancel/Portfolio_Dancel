import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CloseIcon, MenuIcon } from './Icons'

const links = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#services', label: 'Services' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuToggle = useRef(null)
  const navigation = useRef(null)
  const restoreFocus = useRef(false)
  const location = useLocation()
  const onHomePage = location.pathname === '/'

  const closeMenu = ({ returnFocus = false } = {}) => {
    restoreFocus.current = returnFocus
    setOpen(false)
  }

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24)

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })

    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return undefined

    const priorOverflow = document.body.style.overflow
    const focusable = () =>
      Array.from(navigation.current?.querySelectorAll('a[href], button:not([disabled])') ?? [])

    document.body.style.overflow = 'hidden'

    requestAnimationFrame(() => focusable()[0]?.focus())

    const manageMenuKeys = (event) => {
      if (event.key === 'Escape') {
        closeMenu({ returnFocus: true })
        return
      }

      if (event.key !== 'Tab') return

      const items = focusable()
      const first = items[0]
      const last = items[items.length - 1]

      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', manageMenuKeys)

    return () => {
      document.body.style.overflow = priorOverflow
      window.removeEventListener('keydown', manageMenuKeys)

      if (restoreFocus.current) {
        menuToggle.current?.focus()
        restoreFocus.current = false
      }
    }
  }, [open])

  return (
    <header
      className={
        'site-header' +
        (onHomePage ? ' site-header--home' : '') +
        (scrolled ? ' is-scrolled' : '') +
        (open ? ' menu-is-open' : '')
      }
    >
      <div className="shell header-inner">
        <Link className="wordmark" to="/" aria-label="Vince Dancel home">
          <span className="wordmark-mark">VD</span>
          <span className="wordmark-name">Vince Dancel</span>
        </Link>
        <button
          className="menu-toggle"
          ref={menuToggle}
          type="button"
          aria-controls="site-navigation"
          aria-expanded={open}
          onClick={() =>
            setOpen((value) => {
              restoreFocus.current = value
              return !value
            })
          }
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
        <nav
          id="site-navigation"
          ref={navigation}
          className={'site-nav' + (open ? ' is-open' : '')}
          aria-label="Primary navigation"
        >
          {links.map((link) =>
            onHomePage ? (
              <a key={link.href} href={link.href} onClick={closeMenu} data-label={link.label}>
                <span>{link.label}</span>
              </a>
            ) : (
              <Link key={link.href} to={'/' + link.href} onClick={closeMenu} data-label={link.label}>
                <span>{link.label}</span>
              </Link>
            ),
          )}
          <a
            className="nav-cta"
            href="mailto:vincentdancel@g.cjc.edu.ph"
            onClick={closeMenu}
          >
            Let&apos;s talk
          </a>
        </nav>
        <a className="header-cta" href="mailto:vincentdancel@g.cjc.edu.ph">
          Let&apos;s talk
        </a>
        {onHomePage ? (
          <p className="header-location" aria-label="Based in the Philippines">
            PH / 14.60° N
          </p>
        ) : null}
      </div>
    </header>
  )
}
