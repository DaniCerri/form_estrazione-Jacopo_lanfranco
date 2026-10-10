import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "@phosphor-icons/react"
import type { LegalDocType } from "@/types/giveaway"

interface CookieBannerProps {
  onOpenLegal: (doc: LegalDocType) => void
}

export function CookieBanner({ onOpenLegal }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 600)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = (type: "all" | "necessary") => {
    localStorage.setItem("cookie_consent", type)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 max-w-md mx-auto p-3">
      <div className="bg-popover/98 backdrop-blur-md border border-border rounded-none p-3.5 shadow-2xl space-y-2.5 animate-in fade-in duration-200">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground">
            Informativa Cookie
          </h4>
          <button
            onClick={() => handleAccept("necessary")}
            className="text-muted-foreground hover:text-foreground p-0.5 transition-colors"
            aria-label="Chiudi banner cookie"
          >
            <X className="size-3.5" />
          </button>
        </div>

        <p className="text-[11px] text-muted-foreground leading-normal font-sans">
          Utilizziamo cookie tecnici essenziali per consentire l'iscrizione all'estrazione. Consulta la nostra{" "}
          <button
            type="button"
            onClick={() => onOpenLegal("cookie")}
            className="text-foreground underline underline-offset-2 font-medium hover:opacity-80 inline"
          >
            Cookie Policy
          </button>
          .
        </p>

        <div className="flex items-center gap-2 pt-0.5">
          <Button
            size="sm"
            className="flex-1 h-7 text-[10px] uppercase tracking-wider font-semibold rounded-none bg-foreground text-background"
            onClick={() => handleAccept("all")}
          >
            Accetta
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-7 text-[10px] uppercase tracking-wider font-medium rounded-none border-border"
            onClick={() => handleAccept("necessary")}
          >
            Solo Tecnici
          </Button>
        </div>
      </div>
    </div>
  )
}
