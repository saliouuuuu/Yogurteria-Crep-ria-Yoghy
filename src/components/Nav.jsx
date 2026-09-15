import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { LOCALE } from '../data/site.js'

const VOCI = [
  { href: '#locale', label: 'Il locale' },
  { href: '#menu', label: 'Menù' },
  { href: '#galleria', label: 'Galleria' },
  { href: '#dove', label: 'Dove siamo' },
]

/**
 * Navigazione.
 * Sopra l'hero è invisibile (l'insegna deve restare l'unica cosa che si vede),
 * poi compare come barra piena quando si comincia a scorrere.
 * Su mobile il menù è a tutto schermo con i titoli enormi: si tocca col pollice
 * mentre sei in coda al banco, non si cerca col dito.
 */
export default function Nav() {
  const [solida, setSolida] = useState(false)
  const [aperto, setAperto] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolida(window.scrollY > window.innerHeight * 0.75)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = aperto ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [aperto])

  return (
    <>
      <motion.nav
        initial={{ y: -70 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-colors duration-300 ${
          solida ? 'bg-blu-notte/92 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-3 py-2.5 md:px-8 md:py-3">
          <a
            href="#top"
            className="flex items-center gap-2 text-lg font-extrabold tracking-[-0.05em] text-white md:text-2xl"
          >
            <img src="./brand/mascotte.png" alt="" aria-hidden="true" className="h-7 w-auto md:h-9" />
            Yoghy
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {VOCI.map((v) => (
              <a
                key={v.href}
                href={v.href}
                className="rounded-full px-4 py-2 text-sm font-bold text-white/80 transition-colors hover:bg-white/12 hover:text-white"
              >
                {v.label}
              </a>
            ))}
            <a
              href={`tel:${LOCALE.telefonoTel}`}
              className="pill ml-2 bg-arancio px-5 py-2.5 text-sm text-blu-notte transition-transform hover:-translate-y-0.5"
            >
              Chiama
            </a>
          </div>

          <button
            type="button"
            onClick={() => setAperto(true)}
            aria-label="Apri il menù di navigazione"
            className="pill bg-white px-4 py-2.5 text-sm text-blu-notte md:hidden"
          >
            Menù ☰
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {aperto && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-blu px-5 pt-[calc(1.25rem+env(safe-area-inset-top,0px))] pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-extrabold text-white">Yoghy</span>
              <button
                type="button"
                onClick={() => setAperto(false)}
                aria-label="Chiudi il menù"
                className="pill bg-white px-4 py-2.5 text-sm text-blu"
              >
                Chiudi ✕
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-1">
              {VOCI.map((v, i) => (
                <motion.a
                  key={v.href}
                  href={v.href}
                  onClick={() => setAperto(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.14 + i * 0.07, duration: 0.45 }}
                  className="border-b-2 border-white/15 py-3 text-[2.6rem] leading-[1.05] font-extrabold tracking-[-0.05em] text-white"
                >
                  {v.label}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={`tel:${LOCALE.telefonoTel}`}
                className="pill bordo-spesso border-blu-notte bg-arancio py-4 text-lg text-blu-notte"
              >
                Chiama {LOCALE.telefono}
              </a>
              <a
                href={LOCALE.deliveroo}
                target="_blank"
                rel="noopener noreferrer"
                className="pill bordo-spesso border-blu-notte bg-crema py-4 text-lg text-blu"
              >
                Ordina a domicilio ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
