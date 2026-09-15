import { useEffect, useRef, useState } from 'react'

/**
 * La parete a doghe con i tubi al neon verticali.
 *
 * È IL motivo visivo del locale (listelli di legno chiaro + neon blu accesi
 * in verticale) e qui diventa la texture portante del sito. Ricostruita in CSS
 * anziché con una foto: pesa zero, resta nitida a qualsiasi densità di pixel e
 * i tubi possono accendersi davvero uno alla volta.
 *
 * I tubi si accendono con lo stutter del neon vero quando la sezione entra
 * nel viewport — non tutti insieme, con ritardi irregolari.
 */
export default function PareteDoghe({ className = '', tubi = 7, opacita = 1 }) {
  const ref = useRef(null)
  const [acceso, setAcceso] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setAcceso(true), io.disconnect()),
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Posizioni volutamente irregolari: nella foto i neon non sono equidistanti.
  const posizioni = Array.from({ length: tubi }, (_, i) => {
    const passo = 100 / tubi
    return {
      left: `${passo * i + passo * (0.3 + ((i * 37) % 40) / 100)}%`,
      top: `${4 + ((i * 53) % 26)}%`,
      height: `${34 + ((i * 29) % 40)}%`,
      delay: (i * 137) % 900,
    }
  })

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`doghe doghe-ombra absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: opacita }}
    >
      {posizioni.map((p, i) => (
        <span
          key={i}
          className={`tubo ${acceso ? 'accendi respiro' : 'opacity-0'}`}
          style={{
            left: p.left,
            '--t': p.top,
            '--h': p.height,
            animationDelay: `${p.delay}ms, ${1500 + p.delay}ms`,
          }}
        />
      ))}
    </div>
  )
}
