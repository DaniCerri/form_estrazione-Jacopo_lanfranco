export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Registrazione Immediata",
      desc: "Compila il modulo in cima alla pagina con i tuoi recapiti veritieri per ricevere il codice del biglietto.",
    },
    {
      num: "02",
      title: "Profilo Instagram (Opzionale)",
      desc: "Aggiungi il tuo nickname per essere menzionato durante la proclamazione dal vivo in sala.",
    },
    {
      num: "03",
      title: "Sorteggio a Fine Serata",
      desc: "Al termine della Chef Battle verrà estratto il vincitore. Tieni il telefono a portata di mano.",
    },
  ]

  return (
    <section className="w-full border-b border-border/60 bg-card">
      <div className="px-5 py-4 border-b border-border/60">
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold block">
          Regole di Partecipazione
        </span>
        <h2 className="font-heading font-serif text-lg font-medium text-foreground tracking-tight mt-0.5">
          Come Funziona il Contest
        </h2>
      </div>

      <div className="divide-y divide-border/60">
        {steps.map((s) => (
          <div
            key={s.num}
            className="flex items-start gap-4 px-5 py-4.5 bg-card"
          >
            <span className="font-heading font-serif text-base font-bold text-foreground/80 tracking-widest pt-0.5">
              {s.num}
            </span>
            <div className="space-y-1 min-w-0">
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
