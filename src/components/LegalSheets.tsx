import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LEGAL_TEXTS } from "@/data/legalTexts"
import type { LegalDocType } from "@/types/giveaway"

interface LegalSheetsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activeDoc: LegalDocType
  onSelectDoc: (doc: LegalDocType) => void
}

export function LegalSheets({
  open,
  onOpenChange,
  activeDoc,
  onSelectDoc,
}: LegalSheetsProps) {
  const currentDoc = LEGAL_TEXTS[activeDoc]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[85dvh] h-[85dvh] rounded-none p-0 flex flex-col bg-background border-t border-border shadow-2xl"
      >
        {/* Top Handle */}
        <div className="w-full flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-none" />
        </div>

        {/* Navigation tabs */}
        <div className="px-5 pt-1 pb-3 flex items-center gap-2.5 overflow-x-auto border-b border-border">
          <Button
            size="sm"
            variant={activeDoc === "termini" ? "default" : "outline"}
            className="text-xs uppercase tracking-wider h-8 rounded-none shrink-0"
            onClick={() => onSelectDoc("termini")}
          >
            Regolamento
          </Button>
          <Button
            size="sm"
            variant={activeDoc === "privacy" ? "default" : "outline"}
            className="text-xs uppercase tracking-wider h-8 rounded-none shrink-0"
            onClick={() => onSelectDoc("privacy")}
          >
            Privacy Policy
          </Button>
          <Button
            size="sm"
            variant={activeDoc === "cookie" ? "default" : "outline"}
            className="text-xs uppercase tracking-wider h-8 rounded-none shrink-0"
            onClick={() => onSelectDoc("cookie")}
          >
            Cookie Policy
          </Button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4.5 text-sm leading-relaxed font-sans">
          <SheetHeader className="p-0 text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium block">
              Documentazione Ufficiale
            </span>
            <SheetTitle className="font-heading text-lg font-normal text-foreground tracking-tight mt-0.5">
              {currentDoc.title}
            </SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground font-mono mt-0.5">
              Aggiornato il {currentDoc.lastUpdated}
            </SheetDescription>
          </SheetHeader>

          <p className="text-muted-foreground bg-muted/30 p-3.5 border border-border text-sm leading-relaxed">
            {currentDoc.intro}
          </p>

          <Separator className="border-border/60" />

          <div className="space-y-4.5">
            {currentDoc.sections.map((section, idx) => (
              <div key={idx} className="space-y-1.5">
                <h4 className="font-heading text-sm font-bold text-foreground">
                  {section.title}
                </h4>
                <div className="space-y-1.5 text-muted-foreground text-sm">
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 pb-6">
            <Button
              className="w-full h-11 text-xs uppercase tracking-widest font-semibold rounded-none bg-foreground text-background"
              onClick={() => onOpenChange(false)}
            >
              Chiudi
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
