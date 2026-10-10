export interface GiveawayFormData {
  nome: string
  cognome: string
  telefono: string
  email: string
  instagram: string
  accettaTermini: boolean
  accettaPrivacy: boolean
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
