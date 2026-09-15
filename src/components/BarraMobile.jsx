import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { LOCALE } from '../data/site.js'

/**
 * Barra fissa in basso, solo su mobile.
 * Scelta di conversione, non di stile: buona parte di chi apre questo sito lo
 * fa in strada o davanti al banco. Le due azioni che servono davvero
 * (telefonare, ordinare) devono restare sempre sotto il pollice.
 * Compare dopo l'hero per non coprire l'insegna all'apertura.
 */
export default function BarraMobile() {
  const [visibile, setVisibile] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisibile(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visibile && (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t-[3px] border-blu-notte bg-crema/95 px-2.5 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] backdrop-blur-md md:hidden"
        >
          <a
            href={`tel:${LOCALE.telefonoTel}`}
            className="pill flex-1 bg-blu py-3.5 text-sm text-white"
          >
            Chiama
          </a>
          <a
            href={LOCALE.mappaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="pill flex-1 bg-magenta py-3.5 text-sm text-white"
          >
            Indicazioni
          </a>
          <a
            href={LOCALE.deliveroo}
            target="_blank"
            rel="noopener noreferrer"
            className="pill flex-[1.3] bg-arancio py-3.5 text-sm text-blu-notte"
          >
            Ordina ↗
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
