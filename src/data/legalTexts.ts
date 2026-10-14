export interface LegalSection {
  title: string
  content: string[]
}

export interface LegalDocument {
  title: string
  intro: string
  sections: LegalSection[]
}

/**
 * Dati del promotore e parametri del regolamento: unica fonte per tutti i testi legali.
 * I valori tra [ ] vanno compilati con il committente prima della pubblicazione.
 * `versione` deve coincidere con INFORMATIVA_VERSIONE del back-end (salvata con ogni iscrizione).
 */
export const LEGAL_INFO = {
  versione: "1.0",
  dataPubblicazione: "[GG/MM/2026]",
  denominazione: "Estrazione Chef Battle 2026",
  promotore: {
    ragioneSociale: "[RAGIONE SOCIALE PROMOTORE]",
    sede: "[SEDE LEGALE]",
    piva: "[P.IVA / C.F.]",
    pec: "[PEC]",
  },
  emailPrivacy: "[EMAIL PRIVACY]",
  responsabileTecnico: "[NOME E SEDE DELLO SVILUPPATORE]",
  luogoEvento: "[LOCALE, INDIRIZZO, COMUNE]",
  inizioPubblicita: "[GG/MM/2026]",
  orarioApertura: "[HH:MM]",
  orarioChiusura: "[HH:MM]",
  // Valore normale del premio IVA esclusa (art. 7: la cauzione è pari a questo importo)
  valorePremio: "200,00 €",
  areaPremio: "[LUOGO DI SVOLGIMENTO DELLA CENA, es. domicilio del vincitore in provincia di ...]",
  onlus: "[DENOMINAZIONE ONLUS, SEDE, C.F.]",
  riserve: 3,
  tentativiChiamata: 3,
  minutiChiamata: 5,
  minutiPresenza: 10,
  giorniConsegna: 30,
  giorniFruizione: 180,
  // Mesi di conservazione dei dati di partecipazione dopo il verbale di chiusura
  mesiConservazione: 12,
} as const

const P = LEGAL_INFO.promotore
const PROMOTORE = `${P.ragioneSociale}, con sede in ${P.sede}, P.IVA/C.F. ${P.piva}`

export const LEGAL_TEXTS: Record<"privacy" | "termini" | "cookie", LegalDocument> = {
  termini: {
    title: "Regolamento del concorso a premio",
    intro: `Regolamento del concorso a premio "${LEGAL_INFO.denominazione}", ai sensi del D.P.R. 26 ottobre 2001, n. 430.`,
    sections: [
      {
        title: "1. Soggetto promotore",
        content: [`${PROMOTORE}, PEC ${P.pec} (di seguito "Promotore").`],
      },
      {
        title: "2. Ambito territoriale e durata",
        content: [
          `Il concorso si svolge esclusivamente in Italia, presso ${LEGAL_INFO.luogoEvento}, durante la serata Chef Battle del 21 ottobre 2026.`,
          `Pubblicizzazione dal ${LEGAL_INFO.inizioPubblicita}. Iscrizioni aperte il 21/10/2026 dalle ore ${LEGAL_INFO.orarioApertura} alle ore ${LEGAL_INFO.orarioChiusura}. Estrazione al termine della serata, entro il 21/10/2026.`,
        ],
      },
      {
        title: "3. Destinatari",
        content: [
          "Persone fisiche maggiorenni presenti in sala alla serata Chef Battle del 21/10/2026.",
          "Sono esclusi dalla partecipazione il personale, i collaboratori e gli organizzatori dell'evento, i componenti della giuria, i collaboratori dello Chef Jacopo Lanfranco e del Promotore e i rispettivi familiari conviventi.",
        ],
      },
      {
        title: "4. Modalità di partecipazione",
        content: [
          "Per partecipare occorre scansionare il QR code presente in sala e compilare il modulo online con nome, cognome, numero di telefono, email e nickname Instagram, dichiarando la maggiore età e accettando il presente regolamento.",
          "Chi non ha un account Instagram lo indica nel modulo e partecipa alle stesse condizioni e con le stesse probabilità di vincita.",
          "La partecipazione è gratuita. Il prezzo di ingresso alla serata non è maggiorato in alcun modo per la partecipazione al concorso.",
          "Ogni persona può iscriversi una sola volta. Le iscrizioni con lo stesso numero di telefono o la stessa email sono considerate duplicate: è valida solo la prima in ordine cronologico.",
          "La zona di posto rilevata dal QR code serve solo a individuare il vincitore in sala e non incide in alcun modo sull'estrazione.",
          "Sono escluse le iscrizioni con dati falsi, incompleti o riferiti a terzi. Al momento della vincita il Promotore può chiedere un documento d'identità per verificare la corrispondenza dei dati.",
        ],
      },
      {
        title: "5. Premio e montepremi",
        content: [
          `Premio unico: una cena privata di quattro portate per due persone, ideata e preparata dallo Chef Jacopo Lanfranco, con menu personalizzato e servizio inclusi. Le bevande non sono comprese nel premio e restano a carico del vincitore. Valore indicativo: ${LEGAL_INFO.valorePremio} (IVA esclusa). Montepremi complessivo: ${LEGAL_INFO.valorePremio} (IVA esclusa).`,
          `Luogo di svolgimento: ${LEGAL_INFO.areaPremio}. Data e dettagli saranno concordati tra il vincitore e lo Chef. La cena deve essere fruita entro ${LEGAL_INFO.giorniFruizione} giorni dall'estrazione.`,
          "Il premio non è convertibile in denaro. Se per cause non imputabili al Promotore il premio non fosse disponibile, sarà sostituito da un premio di natura analoga e di valore pari o superiore.",
        ],
      },
      {
        title: "6. Estrazione",
        content: [
          `Al termine della serata, chiuse le iscrizioni, si procede a un'unica estrazione tra tutti gli iscritti validi di 1 vincitore e ${LEGAL_INFO.riserve} riserve, in ordine di estrazione.`,
          "L'estrazione avviene tramite software di estrazione casuale, corredato da perizia tecnica sulla casualità e non manomissibilità, alla presenza di un notaio o di un funzionario della Camera di Commercio, che ne redige il verbale.",
        ],
      },
      {
        title: "7. Comunicazione della vincita e riserve",
        content: [
          "Il vincitore viene proclamato in sala con nome e iniziale del cognome e contattato al numero di telefono indicato nel modulo.",
          `Se il vincitore non risponde dopo ${LEGAL_INFO.tentativiChiamata} tentativi di chiamata nell'arco di ${LEGAL_INFO.minutiChiamata} minuti, oppure non si presenta allo staff in sala entro ${LEGAL_INFO.minutiPresenza} minuti dalla proclamazione, decade e il premio passa alla prima riserva utile, secondo l'ordine di estrazione, con le stesse modalità.`,
          "Il vincitore che non risulti in possesso dei requisiti (art. 3 e 4) decade e il premio passa alla prima riserva utile.",
        ],
      },
      {
        title: "8. Consegna del premio",
        content: [
          `Il premio è assegnato con un voucher nominativo consegnato entro ${LEGAL_INFO.giorniConsegna} giorni dall'estrazione e comunque entro 180 giorni, come previsto dall'art. 1, comma 3, del D.P.R. 430/2001.`,
        ],
      },
      {
        title: "9. Premi non assegnati",
        content: [
          `Il premio non assegnato o non richiesto, diverso da quello rifiutato, sarà devoluto alla ONLUS ${LEGAL_INFO.onlus}, ai sensi dell'art. 10, comma 5, del D.P.R. 430/2001.`,
        ],
      },
      {
        title: "10. Cauzione e adempimenti fiscali",
        content: [
          "A garanzia del premio il Promotore ha prestato cauzione a favore del Ministero delle Imprese e del Made in Italy, pari al 100% del montepremi, ai sensi dell'art. 7 del D.P.R. 430/2001.",
          "Il Promotore rinuncia alla facoltà di rivalsa della ritenuta alla fonte prevista dall'art. 30 del D.P.R. 600/1973.",
        ],
      },
      {
        title: "11. Pubblicità e reperibilità del regolamento",
        content: [
          "Il concorso è pubblicizzato con materiali e QR code esposti in sala e su questa pagina. Il regolamento completo è consultabile su questa pagina e presso la sede del Promotore.",
        ],
      },
      {
        title: "12. Dati personali",
        content: [
          "I dati dei partecipanti sono trattati secondo l'Informativa Privacy consultabile su questa pagina.",
        ],
      },
    ],
  },

  privacy: {
    title: "Informativa sulla Privacy",
    intro:
      "Informativa ai sensi degli artt. 13 e 14 del Regolamento UE 2016/679 (GDPR) per chi partecipa all'estrazione della serata Chef Battle del 21/10/2026.",
    sections: [
      {
        title: "1. Titolare del trattamento",
        content: [
          `Titolare del trattamento è ${PROMOTORE}. Per qualsiasi richiesta sui tuoi dati scrivi a ${LEGAL_INFO.emailPrivacy}.`,
          `La gestione tecnica della piattaforma è affidata a ${LEGAL_INFO.responsabileTecnico}, nominato Responsabile del trattamento ai sensi dell'art. 28 GDPR.`,
        ],
      },
      {
        title: "2. Dati trattati",
        content: [
          "• Nome, cognome, numero di telefono ed email.",
          "• Nickname Instagram, salvo che tu dichiari di non avere un account.",
          "• Zona di posto in sala, rilevata dal QR code scansionato o scelta da te.",
          "• Dichiarazione di maggiore età e scelte sui consensi, con data e ora dell'iscrizione, indirizzo IP, tipo di browser e versione dei testi accettati, a prova della partecipazione e dei consensi.",
          "• Log tecnici del server (indirizzo IP, data e ora delle richieste), per sicurezza.",
        ],
      },
      {
        title: "3. Finalità e basi giuridiche",
        content: [
          "• Partecipazione al concorso: iscrizione, estrazione, contatto e proclamazione del vincitore (nome e iniziale del cognome in sala), consegna del premio e verbalizzazione. Base giuridica: esecuzione del regolamento a cui aderisci (art. 6.1.b GDPR) e obblighi di legge in materia di manifestazioni a premio e fiscali (D.P.R. 430/2001, D.P.R. 600/1973; art. 6.1.c GDPR).",
          "• Conoscenza del pubblico della serata: lo Chef può consultare il profilo Instagram pubblico associato al nickname, senza contattarti né pubblicare nulla. Base giuridica: legittimo interesse del Titolare (art. 6.1.f GDPR).",
          "• Menzione sui social: solo in caso di vincita e solo se hai inserito il nickname e dato il consenso specifico, menzione o tag nelle storie Instagram ufficiali. Base giuridica: consenso (art. 6.1.a GDPR).",
          "• Comunicazioni sui futuri eventi: solo se dai il consenso facoltativo, invio tramite email, SMS/WhatsApp e telefono di inviti e aggiornamenti su eventi ed esperienze dello Chef Jacopo Lanfranco. Base giuridica: consenso (art. 6.1.a GDPR e art. 130 D.Lgs. 196/2003).",
          "• Sicurezza della piattaforma e prevenzione di abusi o iscrizioni multiple. Base giuridica: legittimo interesse del Titolare (art. 6.1.f GDPR).",
        ],
      },
      {
        title: "4. Natura del conferimento",
        content: [
          "Nome, cognome, telefono, email e dichiarazione di maggiore età sono necessari per partecipare: senza questi dati non è possibile iscriversi.",
          "Il nickname Instagram è richiesto a chi ha un account; chi non ce l'ha lo indica nel modulo e partecipa comunque, con le stesse probabilità di vincita.",
          "Il consenso alla menzione social e il consenso alle comunicazioni sui futuri eventi sono facoltativi e non influiscono sulla partecipazione o sulla possibilità di vincere.",
        ],
      },
      {
        title: "5. Destinatari",
        content: [
          `• ${LEGAL_INFO.responsabileTecnico}, Responsabile del trattamento per la gestione tecnica.`,
          "• Railway Corp. (USA), fornitore dell'infrastruttura di hosting, sub-responsabile del trattamento.",
          "• Il notaio o funzionario camerale che verbalizza l'estrazione e il Ministero delle Imprese e del Made in Italy, per gli adempimenti del concorso.",
          "• Consulenti fiscali e legali del Titolare, se necessario.",
          "• Lo Chef Jacopo Lanfranco, solo per i partecipanti che hanno dato il consenso alle comunicazioni sui futuri eventi e solo per questa finalità.",
          "I dati non sono diffusi, salvo la proclamazione del vincitore in sala e l'eventuale menzione social autorizzata.",
        ],
      },
      {
        title: "6. Trasferimento fuori dall'UE",
        content: [
          "I dati sono ospitati su server situati nell'Unione Europea (Paesi Bassi) di Railway Corp., società con sede negli Stati Uniti che può accedervi dagli USA. Il trasferimento è garantito dalle Clausole Contrattuali Standard approvate dalla Commissione Europea (art. 46 GDPR). Puoi chiederne copia scrivendo al Titolare.",
        ],
      },
      {
        title: "7. Conservazione",
        content: [
          `• Dati di partecipazione: fino al verbale di chiusura del concorso e per i ${LEGAL_INFO.mesiConservazione} mesi successivi, per eventuali controlli o contestazioni; poi sono cancellati.`,
          "• Dati del vincitore e delle riserve: per il tempo richiesto dagli obblighi fiscali e di legge (fino a 10 anni).",
          "• Dati per le comunicazioni sui futuri eventi: fino alla revoca del consenso e comunque non oltre 24 mesi dall'ultimo contatto.",
          "• Log tecnici: per il tempo strettamente necessario alla sicurezza.",
        ],
      },
      {
        title: "8. I tuoi diritti",
        content: [
          `Puoi chiedere in ogni momento accesso, rettifica, cancellazione, limitazione, portabilità dei dati e opporti al trattamento (artt. 15-22 GDPR) scrivendo a ${LEGAL_INFO.emailPrivacy}.`,
          "Puoi revocare in qualsiasi momento i consensi facoltativi, con il link presente in ogni comunicazione o scrivendo allo stesso indirizzo, senza pregiudicare la liceità del trattamento svolto prima della revoca.",
          "Hai diritto di proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).",
          "Non sono prese decisioni basate unicamente su trattamenti automatizzati o profilazione: l'estrazione è casuale.",
        ],
      },
    ],
  },

  cookie: {
    title: "Informativa sui Cookie",
    intro:
      "Informativa sull'uso di cookie e strumenti simili, ai sensi dell'art. 122 del D.Lgs. 196/2003 e delle Linee guida del Garante del 10 giugno 2021.",
    sections: [
      {
        title: "1. Nessun cookie sulla pagina di iscrizione",
        content: [
          "La pagina di iscrizione non installa cookie e non usa strumenti di tracciamento, analisi o profilazione, propri o di terze parti. Non memorizza dati nel tuo browser.",
          "I caratteri tipografici sono ospitati sul nostro server: la pagina non contatta servizi di terze parti.",
        ],
      },
      {
        title: "2. Area riservata agli organizzatori",
        content: [
          "L'area riservata usata dagli organizzatori per gestire l'estrazione installa un solo cookie tecnico di autenticazione, necessario al funzionamento e valido al massimo 12 ore. Non riguarda i partecipanti.",
        ],
      },
      {
        title: "3. Banner",
        content: [
          "Poiché sono utilizzati solo strumenti tecnici, non è richiesto alcun consenso e non è mostrato alcun banner cookie (Linee guida Garante, par. 7.1).",
        ],
      },
    ],
  },
}

if (import.meta.env.DEV) {
  const daCompletare = JSON.stringify(LEGAL_TEXTS).match(/\[[A-Z][^\]]*\]/g)
  if (daCompletare) {
    console.warn("Testi legali da completare:", [...new Set(daCompletare)])
  }
}
