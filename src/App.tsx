import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { GiveawayForm } from "@/components/GiveawayForm"
import { PrizeShowcase } from "@/components/PrizeShowcase"
import { HowItWorks } from "@/components/HowItWorks"
import { FaqSection } from "@/components/FaqSection"
import { Footer } from "@/components/Footer"
import { SuccessScreen } from "@/components/SuccessScreen"
import { LegalSheets } from "@/components/LegalSheets"
import { CookieBanner } from "@/components/CookieBanner"
import type { TicketData, LegalDocType } from "@/types/giveaway"

export function App() {
  const [ticket, setTicket] = useState<TicketData | null>(null)
  const [legalOpen, setLegalOpen] = useState(false)
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>("termini")

  // Ensure default dark theme for high-end B&W aesthetic
  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  const handleOpenLegal = (doc: LegalDocType) => {
    setActiveLegalDoc(doc)
    setLegalOpen(true)
  }

  const handleSuccess = (createdTicket: TicketData) => {
    setTicket(createdTicket)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleReset = () => {
    setTicket(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-black flex justify-center selection:bg-neutral-800">
      {/* Mobile edge-to-edge container: no side borders on mobile, framed on desktop */}
      <main className="w-full max-w-md min-h-screen bg-background border-x-0 sm:border-x border-border/40 shadow-2xl flex flex-col px-0 relative">
        {/* Full Bleed Hero Header (No Navbar) */}
        <Header />

        {/* Content Area */}
        <div className="flex-1 w-full flex flex-col">
          {ticket ? (
            <SuccessScreen ticket={ticket} onReset={handleReset} />
          ) : (
            <>
              {/* Form IMMEDIATELY below Hero */}
              <GiveawayForm
                onOpenLegal={handleOpenLegal}
                onSuccess={handleSuccess}
              />

              {/* Prize Details below the form */}
              <PrizeShowcase />

              {/* How it works below the form */}
              <HowItWorks />

              {/* FAQs */}
              <FaqSection />
            </>
          )}

          {/* Footer with legal navigation */}
          <Footer onOpenLegal={handleOpenLegal} />
        </div>

        {/* Slide-over Sheet for Privacy, Terms & Cookie Policy */}
        <LegalSheets
          open={legalOpen}
          onOpenChange={setLegalOpen}
          activeDoc={activeLegalDoc}
          onSelectDoc={setActiveLegalDoc}
        />

        {/* Sticky Mobile Cookie Banner */}
        <CookieBanner onOpenLegal={handleOpenLegal} />
      </main>
    </div>
  )
}

export default App
