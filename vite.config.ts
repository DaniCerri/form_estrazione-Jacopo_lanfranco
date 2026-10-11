import { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    // In sviluppo il back-end gira su :8000 (uv run uvicorn app.main:app --port 8000)
    proxy: {
      "/api": "http://localhost:8000",
      "/admin": "http://localhost:8000",
    },
  },
})
