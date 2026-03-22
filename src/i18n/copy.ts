import type { Locale } from "./locales";

export type Copy = {
  skipLink: string;
  regionAria: string;
  scrollHint: string;
  scrollHintNextAria: string;
  sectionNav: string[];
  copyright: string;
  bottomFollow: string;
  bottomMade: string;
  bottomMadeLeo: string;
  bottomCode: string;
  bottomEmail: string;
  logoAria: string;
  sponsorAlt: (brand: string, extra?: string) => string;
  s0: {
    participants: string;
    hackathon: string;
    madrid: string;
    hours: string;
  };
  s1: {
    label: string;
    l1: string;
    l2: string;
    l3: string;
    l4: string;
    drivenLbl: string;
    drivenBody: string;
    tealBody: string;
  };
  s2: {
    label: string;
    title: string;
    unique1: string;
    mediaLbl: string;
    mediaBody: string;
    ambLbl: string;
    ambBody: string;
    contentLbl: string;
    contentBody: string;
    orangeBody: string;
  };
  s3: {
    label: string;
    title: string;
    mlLbl: string;
    mlBody: string;
    ntLbl: string;
    ntBody: string;
    freeCompute: string;
    orangeBody: string;
    forEveryone: string;
  };
  s4: {
    label: string;
    title: string;
    moreWay: string;
    prizesLbl: string;
    prizesBody: string;
  };
  s5: {
    label: string;
    title1: string;
    title2: string;
    goalNum: string;
    goalLbl: string;
    inkBody: string;
    largest: string;
    goldBody: string;
  };
};

const en: Copy = {
  skipLink: "Skip to main content",
  regionAria: "HackSpain 2026 — move between sections with wheel, touch swipe, or arrow keys",
  scrollHint: "Scroll",
  scrollHintNextAria: "Go to next section",
  sectionNav: [
    "Home",
    "Mission",
    "What makes us unique",
    "Original tracks",
    "Sponsors",
    "Long-term vision",
  ],
  copyright: "© 2026 HackSpain",
  bottomFollow: "@hackspain26",
  bottomMade: "Made with ♥ by",
  bottomMadeLeo: "Leo",
  bottomCode: "Check this code →",
  bottomEmail: "leo@hackspain.com",
  logoAria: "HackSpain, also known as Hack Spain — hackathon Madrid, Spain and Europe, 2026",
  sponsorAlt: (brand, extra) =>
    `${brand} — HackSpain sponsor, hackathon Madrid and Spain 2026${extra ? `. ${extra}` : ""}`,
  s0: {
    participants: "PARTICIPANTS",
    hackathon: "HACKATHON",
    madrid: "MADRID · JUNE",
    hours: "HOURS",
  },
  s1: {
    label: "MISSION",
    l1: "BRING TOGETHER",
    l2: "YOUNG, ",
    l3: "TALENTED",
    l4: "SPANISH CODERS",
    drivenLbl: "MISSION-DRIVEN",
    drivenBody: "Positioning Spain as a European leader in young tech talent.",
    tealBody: "24 intense hours of building with Spain's brightest young coders.",
  },
  s2: {
    label: "HACKSPAIN 2026",
    title: "WHAT MAKES\nUS UNIQUE?",
    unique1: "We are fully mission-driven.",
    mediaLbl: "MEDIA FOCUS",
    mediaBody: "We plan to expand our social media presence.",
    ambLbl: "AMBASSADORS",
    ambBody: "From universities and education centres",
    contentLbl: "HIGH-QUALITY CONTENT",
    contentBody: "Focused on telling the stories of the hackers",
    orangeBody: "Original tracks designed for different skill levels.",
  },
  s3: {
    label: "HACKSPAIN 2026",
    title: "ORIGINAL\nTRACKS",
    mlLbl: "ML TRACK",
    mlBody: "ML challenges using free computing resources",
    ntLbl: "NON-TECH TRACK",
    ntBody: "We'll teach non-technical people how to code high-quality software.",
    freeCompute: "FREE COMPUTE",
    orangeBody: "Designed for all skill levels — from beginners to experts.",
    forEveryone: "FOR EVERYONE",
  },
  s4: {
    label: "HACKSPAIN 2026",
    title: "BACKED BY\nTHE BEST",
    moreWay: "and more\non the way...",
    prizesLbl: "PRIZES",
    prizesBody: "Great rewards for the hackers",
  },
  s5: {
    label: "LONG-TERM VISION",
    title1: "FROM MADRID",
    title2: "TO THE WORLD",
    goalNum: "5,000",
    goalLbl: "GOAL NEXT YEAR",
    inkBody:
      "HackSpain isn't a one-off. It's the cornerstone of a movement positioning Spain as a European tech leader.",
    largest: "LARGEST HACKATHON IN EUROPE",
    goldBody: "The largest hackathon movement in Southern Europe.",
  },
};

const es: Copy = {
  skipLink: "Ir al contenido principal",
  regionAria: "HackSpain 2026 — cambia de sección con la rueda del ratón, deslizamiento o flechas",
  scrollHint: "Scroll",
  scrollHintNextAria: "Ir a la siguiente sección",
  sectionNav: [
    "Inicio",
    "Misión",
    "Qué nos hace únicos",
    "Tracks originales",
    "Patrocinadores",
    "Visión",
  ],
  copyright: "© 2026 HackSpain",
  bottomFollow: "@hackspain26",
  bottomMade: "Hecho con ♥ por",
  bottomMadeLeo: "Leo",
  bottomCode: "Ver el código →",
  bottomEmail: "leo@hackspain.com",
  logoAria: "HackSpain o Hack Spain — hackathon Madrid, hackathon España y Spain 2026",
  sponsorAlt: (brand, extra) =>
    `${brand} — patrocinador HackSpain, hackathon Madrid y hackathon España 2026${extra ? `. ${extra}` : ""}`,
  s0: {
    participants: "PARTICIPANTES",
    hackathon: "HACKATHON",
    madrid: "MADRID · JUNIO",
    hours: "HORAS",
  },
  s1: {
    label: "MISIÓN",
    l1: "UNIR A",
    l2: "JÓVENES ",
    l3: "TALENTOSOS",
    l4: "CODERS ESPAÑOLES",
    drivenLbl: "MISIÓN",
    drivenBody: "Posicionar a España como líder europeo en talento tech joven.",
    tealBody: "24 horas intensas construyendo con l@s mejores jóvenes programadores de España.",
  },
  s2: {
    label: "HACKSPAIN 2026",
    title: "¿QUÉ NOS HACE\nÚNICOS?",
    unique1: "Estamos totalmente impulsados por la misión.",
    mediaLbl: "FOCO EN MEDIOS",
    mediaBody: "Ampliar nuestra presencia en redes y medios.",
    ambLbl: "EMBAJADORES",
    ambBody: "Universidades y centros educativos",
    contentLbl: "CONTENIDO DE CALIDAD",
    contentBody: "Historias reales de l@s hackers",
    orangeBody: "Tracks originales para distintos niveles.",
  },
  s3: {
    label: "HACKSPAIN 2026",
    title: "TRACKS\nORIGINALES",
    mlLbl: "TRACK ML",
    mlBody: "Retos de ML con recursos de cómputo gratuitos",
    ntLbl: "TRACK NO TÉCNICO",
    ntBody: "Enseñamos a perfiles no técnicos a crear software de calidad.",
    freeCompute: "COMPUTE GRATIS",
    orangeBody: "Pensado para todos los niveles — de principiantes a expertos.",
    forEveryone: "PARA\nTODOS",
  },
  s4: {
    label: "HACKSPAIN 2026",
    title: "APOYADOS POR\nLOS MEJORES",
    moreWay: "y más\nen camino...",
    prizesLbl: "PREMIOS",
    prizesBody: "Grandes recompensas para l@s hackers",
  },
  s5: {
    label: "VISIÓN A LARGO PLAZO",
    title1: "DE MADRID",
    title2: "AL MUNDO",
    goalNum: "5.000",
    goalLbl: "META EL PRÓXIMO AÑO",
    inkBody:
      "HackSpain no es un evento puntual. Es la base de un movimiento que posiciona a España como líder tech en Europa.",
    largest: "EL MAYOR HACKATHON DE EUROPA",
    goldBody: "El mayor movimiento de hackathones del sur de Europa.",
  },
};

const M: Record<Locale, Copy> = { en, es };

export function getCopy(locale: Locale): Copy {
  return M[locale] ?? M.en;
}
