import { CaretDownIcon } from "@/components/icons"
import { GIVEAWAY_CONFIG } from "@/data/giveawayConfig"

export function FaqSection() {
  return (
    <section className="w-full border-b border-border/60 bg-background sotto-piega [--altezza-stimata:410px]">
      <h2 className="font-heading text-xl font-normal text-foreground tracking-tight px-5 pt-8 pb-2">
        Domande frequenti
      </h2>

      {/* <details> nativo: accordion accessibile senza JS */}
      <div className="px-5 pb-4">
        {GIVEAWAY_CONFIG.faqs.map((faq, index) => (
          <details key={index} className="group not-last:border-b border-border/60">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 border border-transparent py-4 text-left text-sm font-heading font-normal leading-snug text-foreground hover:opacity-75 transition-opacity outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
              {faq.question}
              <CaretDownIcon className="pointer-events-none size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="text-sm text-muted-foreground pb-4 leading-relaxed font-sans">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
