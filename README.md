# Yoghy — Yogurteria • Crêperia, Cuneo

Sito vetrina per **Yoghy**, yogurteria e crêperia di Via XX Settembre 7/F, Cuneo.
Pagina singola, mobile-first, con menù digitale navigabile, galleria delle foto
del locale e contatti.

Le motivazioni delle scelte estetiche sono in **[DESIGN.md](./DESIGN.md)**.

## Avvio

```bash
npm install
npm run dev        # sviluppo su http://localhost:5173
npm run build      # build di produzione in dist/
npm run preview    # anteprima della build su http://localhost:4173
```

Serve Node 20 o superiore.

## Messa online

`npm run build` produce una cartella `dist/` di file statici: nessun server,
nessun database, nessuna chiave API. Si pubblica ovunque.

- **Netlify:** trascinare la cartella `dist/` su [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel / Cloudflare Pages:** collegare il repository, comando `npm run build`, cartella `dist`.
- **Hosting tradizionale (FTP):** caricare il contenuto di `dist/`. Funziona
  anche in una sottocartella, perché la build usa percorsi relativi
  (`base: './'` in `vite.config.js`).

## Struttura

```
public/
  foto/        foto del locale ottimizzate in .webp (generate dai file in sorgenti/)
  brand/       mascotte scontornata + frappè scontornato
  fonts/       font self-hosted (nessuna chiamata a Google)
src/
  data/menu.js   il menù: nomi, formati, prezzi, extra
  data/site.js   indirizzo, telefono, orari, social, galleria
  components/    le sezioni della pagina
sorgenti/      le foto originali non trattate
```

## Cosa si cambia, e dove

| Serve cambiare…                     | File                  |
| ----------------------------------- | --------------------- |
| un prezzo, un gusto, una categoria  | `src/data/menu.js`    |
| orari, telefono, indirizzo, social  | `src/data/site.js`    |
| le foto della galleria              | `src/data/site.js` + `public/foto/` |
| i colori del brand                  | `src/index.css` (blocco `@theme`)   |

## ⚠️ Da confermare prima della pubblicazione

**Gli orari di apertura in `src/data/site.js` sono un segnaposto.** Non sono
pubblicati da nessuna parte e non sono stati inventati come dato reale: vanno
sostituiti con quelli veri prima di mandare online il sito.

Indirizzo, numero di telefono, profilo Instagram (`@yoghycuneo`) e pagina
Deliveroo sono invece dati reali e verificati.
