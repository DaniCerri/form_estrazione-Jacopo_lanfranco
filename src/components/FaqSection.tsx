import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { GIVEAWAY_CONFIG } from "@/data/giveawayConfig"

export function FaqSection() {
  return (
    <section className="w-full border-b border-border/60 bg-background">
      <h2 className="font-heading text-xl font-normal text-foreground tracking-tight px-5 pt-8 pb-2">
        Domande frequenti
      </h2>

      <div className="px-5 pb-4">
        <Accordion className="w-full">
          {GIVEAWAY_CONFIG.faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border-border/60">
              <AccordionTrigger className="text-sm font-heading font-normal leading-snug py-4 text-foreground hover:no-underline hover:opacity-75 transition-opacity text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed font-sans">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
