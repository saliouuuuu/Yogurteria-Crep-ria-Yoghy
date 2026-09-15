/**
 * Il badge prezzo arrotondato preso dal tabellone del locale.
 * È l'elemento d'interfaccia più riconoscibile del loro menù, quindi qui
 * diventa il componente base di tutto il sito: prezzi, filtri, tag, CTA.
 */
export default function Pill({
  children,
  bg = '#ffffff',
  colore = '#1152e0',
  className = '',
  size = 'md',
}) {
  const misure = {
    sm: 'text-[0.72rem] px-2.5 py-[0.3rem]',
    md: 'text-sm px-3.5 py-1.5 md:text-base md:px-4',
    lg: 'text-base px-5 py-2.5 md:text-lg md:px-6 md:py-3',
  }[size]

  return (
    <span
      className={`pill ${misure} ${className}`}
      style={{ background: bg, color: colore }}
    >
      {children}
    </span>
  )
}
