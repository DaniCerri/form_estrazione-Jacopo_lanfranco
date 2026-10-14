import { useState, useId } from "preact/hooks"
import type { ComponentChildren } from "preact"
import { CheckIcon, SpinnerIcon } from "@/components/icons"
import { inviaIscrizione } from "@/lib/api"
import { ZONE, codiceZonaDaUrl } from "@/lib/zona"
import { LEGAL_INFO } from "@/data/legalTexts"
import type { GiveawayFormData, FormErrors, RegistrationData, LegalDocType, ZonaId } from "@/types/giveaway"

const FIELD_ORDER: (keyof GiveawayFormData)[] = [
  "nome",
  "cognome",
  "telefono",
  "email",
  "instagram",
  "zona",
  "accettaMaggioreEta",
  "accettaTermini",
  "accettaPrivacy",
]

// Nomi dei campi del back-end -> campi del form
const CAMPI_SERVER: Record<string, keyof GiveawayFormData> = {
  nome: "nome",
  cognome: "cognome",
  telefono: "telefono",
  email: "email",
  instagram: "instagram",
  zona: "zona",
  accetta_maggiore_eta: "accettaMaggioreEta",
  accetta_regolamento: "accettaTermini",
  accetta_privacy: "accettaPrivacy",
}

const LABEL = "flex items-center gap-2 text-xs select-none uppercase tracking-wider font-semibold text-muted-foreground"

const INPUT =
  "h-12 w-full min-w-0 rounded-none border border-border bg-input/30 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/80 disabled:opacity-50 aria-invalid:border-destructive/50 aria-invalid:ring-1 aria-invalid:ring-destructive/40"

interface GiveawayFormProps {
  onOpenLegal: (doc: LegalDocType) => void
  onSuccess: (registration: RegistrationData) => void
}

interface ConsensoProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled: boolean
  error?: string
  required?: boolean
  children: ComponentChildren
}

function Consenso({ id, checked, onChange, disabled, error, required, children }: ConsensoProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-start gap-3">
        {/* Checkbox nativa; il ::after allarga l'area di tocco */}
        <label className="relative mt-1 grid size-4.5 shrink-0 place-items-center after:absolute after:-inset-x-3 after:-inset-y-2">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            onChange={(e) => onChange(e.currentTarget.checked)}
            disabled={disabled}
            className="peer absolute inset-0 z-10 m-0 cursor-pointer appearance-none rounded-none border border-input bg-input/30 transition-colors outline-none checked:border-primary checked:bg-primary focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 aria-invalid:border-destructive/50 aria-invalid:ring-1 aria-invalid:ring-destructive/40 aria-invalid:checked:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          />
          <CheckIcon className="pointer-events-none relative z-20 size-3.5 text-primary-foreground opacity-0 peer-checked:opacity-100" />
        </label>
        <label htmlFor={id} className="block text-xs sm:text-sm leading-relaxed cursor-pointer select-none font-normal text-muted-foreground">
          {children}
          {required && <span className="text-foreground"> *</span>}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive pl-7">{error}</p>
      )}
    </div>
  )
}

function LinkLegale({ onClick, children }: { onClick: () => void; children: ComponentChildren }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-foreground underline underline-offset-2 hover:opacity-75 inline font-medium"
    >
      {children}
    </button>
  )
}

export function GiveawayForm({ onOpenLegal, onSuccess }: GiveawayFormProps) {
  const nomeId = useId()
  const cognomeId = useId()
  const telefonoId = useId()
  const emailId = useId()
  const instagramId = useId()
  const senzaInstagramId = useId()
  const zonaId = useId()
  const etaId = useId()
  const terminiId = useId()
  const privacyId = useId()
  const menzioneId = useId()
  const marketingId = useId()
  const honeypotId = useId()

  const fieldIds: Partial<Record<keyof GiveawayFormData, string>> = {
    nome: nomeId,
    cognome: cognomeId,
    telefono: telefonoId,
    email: emailId,
    instagram: instagramId,
    zona: `${zonaId}-${ZONE[0].id}`,
    accettaMaggioreEta: etaId,
    accettaTermini: terminiId,
    accettaPrivacy: privacyId,
  }

  // Codice della zona dal QR; se manca o non è valido il form chiede la zona
  const [codiceQr, setCodiceQr] = useState<string | null>(codiceZonaDaUrl)

  const [formData, setFormData] = useState<GiveawayFormData>({
    nome: "",
    cognome: "",
    telefono: "",
    email: "",
    instagram: "",
    senzaInstagram: false,
    zona: "",
    accettaMaggioreEta: false,
    accettaTermini: false,
    accettaPrivacy: false,
    consensoMenzioneInstagram: false,
    accettaMarketing: false,
  })
  const [honeypot, setHoneypot] = useState("")

  const [errors, setErrors] = useState<FormErrors>({})
  const [erroreInvio, setErroreInvio] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const instagram = formData.senzaInstagram ? "" : formData.instagram.replace(/^@/, "").trim()
  const haInstagram = instagram !== ""

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
    const cleanPhone = formData.telefono.replace(/[\s.-]+/g, "")
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

    // Instagram: obbligatorio, salvo chi dichiara di non avere un account
    if (!formData.senzaInstagram) {
      if (!haInstagram) {
        newErrors.instagram = "Inserisci il nickname o spunta «Non ho Instagram»."
      } else if (!/^[A-Za-z0-9._]{1,30}$/.test(instagram)) {
        newErrors.instagram = "Solo lettere, numeri, punti e trattini bassi (max 30)."
      }
    }

    // Zona: solo se non arriva dal QR
    if (!codiceQr && !formData.zona) {
      newErrors.zona = "Seleziona la tua zona."
    }

    // Checkbox obbligatorie
    if (!formData.accettaMaggioreEta) {
      newErrors.accettaMaggioreEta = "La partecipazione è riservata ai maggiorenni."
    }

    if (!formData.accettaTermini) {
      newErrors.accettaTermini = "È necessario accettare il Regolamento."
    }

    if (!formData.accettaPrivacy) {
      newErrors.accettaPrivacy = "È necessario confermare la presa visione della Privacy Policy."
    }

    return newErrors
  }

  const focusPrimoErrore = (newErrors: FormErrors) => {
    const firstKey = FIELD_ORDER.find((key) => newErrors[key])
    if (!firstKey) return false
    const el = document.getElementById(fieldIds[firstKey]!)
    if (el) {
      el.focus({ preventScroll: true })
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      el.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" })
    }
    return true
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (isSubmitting) return
    setErroreInvio(null)

    const newErrors = validate()
    setErrors(newErrors)
    if (focusPrimoErrore(newErrors)) return

    setIsSubmitting(true)
    // Il corsivo serve solo nella conferma: si scarica mentre parte l'iscrizione
    document.fonts.load('italic 400 1em "Playfair Display Variable"').catch(() => { })

    const esito = await inviaIscrizione({
      nome: formData.nome.trim(),
      cognome: formData.cognome.trim(),
      telefono: formData.telefono.trim(),
      email: formData.email.trim().toLowerCase(),
      instagram: instagram || null,
      senza_instagram: formData.senzaInstagram,
      zona_codice: codiceQr,
      zona: codiceQr ? null : formData.zona || null,
      accetta_maggiore_eta: formData.accettaMaggioreEta,
      accetta_regolamento: formData.accettaTermini,
      accetta_privacy: formData.accettaPrivacy,
      consenso_menzione_instagram: !!instagram && formData.consensoMenzioneInstagram,
      accetta_marketing: formData.accettaMarketing,
      website: honeypot,
    })

    setIsSubmitting(false)

    if (esito.ok) {
      onSuccess({
        nome: formData.nome.trim(),
        cognome: formData.cognome.trim(),
        telefono: formData.telefono.trim(),
        email: formData.email.trim().toLowerCase(),
        instagram: instagram ? `@${instagram}` : undefined,
        accettaMarketing: formData.accettaMarketing,
        createdAt: new Date().toLocaleString("it-IT", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      })
      return
    }

    if (esito.tipo === "validazione") {
      const serverErrors: FormErrors = {}
      for (const [campo, msg] of Object.entries(esito.campi)) {
        const key = CAMPI_SERVER[campo]
        if (key) serverErrors[key] = msg
      }
      if (serverErrors.zona && codiceQr) {
        // QR non riconosciuto: si chiede la zona a mano
        setCodiceQr(null)
        serverErrors.zona = "QR non riconosciuto: seleziona la tua zona."
      }
      setErrors(serverErrors)
      if (!focusPrimoErrore(serverErrors)) setErroreInvio(esito.messaggio)
      return
    }

    if (esito.tipo === "duplicato" && esito.campo) {
      const key = CAMPI_SERVER[esito.campo]
      if (key) {
        const dupErrors: FormErrors = { [key]: esito.messaggio }
        setErrors(dupErrors)
        focusPrimoErrore(dupErrors)
        return
      }
    }

    setErroreInvio(esito.messaggio)
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
          Compila il modulo qui sotto con i tuoi dati. Il vincitore sarà estratto a fine serata.
        </p>
      </div>

      <div className="px-5 pt-4 pb-6">
        <form onSubmit={handleSubmit} className="space-y-4.5" noValidate>
          {/* Honeypot anti-bot: invisibile e fuori dal tab order, gli utenti reali non lo vedono */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor={honeypotId}>Lascia vuoto questo campo</label>
            <input
              id={honeypotId}
              type="text"
              name="sito_web"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onInput={(e) => setHoneypot(e.currentTarget.value)}
            />
          </div>

          {/* Nome e Cognome */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor={nomeId} className={LABEL}>
                Nome <span className="text-foreground">*</span>
              </label>
              <input
                id={nomeId}
                type="text"
                placeholder="es. Mario"
                value={formData.nome}
                onInput={(e) => handleInputChange("nome", e.currentTarget.value)}
                disabled={isSubmitting}
                className={`${INPUT} px-2.5`}
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? `${nomeId}-error` : undefined}
                autoComplete="given-name"
                maxLength={80}
              />
              {errors.nome && (
                <p id={`${nomeId}-error`} className="text-xs text-destructive mt-0.5">{errors.nome}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor={cognomeId} className={LABEL}>
                Cognome <span className="text-foreground">*</span>
              </label>
              <input
                id={cognomeId}
                type="text"
                placeholder="es. Rossi"
                value={formData.cognome}
                onInput={(e) => handleInputChange("cognome", e.currentTarget.value)}
                disabled={isSubmitting}
                className={`${INPUT} px-2.5`}
                aria-invalid={!!errors.cognome}
                aria-describedby={errors.cognome ? `${cognomeId}-error` : undefined}
                autoComplete="family-name"
                maxLength={80}
              />
              {errors.cognome && (
                <p id={`${cognomeId}-error`} className="text-xs text-destructive mt-0.5">{errors.cognome}</p>
              )}
            </div>
          </div>

          {/* Telefono */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor={telefonoId} className={LABEL}>
                Telefono <span className="text-foreground">*</span>
              </label>
              <span className="text-xs text-muted-foreground font-mono">Chiamata a fine serata</span>
            </div>
            <input
              id={telefonoId}
              type="tel"
              placeholder="+39 333 1234567"
              value={formData.telefono}
              onInput={(e) => handleInputChange("telefono", e.currentTarget.value)}
              disabled={isSubmitting}
              className={`${INPUT} px-2.5`}
              aria-invalid={!!errors.telefono}
              aria-describedby={errors.telefono ? `${telefonoId}-error` : undefined}
              autoComplete="tel"
              maxLength={30}
            />
            {errors.telefono && (
              <p id={`${telefonoId}-error`} className="text-xs text-destructive mt-0.5">{errors.telefono}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor={emailId} className={LABEL}>
              Email <span className="text-foreground">*</span>
            </label>
            <input
              id={emailId}
              type="email"
              placeholder="mario.rossi@email.com"
              value={formData.email}
              onInput={(e) => handleInputChange("email", e.currentTarget.value)}
              disabled={isSubmitting}
              className={`${INPUT} px-2.5`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${emailId}-error` : undefined}
              autoComplete="email"
              autoCapitalize="none"
              spellcheck={false}
              maxLength={254}
            />
            {errors.email && (
              <p id={`${emailId}-error`} className="text-xs text-destructive mt-0.5">{errors.email}</p>
            )}
          </div>

          {/* Instagram (obbligatorio, salvo "Non ho Instagram") */}
          <div className="space-y-1.5">
            <label htmlFor={instagramId} className={LABEL}>
              Nickname Instagram <span className="text-foreground">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-muted-foreground text-base select-none font-mono">
                @
              </span>
              <input
                id={instagramId}
                type="text"
                placeholder="mariorossi"
                value={formData.senzaInstagram ? "" : formData.instagram.replace(/^@/, "")}
                onInput={(e) => handleInputChange("instagram", e.currentTarget.value)}
                disabled={isSubmitting || formData.senzaInstagram}
                className={`${INPUT} pl-7 pr-2.5`}
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="off"
                spellcheck={false}
                maxLength={31}
                aria-invalid={!!errors.instagram}
                aria-describedby={errors.instagram ? `${instagramId}-error` : undefined}
              />
            </div>
            {errors.instagram && (
              <p id={`${instagramId}-error`} className="text-xs text-destructive mt-0.5">{errors.instagram}</p>
            )}
            <div className="pt-1">
              <Consenso
                id={senzaInstagramId}
                checked={formData.senzaInstagram}
                onChange={(c) => {
                  handleInputChange("senzaInstagram", c)
                  setErrors((prev) => ({ ...prev, instagram: undefined }))
                }}
                disabled={isSubmitting}
              >
                Non ho Instagram
              </Consenso>
            </div>
          </div>

          {/* Zona: solo se non arriva dal QR */}
          {!codiceQr && (
            <fieldset className="space-y-1.5" aria-describedby={errors.zona ? `${zonaId}-error` : undefined}>
              <legend className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1.5">
                La tua zona in sala <span className="text-foreground">*</span>
              </legend>
              <div className="grid grid-cols-3 gap-2">
                {ZONE.map((z) => (
                  <label
                    key={z.id}
                    className="relative flex h-12 items-center justify-center border border-border text-sm cursor-pointer has-[:checked]:bg-foreground has-[:checked]:text-background has-[:checked]:border-foreground has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/50 has-[:disabled]:opacity-50"
                  >
                    <input
                      id={`${zonaId}-${z.id}`}
                      type="radio"
                      name="zona"
                      value={z.id}
                      checked={formData.zona === z.id}
                      onChange={() => handleInputChange("zona", z.id as ZonaId)}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.zona}
                      className="sr-only"
                    />
                    {z.nome}
                  </label>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Serve solo a trovarti in sala se vinci: non cambia le probabilità.
              </p>
              {errors.zona && (
                <p id={`${zonaId}-error`} className="text-xs text-destructive mt-0.5">{errors.zona}</p>
              )}
            </fieldset>
          )}

          {/* Consensi */}
          <div className="pt-3.5 border-t border-border/60 space-y-3.5">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold">
              Consensi e Condizioni
            </div>

            <Consenso
              id={etaId}
              checked={formData.accettaMaggioreEta}
              onChange={(c) => handleInputChange("accettaMaggioreEta", c)}
              disabled={isSubmitting}
              error={errors.accettaMaggioreEta}
              required
            >
              Dichiaro di avere almeno 18 anni.
            </Consenso>

            <Consenso
              id={terminiId}
              checked={formData.accettaTermini}
              onChange={(c) => handleInputChange("accettaTermini", c)}
              disabled={isSubmitting}
              error={errors.accettaTermini}
              required
            >
              Accetto il{" "}
              <LinkLegale onClick={() => onOpenLegal("termini")}>Regolamento del concorso</LinkLegale>.
            </Consenso>

            <Consenso
              id={privacyId}
              checked={formData.accettaPrivacy}
              onChange={(c) => handleInputChange("accettaPrivacy", c)}
              disabled={isSubmitting}
              error={errors.accettaPrivacy}
              required
            >
              Ho letto l'<LinkLegale onClick={() => onOpenLegal("privacy")}>Informativa sulla Privacy</LinkLegale>.
            </Consenso>

            {haInstagram && (
              <Consenso
                id={menzioneId}
                checked={formData.consensoMenzioneInstagram}
                onChange={(c) => handleInputChange("consensoMenzioneInstagram", c)}
                disabled={isSubmitting}
              >
                Se vinco, acconsento a essere menzionato e taggato nelle storie Instagram ufficiali della serata (facoltativo).
              </Consenso>
            )}

            <Consenso
              id={marketingId}
              checked={formData.accettaMarketing}
              onChange={(c) => handleInputChange("accettaMarketing", c)}
              disabled={isSubmitting}
            >
              Desidero ricevere via email, SMS/WhatsApp o telefono inviti e aggiornamenti sui futuri eventi dello Chef Jacopo Lanfranco (facoltativo, revocabile in ogni momento, non incide sull'estrazione).
            </Consenso>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            {erroreInvio && (
              <p role="alert" className="mb-3 border border-destructive/60 p-3 text-sm text-destructive">
                {erroreInvio}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full h-12 items-center justify-center gap-2 border border-transparent px-2.5 text-sm uppercase tracking-[0.2em] font-semibold whitespace-nowrap bg-foreground text-background hover:opacity-90 transition-opacity outline-none select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <SpinnerIcon className="size-4.5 animate-spin" />
                  <span>Registrazione in corso...</span>
                </>
              ) : (
                <span>Partecipa all'Estrazione</span>
              )}
            </button>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              Titolare del trattamento: {LEGAL_INFO.promotore.ragioneSociale}. I dati servono a gestire
              l'estrazione e contattare il vincitore.{" "}
              <LinkLegale onClick={() => onOpenLegal("privacy")}>Informativa completa</LinkLegale>.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
