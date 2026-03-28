import type { Locale } from "../i18n/locales";

const SITE = "https://hackspain.com";

const CONTENT_DATE_MODIFIED = "2026-03-21";

export type PageSeo = {
  title: string;
  description: string;
  ogImageAlt: string;
};

const PAGES_EN: PageSeo[] = [
  {
    title: "HACKSPAIN 2026 — Hack Spain hackathon Madrid | hackathon Spain",
    description:
      "Hack Spain / HackSpain 2026: mission-driven hackathon in Madrid for young coders — 24 hours, 300+ participants, tracks and sponsors. hackathon Spain, hack spain, hackspain.com",
    ogImageAlt: "Hack Spain HackSpain 2026 — hackathon Madrid and Spain",
  },
  {
    title: "Mission — HACKSPAIN 2026 | hackathon Spain",
    description:
      "HackSpain brings together young Spanish coders for a 24-hour hackathon in Madrid. The largest hackathon movement in Southern Europe.",
    ogImageAlt: "HackSpain 2026 — mission, hackathon Madrid",
  },
  {
    title: "What makes us unique — HACKSPAIN 2026",
    description:
      "Fully mission-driven hackathon Spain: media focus, ambassadors, and stories from the hackers. hackathon Madrid.",
    ogImageAlt: "HackSpain — unique hackathon Spain",
  },
  {
    title: "Tracks — HACKSPAIN 2026 | hackathon Madrid",
    description:
      "ML track with free compute and a non-tech track. hackathon Spain with paths for every builder. Madrid 2026.",
    ogImageAlt: "HackSpain 2026 — tracks",
  },
  {
    title: "Sponsors — HACKSPAIN 2026 | Google and partners",
    description:
      "Sponsors: Google, K Fund, fal.ai, Exa, Mozart AI — prizes and a great experience. hackathon Spain sponsors.",
    ogImageAlt: "HackSpain 2026 sponsors — hackathon Spain",
  },
  {
    title: "Vision — HACKSPAIN 2026 | hackathon Spain",
    description:
      "From Madrid to the world: positioning Spain as a European tech leader. Goal 5,000 participants. hackathon Madrid.",
    ogImageAlt: "HackSpain — long-term vision, hackathon Spain",
  },
];

const PAGES_ES: PageSeo[] = [
  {
    title: "HACKSPAIN 2026 — Hack Spain hackathon Madrid | hackathon España",
    description:
      "Hack Spain / HackSpain 2026: hackathon Madrid, hackathon España y hackathon Spain para jóvenes programadores — 24h, +300 participantes. hack spain, hackspain.com",
    ogImageAlt: "Hack Spain HackSpain — hackathon Madrid y España",
  },
  {
    title: "Misión — HACKSPAIN 2026 | hackathon España",
    description:
      "HackSpain reúne a coders jóvenes en un hackathon Madrid / hackathon España de 24 horas. El mayor movimiento de hackathones del sur de Europa.",
    ogImageAlt: "HackSpain 2026 — misión, hackathon España",
  },
  {
    title: "Qué nos hace únicos — HACKSPAIN 2026",
    description:
      "Hackathon España HackSpain: misión clara, foco en medios, embajadores e historias de l@s hackers. hackathon Madrid.",
    ogImageAlt: "HackSpain — hackathon España único",
  },
  {
    title: "Tracks — HACKSPAIN 2026 | hackathon Madrid",
    description:
      "Tracks de ML con compute gratis y track no técnico. Hackathon España para todo tipo de builders. Madrid 2026.",
    ogImageAlt: "HackSpain 2026 — tracks, hackathon España",
  },
  {
    title: "Patrocinadores — HACKSPAIN 2026 | Google hackathon España",
    description:
      "Patrocinadores: Google, K Fund, fal.ai, Exa, Mozart AI — premios para participantes. hackathon España.",
    ogImageAlt: "HackSpain 2026 patrocinadores — hackathon España",
  },
  {
    title: "Visión — HACKSPAIN 2026 | hackathon España",
    description:
      "De Madrid al mundo: hackathon España hacia el liderazgo tech europeo. Meta 5.000 participantes.",
    ogImageAlt: "HackSpain — visión, hackathon España",
  },
];

export function seoForSectionIndex(locale: Locale, i: number): PageSeo {
  const pages = locale === "es" ? PAGES_ES : PAGES_EN;
  return pages[Math.max(0, Math.min(pages.length - 1, i))] ?? pages[0];
}

const SIGNUP_KEYWORDS_EN =
  "HackSpain signup, hackathon registration Spain, hackathon Madrid 2026, Hack Spain register, young coders hackathon interest";
const SIGNUP_KEYWORDS_ES =
  "apuntarse HackSpain, registro hackathon España, hackathon Madrid 2026, Hack Spain registro, interés hackathon jóvenes";

export function signupKeywords(locale: Locale): string {
  return locale === "es" ? SIGNUP_KEYWORDS_ES : SIGNUP_KEYWORDS_EN;
}

export function signupSeo(locale: Locale): PageSeo {
  if (locale === "es") {
    return {
      title: "Apúntate — HACKSPAIN 2026 | hackathon Madrid",
      description:
        "Registro de interés para HackSpain 2026: hackathon Madrid, hackathon España. Cuéntanos tu perfil y te contactamos.",
      ogImageAlt: "HackSpain 2026 — apúntate al hackathon",
    };
  }
  return {
    title: "Sign up — HACKSPAIN 2026 | hackathon Madrid Spain",
    description:
      "Express interest in HackSpain 2026 — Madrid hackathon for young coders. Share your profile and we’ll stay in touch.",
    ogImageAlt: "HackSpain 2026 — hackathon signup",
  };
}

const AMBASSADOR_KEYWORDS_EN =
  "HackSpain ambassador, hackathon campus rep Spain, university hackathon Madrid 2026, student ambassador hackathon";
const AMBASSADOR_KEYWORDS_ES =
  "embajador HackSpain, campus hackathon España, universidad hackathon Madrid 2026, embajador estudiantil hackathon";

export function ambassadorKeywords(locale: Locale): string {
  return locale === "es" ? AMBASSADOR_KEYWORDS_ES : AMBASSADOR_KEYWORDS_EN;
}

export function ambassadorSeo(locale: Locale): PageSeo {
  if (locale === "es") {
    return {
      title: "Embajadores — HACKSPAIN 2026 | hackathon Madrid",
      description:
        "Programa de embajadores HackSpain: lleva el hackathon a tu universidad, perks y solicitud online. Madrid 2026.",
      ogImageAlt: "HackSpain 2026 — programa de embajadores",
    };
  }
  return {
    title: "Ambassadors — HACKSPAIN 2026 | hackathon Madrid Spain",
    description:
      "HackSpain ambassador program: represent the hackathon on your campus, unlock perks, and apply online. Madrid 2026.",
    ogImageAlt: "HackSpain 2026 — ambassador program",
  };
}

const KEYWORDS_BASE_EN =
  "hack spain, Hack Spain, hack spain hackathon, hack spain Madrid, hack spain 2026, hackathon Madrid, hackathon Spain, hackathon España, HackSpain, young coders Spain, hack day Madrid, programming Madrid, hackspain.com";

const KEYWORDS_BASE_ES =
  "hack spain, Hack Spain, hack spain hackathon, hack spain Madrid, hackathon Madrid, hackathon España, hackathon Spain, hack España, HackSpain, hackathon jóvenes, hackday Madrid, programación Madrid, hackspain.com";

const KEYWORDS_BY_SECTION_EN = [
  "",
  "mission hackathon, Spanish coders, youth hackathon Europe",
  "unique hackathon Spain, Madrid tech community",
  "ML hackathon track, non-technical coding track Spain",
  "hackathon sponsors Google, K Fund, fal.ai, Exa, Mozart AI, hackathon Spain sponsors",
  "hackathon vision Europe, Spain tech talent",
];

const KEYWORDS_BY_SECTION_ES = [
  "",
  "misión hackathon, coders españoles, hackathon jóvenes España",
  "hackathon único España, comunidad hackathon Madrid",
  "track ML hackathon, hackathon sin código, talleres código España",
  "patrocinadores hackathon, Google hackathon España, K Fund, fal.ai, Exa, Mozart AI",
  "visión hackathon Europa, talento tech España",
];

export function keywordsForSectionIndex(locale: Locale, i: number): string {
  const base = locale === "es" ? KEYWORDS_BASE_ES : KEYWORDS_BASE_EN;
  const extraList = locale === "es" ? KEYWORDS_BY_SECTION_ES : KEYWORDS_BY_SECTION_EN;
  const extra = extraList[Math.max(0, Math.min(extraList.length - 1, i))] ?? "";
  return extra ? `${base}, ${extra}` : base;
}

export function jsonLdOrganization(locale: Locale) {
  const description =
    locale === "es"
      ? "Hackathon Madrid y hackathon España — HackSpain. Misión: talento tech joven."
      : "Hackathon Madrid and Spain — HackSpain. Mission-driven hackathon for young coders.";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "HackSpain",
    alternateName: ["Hack Spain", "hack spain", "Hack Spain hackathon"],
    url: SITE,
    logo: `${SITE}/favicon.svg`,
    description,
    sameAs: [
      "https://x.com/hackspain26",
      "https://www.instagram.com/hackspain26/",
      "https://github.com/hackspain",
    ],
    knowsAbout: [
      locale === "es" ? "hackathon España" : "hackathon Spain",
      "Madrid tech events",
      "young coders Europe",
      "machine learning hackathon",
    ],
    inLanguage: locale,
  };
}

export function jsonLdWebSite(locale: Locale) {
  const description =
    locale === "es"
      ? "Sitio oficial de HackSpain: hackathon Madrid 2026, misión, tracks, patrocinadores y visión. Inglés y español."
      : "Official HackSpain site: Madrid 2026 hackathon — mission, tracks, sponsors, and vision. English and Spanish.";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    name: "HackSpain",
    alternateName: ["Hack Spain", "hack spain"],
    url: SITE,
    description,
    inLanguage: ["en", "es"],
    publisher: { "@id": `${SITE}/#organization` },
  };
}

export function jsonLdWebPage(locale: Locale, sectionIndex: number, pageUrl: string) {
  const seo = seoForSectionIndex(locale, sectionIndex);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: seo.title,
    description: seo.description,
    inLanguage: locale,
    isPartOf: { "@id": `${SITE}/#website` },
    about: { "@id": `${SITE}/#event` },
    dateModified: CONTENT_DATE_MODIFIED,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE}/og.png`,
      width: 1200,
      height: 630,
    },
  };
}

export function jsonLdEvent(locale: Locale) {
  const description =
    locale === "es"
      ? "Hackathon en Madrid, España — HackSpain 2026. 24 horas para jóvenes programadores. Junio 2026."
      : "Hackathon in Madrid, Spain — HackSpain 2026. 24 hours for young coders. June 2026.";
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${SITE}/#event`,
    name: "HackSpain 2026",
    alternateName: [
      "Hack Spain 2026",
      "hack spain hackathon",
      "HackSpain hackathon Madrid",
      "hackathon España",
      "hackathon Spain",
    ],
    description,
    inLanguage: locale,
    keywords:
      locale === "es"
        ? "hackathon Madrid, hackathon España, Hack Spain, hack spain, HackSpain, ML, patrocinadores"
        : "hackathon Madrid, hackathon Spain, Hack Spain, hack spain, HackSpain, ML, sponsors",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    startDate: "2026-06-01",
    endDate: "2026-06-02",
    dateModified: CONTENT_DATE_MODIFIED,
    organizer: { "@id": `${SITE}/#organization` },
    location: {
      "@type": "Place",
      name: locale === "es" ? "Madrid, España" : "Madrid, Spain",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Madrid",
        addressCountry: "ES",
      },
    },
    url: SITE,
  };
}

export function jsonLdFaq(locale: Locale) {
  const q1 =
    locale === "es"
      ? "¿Qué es HackSpain o \"Hack Spain\"?"
      : 'What is HackSpain / "Hack Spain"?';
  const a1 =
    locale === "es"
      ? "HackSpain (también buscado como Hack Spain o hack spain) es un hackathon con misión social en Madrid, España, en 2026: 24 horas, cientos de jóvenes programadores, tracks de ML y no técnicos, y patrocinadores como Google. Web oficial: hackspain.com."
      : 'HackSpain (often searched as "Hack Spain" or hack spain) is a mission-driven hackathon in Madrid, Spain, in 2026: 24 hours, hundreds of young coders, ML and non-technical tracks, and sponsors including Google. Official site: hackspain.com.';
  const q2 =
    locale === "es"
      ? "¿Cuándo es HackSpain 2026 y dónde se celebra?"
      : "When is HackSpain 2026 and where is it held?";
  const a2 =
    locale === "es"
      ? "En Madrid, España. La edición de 2026 está prevista en junio; las fechas exactas y el lugar definitivo se publican en hackspain.com. El sitio está en español (/es/...) e inglés (/en/...)."
      : "In Madrid, Spain. The 2026 edition is planned for June; exact dates and final venue details are published on hackspain.com. The site is available in English (/en/...) and Spanish (/es/...).";
  const q3 =
    locale === "es"
      ? "¿Cómo seguir a HackSpain en redes?"
      : "How do I follow HackSpain on social media?";
  const a3 =
    locale === "es"
      ? "En X (Twitter): @hackspain26. Instagram: @hackspain26 (instagram.com/hackspain26). Contacto: leo@hackspain.com."
      : "On X: @hackspain26. Instagram: @hackspain26 (instagram.com/hackspain26). Contact: leo@hackspain.com.";
  const q4 =
    locale === "es"
      ? "¿Qué tracks tiene HackSpain?"
      : "What tracks does HackSpain offer?";
  const a4 =
    locale === "es"
      ? "Un track de ML con retos y recursos de cómputo gratuitos, y un track no técnico para aprender a crear software de calidad. Detalles en hackspain.com/es/tracks."
      : "An ML track with challenges and free compute resources, plus a non-technical track for learning to build quality software. See hackspain.com/en/tracks.";
  const q5 =
    locale === "es"
      ? "¿Cuáles son los patrocinadores de HackSpain / Hack Spain?"
      : "What are the sponsors of HackSpain / Hack Spain?";
  const a5 =
    locale === "es"
      ? "Los patrocinadores actuales son Google, K Fund, fal.ai, Exa y Mozart AI. Se esperan muchos más; la lista completa y actualizada siempre estará en hackspain.com/es/sponsors."
      : "Current sponsors include Google, K Fund, fal.ai, Exa, and Mozart AI. Many more are expected — the full, up-to-date list is always at hackspain.com/en/sponsors.";
  const qJoin =
    locale === "es"
      ? "¿Cómo me apunto o me registro en HackSpain?"
      : "How do I join or register for HackSpain?";
  const aJoin =
    locale === "es"
      ? "Deja tus datos en hackspain.com/es/signup (interés / pre-registro). También puedes seguir @hackspain26 en X e Instagram o escribir a leo@hackspain.com."
      : "Share your details at hackspain.com/signup (interest / pre-registration). You can also follow @hackspain26 on X and Instagram or email leo@hackspain.com.";
  const qPrizes =
    locale === "es"
      ? "¿Qué premios hay en HackSpain?"
      : "What prizes does HackSpain offer?";
  const aPrizes =
    locale === "es"
      ? "Los premios aún no están definidos (por determinar). Se anunciarán en hackspain.com y en @hackspain26 (X e Instagram) conforme se acerque el evento."
      : "Prizes are not yet announced (TBD). They will be published on hackspain.com and via @hackspain26 on X and Instagram as the event approaches.";
  const q6 =
    locale === "es"
      ? "¿Cuántas personas participan?"
      : "How many people participate in HackSpain?";
  const a6 =
    locale === "es"
      ? "La edición comunica más de 300 participantes en 24 horas; la visión a largo plazo menciona una meta de 5.000 en una edición futura. Cifras oficiales en hackspain.com."
      : "The edition is communicated as 300+ participants over 24 hours; long-term vision mentions a goal of 5,000 in a future edition. Official numbers on hackspain.com.";
  const q7 =
    locale === "es"
      ? "¿Dónde está la información para modelos de IA (llms.txt)?"
      : "Where is the machine-readable summary for AI (llms.txt)?";
  const a7 =
    locale === "es"
      ? "En https://hackspain.com/llms.txt hay un resumen en Markdown con hechos, FAQ y URLs canónicas para sistemas de respuesta."
      : "https://hackspain.com/llms.txt provides a Markdown summary with facts, FAQs, and canonical URLs for answer engines.";
  const q8 =
    locale === "es"
      ? "¿Cuál es el sitio web oficial?"
      : "What is the official website for HackSpain?";
  const a8 =
    locale === "es"
      ? "https://hackspain.com — use /en o /es para el idioma."
      : "https://hackspain.com — use /en or /es for language.";
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: q1, acceptedAnswer: { "@type": "Answer", text: a1 } },
      { "@type": "Question", name: q2, acceptedAnswer: { "@type": "Answer", text: a2 } },
      { "@type": "Question", name: qJoin, acceptedAnswer: { "@type": "Answer", text: aJoin } },
      { "@type": "Question", name: q5, acceptedAnswer: { "@type": "Answer", text: a5 } },
      { "@type": "Question", name: qPrizes, acceptedAnswer: { "@type": "Answer", text: aPrizes } },
      { "@type": "Question", name: q4, acceptedAnswer: { "@type": "Answer", text: a4 } },
      { "@type": "Question", name: q6, acceptedAnswer: { "@type": "Answer", text: a6 } },
      { "@type": "Question", name: q3, acceptedAnswer: { "@type": "Answer", text: a3 } },
      { "@type": "Question", name: q7, acceptedAnswer: { "@type": "Answer", text: a7 } },
      { "@type": "Question", name: q8, acceptedAnswer: { "@type": "Answer", text: a8 } },
    ],
  };
}

