export interface IscrizionePayload {
  nome: string
  cognome: string
  telefono: string
  email: string
  instagram: string | null
  zona_codice: string | null
  zona: string | null
  accetta_maggiore_eta: boolean
  accetta_regolamento: boolean
  accetta_privacy: boolean
  consenso_menzione_instagram: boolean
  accetta_marketing: boolean
  website: string
}

export type EsitoIscrizione =
  | { ok: true }
  | { ok: false; tipo: "validazione"; messaggio: string; campi: Record<string, string> }
  | { ok: false; tipo: "duplicato"; messaggio: string; campo?: string }
  | { ok: false; tipo: "chiuse" | "rete"; messaggio: string }

const TIMEOUT_MS = 15000
const ATTESE_RETRY_MS = [1500, 3000, 6000]

const attendi = (ms: number) => new Promise((r) => setTimeout(r, ms))

/**
 * Invia l'iscrizione con timeout e retry automatici (rete della sala lenta o satura).
 * Reinviare è sicuro: il back-end riconosce la stessa persona e risponde "già iscritto".
 */
export async function inviaIscrizione(payload: IscrizionePayload): Promise<EsitoIscrizione> {
  const body = JSON.stringify(payload)

  for (let tentativo = 0; ; tentativo++) {
    let res: Response | null
    try {
      res = await fetch("/api/iscrizioni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal: AbortSignal.timeout(TIMEOUT_MS),
      })
    } catch {
      res = null // offline, timeout o connessione caduta
    }

    if (res) {
      if (res.ok) return { ok: true }
      const dati = await res.json().catch(() => ({}))
      const messaggio: string = dati.messaggio ?? "Si è verificato un errore."
      if (res.status === 422) return { ok: false, tipo: "validazione", messaggio, campi: dati.campi ?? {} }
      if (res.status === 409) return { ok: false, tipo: "duplicato", messaggio, campo: dati.campo }
      if (res.status === 403) return { ok: false, tipo: "chiuse", messaggio }
      // 429 e 5xx: si riprova
    }

    if (tentativo >= ATTESE_RETRY_MS.length) {
      return {
        ok: false,
        tipo: "rete",
        messaggio: "Connessione assente o troppo lenta. I tuoi dati sono ancora qui: riprova tra qualche secondo.",
      }
    }
    await attendi(ATTESE_RETRY_MS[tentativo])
  }
}
