import { motion } from 'motion/react'
import { LOCALE } from '../data/site.js'

/**
 * FOOTER.
 * Chiude col logotipo enorme tagliato dal bordo inferiore: la pagina non
 * "finisce", esce dallo schermo. Ultimo richiamo al neon dell'insegna.
 */
export default function Footer() {
  return (
    <footer className="grana relative overflow-hidden bg-blu-notte pt-14 pb-[calc(96px+env(safe-area-inset-bottom,0px))] md:pt-20 md:pb-0">
      <div className="mx-auto max-w-[1180px] px-3 md:px-8">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-[24ch] text-2xl leading-[1.05] font-extrabold tracking-[-0.04em] text-white md:text-4xl">
              Yogurt, crêpes e frappè.
              <span className="text-arancio"> A Cuneo.</span>
            </p>
            <a
              href={LOCALE.deliveroo}
              target="_blank"
              rel="noopener noreferrer"
              className="pill mt-5 inline-flex bg-arancio px-6 py-3.5 text-base text-blu-notte transition-transform duration-200 hover:-translate-y-1"
            >
              Ordina a domicilio ↗
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-extrabold tracking-[0.16em] text-white/60 uppercase">
              Contatti
            </p>
            <ul className="mt-3 flex flex-col gap-1.5 text-base font-bold text-white/85">
              <li>
                <a className="hover:text-arancio" href={`tel:${LOCALE.telefonoTel}`}>
                  {LOCALE.telefono}
                </a>
              </li>
              <li>{LOCALE.via}</li>
              <li>{LOCALE.citta}</li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-extrabold tracking-[0.16em] text-white/60 uppercase">
              Social
            </p>
            <ul className="mt-3 flex flex-col gap-1.5 text-base font-bold text-white/85">
              <li>
                <a
                  className="hover:text-arancio"
                  href={LOCALE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram {LOCALE.instagramHandle} ↗
                </a>
              </li>
              <li>
                <a
                  className="hover:text-arancio"
                  href={LOCALE.deliveroo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Deliveroo ↗
                </a>
              </li>
              <li>
                <a className="hover:text-arancio" href={LOCALE.mappaLink} target="_blank" rel="noopener noreferrer">
                  Google Maps ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-white/12 pt-5 text-xs font-semibold text-white/60 md:mt-14">
          © {new Date().getFullYear()} Yoghy — Yogurteria • Crêperia, Cuneo. Tutte
          le fotografie sono del locale.
        </p>
      </div>

      {/* logotipo che esce dallo schermo */}
      <motion.p
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
        className="neon-testo mt-6 -mb-[0.16em] w-full text-center text-[25vw] leading-[0.8] font-extrabold tracking-[-0.06em] text-white/95 select-none"
      >
        YOGHY
      </motion.p>
    </footer>
  )
}
