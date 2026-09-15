/**
 * Il nastro scorrevole. Serve a due cose:
 * 1. cucire le sezioni fra loro con un blocco di colore pieno;
 * 2. ripetere indirizzo e prodotti finché non restano in testa.
 * È in CSS puro (nessun JS, nessuna libreria): scorre anche mentre il thread
 * principale è occupato, quindi non "scatta" sui telefoni lenti.
 */
export default function Nastro({
  voci,
  bg = '#c9187e',
  colore = '#ffffff',
  durata = 26,
  inverso = false,
  className = '',
  separatore = '✦',
}) {
  const riga = [...voci, ...voci]
  return (
    <div
      className={`relative w-full overflow-hidden py-3 md:py-4 ${className}`}
      style={{ background: bg, color: colore }}
      aria-hidden="true"
    >
      <div
        className={`scorri flex w-max items-center gap-6 md:gap-10 ${inverso ? 'scorri-rev' : ''}`}
        style={{ '--dur': `${durata}s` }}
      >
        {riga.map((v, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-6 text-sm font-extrabold tracking-[-0.02em] uppercase md:gap-10 md:text-lg"
          >
            {v}
            <span className="opacity-60">{separatore}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
