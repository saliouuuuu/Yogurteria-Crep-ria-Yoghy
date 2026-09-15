import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Nastro from './components/Nastro.jsx'
import Manifesto from './components/Manifesto.jsx'
import Menu from './components/Menu.jsx'
import Galleria from './components/Galleria.jsx'
import Dove from './components/Dove.jsx'
import Footer from './components/Footer.jsx'
import BarraMobile from './components/BarraMobile.jsx'

/**
 * Ordine delle sezioni: insegna → promessa → menù → prove → indirizzo.
 * Il menù sta al centro perché è il motivo numero uno per cui qualcuno apre
 * il sito di una yogurteria; la galleria viene dopo per confermare la scelta,
 * l'indirizzo chiude perché è l'ultima cosa che serve prima di muoversi.
 * I nastri colorati fra una sezione e l'altra sostituiscono i soliti margini
 * bianchi: il passaggio di colore è il ritmo del sito.
 */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        <Nastro
          bg="#f2661b"
          colore="#060f33"
          durata={24}
          voci={[
            'Yogurt soft',
            'Crêpes dolci',
            'Crêpes salate',
            'Frappè',
            'Pokè dolce',
            'Tiramisù mini',
          ]}
        />

        <Manifesto />

        <Nastro
          bg="#c9187e"
          colore="#ffffff"
          durata={30}
          inverso
          separatore="•"
          voci={[
            'Via XX Settembre 7/F — Cuneo',
            'Aperto anche la domenica',
            'Si ordina anche a domicilio',
          ]}
        />

        <Menu />
        <Galleria />

        <Nastro
          bg="#1152e0"
          colore="#ffffff"
          durata={22}
          voci={['Passa a trovarci', '351 928 0222', '@yoghycuneo', 'Cuneo']}
        />

        <Dove />
      </main>
      <Footer />
      <BarraMobile />
    </>
  )
}
