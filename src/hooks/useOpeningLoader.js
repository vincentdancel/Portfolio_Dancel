import { useEffect, useState } from 'react'

export default function useOpeningLoader(enabled = true) {
  const [loading, setLoading] = useState(() => enabled && !!document.getElementById('site-loader'))

  useEffect(() => {
    if (!loading) return undefined

    let active = true
    let frame = 0
    Promise.resolve(document.fonts?.ready).then(() => {
      if (!active) return
      frame = requestAnimationFrame(() => setLoading(false))
    })

    return () => {
      active = false
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
