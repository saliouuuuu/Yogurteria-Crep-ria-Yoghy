/* Dati del locale.
   ⚠️  DA CONFERMARE CON IL PROPRIETARIO prima della messa online: gli ORARI.
   Non sono pubblicati da nessuna parte, quelli qui sotto sono un segnaposto
   plausibile. Indirizzo, telefono, Instagram e Deliveroo sono invece reali. */

export const LOCALE = {
  nome: 'Yoghy',
  sottotitolo: 'Yogurteria • Crêperia',
  via: 'Via XX Settembre 7/F',
  citta: '12100 Cuneo (CN)',
  telefono: '351 928 0222',
  telefonoTel: '+393519280222',
  instagram: 'https://www.instagram.com/yoghycuneo/',
  instagramHandle: '@yoghycuneo',
  deliveroo:
    'https://deliveroo.it/it/menu/cuneo/cuneo/yogurteria-creperia-yoghy-via-xx-settembre-7-f',
  // Coordinate reali dell'indirizzo (geocodifica OpenStreetMap/Nominatim:
  // "7, Via Venti Settembre, Cuneo Centro, 12100 Cuneo").
  lat: 44.3884453,
  lon: 7.5446987,
  // Mappa OpenStreetMap invece di Google Maps: funziona senza chiave API e
  // soprattutto NON scrive cookie di profilazione, quindi il sito non ha
  // bisogno di un banner di consenso solo per mostrare dove si trova.
  // Il pulsante "Indicazioni" apre comunque Google Maps, che è quello che la
  // gente ha sul telefono.
  mappaEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=7.5417%2C44.3871%2C7.5477%2C44.3898&layer=mapnik&marker=44.3884453%2C7.5446987',
  mappaLink:
    'https://www.google.com/maps/dir/?api=1&destination=Via+XX+Settembre+7%2FF%2C+12100+Cuneo+CN',

  // ⚠️ SEGNAPOSTO — sostituire con gli orari veri
  orari: [
    { giorni: 'Lunedì', ore: 'Chiuso', chiuso: true },
    { giorni: 'Martedì — Giovedì', ore: '15:00 — 23:00' },
    { giorni: 'Venerdì — Sabato', ore: '15:00 — 24:00' },
    { giorni: 'Domenica', ore: '15:00 — 23:00' },
  ],
}

/* La galleria è costruita come un feed, non come una griglia:
   ogni scatto ha un peso e una didascalia, come un post. */
export const GALLERIA = [
  { src: './foto/crepe-neon.webp',          alt: 'Crêpe con crumble sotto i neon blu della sala', didascalia: 'Sotto i neon, sempre', formato: 'alto' },
  { src: './foto/coppetta-oreo.webp',       alt: 'Coppetta di yogurt con granella di biscotto al cioccolato', didascalia: 'Yogurt + Oreo', formato: 'largo' },
  { src: './foto/bubble-marmo.webp',        alt: 'Bubble waffle alla nutella e crêpe sul bancone di marmo', didascalia: 'Doppio giro', formato: 'alto' },
  { src: './foto/coppetta-pistacchio.webp', alt: 'Coppetta di yogurt con crema al pistacchio e granella', didascalia: 'Pistacchio e granella', formato: 'largo' },
  { src: './foto/poke-hippo.webp',          alt: 'Pokè dolce con Happy Hippo e perline di cioccolato bianco', didascalia: 'Pokè dolce, 6.50', formato: 'alto' },
  { src: './foto/crepe-kinder.webp',        alt: 'Preparazione di una crêpe roll con Kinder', didascalia: 'Si fa davanti a te', formato: 'alto' },
  { src: './foto/coppetta-kinder.webp',     alt: 'Coppetta con cioccolato fondente e wafer', didascalia: 'Fondente sopra tutto', formato: 'largo' },
  { src: './foto/sala-neon.webp',           alt: 'La sala di Yoghy: parete magenta, doghe di legno, neon blu e sgabelli arancioni', didascalia: 'La sala', formato: 'largo' },
]

export const MANIFESTO = [
  {
    n: '01',
    titolo: 'Lo yogurt lo porzioni tu',
    testo:
      'Sei formati, dal Baby al Maxi. Paghi la taglia, non il capriccio: topping, creme e granelle le scegli tu al banco.',
    foto: './foto/coppetta-kinder.webp',
    alt: 'Coppetta di yogurt con cioccolato fondente e wafer',
  },
  {
    n: '02',
    titolo: 'Le crêpes si fanno davanti a te',
    testo:
      'Impasto colato sulla piastra, farcito e chiuso mentre guardi. Dolci, salate o arrotolate attorno a un Kinder Bueno.',
    foto: './foto/crepe-kinder.webp',
    alt: 'Crêpe farcita con Kinder in preparazione',
  },
  {
    n: '03',
    titolo: 'È fatto per essere fotografato',
    testo:
      'Parete magenta, doghe di legno, neon blu. Il posto dove la coppetta viene bene anche prima di essere assaggiata.',
    foto: './foto/sala-neon.webp',
    alt: 'La sala con la parete magenta e i neon blu',
  },
]
