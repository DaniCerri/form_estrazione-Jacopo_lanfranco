import { ArrowCounterClockwise } from "@phosphor-icons/react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { RegistrationData } from "@/types/giveaway"
import { GIVEAWAY_CONFIG } from "@/data/giveawayConfig"

interface SuccessScreenProps {
  registration: RegistrationData
  onReset: () => void
}

export function SuccessScreen({ registration, onReset }: SuccessScreenProps) {
  return (
    <div className="w-full px-5 py-6 space-y-6 animate-in fade-in duration-300">
      {/* Editorial Header - Conferma */}
      <header className="pb-8 border-b border-border/60">
        <h2 className="mt-4 font-heading text-5xl font-light leading-[1.02] tracking-tight text-foreground break-words">
          Sei in gara,
          <br />
          <em className="italic">{registration.nome}</em>.
        </h2>

        <p className="mt-6 max-w-[34ch] text-base leading-relaxed text-foreground/80 font-sans">
          Il tuo nome è nell'urna per la cena privata con lo Chef {GIVEAWAY_CONFIG.chefName}.
        </p>
      </header>

      {/* Riepilogo Dati */}
      <Card className="border border-border/80 bg-card rounded-none shadow-none">
        <CardHeader className="p-4 border-b border-border/60 bg-muted/20">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-foreground">
              Riepilogo Dati
            </span>
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Chef Battle 2026
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-5">
          <dl className="divide-y divide-border/40 text-sm font-sans">
            <div className="flex items-center justify-between py-2.5 first:pt-0">
              <dt className="text-muted-foreground uppercase text-xs tracking-wider">Partecipante</dt>
              <dd className="font-medium text-foreground text-right">
                {registration.nome} {registration.cognome}
              </dd>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <dt className="text-muted-foreground uppercase text-xs tracking-wider">Telefono</dt>
              <dd className="font-mono text-foreground font-medium text-right">{registration.telefono}</dd>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <dt className="text-muted-foreground uppercase text-xs tracking-wider">Email</dt>
              <dd className="text-foreground truncate max-w-[200px] text-right">{registration.email}</dd>
            </div>

            {registration.instagram && (
              <div className="flex items-center justify-between py-2.5">
                <dt className="text-muted-foreground uppercase text-xs tracking-wider">Instagram</dt>
                <dd className="font-mono text-foreground font-medium text-right">{registration.instagram}</dd>
              </div>
            )}

            <div className="flex items-center justify-between py-2.5 last:pb-0">
              <dt className="text-muted-foreground uppercase text-xs tracking-wider">Data Iscrizione</dt>
              <dd className="font-mono text-muted-foreground text-xs text-right">{registration.createdAt}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Box Importante per l'Estrazione */}
      <div className="p-4 border border-border/70 bg-muted/30 text-sm space-y-1.5">
        <div className="font-heading text-sm font-bold text-foreground">
          Importante per la Proclamazione:
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed font-sans">
          Il vincitore della cena con Chef Jacopo Lanfranco sarà chiamato al telefono e annunciato in sala{" "}
          <strong className="text-foreground font-semibold">al termine della Chef Battle</strong>.
          Tieni il telefono acceso e resta presente in sala.
        </p>
      </div>

      {/* Azione Nuova Iscrizione */}
      <div className="pt-2">
        <Button
          onClick={onReset}
          className="w-full h-12 text-xs uppercase tracking-[0.18em] font-semibold rounded-none bg-foreground text-background hover:opacity-90 transition-opacity gap-2"
        >
          <ArrowCounterClockwise className="size-4" />
          Iscrivi un'altra persona
        </Button>
      </div>
    </div>
  )
}
