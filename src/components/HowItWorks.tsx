export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Iscriviti",
      desc: "Compila il modulo con i tuoi recapiti veritieri. Servono per contattarti se vinci.",
    },
    {
      num: "02",
      title: "Conferma iscrizione",
      desc: "Appena inviata la registrazione visualizzi la conferma con il riepilogo dei tuoi dati.",
    },
    {
      num: "03",
      title: "Estrazione a fine serata",
      desc: "Al termine della Chef Battle il vincitore viene estratto alla presenza di un notaio. Tieni il telefono a portata di mano e resta in sala.",
    },
  ]

  return (
    <section className="w-full border-b border-border/60 bg-background">
      <h2 className="font-heading text-xl font-normal text-foreground tracking-tight px-5 pt-8 pb-4">
        Come funziona
      </h2>

      <div className="divide-y divide-border/60 border-t border-border/60">
        {steps.map((s) => (
          <div key={s.num} className="flex items-start gap-5 px-5 py-5">
            <span className="font-heading text-base font-light text-foreground/60 tracking-widest pt-0.5">
              {s.num}
            </span>
            <div className="space-y-1 min-w-0">
              <h3 className="text-base font-medium text-foreground">
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
