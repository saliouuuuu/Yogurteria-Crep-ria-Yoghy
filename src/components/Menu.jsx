import { useRef, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'motion/react'
import Pill from './Pill.jsx'
import Rivela from './Rivela.jsx'
import { CATEGORIE, TEMI } from '../data/menu.js'
import { LOCALE } from '../data/site.js'

/* Stagger condiviso da tutte le liste: le voci entrano una dietro l'altra,
   non tutte insieme. Su un menù è quello che guida l'occhio verso il basso. */
const lista = {
  in: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
  out: { transition: { staggerChildren: 0.015, staggerDirection: -1 } },
}
const voce = {
  iniziale: { opacity: 0, y: 22, filter: 'blur(6px)' },
  in: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
  out: { opacity: 0, y: -12, filter: 'blur(4px)', transition: { duration: 0.18 } },
}

function Riga({ children, className = '' }) {
  return (
    <motion.li variants={voce} className={className}>
      {children}
    </motion.li>
  )
}

function Contenuto({ cat, tema }) {
  const { tipo } = cat

  if (tipo === 'gusti') {
    return (
      <>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {cat.taglie.map((t) => (
            <span
              key={t.nome}
              className="flex items-center gap-2 rounded-full bg-black/18 py-1.5 pr-1.5 pl-4"
            >
              <span className="text-sm font-extrabold tracking-wide">{t.nome}</span>
              <Pill bg={tema.pill} colore={tema.pillTesto} size="sm">
                {t.prezzo}
              </Pill>
            </span>
          ))}
        </div>
        <motion.ul
          variants={lista}
          initial="out"
          animate="in"
          exit="out"
          className="flex flex-wrap gap-2"
        >
          {cat.voci.map((v) => (
            <Riga key={v.nome}>
              <span className="inline-block rounded-full border-2 border-current/35 px-4 py-2 text-base font-bold md:text-lg">
                {v.nome}
              </span>
            </Riga>
          ))}
        </motion.ul>
      </>
    )
  }

  if (tipo === 'passaggi') {
    return (
      <>
        <div className="mb-5 flex items-center gap-3">
          <span className="text-sm font-bold uppercase opacity-95">Prezzo unico</span>
          <Pill bg={tema.pill} colore={tema.pillTesto} size="lg">
            {cat.prezzoUnico}
          </Pill>
        </div>
        <motion.ol
          variants={lista}
          initial="out"
          animate="in"
          exit="out"
          className="flex flex-col gap-2.5"
        >
          {cat.voci.map((v, i) => (
            <Riga key={v.nome} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/22 text-sm font-extrabold">
                {i + 1}
              </span>
              <span className="text-lg font-bold md:text-2xl">{v.nome}</span>
            </Riga>
          ))}
        </motion.ol>
      </>
    )
  }

  // 'formati' e 'prezzi' condividono la riga classica nome ····· prezzo
  return (
    <motion.ul
      variants={lista}
      initial="out"
      animate="in"
      exit="out"
      className="flex flex-col"
    >
      {cat.voci.map((v) => (
        <Riga
          key={v.nome}
          className="group/riga flex items-center gap-3 border-b border-current/18 py-3 last:border-0 md:py-4"
        >
          <span className="text-lg font-bold transition-transform duration-200 group-hover/riga:translate-x-1 md:text-2xl">
            {v.nome}
          </span>
          <span className="h-px flex-1 bg-current/25" />
          <Pill bg={tema.pill} colore={tema.pillTesto}>
            {v.prezzo}
          </Pill>
        </Riga>
      ))}
    </motion.ul>
  )
}

export default function Menu() {
  const [attiva, setAttiva] = useState(CATEGORIE[0].id)
  const barra = useRef(null)
  const cat = CATEGORIE.find((c) => c.id === attiva)
  const tema = TEMI[cat.tema]

  function scegli(id, e) {
    setAttiva(id)
    // Su mobile la chip scelta si riporta al centro da sola: niente caccia al dito.
    e?.currentTarget?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }

  return (
    <section id="menu" className="grana relative overflow-hidden bg-marmo px-3 py-16 md:px-8 md:py-28">
      {/* alone al neon sul fondo scuro: è la luce del locale, non un gradient a caso */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(60% 45% at 18% 8%, rgba(17,82,224,0.5), transparent 62%), radial-gradient(55% 45% at 88% 78%, rgba(201,24,126,0.42), transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-[1180px]">
        <Rivela>
          <p className="font-hand text-2xl text-arancio md:text-4xl">
            tutto quello che c'è al banco
          </p>
        </Rivela>
        <Rivela delay={0.05}>
          <h2 className="mt-1 text-[3.4rem] text-white md:text-[7.5rem]">Il menù</h2>
        </Rivela>

        {/* ---------- le chip categoria ---------- */}
        <LayoutGroup id="menu-chip">
          <div
            ref={barra}
            role="tablist"
            aria-label="Categorie del menù"
            className="no-bar -mx-3 mt-7 flex snap-x snap-mandatory gap-2 overflow-x-auto px-3 pb-2 md:mx-0 md:flex-wrap md:px-0"
          >
            {CATEGORIE.map((c) => {
              const on = c.id === attiva
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={on}
                  onClick={(e) => scegli(c.id, e)}
                  className={`relative shrink-0 snap-center rounded-full px-5 py-3 text-sm font-extrabold whitespace-nowrap transition-colors duration-200 md:text-base ${
                    on ? 'text-marmo' : 'text-white/65 hover:text-white'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="chip-attiva"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: TEMI[c.tema].bg === '#f2661b' ? '#f2661b' : '#ffffff' }}
                    />
                  )}
                  <span className="relative z-10">{c.nome}</span>
                </button>
              )
            })}
          </div>
        </LayoutGroup>

        {/* ---------- la scheda ---------- */}
        <div className="mt-5 md:mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="grid overflow-hidden rounded-[26px] border-[3px] border-blu-notte md:grid-cols-12"
              style={{ background: tema.bg, color: tema.testo }}
            >
              {/* la foto della categoria */}
              <div className="relative h-[190px] overflow-hidden md:col-span-5 md:h-auto md:min-h-[440px]">
                <motion.img
                  key={cat.foto}
                  src={cat.foto}
                  alt={`${cat.nome} da Yoghy`}
                  loading="lazy"
                  decoding="async"
                  initial={{ scale: 1.16 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span
                  className="pointer-events-none absolute inset-0 mix-blend-multiply"
                  style={{ background: tema.bg, opacity: 0.22 }}
                />
                <span className="absolute bottom-3 left-3 font-hand text-3xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] md:text-5xl">
                  {cat.accento}
                </span>
              </div>

              {/* le voci */}
              <div className="p-5 md:col-span-7 md:p-9">
                <h3 className="text-[2.1rem] md:text-[3.2rem]">{cat.nome}</h3>
                <p className="mt-1.5 mb-6 max-w-[42ch] text-sm font-semibold opacity-90 md:text-lg">
                  {cat.claim}
                </p>

                <AnimatePresence mode="wait">
                  <motion.div key={cat.id + '-body'}>
                    <Contenuto cat={cat} tema={tema} />
                  </motion.div>
                </AnimatePresence>

                {cat.extra?.length > 0 && (
                  <div className="mt-7 border-t-2 border-dashed border-current/30 pt-5">
                    <p className="mb-2.5 text-xs font-extrabold tracking-[0.16em] uppercase opacity-95">
                      Da aggiungere
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cat.extra.map((e) => (
                        <span
                          key={e.nome}
                          className="flex items-center gap-2 rounded-full bg-black/18 py-1.5 pr-1.5 pl-3.5"
                        >
                          <span className="text-sm font-bold">{e.nome}</span>
                          <Pill bg={tema.pill} colore={tema.pillTesto} size="sm">
                            {e.prezzo}
                          </Pill>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Rivela delay={0.1}>
          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href={LOCALE.deliveroo}
              target="_blank"
              rel="noopener noreferrer"
              className="pill bordo-spesso border-blu-notte bg-arancio px-7 py-4 text-base text-blu-notte transition-transform duration-200 hover:-translate-y-1 md:text-lg"
            >
              Ordina a domicilio ↗
            </a>
            <p className="max-w-[34ch] text-sm font-semibold text-white/55">
              Prezzi in euro, aggiornati al tabellone in negozio. Allergeni e
              alternative senza lattosio: chiedi al banco.
            </p>
          </div>
        </Rivela>
      </div>
    </section>
  )
}
