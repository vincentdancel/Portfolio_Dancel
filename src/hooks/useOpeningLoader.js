import { useEffect, useState } from 'react'

const FONT_WAIT_LIMIT_MS = 1500

export default function useOpeningLoader(enabled = true) {
  const [loading, setLoading] = useState(() => enabled && !!document.getElementById('site-loader'))

  useEffect(() => {
    if (!loading) return undefined

    let active = true
    let frame = 0
    const timeout = window.setTimeout(() => {
      if (active) setLoading(false)
    }, FONT_WAIT_LIMIT_MS)

    Promise.resolve(document.fonts?.ready).catch(() => {}).then(() => {
      if (!active) return
      window.clearTimeout(timeout)
      frame = requestAnimationFrame(() => setLoading(false))
    })

    return () => {
      active = false
      window.clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [loading])

  useEffect(() => {
    if (loading) return undefined

    const loader = document.getElementById('site-loader')
    document.documentElement.classList.remove('site-is-loading')
    if (!loader) return undefined

    loader.classList.add('is-leaving')
    loader.setAttribute('aria-hidden', 'true')
    const timer = window.setTimeout(() => loader.remove(), 400)
    return () => window.clearTimeout(timer)
  }, [loading])

  return loading
}
