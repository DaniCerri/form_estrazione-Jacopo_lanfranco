import { GIVEAWAY_CONFIG } from "@/data/giveawayConfig"

export function Header() {
  return (
    <header className="w-full">
      {/* Full Bleed Hero Image */}
      <div className="relative w-full overflow-hidden bg-neutral-950 border-b border-border/80">
        <img
          src={GIVEAWAY_CONFIG.heroImageUrl}
          alt="Chef Battle - Jacopo Lanfranco"
          className="w-full h-64 sm:h-72 object-cover object-center grayscale contrast-115 brightness-90"
          loading="eager"
        />

        {/* Gradient Overlay & Editorial Typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/20 flex flex-col justify-end p-5 text-white">
          <div className="mb-1.5">
            <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-neutral-300">
              {GIVEAWAY_CONFIG.eventName} • {GIVEAWAY_CONFIG.eventDate}
            </span>
          </div>

          <h1 className="font-heading font-serif text-2xl sm:text-3xl font-normal tracking-tight text-white leading-tight">
            Vinci una Cena per Due
          </h1>

          <p className="text-xs text-neutral-300 font-sans tracking-wide mt-1.5">
            Esperienza privata esclusiva preparata dallo <strong>Chef {GIVEAWAY_CONFIG.chefName}</strong>
          </p>
        </div>
      </div>
    </header>
  )
}
