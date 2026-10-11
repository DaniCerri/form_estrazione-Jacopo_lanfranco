import { GIVEAWAY_CONFIG } from "@/data/giveawayConfig"
import { useVicino } from "@/lib/vicino"

export function PrizeShowcase() {
  const { prize } = GIVEAWAY_CONFIG
  // Foto e corsivo si scaricano solo se l'utente scorre fin qui
  const [fotoRef, vicino] = useVicino<HTMLDivElement>()

  return (
    <section className="w-full border-b border-border/60 bg-background sotto-piega [--altezza-stimata:790px]">
      <h2 className="font-heading text-2xl font-normal text-foreground tracking-tight px-5 pt-12 pb-6">
        Il premio
      </h2>

      <div ref={fotoRef} className="relative w-full">
        {vicino ? (
          <img
            src={prize.imageUrl}
            alt="Chef Jacopo Lanfranco"
            width={896}
            height={764}
            className="w-full h-72 sm:h-80 object-cover object-top"
            decoding="async"
          />
        ) : (
          <div className="w-full h-72 sm:h-80 bg-card" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent flex flex-col justify-end p-5 text-foreground">
          <h3 className="font-heading text-2xl text-foreground font-light tracking-tight leading-tight">
            {prize.title}
          </h3>
          <p className={`text-sm text-foreground/75 font-heading mt-1 ${vicino ? "italic" : ""}`}>
            con lo {prize.chef}
          </p>
        </div>
      </div>

      <div className="px-5 pt-6 pb-12 space-y-6">
        <p className="text-base text-muted-foreground leading-relaxed font-sans">
          {prize.description}
        </p>

        <ul className="divide-y divide-border/60 border-y border-border/60 text-foreground font-sans">
          {prize.highlights.map((h, i) => (
            <li key={i} className="py-3.5 text-sm font-medium leading-snug">
              {h}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
