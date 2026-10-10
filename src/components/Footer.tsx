import { Separator } from "@/components/ui/separator"
import type { LegalDocType } from "@/types/giveaway"
import { GIVEAWAY_CONFIG } from "@/data/giveawayConfig"

interface FooterProps {
  onOpenLegal: (doc: LegalDocType) => void
}

export function Footer({ onOpenLegal }: FooterProps) {
  return (
    <footer className="pt-6 pb-12 space-y-4 text-center text-xs text-muted-foreground px-2">
      <Separator className="border-border/60" />

      {/* Legal navigation links */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-wider font-medium">
        <button
          type="button"
          onClick={() => onOpenLegal("termini")}
          className="hover:text-foreground transition-colors"
        >
          Regolamento
        </button>
        <span className="text-border">•</span>
        <button
          type="button"
          onClick={() => onOpenLegal("privacy")}
          className="hover:text-foreground transition-colors"
        >
          Privacy Policy
        </button>
        <span className="text-border">•</span>
        <button
          type="button"
          onClick={() => onOpenLegal("cookie")}
          className="hover:text-foreground transition-colors"
        >
          Cookie Policy
        </button>
      </div>

      <div className="space-y-1 text-[10px] text-muted-foreground/75 max-w-xs mx-auto leading-relaxed">
        <p>
          © 2026 {GIVEAWAY_CONFIG.eventName} • Chef {GIVEAWAY_CONFIG.chefName}.
        </p>
        <p>
          Iniziativa promozionale limitata alla serata del {GIVEAWAY_CONFIG.eventDate}. Partecipazione riservata ai maggiori di 18 anni.
        </p>
      </div>
    </footer>
  )
}
