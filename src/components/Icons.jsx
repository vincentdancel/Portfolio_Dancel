const sharedProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: 1.8,
}

export function ArrowUpRightIcon({ size = 18 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...sharedProps}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

export function ArrowDownIcon({ size = 18 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...sharedProps}
    >
      <path d="M12 4v16" />
      <path d="m6 14 6 6 6-6" />
    </svg>
  )
}

export function GithubIcon({ size = 19 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...sharedProps}
    >
      <path d="M15 22v-3.87a3.37 3.37 0 0 0-.93-2.61c3.05-.34 6.26-1.5 6.26-6.78A5.32 5.32 0 0 0 18.92 5a4.95 4.95 0 0 0-.13-3.76s-1.15-.37-3.79 1.45a13 13 0 0 0-6.9 0C5.46.87 4.31 1.24 4.31 1.24A4.95 4.95 0 0 0 4.18 5a5.32 5.32 0 0 0-1.41 3.74c0 5.27 3.21 6.43 6.26 6.78A3.37 3.37 0 0 0 8.1 18.1V22" />
      <path d="M8.1 19.2c-2.73.84-3.3-1.32-3.3-1.32a2.6 2.6 0 0 0-2.18-1.43" />
    </svg>
  )
}

export function MailIcon({ size = 19 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...sharedProps}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

export function InstagramIcon({ size = 19 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...sharedProps}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r=".75" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function MenuIcon({ size = 24 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...sharedProps}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function CloseIcon({ size = 24 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...sharedProps}
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}
