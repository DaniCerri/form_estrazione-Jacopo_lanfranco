import { useEffect, useId, useRef } from "preact/hooks"
import { XIcon } from "@/components/icons"
import { LEGAL_INFO, LEGAL_TEXTS } from "@/data/legalTexts"
import type { LegalDocType } from "@/types/giveaway"

interface LegalSheetsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activeDoc: LegalDocType
  onSelectDoc: (doc: LegalDocType) => void
}

const TABS: { doc: LegalDocType; label: string }[] = [
  { doc: "termini", label: "Regolamento" },
  { doc: "privacy", label: "Privacy Policy" },
  { doc: "cookie", label: "Cookie Policy" },
]

const TAB_BASE =
  "inline-flex h-8 shrink-0 items-center justify-center border px-2.5 text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 active:translate-y-px"

export function LegalSheets({
  open,
  onOpenChange,
  activeDoc,
  onSelectDoc,
}: LegalSheetsProps) {
  const currentDoc = LEGAL_TEXTS[activeDoc]
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  // <dialog> nativo: focus trap, Esc e sfondo inerte li gestisce il browser
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={() => onOpenChange(false)}
      onClick={(e) => {
        // Tap sullo sfondo scuro: il target è il dialog stesso
        if (e.target === e.currentTarget) onOpenChange(false)
      }}
      className="mx-auto mt-auto mb-0 h-[85dvh] max-h-[85dvh] w-full max-w-md flex-col overflow-hidden border-t border-border bg-background p-0 text-foreground shadow-2xl open:flex open:animate-sheet-up backdrop:bg-black/40 open:backdrop:animate-fade-in"
    >
      <button
        type="button"
        onClick={() => onOpenChange(false)}
        className="absolute top-3 right-3 inline-flex size-7 items-center justify-center outline-none hover:bg-muted/50 focus-visible:ring-1 focus-visible:ring-ring/50"
      >
        <XIcon className="size-4" />
        <span className="sr-only">Chiudi</span>
      </button>

      {/* Top Handle */}
      <div className="w-full flex justify-center pt-3 pb-1">
        <div className="w-10 h-1 bg-muted-foreground/30" />
      </div>

      {/* Navigation tabs */}
      <div className="px-5 pt-1 pb-3 flex items-center gap-2.5 overflow-x-auto border-b border-border">
        {TABS.map(({ doc, label }) => (
          <button
            key={doc}
            type="button"
            aria-pressed={activeDoc === doc}
            onClick={() => onSelectDoc(doc)}
            className={
              activeDoc === doc
                ? `${TAB_BASE} border-transparent bg-primary text-primary-foreground hover:bg-primary/80`
                : `${TAB_BASE} border-input bg-input/30 hover:bg-input/50 hover:text-foreground`
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4.5 text-sm leading-relaxed font-sans">
        <div className="flex flex-col gap-0.5 text-left">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium block">
            Documentazione Ufficiale
          </span>
          <h2 id={titleId} className="font-heading text-lg font-normal text-foreground tracking-tight mt-0.5">
            {currentDoc.title}
          </h2>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            Versione {LEGAL_INFO.versione} · pubblicata il {LEGAL_INFO.dataPubblicazione}
          </p>
        </div>

        <p className="text-muted-foreground bg-muted/30 p-3.5 border border-border text-sm leading-relaxed">
          {currentDoc.intro}
        </p>

        <hr className="border-border/60" />

        <div className="space-y-4.5">
          {currentDoc.sections.map((section, idx) => (
            <div key={idx} className="space-y-1.5">
              <h3 className="font-heading text-sm font-bold text-foreground">
                {section.title}
              </h3>
              <div className="space-y-1.5 text-muted-foreground text-sm">
                {section.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 pb-6">
          <button
            type="button"
            className="inline-flex w-full h-11 items-center justify-center text-xs uppercase tracking-widest font-semibold bg-foreground text-background outline-none hover:opacity-90 focus-visible:ring-1 focus-visible:ring-ring/50 active:translate-y-px"
            onClick={() => onOpenChange(false)}
          >
            Chiudi
          </button>
        </div>
      </div>
    </dialog>
  )
}
