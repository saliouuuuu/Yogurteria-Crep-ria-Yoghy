import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

/**
 * Scroll reveal, ma non il solito fade-up: il contenuto viene scoperto da una
 * tendina (clip-path) che sale, con una micro-rotazione. Sembra un cartellone
 * che si apre — coerente col tono da insegna del resto del sito.
 *
 * ATTENZIONE (ci siamo già cascati): l'osservatore NON va messo sull'elemento
 * che si anima. Un elemento con `clip-path: inset(100%)` viene riportato da
 * IntersectionObserver come area zero, quindi non risulta mai "in vista" e la
 * sua stessa animazione di entrata non parte mai — si auto-blocca.
 * Per questo osserviamo un contenitore esterno, mai ritagliato, e animiamo
 * solo il figlio.
 */
const VARIANTI = {
  su:       { clipPath: 'inset(100% 0% 0% 0%)', y: 34, x: 0, rotate: -1.2 },
  giu:      { clipPath: 'inset(0% 0% 100% 0%)', y: -28, x: 0, rotate: 1.2 },
  sinistra: { clipPath: 'inset(0% 100% 0% 0%)', y: 0, x: -34, rotate: 0 },
}
const APERTO = { clipPath: 'inset(0% 0% 0% 0%)', y: 0, x: 0, rotate: 0 }

export default function Rivela({ children, delay = 0, dir = 'su', className = '' }) {
  const ref = useRef(null)
  const inVista = useInView(ref, { once: true, amount: 0.2 })
  const chiuso = VARIANTI[dir] ?? VARIANTI.su

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full"
        initial={chiuso}
        animate={inVista ? APERTO : chiuso}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
