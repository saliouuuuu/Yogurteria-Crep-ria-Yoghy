import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Rivela from './Rivela.jsx'
import { MANIFESTO } from '../data/site.js'

function Blocco({ item, i }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Le foto salgono più lente della pagina: il blocco "respira" mentre passa.
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const dispari = i % 2 === 1

  return (
    <div
      ref={ref}
      className={`grid items-center gap-5 md:grid-cols-12 md:gap-10 ${
        dispari ? 'md:[&>*:first-child]:order-2' : ''
      }`}
    >
      <Rivela
        dir={dispari ? 'sinistra' : 'su'}
        className="relative md:col-span-5"
      >
        <div
          className="relative overflow-hidden rounded-[22px] border-[3px] border-blu-notte"
          style={{
            boxShadow: `14px 14px 0 0 ${['#1152e0', '#f2661b', '#c9187e'][i % 3]}`,
            rotate: `${dispari ? 1.6 : -1.6}deg`,
          }}
        >
          <motion.img
            style={{ y }}
            src={item.foto}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            className="h-[280px] w-full scale-105 object-cover md:h-[420px]"
          />
        </div>
      </Rivela>

      <div className="md:col-span-7">
        <Rivela delay={0.08}>
          <span
            className="contorno block font-display text-[5.5rem] leading-[0.8] font-extrabold text-blu md:text-[9rem]"
            aria-hidden="true"
          >
            {item.n}
          </span>
        </Rivela>
        <Rivela delay={0.14}>
          <h3 className="mt-2 max-w-[16ch] text-[2rem] text-blu-notte md:text-[3.4rem]">
            {item.titolo}
          </h3>
        </Rivela>
        <Rivela delay={0.2}>
          <p className="mt-3 max-w-[46ch] text-base leading-snug font-medium text-blu-notte/75 md:mt-5 md:text-xl">
            {item.testo}
          </p>
        </Rivela>
      </div>
    </div>
  )
}

export default function Manifesto() {
  return (
    <section id="locale" className="relative bg-crema px-3 py-16 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1180px]">
        <Rivela>
          <p className="mb-2 font-hand text-2xl text-magenta md:text-4xl">
            tre cose, in ordine di importanza
          </p>
        </Rivela>
        <Rivela delay={0.06}>
          <h2 className="max-w-[13ch] text-[3.1rem] text-blu md:text-[7rem]">
            Non è il solito yogurt.
          </h2>
        </Rivela>

        <div className="mt-12 flex flex-col gap-16 md:mt-24 md:gap-32">
          {MANIFESTO.map((m, i) => (
            <Blocco key={m.n} item={m} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
