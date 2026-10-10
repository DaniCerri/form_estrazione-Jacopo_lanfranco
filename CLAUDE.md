# Form Estrazione Jacopo — Chef Battle 2026

## Panoramica Progetto
Web application mobile-first per l'iscrizione all'estrazione a premi esclusiva della serata **Chef Battle del 21 Ottobre 2026**.
Gli utenti si registrano da smartphone durante la serata per concorrere all'unico premio in palio: **una cena per due persone preparata privatamente dallo Chef Jacopo Lanfranco**.
L'estrazione dal vivo del vincitore avverrà al termine della serata.

## Gerarchia e Struttura della Pagina (Mobile-First)
1. **Nessuna Navbar**: L'interfaccia si apre direttamente con la copertina dell'evento.
2. **Hero a Schermo Intero (Full Bleed)**: Foto `Hero_Jacopo.avif` a tutta larghezza con titolo e data dell'evento (`CHEF BATTLE • 21 OTTOBRE 2026`).
3. **Modulo di Iscrizione Subito Sotto la Hero**: Posizionato immediatamente a contatto con la copertina per massima pulizia e conversioni immediate.
4. **Sezioni di Dettaglio sotto al Form**:
   - **Premio Esclusivo**: Scheda della cena per due con la foto di Jacopo (`Jacopo.avif`).
   - **Come Funziona**: I 3 step sintetici del sorteggio live.
   - **Domande Frequenti (FAQ)**: Accordion su orari, reperibilità e cena.
   - **Footer & Pagine Legali**: Link per apertura Drawer con Termini/Regolamento, Privacy Policy e Cookie Policy.

## Identità Visiva e Linee Guida
- **Stile**: Rigorosamente **Black and White**, editoriale, luxury gourmet.
- **Layout**: Full-bleed edge-to-edge su schermi smartphone (tutti gli elementi e le immagini riempiono la larghezza senza margini di restringimento).
- **Tipografia**: Outfit Variable (testi e form) e Playfair Display Variable (titoli editoriali luxury).
- **Immagini Ufficiali**:
  - `/immagini/Hero_Jacopo.avif`
  - `/immagini/Jacopo.avif`

## Dati del Modulo
- **Nome** (obbligatorio)
- **Cognome** (obbligatorio)
- **Telefono** (obbligatorio, utilizzato per la chiamata del vincitore a fine serata)
- **Email** (obbligatorio, per conferma iscrizione e comunicazioni)
- **Nickname Instagram** (facoltativo, per menzione live in sala)
- **Consenso Regolamento Concorso** (obbligatorio, consultabile via Sheet drawer)
- **Consenso Privacy GDPR** (obbligatorio, consultabile via Sheet drawer)
- **Consenso Eventi Futuri** (facoltativo)

## Deploy su Railway (Docker)
- `Dockerfile`: Multi-stage build (Node 22 Alpine per build statico + Nginx Alpine per il serving).
- `nginx.conf.template`: Supporta la variabile `$PORT` iniettata dinamicamente da Railway tramite `envsubst`.
- `.dockerignore`: Esclude `node_modules`, `dist` e file non necessari per build veloci.
- Routing SPA con fallback a `index.html` e compressione gzip attiva.
