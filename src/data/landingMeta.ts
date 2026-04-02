const SITE = "https://hackspain.com";

/** Open Graph / Twitter / JSON-LD primary share image (`public/banner.png`). */
export const SOCIAL_SHARE_IMAGE = {
  path: "/banner.png",
  width: 1873,
  height: 953,
} as const;

const CONTENT_DATE_MODIFIED = "2026-03-21";

export type PageSeo = {
  title: string;
  description: string;
  ogImageAlt: string;
};

const PAGES: PageSeo[] = [
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

export function seoForSectionIndex(i: number): PageSeo {
  return PAGES[Math.max(0, Math.min(PAGES.length - 1, i))] ?? PAGES[0];
}

export const SIGNUP_KEYWORDS =
  "apuntarse HackSpain, registro hackathon España, hackathon Madrid 2026, Hack Spain registro, interés hackathon jóvenes";

export function signupSeo(): PageSeo {
  return {
    title: "Apúntate — HACKSPAIN 2026 | hackathon Madrid",
    description:
      "Registro de interés para HackSpain 2026: hackathon Madrid, hackathon España. Cuéntanos tu perfil y te contactamos.",
    ogImageAlt: "HackSpain 2026 — apúntate al hackathon",
  };
}

export const AMBASSADOR_KEYWORDS =
  "embajador HackSpain, campus hackathon España, universidad hackathon Madrid 2026, embajador estudiantil hackathon";

export function ambassadorSeo(): PageSeo {
  return {
    title: "Embajadores — HACKSPAIN 2026 | hackathon Madrid",
    description:
      "Programa de embajadores HackSpain: lleva el hackathon a tu universidad, perks y solicitud online. Madrid 2026.",
    ogImageAlt: "HackSpain 2026 — programa de embajadores",
  };
}

export const PRIVACY_KEYWORDS =
  "privacidad HackSpain, comunicación datos patrocinadores, RGPD, datos personales, registro hackathon, LOPDGDD";

export function privacySeo(): PageSeo {
  return {
    title: "Política de privacidad — HACKSPAIN 2026",
    description:
      "Política de privacidad de la Asociación HackSpain: responsable del tratamiento, comunicación a patrocinadores, RGPD, LOPDGDD, derechos y tratamiento del registro (incl. análisis automatizado e IA).",
    ogImageAlt: "HackSpain — política de privacidad",
  };
}

const KEYWORDS_BASE =
  "hack spain, Hack Spain, hack spain hackathon, hack spain Madrid, hackathon Madrid, hackathon España, hackathon Spain, hack España, HackSpain, hackathon jóvenes, hackday Madrid, programación Madrid, hackspain.com";

const KEYWORDS_BY_SECTION = [
  "",
  "misión hackathon, coders españoles, hackathon jóvenes España",
  "hackathon único España, comunidad hackathon Madrid",
  "track ML hackathon, hackathon sin código, talleres código España",
  "patrocinadores hackathon, Google hackathon España, K Fund, fal.ai, Exa, Mozart AI",
  "visión hackathon Europa, talento tech España",
];

export function keywordsForSectionIndex(i: number): string {
  const extra = KEYWORDS_BY_SECTION[Math.max(0, Math.min(KEYWORDS_BY_SECTION.length - 1, i))] ?? "";
  return extra ? `${KEYWORDS_BASE}, ${extra}` : KEYWORDS_BASE;
}

export function jsonLdOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "HackSpain",
    alternateName: ["Hack Spain", "hack spain", "Hack Spain hackathon"],
    url: SITE,
    logo: `${SITE}/hs-icon.png`,
    description:
      "Hackathon Madrid y hackathon España — HackSpain. Misión: talento tech joven.",
    sameAs: [
      "https://x.com/hackspain26",
      "https://www.instagram.com/hackspain26/",
      "https://github.com/hackspain",
    ],
    knowsAbout: ["hackathon España", "Madrid tech events", "young coders Europe", "machine learning hackathon"],
    inLanguage: "es",
  };
}

export function jsonLdWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    name: "HackSpain",
    alternateName: ["Hack Spain", "hack spain"],
    url: SITE,
    description:
      "Sitio oficial de HackSpain: hackathon Madrid 2026, misión, tracks, patrocinadores y visión. Contenido en español.",
    inLanguage: "es",
    publisher: { "@id": `${SITE}/#organization` },
  };
}

export function jsonLdWebPage(sectionIndex: number, pageUrl: string) {
  const seo = seoForSectionIndex(sectionIndex);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: seo.title,
    description: seo.description,
    inLanguage: "es",
    isPartOf: { "@id": `${SITE}/#website` },
    about: { "@id": `${SITE}/#event` },
    dateModified: CONTENT_DATE_MODIFIED,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE}${SOCIAL_SHARE_IMAGE.path}`,
      width: SOCIAL_SHARE_IMAGE.width,
      height: SOCIAL_SHARE_IMAGE.height,
    },
  };
}

export function jsonLdEvent() {
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
    description:
      "Hackathon en Madrid, España — HackSpain 2026. 24 horas para jóvenes programadores. Junio 2026.",
    inLanguage: "es",
    keywords: "hackathon Madrid, hackathon España, Hack Spain, hack spain, HackSpain, ML, patrocinadores",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    startDate: "2026-06-01",
    endDate: "2026-06-02",
    dateModified: CONTENT_DATE_MODIFIED,
    organizer: { "@id": `${SITE}/#organization` },
    location: {
      "@type": "Place",
      name: "Madrid, España",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Madrid",
        addressCountry: "ES",
      },
    },
    url: SITE,
  };
}

export function jsonLdFaq() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: '¿Qué es HackSpain o "Hack Spain"?',
        acceptedAnswer: {
          "@type": "Answer",
          text: 'HackSpain (también buscado como Hack Spain o hack spain) es un hackathon con misión social en Madrid, España, en 2026: 24 horas, cientos de jóvenes programadores, tracks de ML y no técnicos, y patrocinadores como Google. Web oficial: hackspain.com.',
        },
      },
      {
        "@type": "Question",
        name: "¿Cuándo es HackSpain 2026 y dónde se celebra?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "En Madrid, España. La edición de 2026 está prevista en junio; las fechas exactas y el lugar definitivo se publican en hackspain.com.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo me apunto o me registro en HackSpain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Deja tus datos en hackspain.com/signup (interés / pre-registro). También puedes seguir @hackspain26 en X e Instagram o escribir a leo@hackspain.com.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo puedo ser embajador o embajadora de HackSpain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lee el programa en hackspain.com/ambassador. Te apuntas con el mismo formulario de interés: marca la opción de embajador/a o entra en hackspain.com/signup?ambassador=1. Pediremos por qué te interesa el rol y dónde estudias.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuáles son los patrocinadores de HackSpain / Hack Spain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Los patrocinadores actuales son Google, K Fund, fal.ai, Exa y Mozart AI. Se esperan muchos más; la lista completa y actualizada siempre estará en hackspain.com/sponsors.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué premios hay en HackSpain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Los premios aún no están definidos (por determinar). Se anunciarán en hackspain.com y en @hackspain26 (X e Instagram) conforme se acerque el evento.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué tracks tiene HackSpain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Un track de ML con retos y recursos de cómputo gratuitos, y un track no técnico para aprender a crear software de calidad. Detalles en hackspain.com/tracks.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuántas personas participan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La edición comunica más de 300 participantes en 24 horas; la visión a largo plazo menciona una meta de 5.000 en una edición futura. Cifras oficiales en hackspain.com.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo seguir a HackSpain en redes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "En X (Twitter): @hackspain26. Instagram: @hackspain26 (instagram.com/hackspain26). Contacto: leo@hackspain.com.",
        },
      },
      {
        "@type": "Question",
        name: "¿Dónde está la información para modelos de IA (llms.txt)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "En https://hackspain.com/llms.txt hay un resumen en Markdown con hechos, FAQ y URLs canónicas para sistemas de respuesta.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuál es el sitio web oficial?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "https://hackspain.com",
        },
      },
    ],
  };
}
