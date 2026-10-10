import { useState } from "react"
import { Header } from "@/components/Header"
import { GiveawayForm } from "@/components/GiveawayForm"
import { PrizeShowcase } from "@/components/PrizeShowcase"
import { HowItWorks } from "@/components/HowItWorks"
import { FaqSection } from "@/components/FaqSection"
import { Footer } from "@/components/Footer"
import { SuccessScreen } from "@/components/SuccessScreen"
import { LegalSheets } from "@/components/LegalSheets"
import type { TicketData, LegalDocType } from "@/types/giveaway"

export function App() {
  const [ticket, setTicket] = useState<TicketData | null>(null)
  const [legalOpen, setLegalOpen] = useState(false)
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>("termini")

  const scrollToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
  }

  const handleOpenLegal = (doc: LegalDocType) => {
    setActiveLegalDoc(doc)
    setLegalOpen(true)
  }

  const handleSuccess = (createdTicket: TicketData) => {
    setTicket(createdTicket)
    scrollToTop()
  }

  const handleReset = () => {
    setTicket(null)
    scrollToTop()
  }

  return (
    <div className="min-h-screen bg-background flex justify-center selection:bg-foreground/20">
      <main className="w-full max-w-md min-h-screen bg-background border-x-0 sm:border-x border-border/40 shadow-2xl flex flex-col px-0 relative">
        <Header />

        <div className="flex-1 w-full flex flex-col">
          {ticket ? (
            <SuccessScreen ticket={ticket} onReset={handleReset} />
          ) : (
            <>
              <GiveawayForm
                onOpenLegal={handleOpenLegal}
                onSuccess={handleSuccess}
              />

              <PrizeShowcase />

              <HowItWorks />

              <FaqSection />
            </>
          )}

          <Footer onOpenLegal={handleOpenLegal} />
        </div>

        <LegalSheets
          open={legalOpen}
          onOpenChange={setLegalOpen}
          activeDoc={activeLegalDoc}
          onSelectDoc={setActiveLegalDoc}
        />

      </main>
    </div>
  )
}

export default App
