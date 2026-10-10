import { CheckCircle, ArrowCounterClockwise } from "@phosphor-icons/react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { TicketData } from "@/types/giveaway"

interface SuccessScreenProps {
  ticket: TicketData
  onReset: () => void
}

export function SuccessScreen({ ticket, onReset }: SuccessScreenProps) {
  return (
    <div className="w-full px-5 py-6 space-y-6 animate-in fade-in duration-300">
      {/* Editorial Header - Conferma */}
      <div className="text-center space-y-2.5 pt-2 border-b border-border/60 pb-6">
        <div className="inline-flex p-2.5 rounded-none bg-foreground text-background mb-1">
          <CheckCircle className="size-7" weight="bold" />
        </div>
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold">
          Registrazione Confermata
        </div>
        <h2 className="font-heading text-2xl font-normal text-foreground tracking-tight">
          Sei in Gara per la Cena
        </h2>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed font-sans">
          La tua partecipazione all'estrazione esclusiva con lo Chef Jacopo Lanfranco è confermata.
        </p>
      </div>

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
                {ticket.nome} {ticket.cognome}
              </dd>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <dt className="text-muted-foreground uppercase text-xs tracking-wider">Telefono</dt>
              <dd className="font-mono text-foreground font-medium text-right">{ticket.telefono}</dd>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <dt className="text-muted-foreground uppercase text-xs tracking-wider">Email</dt>
              <dd className="text-foreground truncate max-w-[200px] text-right">{ticket.email}</dd>
            </div>

            {ticket.instagram && (
              <div className="flex items-center justify-between py-2.5">
                <dt className="text-muted-foreground uppercase text-xs tracking-wider">Instagram</dt>
                <dd className="font-mono text-foreground font-medium text-right">{ticket.instagram}</dd>
              </div>
            )}

            <div className="flex items-center justify-between py-2.5 last:pb-0">
              <dt className="text-muted-foreground uppercase text-xs tracking-wider">Data Iscrizione</dt>
              <dd className="font-mono text-muted-foreground text-xs text-right">{ticket.createdAt}</dd>
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
