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
        className="max-h-[85vh] h-[85vh] rounded-none p-0 flex flex-col bg-background border-t border-border shadow-2xl"
      >
        {/* Top Handle */}
        <div className="w-full flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-none" />
        </div>

        {/* Navigation tabs */}
        <div className="px-4 pt-1 pb-3 flex items-center gap-2 overflow-x-auto border-b border-border">
          <Button
            size="sm"
            variant={activeDoc === "termini" ? "default" : "outline"}
            className="text-[10px] uppercase tracking-wider h-7 rounded-none shrink-0"
            onClick={() => onSelectDoc("termini")}
          >
            Regolamento
          </Button>
          <Button
            size="sm"
            variant={activeDoc === "privacy" ? "default" : "outline"}
            className="text-[10px] uppercase tracking-wider h-7 rounded-none shrink-0"
            onClick={() => onSelectDoc("privacy")}
          >
            Privacy Policy
          </Button>
          <Button
            size="sm"
            variant={activeDoc === "cookie" ? "default" : "outline"}
            className="text-[10px] uppercase tracking-wider h-7 rounded-none shrink-0"
            onClick={() => onSelectDoc("cookie")}
          >
            Cookie Policy
          </Button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-xs leading-relaxed font-sans">
          <SheetHeader className="p-0 text-left">
            <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-medium block">
              Documentazione Ufficiale
            </span>
            <SheetTitle className="font-heading font-serif text-base font-medium text-foreground tracking-tight">
              {currentDoc.title}
            </SheetTitle>
            <SheetDescription className="text-[11px] text-muted-foreground font-mono">
              Aggiornato il {currentDoc.lastUpdated}
            </SheetDescription>
          </SheetHeader>

          <p className="text-muted-foreground bg-muted/30 p-3 border border-border text-[11px]">
            {currentDoc.intro}
          </p>

          <Separator className="border-border/60" />

          <div className="space-y-4">
            {currentDoc.sections.map((section, idx) => (
              <div key={idx} className="space-y-1.5">
                <h4 className="font-heading font-serif text-xs font-semibold text-foreground">
                  {section.title}
                </h4>
                <div className="space-y-1 text-muted-foreground text-[11px]">
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 pb-6">
            <Button
              className="w-full h-9 text-[11px] uppercase tracking-widest font-semibold rounded-none bg-foreground text-background"
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
