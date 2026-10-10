import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { GIVEAWAY_CONFIG } from "@/data/giveawayConfig"

export function FaqSection() {
  return (
    <section className="w-full border-b border-border bg-card">
      <div className="px-4 py-3 border-b border-border/60">
        <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-medium block">
          Informazioni & Dettagli
        </span>
        <h2 className="font-heading font-serif text-base font-medium text-foreground tracking-tight">
          Domande Frequenti
        </h2>
      </div>

      <div className="p-2 sm:p-4">
        <Accordion className="w-full">
          {GIVEAWAY_CONFIG.faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border-border/60">
              <AccordionTrigger className="text-xs font-serif py-3.5 px-2 text-foreground hover:no-underline hover:opacity-75 transition-opacity text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[11px] text-muted-foreground px-2 pb-3.5 leading-relaxed font-sans">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
