import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ForkKnife, Scroll, Wine } from "@phosphor-icons/react"
import { GIVEAWAY_CONFIG } from "@/data/giveawayConfig"

export function PrizeShowcase() {
  const { prize } = GIVEAWAY_CONFIG

  const icons = [ForkKnife, Scroll, Wine]

  return (
    <section className="w-full border-b border-border bg-card">
      {/* Section Header */}
      <div className="flex items-end justify-between px-4 py-3.5 border-b border-border/60">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium block">
            Il Premio Esclusivo
          </span>
          <h2 className="font-heading font-serif text-lg font-medium text-foreground tracking-tight mt-0.5">
            L'Esperienza Gastronomica
          </h2>
        </div>
        <Badge
          variant="secondary"
          className="rounded-none text-[10px] uppercase tracking-[0.18em] font-medium px-2.5 py-1 bg-foreground text-background"
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
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-300 font-medium">
              Esperienza Privata
            </span>
            <h3 className="font-heading font-serif text-2xl text-white font-normal leading-snug mt-1">
              {prize.title}
            </h3>
            <p className="text-sm text-neutral-300 italic font-serif mt-0.5">
              con lo {prize.chef}
            </p>
          </div>
        </div>

        <CardContent className="p-5 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed font-sans">
            {prize.description}
          </p>

          {/* Highlights with Phosphor icons instead of dashes */}
          <div className="border-t border-border/60 pt-4 space-y-3">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold">
              Cosa Include il Premio
            </div>
            <ul className="space-y-2.5 text-sm text-foreground font-sans">
              {prize.highlights.map((h, i) => {
                const IconComponent = icons[i] ?? ForkKnife
                return (
                  <li key={i} className="flex items-center gap-3">
                    <div className="size-7 rounded-none bg-foreground/10 text-foreground flex items-center justify-center shrink-0 border border-border">
                      <IconComponent className="size-4" weight="bold" />
                    </div>
                    <span className="text-sm font-medium leading-snug">{h}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
