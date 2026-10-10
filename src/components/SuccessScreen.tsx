import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Copy,
  CheckCircle,
  ShareNetwork,
  ArrowCounterClockwise,
} from "@phosphor-icons/react"
import type { TicketData } from "@/types/giveaway"
import { GIVEAWAY_CONFIG } from "@/data/giveawayConfig"

interface SuccessScreenProps {
  ticket: TicketData
  onReset: () => void
}

export function SuccessScreen({ ticket, onReset }: SuccessScreenProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(ticket.ticketCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleShare = async () => {
    const text = `Sono iscritto all'estrazione per la cena con Chef ${GIVEAWAY_CONFIG.chefName} alla ${GIVEAWAY_CONFIG.eventName} (${GIVEAWAY_CONFIG.eventDate}). Biglietto: ${ticket.ticketCode}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Chef Battle 2026",
          text,
          url: window.location.href,
        })
      } catch {
        // cancelled
      }
    } else {
      handleCopyCode()
    }
  }

  return (
    <div className="w-full px-5 py-6 space-y-5 animate-in fade-in duration-300">
      {/* Editorial Header */}
      <div className="text-center space-y-2 pt-2 border-b border-border/60 pb-4">
        <div className="inline-flex p-2.5 rounded-none bg-foreground text-background mb-1">
          <CheckCircle className="size-7" weight="bold" />
        </div>
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold">
          Registrazione Confermata
        </div>
        <h2 className="font-heading font-serif text-xl font-medium text-foreground tracking-tight">
          Il tuo Biglietto per la Cena
        </h2>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
          Conserva questo codice. L'estrazione avverrà questa sera al termine della Chef Battle.
        </p>
      </div>

      {/* Editorial Monochrome Ticket */}
      <Card className="border border-border bg-card rounded-none shadow-none overflow-hidden">
        {/* Ticket Header */}
        <div className="bg-foreground text-background p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium opacity-80 block">
              Chef Battle • 21/10/2026
            </span>
            <span className="font-heading font-serif text-sm font-semibold tracking-wide">
              Biglietto Ufficiale
            </span>
          </div>
          <Badge
            variant="outline"
            className="rounded-none text-[9px] uppercase tracking-widest border-background/40 text-background px-2 py-0.5"
          >
            Sorteggio Live
          </Badge>
        </div>

        <CardContent className="p-5 space-y-5">
          {/* Big Ticket Number */}
          <div className="text-center p-4 border border-border bg-muted/30">
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium block">
              Numero Identificativo
            </span>
            <div className="font-mono text-2xl font-bold tracking-widest text-foreground py-1.5">
              {ticket.ticketCode}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              className="mt-1 h-8 text-xs uppercase tracking-wider rounded-none px-4 border-border hover:bg-foreground hover:text-background transition-colors"
            >
              <Copy className="size-3.5 mr-1.5" />
              {copied ? "Copiato ✓" : "Copia Codice"}
            </Button>
          </div>

          {/* Dotted division */}
          <div className="border-t border-dashed border-border" />

          {/* Ticket Information */}
          <div className="space-y-2.5 text-sm font-sans">
            <div className="flex items-center justify-between py-1.5 border-b border-border/40">
              <span className="text-muted-foreground uppercase text-xs tracking-wider">Partecipante</span>
              <span className="font-medium text-foreground">
                {ticket.nome} {ticket.cognome}
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-border/40">
              <span className="text-muted-foreground uppercase text-xs tracking-wider">Telefono</span>
              <span className="font-mono text-foreground font-medium">{ticket.telefono}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-border/40">
              <span className="text-muted-foreground uppercase text-xs tracking-wider">Email</span>
              <span className="text-foreground truncate max-w-[200px]">{ticket.email}</span>
            </div>

            {ticket.instagram && (
              <div className="flex items-center justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground uppercase text-xs tracking-wider">Instagram</span>
                <span className="font-mono text-foreground font-medium">{ticket.instagram}</span>
              </div>
            )}

            <div className="flex items-center justify-between py-1.5">
              <span className="text-muted-foreground uppercase text-xs tracking-wider">Registrazione</span>
              <span className="font-mono text-muted-foreground text-xs">{ticket.createdAt}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warning Box */}
      <div className="p-4 border border-border bg-muted/40 text-sm space-y-1.5">
        <div className="font-heading font-serif text-sm font-semibold text-foreground">
          Importante per la Proclamazione:
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Il vincitore della cena con Chef Jacopo Lanfranco sarà chiamato al telefono e annunciato in sala <strong>al termine della Chef Battle</strong>.
          Tieni il telefono acceso e resta presente in sala.
        </p>
      </div>

      {/* Buttons */}
      <div className="space-y-2.5 pt-1">
        <Button
          onClick={handleShare}
          className="w-full h-11 text-xs uppercase tracking-[0.18em] font-semibold rounded-none bg-foreground text-background hover:opacity-90 transition-opacity gap-2"
        >
          <ShareNetwork className="size-4" />
          Condividi Biglietto
        </Button>

        <div className="text-center pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground rounded-none gap-1.5"
          >
            <ArrowCounterClockwise className="size-3.5" />
            Iscrivi un'altra persona
          </Button>
        </div>
      </div>
    </div>
  )
}
