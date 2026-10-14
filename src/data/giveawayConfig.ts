import { LEGAL_INFO } from "@/data/legalTexts"

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
      "Una cena privata di quattro portate per due persone, interamente ideata, curata e preparata dallo chef Jacopo Lanfranco, con servizio dedicato. Una serata intima all'insegna dell'alta cucina contemporanea e della massima attenzione per le materie prime. Bevande escluse.",
    imageUrl: "/immagini/Jacopo.avif",
    highlights: [
      "Cena privata di 4 portate per 2 persone",
      "Menu su misura concordato con lo Chef",
      "Servizio dedicato incluso, bevande escluse",
    ],
  } as Prize,
  faqs: [
    {
      question: "Quando avverrà l'estrazione del vincitore?",
      answer:
        "Questa sera stessa (21/10/2026), dal vivo al termine della Chef Battle, dopo la chiusura delle iscrizioni. L'estrazione è casuale.",
    },
    {
      question: "Chi può partecipare?",
      answer:
        "Tutti i maggiorenni presenti in sala alla serata Chef Battle del 21/10/2026, esclusi staff, organizzatori, giuria e loro familiari. La partecipazione è gratuita ed è ammessa una sola iscrizione per persona.",
    },
    {
      question: "Come sarò contattato in caso di vincita?",
      answer:
        `Il vincitore viene annunciato in sala con nome e iniziale del cognome e chiamato al numero indicato nel modulo. Se non risponde dopo ${LEGAL_INFO.tentativiChiamata} tentativi in ${LEGAL_INFO.minutiChiamata} minuti o non si presenta allo staff entro ${LEGAL_INFO.minutiPresenza} minuti, il premio passa alla prima riserva estratta.`,
    },
    {
      question: "La zona in cui sono seduto conta?",
      answer:
        "No. La zona serve solo a trovarti in sala se vinci: l'estrazione avviene tra tutti gli iscritti, con le stesse probabilità per ciascuno.",
    },
    {
      question: "A cosa serve il nickname Instagram?",
      answer:
        "Lo Chef vuole conoscere il pubblico della serata e dare un'occhiata ai profili. Se non hai Instagram spunta «Non ho Instagram»: partecipi comunque, con le stesse probabilità. Se dai anche il consenso, in caso di vincita potremo menzionarti e taggarti nelle storie Instagram ufficiali della serata.",
    },
    {
      question: "Come viene concordata la cena?",
      answer:
        "Il vincitore riceve un voucher nominativo. Data e dettagli della cena per due vengono concordati privatamente con lo Chef Jacopo Lanfranco, secondo i tempi indicati nel Regolamento. Il premio comprende le quattro portate e il servizio; le bevande sono escluse e restano a carico del vincitore.",
    },
  ] as FaqItem[],
}
