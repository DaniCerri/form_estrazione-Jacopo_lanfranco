import { useState, useId } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CircleNotch } from "@phosphor-icons/react"
import type { GiveawayFormData, FormErrors, RegistrationData, LegalDocType } from "@/types/giveaway"

const FIELD_ORDER: (keyof GiveawayFormData)[] = [
  "nome",
  "cognome",
  "telefono",
  "email",
  "instagram",
  "accettaTermini",
  "accettaPrivacy",
]

interface GiveawayFormProps {
  onOpenLegal: (doc: LegalDocType) => void
  onSuccess: (registration: RegistrationData) => void
}

export function GiveawayForm({ onOpenLegal, onSuccess }: GiveawayFormProps) {
  const nomeId = useId()
  const cognomeId = useId()
  const telefonoId = useId()
  const emailId = useId()
  const instagramId = useId()
  const terminiId = useId()
  const privacyId = useId()
  const marketingId = useId()

  const fieldIds: Partial<Record<keyof GiveawayFormData, string>> = {
    nome: nomeId,
    cognome: cognomeId,
    telefono: telefonoId,
    email: emailId,
    instagram: instagramId,
    accettaTermini: terminiId,
    accettaPrivacy: privacyId,
  }

  const [formData, setFormData] = useState<GiveawayFormData>({
    nome: "",
    cognome: "",
    telefono: "",
    email: "",
    instagram: "",
    accettaTermini: false,
    accettaPrivacy: false,
    accettaMarketing: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {}

    // Nome
    if (!formData.nome.trim()) {
      newErrors.nome = "Campo obbligatorio."
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = "Minimo 2 caratteri."
    }

    // Cognome
    if (!formData.cognome.trim()) {
      newErrors.cognome = "Campo obbligatorio."
    } else if (formData.cognome.trim().length < 2) {
      newErrors.cognome = "Minimo 2 caratteri."
    }

    // Telefono
    const cleanPhone = formData.telefono.replace(/\s+/g, "")
    const phoneRegex = /^(\+?[0-9]{8,15})$/
    if (!formData.telefono.trim()) {
      newErrors.telefono = "Numero di telefono obbligatorio per la chiamata a fine serata."
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.telefono = "Inserisci un numero valido (es. +39 333 1234567)."
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Indirizzo email obbligatorio."
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Formato email non valido."
    }

    // Instagram (opzionale)
    if (formData.instagram.trim()) {
      const cleanIg = formData.instagram.replace(/^@/, "").trim()
      if (cleanIg.length < 2) {
        newErrors.instagram = "Minimo 2 caratteri."
      }
    }

    // Checkbox obbligatorie
    if (!formData.accettaTermini) {
      newErrors.accettaTermini = "È necessario accettare il Regolamento della serata."
    }

    if (!formData.accettaPrivacy) {
      newErrors.accettaPrivacy = "È necessario confermare la presa visione della Privacy Policy."
    }

    setErrors(newErrors)
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = validate()
    const firstKey = FIELD_ORDER.find((key) => newErrors[key])
    if (firstKey) {
      const found = document.getElementById(fieldIds[firstKey]!)
      // Base UI Checkbox puts the id on a hidden input; the focusable element is the role="checkbox" root
      const el =
        found instanceof HTMLInputElement && found.type === "checkbox"
          ? (found.parentElement?.querySelector<HTMLElement>('[role="checkbox"]') ?? found)
          : found
      if (el) {
        el.focus({ preventScroll: true })
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        el.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" })
      }
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      const registration: RegistrationData = {
        nome: formData.nome.trim(),
        cognome: formData.cognome.trim(),
        telefono: formData.telefono.trim(),
        email: formData.email.trim().toLowerCase(),
        instagram: formData.instagram.trim()
          ? `@${formData.instagram.replace(/^@/, "").trim()}`
          : undefined,
        accettaMarketing: formData.accettaMarketing,
        createdAt: new Date().toLocaleDateString("it-IT", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }

      setIsSubmitting(false)
      onSuccess(registration)
    }, 900)
  }

  const handleInputChange = (field: keyof GiveawayFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section className="w-full border-b border-border/60 bg-card">
      <div className="px-5 pt-6 pb-1">
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold block">
          Serata del 21/10
        </span>
        <h2 className="font-heading text-xl font-normal text-foreground tracking-tight mt-1">
          Iscriviti all'estrazione
        </h2>
        <p className="text-sm text-muted-foreground font-sans mt-1">
          Pochi secondi. Il vincitore viene estratto a fine serata.
        </p>
      </div>

      <div className="px-5 pt-4 pb-6">
        <form onSubmit={handleSubmit} className="space-y-4.5" noValidate>
          {/* Nome e Cognome */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor={nomeId} className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                Nome <span className="text-foreground">*</span>
              </Label>
              <Input
                id={nomeId}
                type="text"
                placeholder="es. Mario"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                disabled={isSubmitting}
                className="h-12 text-base md:text-base rounded-none border-border"
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? `${nomeId}-error` : undefined}
                autoComplete="given-name"
              />
              {errors.nome && (
                <p id={`${nomeId}-error`} className="text-xs text-destructive mt-0.5">{errors.nome}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={cognomeId} className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                Cognome <span className="text-foreground">*</span>
              </Label>
              <Input
                id={cognomeId}
                type="text"
                placeholder="es. Rossi"
                value={formData.cognome}
                onChange={(e) => handleInputChange("cognome", e.target.value)}
                disabled={isSubmitting}
                className="h-12 text-base md:text-base rounded-none border-border"
                aria-invalid={!!errors.cognome}
                aria-describedby={errors.cognome ? `${cognomeId}-error` : undefined}
                autoComplete="family-name"
              />
              {errors.cognome && (
                <p id={`${cognomeId}-error`} className="text-xs text-destructive mt-0.5">{errors.cognome}</p>
              )}
            </div>
          </div>

          {/* Telefono */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor={telefonoId} className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                Telefono <span className="text-foreground">*</span>
              </Label>
              <span className="text-xs text-muted-foreground font-mono">Chiamata a fine serata</span>
            </div>
            <Input
              id={telefonoId}
              type="tel"
              placeholder="+39 333 1234567"
              value={formData.telefono}
              onChange={(e) => handleInputChange("telefono", e.target.value)}
              disabled={isSubmitting}
              className="h-12 text-base md:text-base rounded-none border-border"
                aria-invalid={!!errors.telefono}
                aria-describedby={errors.telefono ? `${telefonoId}-error` : undefined}
              autoComplete="tel"
            />
            {errors.telefono && (
              <p id={`${telefonoId}-error`} className="text-xs text-destructive mt-0.5">{errors.telefono}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor={emailId} className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
              Email <span className="text-foreground">*</span>
            </Label>
            <Input
              id={emailId}
              type="email"
              placeholder="mario.rossi@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={isSubmitting}
              className="h-12 text-base md:text-base rounded-none border-border"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? `${emailId}-error` : undefined}
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
            />
            {errors.email && (
              <p id={`${emailId}-error`} className="text-xs text-destructive mt-0.5">{errors.email}</p>
            )}
          </div>

          {/* Instagram (Opzionale) */}
          <div className="space-y-1.5">
            <Label htmlFor={instagramId} className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
              Nickname Instagram{" "}
              <span className="lowercase tracking-normal font-normal">(facoltativo)</span>
            </Label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-muted-foreground text-base select-none font-mono">
                @
              </span>
              <Input
                id={instagramId}
                type="text"
                placeholder="mariorossi"
                value={formData.instagram.replace(/^@/, "")}
                onChange={(e) => handleInputChange("instagram", e.target.value)}
                disabled={isSubmitting}
                className="h-12 text-base md:text-base rounded-none border-border pl-7"
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
                aria-invalid={!!errors.instagram}
                aria-describedby={errors.instagram ? `${instagramId}-error` : undefined}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Per la menzione social e la proclamazione in sala.
            </p>
            {errors.instagram && (
              <p id={`${instagramId}-error`} className="text-xs text-destructive mt-0.5">{errors.instagram}</p>
            )}
          </div>

          {/* Consensi */}
          <div className="pt-3.5 border-t border-border/60 space-y-3.5">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold">
              Consensi e Condizioni
            </div>

            {/* Checkbox Termini */}
            <div className="space-y-1">
              <div className="flex items-start gap-3">
                <Checkbox
                  id={terminiId}
                  checked={formData.accettaTermini}
                  aria-invalid={!!errors.accettaTermini}
                  aria-describedby={errors.accettaTermini ? `${terminiId}-error` : undefined}
                  onCheckedChange={(checked) => handleInputChange("accettaTermini", checked === true)}
                  disabled={isSubmitting}
                  className="mt-1 size-4.5"
                />
                <Label htmlFor={terminiId} className="text-xs sm:text-sm leading-relaxed cursor-pointer font-normal text-muted-foreground block">
                  Dichiaro di essere maggiorenne e accetto il{" "}
                  <button
                    type="button"
                    onClick={() => onOpenLegal("termini")}
                    className="text-foreground underline underline-offset-2 hover:opacity-75 inline font-medium"
                  >
                    Regolamento Estrazione Chef Battle
                  </button>
                  . <span className="text-foreground">*</span>
                </Label>
              </div>
              {errors.accettaTermini && (
                <p id={`${terminiId}-error`} className="text-xs text-destructive pl-7">{errors.accettaTermini}</p>
              )}
            </div>

            {/* Checkbox Privacy */}
            <div className="space-y-1">
              <div className="flex items-start gap-3">
                <Checkbox
                  id={privacyId}
                  checked={formData.accettaPrivacy}
                  aria-invalid={!!errors.accettaPrivacy}
                  aria-describedby={errors.accettaPrivacy ? `${privacyId}-error` : undefined}
                  onCheckedChange={(checked) => handleInputChange("accettaPrivacy", checked === true)}
                  disabled={isSubmitting}
                  className="mt-1 size-4.5"
                />
                <Label htmlFor={privacyId} className="text-xs sm:text-sm leading-relaxed cursor-pointer font-normal text-muted-foreground block">
                  Ho letto e compreso l'{" "}
                  <button
                    type="button"
                    onClick={() => onOpenLegal("privacy")}
                    className="text-foreground underline underline-offset-2 hover:opacity-75 inline font-medium"
                  >
                    Informativa sulla Privacy (GDPR)
                  </button>
                  . <span className="text-foreground">*</span>
                </Label>
              </div>
              {errors.accettaPrivacy && (
                <p id={`${privacyId}-error`} className="text-xs text-destructive pl-7">{errors.accettaPrivacy}</p>
              )}
            </div>

            {/* Checkbox Marketing */}
            <div className="flex items-start gap-3">
              <Checkbox
                id={marketingId}
                checked={formData.accettaMarketing}
                onCheckedChange={(checked) => handleInputChange("accettaMarketing", checked === true)}
                disabled={isSubmitting}
                className="mt-1 size-4.5"
              />
              <Label htmlFor={marketingId} className="text-xs sm:text-sm leading-relaxed cursor-pointer font-normal text-muted-foreground block">
                Desidero ricevere inviti e aggiornamenti sui futuri eventi ed esperienze culinarie dello Chef Jacopo Lanfranco (facoltativo).
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 text-sm uppercase tracking-[0.2em] font-semibold rounded-none bg-foreground text-background hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <CircleNotch className="size-4.5 animate-spin" />
                  <span>Registrazione in corso...</span>
                </>
              ) : (
                <span>Partecipa all'Estrazione</span>
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2.5 font-mono">
              Sorteggio al termine della serata • 21 Ottobre 2026
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
