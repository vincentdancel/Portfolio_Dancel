import { useCallback, useEffect, useRef, useState } from 'react'

export default function useOpeningLoader(waitForBackground) {
  const [loading, setLoading] = useState(() => !!document.getElementById('site-loader'))
  const [backgroundReady, setBackgroundReady] = useState(false)
  const startedAt = useRef(performance.now())
  const onBackgroundReady = useCallback(() => setBackgroundReady(true), [])

  useEffect(() => {
    if (!loading || (waitForBackground && !backgroundReady)) return undefined

    let active = true
    let timer
    const image = new Image()
    image.src = '/light-pillar-fallback.webp'

    Promise.all([
      document.fonts?.ready,
      waitForBackground ? image.decode().catch(() => {}) : undefined,
    ]).then(() => {
      if (!active) return
      // Keep the loading state legible on fast connections, without a fake percentage.
      timer = window.setTimeout(() => setLoading(false), Math.max(0, 900 - (performance.now() - startedAt.current)))
    })

    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [loading, waitForBackground, backgroundReady])

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

  return { loading, onBackgroundReady }
}
