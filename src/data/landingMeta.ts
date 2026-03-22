import type { Locale } from "../i18n/locales";

const SITE = "https://hackspain.com";

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
      "Patrocinadores: Google, K Fund, fal.ai, Exa, Mozart AI — premios para hackers. hackathon Spain sponsors.",
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
    name: "HackSpain",
    alternateName: ["Hack Spain", "hack spain", "Hack Spain hackathon"],
    url: SITE,
    logo: `${SITE}/favicon.svg`,
    description,
    sameAs: ["https://x.com/hackspain26", "https://github.com/hackspain"],
    inLanguage: locale,
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
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    startDate: "2026-06-01",
    endDate: "2026-06-02",
    location: {
      "@type": "Place",
      name: locale === "es" ? "Madrid, España" : "Madrid, Spain",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Madrid",
        addressCountry: "ES",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "HackSpain",
      url: SITE,
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
      ? "¿Dónde y cuándo es Hack Spain?"
      : "Where and when is Hack Spain / HackSpain?";
  const a2 =
    locale === "es"
      ? "Madrid, España. Edición 2026 en junio (fechas en hackspain.com). Las rutas /es y /en ofrecen la misma información en español e inglés."
      : "Madrid, Spain. The 2026 edition is in June (see hackspain.com for dates). /en and /es routes offer the same content in English and Spanish.";
  const q3 =
    locale === "es"
      ? "¿Cómo seguir a HackSpain en redes?"
      : "How do I follow HackSpain on social media?";
  const a3 =
    locale === "es"
      ? "En X (Twitter): @hackspain26. Contacto: leo@hackspain.com."
      : "On X: @hackspain26. Contact: leo@hackspain.com.";
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: q1, acceptedAnswer: { "@type": "Answer", text: a1 } },
      { "@type": "Question", name: q2, acceptedAnswer: { "@type": "Answer", text: a2 } },
      { "@type": "Question", name: q3, acceptedAnswer: { "@type": "Answer", text: a3 } },
    ],
  };
}

