export interface Prize {
  id: number
  tier: string
  title: string
  subtitle: string
  chef: string
  description: string
  imageUrl: string
  highlights: string[]
}

export interface FaqItem {
  question: string
  answer: string
}

export const GIVEAWAY_CONFIG = {
  eventName: "Chef Battle",
  eventDate: "21 Ottobre 2026",
  extractionTiming: "Al termine della serata Chef Battle (21/10/2026)",
  chefName: "Jacopo Lanfranco",
  title: "Estrazione Esclusiva Chef Battle",
  subtitle: "Registrati durante la serata per vincere l'unica cena privata per due preparata dallo Chef Jacopo Lanfranco.",
  heroImageUrl: "/immagini/Hero_Jacopo.avif",
  prize: {
    id: 1,
    tier: "Premio Esclusivo",
    title: "Una Cena per Due",
    subtitle: "Esperienza Gastronomica Privata",
    chef: "Chef Jacopo Lanfranco",
    description:
      "Un percorso degustazione esclusivo per due persone interamente ideato, curato e preparato dallo chef Jacopo Lanfranco. Una serata intima all'insegna dell'alta cucina contemporanea, della massima attenzione per le materie prime e di un abbinamento vini d'eccezione.",
    imageUrl: "/immagini/Jacopo.avif",
    highlights: [
      "Percorso degustazione privato per 2 persone",
      "Menu su misura concordato con lo Chef",
      "Wine pairing & servizio dedicato",
    ],
  } as Prize,
  faqs: [
    {
      question: "Quando avverrà l'estrazione del vincitore?",
      answer:
        "L'estrazione avverrà questa sera stessa (21/10/2026) dal vivo al termine dell'evento Chef Battle. Il vincitore sarà proclamato in sala e contattato tempestivamente.",
    },
    {
      question: "Chi può partecipare?",
      answer:
        "Tutti i presenti maggiorenni alla serata Chef Battle del 21/10/2026. È ammessa una sola iscrizione per persona per garantire l'equità del sorteggio.",
    },
    {
      question: "Come sarò contattato in caso di vincita?",
      answer:
        "Chiameremo immediatamente il numero di telefono indicato nel modulo e invieremo una notifica via email. Assicurati che il tuo telefono sia acceso e raggiungibile al termine della gara culinaria.",
    },
    {
      question: "A cosa serve il nickname Instagram?",
      answer:
        "Il nickname Instagram è del tutto facoltativo. Ci permette di menzionarti durante la proclamazione live dal palco e sulle nostre storie ufficiali.",
    },
    {
      question: "Come viene concordata la cena?",
      answer:
        "La data e i dettagli della cena per due verranno concordati privatamente tra il vincitore e lo Chef Jacopo Lanfranco in base alle rispettive disponibilità.",
    },
  ] as FaqItem[],
}
