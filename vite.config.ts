import { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, type Plugin } from "vite"

/**
 * Mette JS e CSS dentro index.html: in sala la rete è lenta e satura, quindi
 * conta il numero di richieste più dei byte. Una sola risposta porta tutta l'app;
 * font e immagini restano file separati (in cache e scaricati in parallelo).
 */
function inlineAppShell(): Plugin {
  return {
    name: "inline-app-shell",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      const html = bundle["index.html"]
      if (html?.type !== "asset") return
      let source = String(html.source)

      for (const [name, file] of Object.entries(bundle)) {
        if (file.type === "chunk" && file.isEntry) {
          const tag = new RegExp(`<script type="module" crossorigin src="/${name}"></script>`)
          const code = file.code.replaceAll("</script", "<\\/script")
          source = source.replace(tag, () => `<script type="module">${code}</script>`)
          delete bundle[name]
        } else if (file.type === "asset" && name.endsWith(".css")) {
          const tag = new RegExp(`<link rel="stylesheet" crossorigin href="/${name}">`)
          source = source.replace(tag, () => `<style>${String(file.source)}</style>`)
          delete bundle[name]
        }
      }

      // Font usati sopra la piega: si scaricano insieme alla hero, senza aspettare il render
      const preload = Object.keys(bundle)
        .filter((name) => /\/(outfit|playfair)-latin-wght-[\w-]+\.woff2$/.test(name))
        .map((name) => `<link rel="preload" href="/${name}" as="font" type="font/woff2" crossorigin>`)
        .join("")
      html.source = source.replace("</title>", `</title>${preload}`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), inlineAppShell()],
  oxc: {
    jsx: { runtime: "automatic", importSource: "preact" },
  },
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    // Tutto in un solo chunk (finisce inline): niente modulepreload né chunk lazy
    modulePreload: false,
    assetsInlineLimit: 0,
  },
  server: {
    // In sviluppo il back-end gira su :8000 (uv run uvicorn app.main:app --port 8000); BACKEND_DEV per cambiarlo
    proxy: {
      "/api": process.env.BACKEND_DEV ?? "http://localhost:8000",
      "/admin": process.env.BACKEND_DEV ?? "http://localhost:8000",
    },
  },
})
