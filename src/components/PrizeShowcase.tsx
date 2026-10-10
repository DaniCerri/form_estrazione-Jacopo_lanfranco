import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GIVEAWAY_CONFIG } from "@/data/giveawayConfig"

export function PrizeShowcase() {
  const { prize } = GIVEAWAY_CONFIG

  return (
    <section className="w-full border-b border-border bg-card">
      {/* Section Header */}
      <div className="flex items-end justify-between px-4 py-3 border-b border-border/60">
        <div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-medium block">
            Il Premio Esclusivo
          </span>
          <h2 className="font-heading font-serif text-base font-medium text-foreground tracking-tight">
            L'Esperienza Gastronomica
          </h2>
        </div>
        <Badge
          variant="secondary"
          className="rounded-none text-[9px] uppercase tracking-[0.15em] font-medium px-2 py-0.5 bg-foreground text-background"
        >
          1 Vincitore
        </Badge>
      </div>

      <Card className="w-full border-0 rounded-none shadow-none bg-transparent">
        {/* Jacopo.avif photo full width */}
        <div className="relative w-full">
          <img
            src={prize.imageUrl}
            alt="Chef Jacopo Lanfranco"
            className="w-full h-72 sm:h-80 object-cover object-top grayscale contrast-110 brightness-95"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
            <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-300 font-medium">
              Esperienza Privata
            </span>
            <h3 className="font-heading font-serif text-xl text-white font-normal leading-snug">
              {prize.title}
            </h3>
            <p className="text-xs text-neutral-300 italic font-serif">
              con lo {prize.chef}
            </p>
          </div>
        </div>

        <CardContent className="p-4 space-y-3.5">
          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
            {prize.description}
          </p>

          {/* Highlights */}
          <div className="border-t border-border/60 pt-3 space-y-2">
            <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
              Cosa Include il Premio
            </div>
            <ul className="space-y-1.5 text-xs text-foreground font-sans">
              {prize.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs">
                  <span className="text-muted-foreground font-serif text-[11px] select-none">
                    —
                  </span>
                  <span className="leading-tight">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
