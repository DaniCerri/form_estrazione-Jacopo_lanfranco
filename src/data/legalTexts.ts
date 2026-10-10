export interface LegalSection {
  title: string
  content: string[]
}

export interface LegalDocument {
  title: string
  lastUpdated: string
  intro: string
  sections: LegalSection[]
}

export const LEGAL_TEXTS: Record<"privacy" | "termini" | "cookie", LegalDocument> = {
  privacy: {
    title: "Informativa sulla Privacy",
    lastUpdated: "21 Ottobre 2026",
    intro:
      "La presente informativa descrive le modalità di trattamento dei dati personali forniti dagli utenti che partecipano all'estrazione esclusiva durante l'evento Chef Battle del 21/10/2026, ai sensi del Regolamento UE 2016/679 (GDPR).",
    sections: [
      {
        title: "1. Titolare del Trattamento",
        content: [
          "Il Titolare del trattamento dei dati è l'organizzazione dell'evento Chef Battle e lo Chef Jacopo Lanfranco. Per qualsiasi chiarimento relativo ai dati personali, è possibile fare riferimento alla segreteria dell'evento o contattare: privacy@jacopolanfranco.it.",
        ],
      },
      {
        title: "2. Dati Raccolti",
        content: [
          "Raccogliamo unicamente i dati necessari per la gestione della partecipazione all'estrazione:",
          "• Nome e Cognome del partecipante.",
          "• Recapito telefonico (necessario per il contatto immediato a fine serata).",
          "• Indirizzo email (per la conferma dell'iscrizione e l'eventuale notifica di vincita).",
          "• Nickname Instagram (opzionale, per eventuale menzione social durante la proclamazione).",
        ],
      },
      {
        title: "3. Finalità e Base Giuridica del Trattamento",
        content: [
          "• Gestione dell'estrazione: registrazione dei partecipanti, sorteggio casuale a fine serata e proclamazione del vincitore della cena per due. Base giuridica: adempimento del regolamento dell'iniziativa.",
          "• Comunicazioni facoltative (previo consenso): Invio saltuario di inviti o comunicazioni su futuri eventi gastronomici ed esperienze dello Chef. Base giuridica: consenso esplicito facoltativo.",
        ],
      },
      {
        title: "4. Conservazione dei Dati",
        content: [
          "I dati raccolti per la singola estrazione saranno conservati per il tempo strettamente necessario all'assegnazione e fruizione della cena per due (massimo 60 giorni). In caso di consenso alle comunicazioni future, saranno conservati fino a richiesta di cancellazione.",
        ],
      },
      {
        title: "5. Diritti dell'Interessato",
        content: [
          "In qualunque momento l'utente può esercitare i propri diritti di accesso, rettifica, cancellazione o limitazione dei dati scrivendo a privacy@jacopolanfranco.it.",
        ],
      },
    ],
  },
  termini: {
    title: "Regolamento Estrazione Chef Battle",
    lastUpdated: "21 Ottobre 2026",
    intro:
      "Regolamento ufficiale dell'estrazione per l'assegnazione di una Cena per Due preparata dallo Chef Jacopo Lanfranco, promossa in occasione della serata Chef Battle del 21/10/2026.",
    sections: [
      {
        title: "1. Requisiti e Limiti di Partecipazione",
        content: [
          "La partecipazione è gratuita ed è riservata ai partecipanti maggiorenni presenti alla serata Chef Battle del 21 Ottobre 2026.",
          "Ciascun partecipante ha diritto a una sola registrazione. Tentativi di iscrizione multipla con lo stesso numero o indirizzo comporteranno l'annullamento automatico delle iscrizioni eccedenti.",
        ],
      },
      {
        title: "2. Oggetto del Premio",
        content: [
          "In palio vi è un unico premio esclusivo: Una cena degustazione privata per due persone preparata dallo Chef Jacopo Lanfranco.",
          "Il premio comprende un menu degustazione personalizzato con abbinamento vini. La data e il luogo dello svolgimento saranno concordati privatamente tra il vincitore e lo Chef entro 6 mesi dalla data dell'estrazione.",
          "Il premio è personale, non cedibile a terzi senza previa approvazione e non convertibile in denaro.",
        ],
      },
      {
        title: "3. Modalità di Estrazione e Proclamazione",
        content: [
          "L'estrazione del vincitore avverrà al termine della serata Chef Battle il 21/10/2026 tramite sorteggio casuale certificato.",
          "Il vincitore sarà proclamato al termine dell'evento e contattato immediatamente tramite chiamata vocale al recapito telefonico inserito nel modulo.",
          "In caso di irreperibilità del vincitore o mancata risposta entro i tempi annunciati durante la serata, si procederà al sorteggio di un partecipante di riserva.",
        ],
      },
    ],
  },
  cookie: {
    title: "Informativa sui Cookie",
    lastUpdated: "21 Ottobre 2026",
    intro:
      "Informativa tecnica sui cookie utilizzati dalla web app dell'estrazione Chef Battle.",
    sections: [
      {
        title: "1. Cookie Tecnici",
        content: [
          "Questa applicazione web mobile utilizza esclusivamente cookie tecnici essenziali al corretto funzionamento della sessione di compilazione del modulo e alla memorizzazione delle preferenze grafiche.",
        ],
      },
      {
        title: "2. Nessun Tracciamento Commerciale",
        content: [
          "Non vengono impiegati cookie pubblicitari di profilazione comportamentale o di terze parti a scopo di monetizzazione.",
        ],
      },
    ],
  },
}
