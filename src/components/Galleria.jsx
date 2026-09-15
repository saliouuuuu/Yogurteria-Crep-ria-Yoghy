import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react'
import Rivela from './Rivela.jsx'
import { GALLERIA, LOCALE } from '../data/site.js'

/**
 * GALLERIA — trattata come un feed, non come una griglia.
 *
 * Due nastri di foto che scorrono in direzioni opposte mentre scendi: la
 * sezione è viva anche da ferma e si legge come uno scroll di Instagram,
 * che è esattamente il posto dove questo pubblico guarda le foto del cibo.
 * Toccando una foto si apre a tutto schermo con una transizione di elemento
 * condiviso (layoutId): la stessa immagine cresce, non ne compare un'altra.
 */
function Scatto({ item, i, lid, onApri }) {
  return (
    <motion.button
      type="button"
      onClick={() => onApri({ i, lid })}
      layoutId={lid}
      whileHover={{ y: -10, rotate: i % 2 ? 1.4 : -1.4, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 340, damping: 26 }}
      className="group relative block shrink-0 cursor-pointer overflow-hidden rounded-[20px] border-[3px] border-blu-notte bg-blu-notte"
      style={{
        width: item.formato === 'largo' ? 300 : 210,
        height: 270,
        boxShadow: '7px 7px 0 0 rgba(6,15,51,0.9)',
      }}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-blu-notte/92 to-transparent px-3 pt-8 pb-2.5 text-left text-sm font-extrabold text-white">
        {item.didascalia}
      </span>
      {/* anello al neon che si accende al passaggio */}
      <span className="pointer-events-none absolute inset-0 rounded-[17px] opacity-0 ring-2 ring-neon transition-opacity duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_28px_6px_rgba(77,132,255,0.55)]" />
    </motion.button>
  )
}

export default function Galleria() {
  const ref = useRef(null)
  const [aperta, setAperta] = useState(null)
  const ridotto = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Il nastro va tenuto SEMPRE più largo dello schermo, altrimenti traslando
  // scopre il vuoto a destra. Le foto si ripetono: letto come un feed che
  // continua, non come una fila che finisce.
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', ridotto ? '0%' : '-26%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-26%', ridotto ? '-26%' : '0%'])

  // Ogni nastro porta tutte le foto (mai la stessa due volte nello stesso
  // nastro) e il secondo le prende al contrario: le due righe restano
  // abbastanza lunghe da coprire lo schermo senza sembrare un copia-incolla.
  const riga1 = GALLERIA
  const riga2 = [...GALLERIA].reverse()

  useEffect(() => {
    if (aperta === null) return
    const onKey = (e) => e.key === 'Escape' && setAperta(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [aperta])

  return (
    <section id="galleria" ref={ref} className="relative overflow-hidden bg-crema py-16 md:py-28">
      <div className="mx-auto max-w-[1180px] px-3 md:px-8">
        <Rivela>
          <p className="font-hand text-2xl text-blu md:text-4xl">
            {LOCALE.instagramHandle} — dal vivo è meglio
          </p>
        </Rivela>
        <Rivela delay={0.05}>
          <h2 className="mt-1 max-w-[12ch] text-[3.1rem] text-magenta md:text-[7rem]">
            Foto vere, nessun render.
          </h2>
        </Rivela>
      </div>

      <div className="mt-10 flex flex-col gap-4 md:mt-16 md:gap-6">
        <motion.div style={{ x: x1 }} className="flex w-max gap-4 pl-3 md:gap-6">
          {riga1.map((it, k) => (
            <Scatto
              key={`a${k}`}
              item={it}
              i={GALLERIA.indexOf(it)}
              lid={`scatto-a${k}`}
              onApri={setAperta}
            />
          ))}
        </motion.div>
        <motion.div style={{ x: x2 }} className="flex w-max gap-4 pl-3 md:gap-6">
          {riga2.map((it, k) => (
            <Scatto
              key={`b${k}`}
              item={it}
              i={GALLERIA.indexOf(it)}
              lid={`scatto-b${k}`}
              onApri={setAperta}
            />
          ))}
        </motion.div>
      </div>

      <div className="mx-auto mt-10 max-w-[1180px] px-3 md:mt-14 md:px-8">
        <Rivela>
          <a
            href={LOCALE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="pill bordo-spesso ombra-dura-mag border-blu-notte bg-white px-7 py-4 text-base text-magenta transition-transform duration-200 hover:-translate-y-1 md:text-lg"
          >
            Seguici su Instagram ↗
          </a>
        </Rivela>
      </div>

      {/* ---------- lightbox ---------- */}
      <AnimatePresence>
        {aperta !== null && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-blu-notte/94 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAperta(null)}
            role="dialog"
            aria-modal="true"
            aria-label={GALLERIA[aperta.i].alt}
          >
            <motion.figure
              layoutId={aperta.lid}
              className="relative max-h-[86vh] w-full max-w-[560px] overflow-hidden rounded-[22px] border-[3px] border-crema"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERIA[aperta.i].src}
                alt={GALLERIA[aperta.i].alt}
                className="max-h-[78vh] w-full object-contain"
              />
              <figcaption className="bg-crema px-4 py-3 text-base font-extrabold text-blu-notte">
                {GALLERIA[aperta.i].didascalia}
              </figcaption>
            </motion.figure>
            <button
              type="button"
              onClick={() => setAperta(null)}
              aria-label="Chiudi la foto"
              className="pill fixed top-[calc(1rem+env(safe-area-inset-top,0px))] right-4 bg-crema px-4 py-2.5 text-sm text-blu-notte"
            >
              Chiudi ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
