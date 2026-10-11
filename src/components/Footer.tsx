import type { LegalDocType } from "@/types/giveaway"
import { GIVEAWAY_CONFIG } from "@/data/giveawayConfig"
import { LEGAL_INFO } from "@/data/legalTexts"

interface FooterProps {
  onOpenLegal: (doc: LegalDocType) => void
}

export function Footer({ onOpenLegal }: FooterProps) {
  return (
    <footer className="pt-6 pb-12 space-y-4 text-center text-muted-foreground px-4 sotto-piega [--altezza-stimata:330px]">
      {/* Legal navigation links */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-0 text-xs uppercase tracking-wider font-medium">
        <button
          type="button"
          onClick={() => onOpenLegal("termini")}
          className="hover:text-foreground transition-colors py-3 min-h-11 inline-flex items-center"
        >
          Regolamento
        </button>
        <span className="text-border">•</span>
        <button
          type="button"
          onClick={() => onOpenLegal("privacy")}
          className="hover:text-foreground transition-colors py-3 min-h-11 inline-flex items-center"
        >
          Privacy Policy
        </button>
        <span className="text-border">•</span>
        <button
          type="button"
          onClick={() => onOpenLegal("cookie")}
          className="hover:text-foreground transition-colors py-3 min-h-11 inline-flex items-center"
        >
          Cookie Policy
        </button>
      </div>

      <div className="space-y-1 text-xs text-muted-foreground/80 max-w-xs mx-auto leading-relaxed">
        <p>
          © 2026 {GIVEAWAY_CONFIG.eventName} • Chef {GIVEAWAY_CONFIG.chefName}.
        </p>
        <p>
          Concorso a premio promosso da {LEGAL_INFO.promotore.ragioneSociale}, P.IVA {LEGAL_INFO.promotore.piva}, limitato alla serata del {GIVEAWAY_CONFIG.eventDate}. Partecipazione gratuita riservata ai maggiori di 18 anni presenti in sala. Montepremi {LEGAL_INFO.valorePremio} IVA esclusa.{" "}
          <button type="button" onClick={() => onOpenLegal("termini")} className="underline underline-offset-2 hover:text-foreground">
            Regolamento completo
          </button>
          .
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-border/60 flex flex-col items-center gap-2.5">
        <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground/80">
          Made by
        </span>
        <a
          href="https://www.projectcherry.it/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center min-h-11 px-2 opacity-90 hover:opacity-100 transition-opacity"
        >
          <img
            src="/immagini/logo.webp"
            alt="Project Cherry"
            width={463}
            height={64}
            className="h-6 w-auto"
            loading="lazy"
            decoding="async"
          />
        </a>
      </div>
    </footer>
  )
}
