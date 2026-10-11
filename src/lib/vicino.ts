import { useEffect, useRef, useState } from "preact/hooks"

/**
 * true quando l'elemento arriva a `margine` dallo schermo (poi resta true).
 * Più stretto del lazy loading nativo di Chrome (1250-2500px): chi compila il form
 * senza scorrere non scarica ciò che sta sotto.
 */
export function useVicino<T extends Element>(margine = "300px") {
  const ref = useRef<T>(null)
  const [vicino, setVicino] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || vicino) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVicino(true)
          observer.disconnect()
        }
      },
      { rootMargin: `${margine} 0px` }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [vicino, margine])

  return [ref, vicino] as const
}
