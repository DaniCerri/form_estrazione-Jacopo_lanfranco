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
    <div className="w-full px-4 py-6 space-y-4 animate-in fade-in duration-300">
      {/* Editorial Header */}
      <div className="text-center space-y-1.5 pt-2 border-b border-border/60 pb-3">
        <div className="inline-flex p-2 rounded-none bg-foreground text-background mb-1">
          <CheckCircle className="size-6" weight="bold" />
        </div>
        <div className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
          Registrazione Confermata
        </div>
        <h2 className="font-heading font-serif text-lg font-medium text-foreground tracking-tight">
          Il tuo Biglietto per la Cena
        </h2>
        <p className="text-xs text-muted-foreground max-w-xs mx-auto">
          Conserva questo codice. L'estrazione avverrà questa sera al termine della Chef Battle.
        </p>
      </div>

      {/* Editorial Monochrome Ticket */}
      <Card className="border border-border bg-card rounded-none shadow-none overflow-hidden">
        {/* Ticket Header */}
        <div className="bg-foreground text-background p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] font-medium opacity-80 block">
              Chef Battle • 21/10/2026
            </span>
            <span className="font-heading font-serif text-xs font-semibold tracking-wide">
              Biglietto Ufficiale
            </span>
          </div>
          <Badge
            variant="outline"
            className="rounded-none text-[8px] uppercase tracking-widest border-background/40 text-background"
          >
            Sorteggio Live
          </Badge>
        </div>

        <CardContent className="p-4 space-y-4">
          {/* Big Ticket Number */}
          <div className="text-center p-3 border border-border bg-muted/30">
            <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-medium block">
              Numero Identificativo
            </span>
            <div className="font-mono text-xl font-bold tracking-widest text-foreground py-1">
              {ticket.ticketCode}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              className="mt-1 h-7 text-[10px] uppercase tracking-wider rounded-none px-3 border-border hover:bg-foreground hover:text-background transition-colors"
            >
              <Copy className="size-3 mr-1" />
              {copied ? "Copiato ✓" : "Copia Codice"}
            </Button>
          </div>

          {/* Dotted division */}
          <div className="border-t border-dashed border-border" />

          {/* Ticket Information */}
          <div className="space-y-2 text-xs font-sans">
            <div className="flex items-center justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground uppercase text-[10px] tracking-wider">Partecipante</span>
              <span className="font-medium text-foreground">
                {ticket.nome} {ticket.cognome}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground uppercase text-[10px] tracking-wider">Telefono</span>
              <span className="font-mono text-foreground">{ticket.telefono}</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground uppercase text-[10px] tracking-wider">Email</span>
              <span className="text-foreground truncate max-w-[180px]">{ticket.email}</span>
            </div>

            {ticket.instagram && (
              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground uppercase text-[10px] tracking-wider">Instagram</span>
                <span className="font-mono text-foreground">{ticket.instagram}</span>
              </div>
            )}

            <div className="flex items-center justify-between py-1">
              <span className="text-muted-foreground uppercase text-[10px] tracking-wider">Registrazione</span>
              <span className="font-mono text-muted-foreground text-[10px]">{ticket.createdAt}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warning Box */}
      <div className="p-3 border border-border bg-muted/40 text-xs space-y-1">
        <div className="font-heading font-serif text-xs font-semibold text-foreground">
          Importante per la Proclamazione:
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Il vincitore della cena con Chef Jacopo Lanfranco sarà chiamato al telefono e annunciato in sala <strong>al termine della Chef Battle</strong>.
          Tieni il telefono acceso e resta sintonizzato.
        </p>
      </div>

      {/* Buttons */}
      <div className="space-y-2 pt-1">
        <Button
          onClick={handleShare}
          className="w-full h-10 text-xs uppercase tracking-[0.15em] font-semibold rounded-none bg-foreground text-background hover:opacity-90 transition-opacity gap-2"
        >
          <ShareNetwork className="size-3.5" />
          Condividi Biglietto
        </Button>

        <div className="text-center pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground rounded-none gap-1.5"
          >
            <ArrowCounterClockwise className="size-3.5" />
            Iscrivi un'altra persona
          </Button>
        </div>
      </div>
    </div>
  )
}
