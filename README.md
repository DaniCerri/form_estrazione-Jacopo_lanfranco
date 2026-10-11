# Chef Battle 2026 — form di iscrizione

Pagina mobile-first per l'iscrizione all'estrazione della serata Chef Battle (21/10/2026).
Preact + TypeScript + Tailwind v4, build Vite, servita da nginx su Railway.
Il back-end FastAPI è in un repo separato (`../back-end`).

## Sviluppo

```bash
npm install
npm run dev        # http://localhost:5173, proxy /api e /admin verso localhost:8000
npm run build      # dist/: index.html con JS e CSS inline + font e immagini
npm run lint
```

## Peso della pagina

In sala ci sono molte persone e poca rete: la pagina è costruita per caricarsi con il minimo
di richieste e di byte.

| Apertura della pagina | Prima | Ora |
| --- | --- | --- |
| Richieste | 8 | 4 |
| Byte trasferiti | ~360 KB | ~97 KB |
| JS + CSS (gzip) | 134 KB in 2 file | 24 KB dentro l'HTML |

- **Preact** al posto di React; elementi HTML nativi (`<dialog>`, `<details>`, checkbox) al posto
  di shadcn/base-ui; icone Phosphor inline.
- **JS e CSS inline** in `index.html` (plugin in `vite.config.ts`): una risposta porta tutta l'app.
  In build l'HTML è precompresso con zopfli e nginx lo serve con `gzip_static`.
- **Font self-hosted ritagliati** (`scripts/ritaglia_font.sh`): solo caratteri latini e pesi 400-700,
  i due usati sopra la piega vengono precaricati con `preload`.
- **Immagini** (`scripts/ottimizza_immagini.py`, originali in `immagini/`): ritagliate sulla parte
  visibile, con bianco e nero già applicato, in AVIF monocromatico (hero 47 → 12 KB).
- **Lazy loading**: le sezioni sotto la piega usano `content-visibility: auto`; foto del premio e
  corsivo si scaricano solo se l'utente scorre fin lì (`src/lib/vicino.ts`). Il corsivo della
  conferma parte all'invio del form.
- Niente favicon (`data:,`); nginx risponde 204 a `/favicon.ico` e 404 ai file mancanti in
  `/assets` e `/immagini`, invece di restituire l'intera pagina.
