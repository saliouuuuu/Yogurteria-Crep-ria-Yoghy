import PareteDoghe from './PareteDoghe.jsx'
import Rivela from './Rivela.jsx'
import Mascotte from './Mascotte.jsx'
import { LOCALE } from '../data/site.js'

/**
 * DOVE SIAMO.
 * La sezione ripete l'ambiente vero (muro magenta + doghe + neon) perché è
 * l'informazione più concreta del sito: chi arriva qui deve riconoscere la
 * vetrina quando alza gli occhi dal telefono in Via XX Settembre.
 */
export default function Dove() {
  return (
    <section id="dove" className="grana relative overflow-hidden bg-magenta px-3 py-16 md:px-8 md:py-28">
      <div className="absolute inset-x-0 bottom-0 h-[55%] opacity-90">
        <PareteDoghe tubi={6} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-[55%] h-24 bg-gradient-to-b from-transparent to-magenta/0" />

      <div className="relative mx-auto max-w-[1180px]">
        <Rivela>
          <p className="font-hand text-2xl text-white/85 md:text-4xl">ci trovi qui</p>
        </Rivela>
        <Rivela delay={0.05}>
          <h2 className="mt-1 max-w-[11ch] text-[3.1rem] text-white md:text-[7rem]">
            Via XX Settembre 7/F
          </h2>
        </Rivela>

        <div className="mt-8 grid gap-4 md:mt-14 md:grid-cols-12 md:gap-6">
          {/* contatti + orari */}
          <Rivela className="md:col-span-5" delay={0.08}>
            <div className="h-full rounded-[24px] border-[3px] border-blu-notte bg-crema p-5 md:p-7">
              <p className="text-xs font-extrabold tracking-[0.16em] text-magenta uppercase">
                Indirizzo
              </p>
              <p className="mt-1.5 text-2xl leading-tight font-extrabold text-blu-notte md:text-3xl">
                {LOCALE.via}
                <br />
                {LOCALE.citta}
              </p>

              <p className="mt-6 text-xs font-extrabold tracking-[0.16em] text-magenta uppercase">
                Orari
              </p>
              <ul className="mt-2">
                {LOCALE.orari.map((o) => (
                  <li
                    key={o.giorni}
                    className="flex items-center gap-3 border-b border-blu-notte/12 py-2 text-sm last:border-0 md:text-base"
                  >
                    <span className="font-bold text-blu-notte">{o.giorni}</span>
                    <span className="h-px flex-1 bg-blu-notte/15" />
                    <span
                      className={`font-extrabold ${o.chiuso ? 'text-magenta' : 'text-blu'}`}
                    >
                      {o.ore}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href={`tel:${LOCALE.telefonoTel}`}
                  className="pill bordo-spesso ombra-dura flex-1 border-blu-notte bg-arancio px-5 py-3.5 text-base text-blu-notte transition-transform duration-200 hover:-translate-y-1"
                >
                  {LOCALE.telefono}
                </a>
                <a
                  href={LOCALE.mappaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill bordo-spesso ombra-dura flex-1 border-blu-notte bg-blu px-5 py-3.5 text-base text-white transition-transform duration-200 hover:-translate-y-1"
                >
                  Indicazioni ↗
                </a>
              </div>
            </div>
          </Rivela>

          {/* mappa */}
          <Rivela className="md:col-span-7" delay={0.14}>
            <div className="relative h-[300px] overflow-hidden rounded-[24px] border-[3px] border-blu-notte md:h-full md:min-h-[440px]">
              {/* Sotto alla mappa sta un pannello di marca: se l'iframe non
                  carica (rete lenta, blocco cookie, offline) si vede questo e
                  non l'icona di documento rotto. */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-blu-scuro px-6 text-center">
                <span className="text-lg font-extrabold text-white/90">
                  {LOCALE.via} — {LOCALE.citta}
                </span>
                <a
                  href={LOCALE.mappaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill bg-arancio px-5 py-3 text-sm text-blu-notte"
                >
                  Apri la mappa ↗
                </a>
              </div>
              <iframe
                title="Mappa: Yoghy, Via XX Settembre 7/F, Cuneo"
                src={LOCALE.mappaEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.2]"
              />
              {/* Sempre presente sopra alla mappa: se l'embed non carica, la
                  sezione resta comunque utile e sembra voluta. */}
              <a
                href={LOCALE.mappaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pill absolute right-3 bottom-3 border-2 border-blu-notte bg-crema px-4 py-2.5 text-sm text-blu-notte"
              >
                Apri la mappa ↗
              </a>
              <div className="pointer-events-none absolute bottom-3 left-3 flex items-end gap-2">
                <Mascotte size={64} verso={false} className="pointer-events-auto" />
                <span className="mb-1 rounded-full border-2 border-blu-notte bg-crema px-3 py-1.5 text-xs font-extrabold text-blu-notte">
                  siamo qui
                </span>
              </div>
            </div>
          </Rivela>
        </div>

        {/* la vetrina vera, come conferma visiva */}
        <Rivela delay={0.1}>
          <figure className="mt-4 overflow-hidden rounded-[24px] border-[3px] border-blu-notte md:mt-6">
            <img
              src="./foto/vetrina.webp"
              alt="La vetrina di Yoghy in Via XX Settembre a Cuneo, con l'insegna Yogurteria • Crêperia"
              loading="lazy"
              decoding="async"
              className="h-[220px] w-full object-cover md:h-[420px]"
            />
          </figure>
        </Rivela>
      </div>
    </section>
  )
}
