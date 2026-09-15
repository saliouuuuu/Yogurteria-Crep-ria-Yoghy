import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/**
 * Il cono gelato antropomorfo con i guantoni, ritagliato dal loro tabellone.
 *
 * Non è un adesivo decorativo: è l'unico personaggio del brand, quindi qui
 * REAGISCE. Al tocco (o all'hover) tira un montante, rimbalza e fa uscire una
 * nuvoletta fumetto. È la micro-interazione che nessun template porta con sé —
 * funziona solo perché questo brand ha un mascotte che porta i guantoni.
 */
const VERSI = ['POP!', 'BAM!', 'YOGHY!', 'BOOM!', 'SLURP!']

export default function Mascotte({ className = '', size = 120, verso = true }) {
  const [colpo, setColpo] = useState(0)
  const [testo, setTesto] = useState(VERSI[0])
  const bloccato = useRef(false)

  function jab() {
    if (bloccato.current) return
    bloccato.current = true
    setTesto(VERSI[Math.floor(Math.random() * VERSI.length)])
    setColpo((c) => c + 1)
    setTimeout(() => (bloccato.current = false), 620)
  }

  return (
    <div className={`relative select-none ${className}`} style={{ width: size }}>
      <motion.button
        type="button"
        onHoverStart={jab}
        onTap={jab}
        aria-label="Colpisci la mascotte di Yoghy"
        className="block w-full cursor-pointer border-0 bg-transparent p-0"
        animate={
          colpo
            ? { rotate: [0, -14, 10, -4, 0], scale: [1, 1.14, 0.96, 1.03, 1], x: [0, -6, 9, 0] }
            : { y: [0, -7, 0] }
        }
        transition={
          colpo
            ? { duration: 0.6, ease: 'easeOut' }
            : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }
        }
        key={colpo}
      >
        <img
          src="./brand/mascotte.png"
          alt="La mascotte di Yoghy: un cono gelato con i guantoni da boxe"
          width={size}
          height={size * 1.2}
          className="w-full drop-shadow-[0_10px_22px_rgba(0,0,0,0.35)]"
          draggable="false"
        />
      </motion.button>

      {verso && (
        <AnimatePresence>
          {colpo > 0 && (
            <motion.span
              key={colpo}
              initial={{ scale: 0.2, opacity: 0, rotate: -18 }}
              animate={{ scale: 1, opacity: 1, rotate: -8 }}
              exit={{ scale: 1.5, opacity: 0, rotate: 4 }}
              transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              className="pointer-events-none absolute -top-2 -right-4 z-20 rounded-full border-[3px] border-blu-notte bg-arancio px-2.5 py-1 text-[0.7rem] font-extrabold text-blu-notte"
              style={{ boxShadow: '3px 3px 0 0 #060f33' }}
            >
              {testo}
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
