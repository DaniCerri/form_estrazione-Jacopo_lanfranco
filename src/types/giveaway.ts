export type ZonaId = "normale" | "premium" | "vip"

export interface GiveawayFormData {
  nome: string
  cognome: string
  telefono: string
  email: string
  instagram: string
  zona: ZonaId | ""
  accettaMaggioreEta: boolean
  accettaTermini: boolean
  accettaPrivacy: boolean
  consensoMenzioneInstagram: boolean
  accettaMarketing: boolean
}

export type FormErrors = Partial<Record<keyof GiveawayFormData, string>>

export interface RegistrationData {
  nome: string
  cognome: string
  telefono: string
  email: string
  instagram?: string
  accettaMarketing: boolean
  createdAt: string
}

export type LegalDocType = "privacy" | "termini" | "cookie"
