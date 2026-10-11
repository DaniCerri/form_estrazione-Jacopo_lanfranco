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
- **Tipografia**: Outfit Variable (testi e form) e Playfair Display Variable (titoli editoriali luxury), self-hosted in `src/assets/fonts` e ritagliati (`scripts/ritaglia_font.sh`).
- **Immagini Ufficiali** (originali in `immagini/`, versioni servite generate da `scripts/ottimizza_immagini.py`: ritaglio + bianco e nero già applicato, niente filtri CSS):
  - `/immagini/Hero_Jacopo.avif`
  - `/immagini/Jacopo.avif`

## Peso della pagina (rete scarsa in sala)
- Preact (non React), elementi nativi (`<dialog>`, `<details>`, checkbox), icone inline in `src/components/icons.tsx`. Niente shadcn/base-ui: non reintrodurre librerie UI pesanti.
- JS e CSS finiscono inline in `index.html` (plugin `inlineAppShell` in `vite.config.ts`): niente code splitting né `import()` dinamici, i chunk lazy non funzionerebbero.
- Sezioni sotto la piega con l'utility `sotto-piega` (`content-visibility: auto`); foto del premio e corsivo caricati con `useVicino` (`src/lib/vicino.ts`).
- Eventi Preact: `onInput` per i campi di testo (`onChange` scatta solo al blur), attributi SVG in kebab-case.

## Dati del Modulo
- **Nome**, **Cognome**, **Telefono** (chiamata del vincitore), **Email** (obbligatori)
- **Nickname Instagram** (facoltativo) + **Consenso menzione Instagram** (facoltativo, compare solo se c'è il nickname)
- **Zona** (normale / premium / vip): dal QR `?z=<codice opaco>`, altrimenti scelta nel form. Non incide sull'estrazione.
- **Dichiarazione maggiore età**, **Accettazione Regolamento**, **Presa visione Privacy** (obbligatori, separati)
- **Consenso Eventi Futuri** (facoltativo, marketing)

## Back-end e aspetti legali
- Back-end FastAPI in `../back-end` (repo separato). Il form invia a `POST /api/iscrizioni` (`src/lib/api.ts`, timeout + retry).
- È un concorso a premio (DPR 430/2001): estrazione unica su tutti gli iscritti, alla presenza di notaio.
- Dati del promotore e parametri del regolamento in `LEGAL_INFO` (`src/data/legalTexts.ts`): unica fonte per regolamento, privacy, FAQ, footer. `versione` = `INFORMATIVA_VERSIONE` del back-end.
- La pagina pubblica non usa cookie né storage: non aggiungerne senza aggiornare la cookie policy.

## Deploy su Railway (Docker)
- `Dockerfile`: Multi-stage build (Node 22 Alpine per build statico + Nginx Alpine per il serving).
- `nginx.conf.template`: `$PORT` da Railway, proxy `/api` e `/admin` verso `$BACKEND_URL` (rete privata, resolver `$NGINX_RESOLVER`) tramite `envsubst`.
- `.dockerignore`: Esclude `node_modules`, `dist` e file non necessari per build veloci.
- Routing SPA con fallback a `index.html`; `index.html` precompresso con zopfli nel Dockerfile e servito con `gzip_static`.
