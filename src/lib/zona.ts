import type { ZonaId } from "@/types/giveaway"

export const ZONE: { id: ZonaId; nome: string }[] = [
  { id: "normale", nome: "Normale" },
  { id: "premium", nome: "Premium" },
  { id: "vip", nome: "VIP" },
]

/** Codice opaco del QR della zona (?z=...). Lo risolve solo il back-end. */
export function codiceZonaDaUrl(): string | null {
  const z = new URLSearchParams(window.location.search).get("z")?.trim()
  return z ? z.slice(0, 40) : null
}
