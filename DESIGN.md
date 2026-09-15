# Note di design — Yoghy

Perché il sito è fatto così. Ogni scelta qui sotto è una decisione presa, non
un'opzione di default.

---

## 1. Il punto di partenza: il locale esiste già, il sito lo deve riconoscere

Yoghy ha già un'identità forte e molto specifica, visibile nelle foto: parete
**magenta**, pannellature in **doghe di legno chiaro** attraversate da **tubi al
neon blu verticali**, sgabelli Tolix **arancioni**, bancone in **marmo nero**,
tabellone del menù **blu elettrico su crema** con badge prezzo arrotondati, un
**mascotte** (cono gelato antropomorfo con i guantoni da boxe) e un poster dei
Simpson in versione "Ultima Cena" appeso al muro.

Il sito non "si ispira" a quel mondo: lo ricostruisce. Il test che ho usato per
ogni scelta è se il proprietario, guardandola, riconosce il suo locale.

**Nessun colore è stato inventato.** Sono tutti campionati dalle foto e
dichiarati in `src/index.css` nel blocco `@theme`:

| Token | Valore | Da dove viene |
| --- | --- | --- |
| `--color-blu` | `#1152e0` | l'insegna e il tabellone del menù |
| `--color-magenta` | `#c9187e` | la parete della sala |
| `--color-arancio` | `#f2661b` | gli sgabelli |
| `--color-neon` | `#4d84ff` | l'alone dei tubi verticali |
| `--color-crema` | `#fbf6e9` | il fondo del menù |
| `--color-marmo` | `#16151a` | il bancone |
| `--color-legno` | `#d8bd94` | le doghe |

---

## 2. La parete a doghe è il motivo portante, ed è fatta in CSS

È l'elemento più riconoscibile del locale, quindi diventa la texture di fondo
del sito (hero, sezione "Dove siamo").

È ricostruita con un `repeating-linear-gradient` più una serie di tubi al neon
in `box-shadow`, **non con una fotografia**. Tre motivi:

1. pesa zero byte e resta nitida a qualsiasi densità di pixel;
2. si adatta a qualsiasi altezza di schermo senza deformarsi;
3. soprattutto: i tubi possono **accendersi uno alla volta**.

L'animazione `accendi` non è una dissolvenza. È il tremolio di un neon vero che
parte: due sbalzi, un tentennamento, poi tiene (`steps(1, end)`, non `ease`).
Poi resta un `respiro` lentissimo, perché un neon non è mai perfettamente
fermo. Ogni tubo ha un ritardo diverso, e le posizioni sono volutamente
irregolari: nella foto non sono equidistanti.

---

## 3. L'hero è l'insegna, non un titolo centrato

La richiesta esplicita era di evitare il pattern "titolo centrato +
sottotitolo + bottone + tre card con iconcine". La risposta non è stata
decorare quel pattern, ma sostituirne il concetto.

L'apertura **è la vetrina di Via XX Settembre, ingrandita**: in alto la fascia
crema con la mascotte e "YOGURTERIA • CRÊPERIA" (esattamente com'è l'insegna
vera), sotto la parete a doghe con i neon che si accendono, in mezzo il
logotipo trattato come tubo al neon.

Il **frappè è una foto vera scontornata** (`public/brand/frappe-cutout.webp`,
estratta con un riempimento per contiguità dallo sfondo blu piatto dello scatto
originale) e si sovrappone al logotipo. È il trucco che dà profondità senza 3D.

Dettaglio non banale: su desktop il frappè sta **davanti** al logotipo, su
mobile **dietro** (`z-10 md:z-30`). Davanti, su 390px, si mangiava la "Y" e il
nome del locale diventava illeggibile. La profondità non vale il nome.

---

## 4. Tipografia

- **Bricolage Grotesque** (300–800) per tutto: grottesca contemporanea, pesante
  e leggermente irregolare. Ha carattere senza essere una "font buffa", e regge
  sia il logotipo a 24vw sia il prezzo dentro una pill da 12px.
- **Caveat** per gli accenti scritti a mano (`dolci`, `salate`, `mini`, i
  sopra-titoli). Riprende gli accenti corsivi del loro tabellone.

Solo due famiglie, **self-hosted** in `public/fonts/`, solo sottoinsiemi
latin/latin-ext. Niente Google Fonts: una richiesta di rete in meno, nessun
salto di font al caricamento e — per un'attività commerciale europea — nessun
trasferimento di dati a terzi da giustificare.

I titoli hanno `letter-spacing: -0.045em` e `line-height: 0.88`: devono
stringere come un manifesto, non respirare come un articolo.

---

## 5. La pill prezzo è il componente base

Sul loro tabellone ogni prezzo sta dentro un badge arrotondato. È l'elemento
d'interfaccia più riconoscibile che hanno, quindi nel sito **diventa il
mattone di tutto**: prezzi, filtri di categoria, tag degli extra, pulsanti,
barra mobile. Il sito è coerente perché ripete un loro elemento, non perché
segue una griglia.

---

## 6. Il menù è il centro del sito

Chi apre il sito di una yogurteria vuole sapere due cose: cosa c'è e quanto
costa. Quindi il menù sta **al centro della pagina**, non in fondo, ed è la
sezione più curata.

- Chip di categoria scorrevoli con l'indicatore che **scivola** da una all'altra
  (`layoutId`), non che appare e scompare. Su mobile la chip scelta si
  ricentra da sola: niente caccia al dito.
- Ogni categoria ha il **suo colore** (blu / magenta / arancio) e la **sua
  foto**: cambiare categoria cambia visibilmente ambiente, non solo testo.
- Le voci entrano **in sequenza** (stagger + micro-sfocatura), così l'occhio
  scende lungo la lista invece di subirla tutta insieme.
- Quattro impaginazioni diverse a seconda del tipo di categoria: formati
  (Yogurt), gusti con due taglie (Frappè), prezzo per voce (Crêpes), passaggi
  numerati con prezzo unico (Pokè). Un menù vero non ha una forma sola.

I prezzi in `src/data/menu.js` sono trascritti uno a uno dal tabellone.

---

## 7. La galleria è un feed, non una griglia

Due nastri di fotografie che scorrono in **direzioni opposte** mentre si scende:
la sezione è viva anche da ferma e si legge come uno scroll social, che è il
posto dove questo pubblico guarda le foto del cibo.

Toccando una foto si apre a tutto schermo con una transizione di **elemento
condiviso** (`layoutId`): la stessa immagine cresce, non ne compare un'altra.

Ogni nastro contiene tutte le foto, il secondo in ordine inverso: restano più
larghi dello schermo (altrimenti traslando scoprono il vuoto) senza sembrare un
copia-incolla.

---

## 8. Le animazioni, e perché ce n'è una in meno di quante potrebbero essercene

Inventario completo:

| Dove | Cosa | Perché
| --- | --- | --- |
| Hero | accensione a scatti dei neon | è il gesto del locale quando apre |
| Hero | parallasse su parete / logotipo / frappè | dà profondità alla vetrina |
| Mascotte | **tira un montante** al tocco, con nuvoletta fumetto | ha i guantoni: è l'unica cosa che poteva fare |
| Sezioni | tendina `clip-path` che sale, con micro-rotazione | un cartellone che si apre, non il solito fade-up |
| Menù | indicatore che scivola + voci in sequenza | guida l'occhio lungo la lista |
| Galleria | nastri contrapposti + apertura a elemento condiviso | ritmo da feed |
| Nastri | marquee in CSS puro | scorre anche se il JS è occupato |
| Footer | logotipo che esce dallo schermo | la pagina non finisce, sconfina |

**Non c'è un preloader.** Ci stava benissimo (un neon che si accende), ma
avrebbe raddoppiato lo stesso gesto già fatto dall'hero e ritardato la prima
schermata. L'accensione dell'hero *è* l'introduzione.

Con `prefers-reduced-motion: reduce` il sito resta **completo e leggibile**:
niente parallasse, niente tremolii, niente contenuti bloccati a metà rivelazione.
Verificato, non dichiarato.

---

## 9. Scelte tecniche

**Vite + React + Tailwind v4 + Motion**, non Next.js.

Next.js avrebbe aggiunto un runtime server, il routing e la complessità di
build per una **pagina singola senza dati dinamici, senza login e senza
e-commerce**. Qui serviva l'opposto: una cartella di file statici che il
proprietario possa mettere online in trenta secondi e che costi zero di hosting.
`npm run build` produce `dist/`, si trascina su Netlify, finito. Se domani
servissero ordini online o più pagine, la migrazione a Next è comunque diretta.

`base: './'` nella configurazione: il sito funziona anche pubblicato in una
sottocartella, non solo sulla radice del dominio.

**Motion** (ex Framer Motion) invece di animazioni CSS scritte a mano, perché le
due cose che rendono il sito, l'indicatore che scivola fra le chip e la foto che
cresce nel lightbox, sono animazioni di layout: a mano sarebbero centinaia di
righe fragili. Dove invece bastava il CSS (nastri, neon, grana) **il CSS è
rimasto**: non passa dal thread JavaScript.

**Peso.** Circa 125 KB gzip di JavaScript (quasi tutto Motion) e circa 600 KB di
fotografie, tutte convertite in WebP e caricate in `lazy` tranne quelle
dell'hero. È un costo reale e consapevole: il pacchetto di animazioni è la ragione
per cui il sito non sembra un template. Se servisse scendere, la leva più
grossa è sostituire le animazioni di layout con CSS e togliere Motion.

---

## 10. Accessibilità

Tutti i contrasti testo/fondo sono stati **calcolati**, non stimati a occhio.
Il primo giro ne aveva sei sotto la soglia AA (4.5:1) — i claim delle schede
menù sul magenta erano a 3.86:1, l'etichetta "Da aggiungere" a 3.24:1, due
righe di footer sotto il 4:1 — e sono stati corretti alzando le opacità.
Adesso passano tutti. `:focus-visible` arancione sempre visibile; le foto hanno alt descrittivi in italiano; le chip del menù
sono veri `role="tab"`; il lightbox è un `dialog` che si chiude con Esc e
blocca lo scroll sotto; il logotipo enorme è `aria-hidden` con l'`h1` leggibile
solo dagli screen reader (il testo visibile è decorativo).

---

## 11. Cosa manca, dichiarato

**Gli orari in `src/data/site.js` sono un segnaposto.** Non sono pubblicati da
nessuna parte e non li ho inventati facendoli passare per veri: sono marcati
come da confermare nel codice e nel README. Vanno sostituiti prima di pubblicare.

Sono invece reali e verificati: indirizzo, telefono (351 928 0222), profilo
Instagram `@yoghycuneo` e la pagina Deliveroo, che è il pulsante "Ordina"
ovunque nel sito.

La mappa è **OpenStreetMap** e non Google Maps: funziona senza chiave API e non
scrive cookie di profilazione, quindi il sito non ha bisogno di un banner di
consenso solo per mostrare dove si trova. Il pulsante "Indicazioni" apre
comunque Google Maps, che è quello che la gente ha sul telefono. Dietro
l'iframe c'è un pannello di marca: se la mappa non carica non compare l'icona
di documento rotto.

---

## 12. Se si continua

In ordine di ritorno per il locale:

1. **Orari veri**, con l'indicazione "aperto adesso / chiuso" calcolata dal vivo.
2. **Foto nuove fatte apposta**: alcune di quelle attuali sono scatti da
   telefono mossi. Con lo stesso impianto grafico e foto migliori il salto è netto.
3. **Instagram in diretta** nella galleria al posto delle foto fisse.
4. **Pagina menù stampabile** e QR per i tavoli: stesso `menu.js`, un layout in più.
5. Ordine online proprio, se un giorno la commissione di Deliveroo pesa troppo.
