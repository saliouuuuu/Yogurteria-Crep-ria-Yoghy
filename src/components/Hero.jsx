import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import PareteDoghe from './PareteDoghe.jsx'
import Mascotte from './Mascotte.jsx'
import { LOCALE } from '../data/site.js'

/**
 * HERO — "l'insegna".
 *
 * Scelta forte e motivata: invece del solito titolo centrato + sottotitolo +
 * bottone, l'apertura È la vetrina del locale, ingigantita. Sopra la fascia
 * crema con "YOGURTERIA • CRÊPERIA" (come l'insegna vera di Via XX Settembre),
 * sotto la parete a doghe con i neon che si accendono, e in mezzo il logotipo
 * al neon. Chi conosce il posto lo riconosce prima di leggere una parola.
 *
 * Il frappè ritagliato (foto vera, scontornata) buca il logotipo: è il trucco
 * di profondità che rende l'hero tridimensionale senza usare un 3D engine.
 */
export default function Hero() {
  const ref = useRef(null)
  const ridotto = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const yParete = useTransform(scrollYProgress, [0, 1], ['0%', ridotto ? '0%' : '18%'])
  const yLogo = useTransform(scrollYProgress, [0, 1], ['0%', ridotto ? '0%' : '-32%'])
  const yFrappe = useTransform(scrollYProgress, [0, 1], ['0%', ridotto ? '0%' : '-62%'])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, ridotto ? 1 : 0])

  return (
    <header
      ref={ref}
      id="top"
      className="grana relative flex min-h-[100svh] flex-col overflow-hidden bg-magenta"
    >
      {/* la parete, con parallasse lenta */}
      <motion.div style={{ y: yParete }} className="absolute inset-0 top-[18%]">
        <PareteDoghe tubi={8} />
      </motion.div>

      {/* stacco netto muro/doghe, come nella sala: niente sfumatura */}
      <div className="pointer-events-none absolute inset-x-0 top-[18%] z-10 h-10 bg-gradient-to-b from-black/55 to-transparent" />

      {/* ---------- la fascia insegna ---------- */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-20 mt-16 md:mt-20"
      >
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="mx-3 flex items-center justify-center gap-3 rounded-[14px] border-[3px] border-blu-notte bg-crema px-4 py-2.5 md:mx-auto md:w-fit md:gap-5 md:px-10 md:py-3"
          style={{ boxShadow: '0 10px 0 0 rgba(6,15,51,0.35)' }}
        >
          <img
            src="./brand/mascotte.png"
            alt=""
            aria-hidden="true"
            width="34"
            height="41"
            className="h-8 w-auto md:h-11"
          />
          <span className="text-[0.82rem] font-extrabold tracking-[0.12em] text-blu uppercase md:text-xl md:tracking-[0.18em]">
            Yogurteria • Crêperia
          </span>
        </motion.div>
      </motion.div>

      {/* ---------- il logotipo al neon + il frappè ---------- */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-20 flex flex-1 items-center justify-center"
      >
        <div className="relative w-full">
          {/* Frappè scontornato. Su mobile sta DIETRO al logotipo (z-10): davanti
              si mangiava la "Y" e il nome diventava illeggibile. Su desktop c'è
              spazio, quindi passa davanti (md:z-30) e crea la profondità. */}
          <motion.img
            src="./brand/frappe-cutout.webp"
            alt="Frappè con panna montata, caramello e granella di cioccolato"
            initial={{ opacity: 0, scale: 0.86, rotate: 6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
            // Lo scatto originale taglia il braccio sul bordo inferiore del
            // fotogramma: lasciato così si vedeva una linea netta a mezz'aria.
            // Una maschera sfuma l'ultimo quinto, così il braccio sembra
            // entrare nell'inquadratura invece che finire di colpo.
            style={{
              y: yFrappe,
              WebkitMaskImage:
                'linear-gradient(to bottom, #000 74%, rgba(0,0,0,0.55) 90%, transparent 99%)',
              maskImage:
                'linear-gradient(to bottom, #000 74%, rgba(0,0,0,0.55) 90%, transparent 99%)',
            }}
            className="pointer-events-none absolute -right-10 bottom-[-16%] z-10 w-[46%] max-w-[320px] drop-shadow-[0_26px_50px_rgba(0,0,0,0.55)] md:right-[0.5%] md:bottom-[-30%] md:z-30 md:w-[24%]"
          />

          <motion.h1
            style={{ y: yLogo }}
            className="relative z-20 px-3 text-center leading-none"
          >
            <span className="sr-only">Yoghy — Yogurteria e Crêperia a Cuneo</span>
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.1 }}
              className="accendi neon-testo block font-display text-[24vw] font-extrabold tracking-[-0.055em] text-white md:text-[15vw]"
              style={{ animationDelay: '0.5s' }}
            >
              YOGHY
            </motion.span>
          </motion.h1>

          {/* la riga sotto il logotipo, come il claim inciso sotto un'insegna */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 mx-auto mt-1 max-w-[19ch] px-4 text-center font-hand text-2xl leading-tight text-white/95 md:max-w-none md:text-4xl"
          >
            yogurt, crêpes e frappè — a due passi dal centro di Cuneo
          </motion.p>
        </div>
      </motion.div>

      {/* ---------- mascotte + call to action ---------- */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-30 flex flex-col gap-4 px-3 pb-[calc(2.25rem+env(safe-area-inset-bottom,0px))] md:flex-row md:items-end md:justify-between md:px-8 md:pb-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 flex items-end gap-3 md:order-1"
        >
          <Mascotte size={78} className="shrink-0 md:w-[104px]" />
          <p className="mb-2 max-w-[16ch] text-xs leading-tight font-semibold text-white/80 md:text-sm">
            {LOCALE.via}
            <br />
            {LOCALE.citta}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 flex flex-col gap-2.5 sm:flex-row md:order-2 md:items-center"
        >
          <a
            href="#menu"
            className="pill bordo-spesso ombra-dura border-blu-notte bg-crema px-6 py-3.5 text-base text-blu transition-transform duration-200 hover:-translate-y-1 hover:translate-x-0.5 md:text-lg"
          >
            Guarda il menù
          </a>
          <a
            href={LOCALE.deliveroo}
            target="_blank"
            rel="noopener noreferrer"
            className="pill bordo-spesso ombra-dura border-blu-notte bg-arancio px-6 py-3.5 text-base text-blu-notte transition-transform duration-200 hover:-translate-y-1 hover:translate-x-0.5 md:text-lg"
          >
            Ordina a domicilio ↗
          </a>
        </motion.div>
      </motion.div>
    </header>
  )
}
