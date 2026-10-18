import { useEffect, useState } from 'react'

// Mount expensive visuals once they approach the screen, keeping their space reserved.
export default function useNearViewport(ref, rootMargin = '200px') {
  const [nearViewport, setNearViewport] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setNearViewport(true)
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setNearViewport(true)
      observer.disconnect()
    }, { rootMargin })

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return nearViewport
}
