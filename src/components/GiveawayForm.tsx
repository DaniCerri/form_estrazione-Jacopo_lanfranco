import { useState, useId } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CircleNotch } from "@phosphor-icons/react"
import type { GiveawayFormData, FormErrors, TicketData, LegalDocType } from "@/types/giveaway"

interface GiveawayFormProps {
  onOpenLegal: (doc: LegalDocType) => void
  onSuccess: (ticket: TicketData) => void
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

  const validate = (): boolean => {
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
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    // Simulazione salvataggio su client (senza backend effettivo come da istruzioni)
    setTimeout(() => {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000)
      const ticketCode = `BATTLE-2110-${randomSuffix}`

      const ticketResult: TicketData = {
        ticketCode,
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
      onSuccess(ticketResult)
    }, 900)
  }

  const handleInputChange = (field: keyof GiveawayFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Card className="w-full border-x-0 border-t-0 border-b border-border bg-card rounded-none shadow-none">
      <CardHeader className="px-4 py-4 pb-3 border-b border-border/60">
        <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-medium block">
          Partecipazione Live
        </span>
        <CardTitle className="font-heading font-serif text-base font-medium text-foreground tracking-tight">
          Modulo di Iscrizione
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground font-sans">
          Iscriviti adesso durante la serata del 21/10 per concorrere all'estrazione finale.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-3">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Nome e Cognome */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <Label htmlFor={nomeId} className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
                Nome <span className="text-foreground">*</span>
              </Label>
              <Input
                id={nomeId}
                type="text"
                placeholder="es. Mario"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                disabled={isSubmitting}
                className={`h-9 text-xs rounded-none border-border ${
                  errors.nome ? "border-destructive" : ""
                }`}
                autoComplete="given-name"
              />
              {errors.nome && (
                <p className="text-[10px] text-destructive mt-0.5">{errors.nome}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor={cognomeId} className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
                Cognome <span className="text-foreground">*</span>
              </Label>
              <Input
                id={cognomeId}
                type="text"
                placeholder="es. Rossi"
                value={formData.cognome}
                onChange={(e) => handleInputChange("cognome", e.target.value)}
                disabled={isSubmitting}
                className={`h-9 text-xs rounded-none border-border ${
                  errors.cognome ? "border-destructive" : ""
                }`}
                autoComplete="family-name"
              />
              {errors.cognome && (
                <p className="text-[10px] text-destructive mt-0.5">{errors.cognome}</p>
              )}
            </div>
          </div>

          {/* Telefono */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor={telefonoId} className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
                Telefono <span className="text-foreground">*</span>
              </Label>
              <span className="text-[10px] text-muted-foreground font-mono">Chiamata a fine serata</span>
            </div>
            <Input
              id={telefonoId}
              type="tel"
              placeholder="+39 333 1234567"
              value={formData.telefono}
              onChange={(e) => handleInputChange("telefono", e.target.value)}
              disabled={isSubmitting}
              className={`h-9 text-xs rounded-none border-border ${
                errors.telefono ? "border-destructive" : ""
              }`}
              autoComplete="tel"
            />
            {errors.telefono && (
              <p className="text-[10px] text-destructive mt-0.5">{errors.telefono}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor={emailId} className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
              Email <span className="text-foreground">*</span>
            </Label>
            <Input
              id={emailId}
              type="email"
              placeholder="mario.rossi@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={isSubmitting}
              className={`h-9 text-xs rounded-none border-border ${
                errors.email ? "border-destructive" : ""
              }`}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-[10px] text-destructive mt-0.5">{errors.email}</p>
            )}
          </div>

          {/* Instagram (Opzionale) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor={instagramId} className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
                Nickname Instagram
              </Label>
              <Badge variant="outline" className="text-[9px] uppercase tracking-wider font-normal px-1.5 py-0 h-4 border-border">
                Opzionale
              </Badge>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-2.5 text-muted-foreground text-xs select-none font-mono">
                @
              </span>
              <Input
                id={instagramId}
                type="text"
                placeholder="mariorossi"
                value={formData.instagram.replace(/^@/, "")}
                onChange={(e) => handleInputChange("instagram", e.target.value)}
                disabled={isSubmitting}
                className="h-9 text-xs rounded-none border-border pl-6"
                autoCapitalize="none"
              />
            </div>
            <p className="text-[10px] text-muted-foreground">
              Per la menzione social e la proclamazione in sala.
            </p>
            {errors.instagram && (
              <p className="text-[10px] text-destructive mt-0.5">{errors.instagram}</p>
            )}
          </div>

          {/* Consensi */}
          <div className="pt-3 border-t border-border/60 space-y-3">
            <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
              Consensi e Condizioni
            </div>

            {/* Checkbox Termini */}
            <div className="space-y-1">
              <div className="flex items-start gap-2.5">
                <Checkbox
                  id={terminiId}
                  checked={formData.accettaTermini}
                  onCheckedChange={(checked) => handleInputChange("accettaTermini", checked === true)}
                  disabled={isSubmitting}
                  className="mt-0.5"
                />
                <Label htmlFor={terminiId} className="text-[11px] leading-snug cursor-pointer font-normal text-muted-foreground block">
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
                <p className="text-[10px] text-destructive pl-6">{errors.accettaTermini}</p>
              )}
            </div>

            {/* Checkbox Privacy */}
            <div className="space-y-1">
              <div className="flex items-start gap-2.5">
                <Checkbox
                  id={privacyId}
                  checked={formData.accettaPrivacy}
                  onCheckedChange={(checked) => handleInputChange("accettaPrivacy", checked === true)}
                  disabled={isSubmitting}
                  className="mt-0.5"
                />
                <Label htmlFor={privacyId} className="text-[11px] leading-snug cursor-pointer font-normal text-muted-foreground block">
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
                <p className="text-[10px] text-destructive pl-6">{errors.accettaPrivacy}</p>
              )}
            </div>

            {/* Checkbox Marketing / Eventi Futuri */}
            <div className="flex items-start gap-2.5">
              <Checkbox
                id={marketingId}
                checked={formData.accettaMarketing}
                onCheckedChange={(checked) => handleInputChange("accettaMarketing", checked === true)}
                disabled={isSubmitting}
                className="mt-0.5"
              />
              <Label htmlFor={marketingId} className="text-[11px] leading-snug cursor-pointer font-normal text-muted-foreground block">
                Desidero ricevere inviti e aggiornamenti sui futuri eventi ed esperienze culinarie dello Chef Jacopo Lanfranco (facoltativo).
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 text-xs uppercase tracking-[0.2em] font-semibold rounded-none bg-foreground text-background hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <CircleNotch className="size-4 animate-spin" />
                  <span>Registrazione in corso...</span>
                </>
              ) : (
                <span>Partecipa all'Estrazione</span>
              )}
            </Button>
            <p className="text-[10px] text-center text-muted-foreground mt-2 font-mono">
              Sorteggio al termine della serata • 21 Ottobre 2026
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
