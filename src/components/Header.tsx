import { GIVEAWAY_CONFIG } from "@/data/giveawayConfig"

export function Header() {
  return (
    <header className="w-full">
      <div className="relative w-full overflow-hidden bg-background border-b border-border/80">
        <img
          src={GIVEAWAY_CONFIG.heroImageUrl}
          alt="Chef Battle - Jacopo Lanfranco"
          width={640}
          height={593}
          className="w-full h-[26rem] sm:h-[28rem] object-cover object-right"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20 flex flex-col justify-end p-5 text-foreground">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-foreground/75 mb-2">
            {GIVEAWAY_CONFIG.eventName} • {GIVEAWAY_CONFIG.eventDate}
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl font-light tracking-tight text-foreground leading-[1.05]">
            Vinci una cena per due
          </h1>

          <p className="text-sm text-foreground/75 font-sans tracking-wide mt-3 leading-relaxed">
            Esperienza privata esclusiva preparata dallo <strong>Chef {GIVEAWAY_CONFIG.chefName}</strong>
          </p>
        </div>
      </div>
    </header>
  )
}
