import type { Locale } from "./locales";

export type Copy = {
  skipLink: string;
  regionAria: string;
  scrollHint: string;
  scrollHintNextAria: string;
  sectionNav: string[];
  copyright: string;
  bottomFollow: string;
  bottomSocialXAria: string;
  bottomSocialInstagramAria: string;
  bottomMade: string;
  bottomMadeLeo: string;
  bottomMadeAnd: string;
  bottomMadeSamu: string;
  bottomCode: string;
  bottomEmail: string;
  logoAria: string;
  sponsorAlt: (brand: string, extra?: string) => string;
  s0: {
    participants: string;
    hackathon: string;
    madrid: string;
    hours: string;
    signupCta: string;
    signupCtaAria: string;
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
  signup: {
    title: string;
    subtitle: string;
    backHome: string;
    fullName: string;
    email: string;
    socialsTitle: string;
    socialsRequiredHint: string;
    x: string;
    linkedin: string;
    github: string;
    web: string;
    socialXPlaceholder: string;
    socialLinkedinPlaceholder: string;
    socialGithubPlaceholder: string;
    achievements: string;
    achievementsHint: string;
    freeTime: string;
    freeTimeHint: string;
    submit: string;
    submitting: string;
    applicationReceived: string;
    alreadyApplied: string;
    applyAgain: string;
    errorGeneric: string;
    errorDuplicate: string;
    errorSocialRequired: string;
    errorInvalidSocialUrl: string;
    errorInvalidEmail: string;
    errorAccessDenied: string;
  };
  ambassador: {
    backHome: string;
    heroKicker: string;
    heroTitle: string;
    heroLead: string;
    heroCta: string;
    dutiesTitle: string;
    duties: [string, string, string];
    selectionNoteTitle: string;
    selectionNoteBody: string;
    perksTitle: string;
    perksIntro: string;
    perksItems: [string, string, string, string, string, string];
    perksTravelInfoAria: string;
    perksTravelTooltip: string;
    formTitle: string;
    formSubtitle: string;
    fullName: string;
    email: string;
    institution: string;
    cityRegion: string;
    socialsTitle: string;
    socialsRequiredHint: string;
    x: string;
    linkedin: string;
    github: string;
    web: string;
    socialXPlaceholder: string;
    socialLinkedinPlaceholder: string;
    socialGithubPlaceholder: string;
    motivation: string;
    motivationHint: string;
    outreachPlan: string;
    outreachPlanHint: string;
    submit: string;
    submitting: string;
    applicationReceived: string;
    alreadyApplied: string;
    applyAgain: string;
    errorGeneric: string;
    errorDuplicate: string;
    errorSocialRequired: string;
    errorInvalidSocialUrl: string;
    errorInvalidEmail: string;
    errorAccessDenied: string;
    errorRequiredFields: string;
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
  bottomSocialXAria: "HackSpain on X (@hackspain26)",
  bottomSocialInstagramAria: "HackSpain on Instagram (@hackspain26)",
  bottomMade: "Made with ♥ by",
  bottomMadeLeo: "Leo",
  bottomMadeAnd: " & ",
  bottomMadeSamu: "Samu",
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
    signupCta: "Apply",
    signupCtaAria: "Apply to HackSpain — open application form",
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
  signup: {
    title: "Hackathon signup",
    subtitle: "Tell us who you are — we’ll keep you posted for HackSpain 2026.",
    backHome: "← Home",
    fullName: "Full name",
    email: "Email",
    socialsTitle: "Socials & links",
    socialsRequiredHint: "Add at least one link (X, LinkedIn, GitHub, or your website).",
    x: "X (Twitter)",
    linkedin: "LinkedIn",
    github: "GitHub",
    web: "Website",
    socialXPlaceholder: "you, @you, or paste a link",
    socialLinkedinPlaceholder: "in/you, company/page, or paste a link",
    socialGithubPlaceholder: "you or you/repo — or paste a link",
    achievements: "Achievements & highlights",
    achievementsHint:
      "Anything you’re proud of — hackathons, studies, sports, volunteering, art, work… tech or not.",
    freeTime: "Outside of school / work",
    freeTimeHint:
      "Hobbies, clubs, associations, side projects, what you do to unwind — whatever fits.",
    submit: "Send",
    submitting: "Sending…",
    applicationReceived:
      "Thanks — we’ve got your application. Sit tight and keep an eye on your inbox; we’ll get back to you as soon as we can.",
    alreadyApplied:
      "You already sent an application from this browser. We’ll still reply by email — use “Apply again” only if you need to submit another one.",
    applyAgain: "Apply again",
    errorGeneric: "Something went wrong. Try again in a moment.",
    errorDuplicate: "This email is already registered.",
    errorSocialRequired: "Please add at least one profile or website link.",
    errorInvalidSocialUrl:
      "One or more links are not valid for that field (check X, LinkedIn, GitHub, or your website).",
    errorInvalidEmail: "Please enter a valid email address.",
    errorAccessDenied:
      "We couldn’t verify this request. Refresh the page and try again, or use a normal browser with JavaScript enabled.",
  },
  ambassador: {
    backHome: "← Home",
    heroKicker: "Ambassador program",
    heroTitle: "Be the face of HackSpain at your campus.",
    heroLead:
      "Rally builders, spread the word, and nudge people toward signup — we’ll keep you on top of dates and official links, help if you’re unsure about facts, and you’ve got a direct line to the team for Madrid 2026.",
    heroCta: "Apply below",
    dutiesTitle: "What ambassadors do",
    duties: [
      "Post about HackSpain on the apps you already use. We’ll give you the dates, official links, and anything you need so facts stay right—but you write and shoot it yourself, in your own voice.",
      "Mention it in real conversations: the class group chat, the society you’re in, friends who code or might want to try. If they’re interested, point them to hackspain.com or the signup form.",
      "When we publish something important—applications opening, deadlines, big news—reshare it or drop it in your stories so it doesn’t get buried.",
    ],
    selectionNoteTitle: "Reach matters in selection",
    selectionNoteBody:
      "We give extra weight to applicants who already move numbers on a platform — a solid following, steady posts, or a profile people actually watch. Mention which network and rough reach in your application so we can see the fit.",
    perksTitle: "What every ambassador gets",
    perksIntro: "Same package for everyone in the program — no tiers, no favourites.",
    perksItems: [
      "Guaranteed spot at the hackathon",
      "Exclusive merch",
      "X (Twitter) profile badge",
      "Letter of recommendation from the HackSpain team",
      "Physical certificate",
      "Travel reimbursement",
    ],
    perksTravelInfoAria: "More about travel reimbursement",
    perksTravelTooltip:
      "We’ll cover travel up to a fixed cap per ambassador — the exact amount and how to claim it are spelled out when you’re onboarded, so expectations stay clear and fair for everyone.",
    formTitle: "Ambassador application",
    formSubtitle: "Tell us who you are, where you study, and how you’d represent HackSpain 2026.",
    fullName: "Full name",
    email: "Email",
    institution: "University, bootcamp, or organisation",
    cityRegion: "City / region",
    socialsTitle: "Socials & links",
    socialsRequiredHint: "Add at least one link (X, LinkedIn, GitHub, or your website).",
    x: "X (Twitter)",
    linkedin: "LinkedIn",
    github: "GitHub",
    web: "Website",
    socialXPlaceholder: "you, @you, or paste a link",
    socialLinkedinPlaceholder: "in/you, company/page, or paste a link",
    socialGithubPlaceholder: "you or you/repo — or paste a link",
    motivation: "Why do you want to be an ambassador?",
    motivationHint: "A few sentences on what drives you — community, tech, your campus, reaching new people…",
    outreachPlan: "How would you promote HackSpain?",
    outreachPlanHint:
      "Which platforms you’d use, which chats or circles you’d tap for word of mouth, and how you’d keep HackSpain in the conversation.",
    submit: "Send application",
    submitting: "Sending…",
    applicationReceived:
      "Thanks — we’ve received your ambassador application. We’ll email you soon with next steps.",
    alreadyApplied:
      "You already sent an ambassador application from this browser. Use “Apply again” only if you need to submit another one.",
    applyAgain: "Apply again",
    errorGeneric: "Something went wrong. Try again in a moment.",
    errorDuplicate: "This email already has an ambassador application.",
    errorSocialRequired: "Please add at least one profile or website link.",
    errorInvalidSocialUrl:
      "One or more links are not valid for that field (check X, LinkedIn, GitHub, or your website).",
    errorInvalidEmail: "Please enter a valid email address.",
    errorAccessDenied:
      "We couldn’t verify this request. Refresh the page and try again, or use a normal browser with JavaScript enabled.",
    errorRequiredFields: "Please fill in all required fields.",
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
  bottomSocialXAria: "HackSpain en X (@hackspain26)",
  bottomSocialInstagramAria: "HackSpain en Instagram (@hackspain26)",
  bottomMade: "Hecho con ♥ por",
  bottomMadeLeo: "Leo",
  bottomMadeAnd: " y ",
  bottomMadeSamu: "Samu",
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
    signupCta: "Apúntate",
    signupCtaAria: "Solicitar plaza en HackSpain — abrir formulario",
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
  signup: {
    title: "Apúntate al hackathon",
    subtitle: "Cuéntanos quién eres — te avisamos sobre HackSpain 2026.",
    backHome: "← Inicio",
    fullName: "Nombre completo",
    email: "Email",
    socialsTitle: "Redes y enlaces",
    socialsRequiredHint:
      "Añade al menos un enlace (X, LinkedIn, GitHub o tu web).",
    x: "X (Twitter)",
    linkedin: "LinkedIn",
    github: "GitHub",
    web: "Web",
    socialXPlaceholder: "usuario, @usuario o pega un enlace",
    socialLinkedinPlaceholder: "in/usuario, company/página o pega un enlace",
    socialGithubPlaceholder: "usuario o usuario/repo — o pega un enlace",
    achievements: "Logros y hitos",
    achievementsHint:
      "Lo que te enorgullece — hackathones, estudios, deporte, voluntariado, arte, trabajo… técnico o no.",
    freeTime: "Fuera del cole / curro",
    freeTimeHint:
      "Hobbies, clubes, asociaciones, side projects, cómo desconectas — lo que te represente.",
    submit: "Enviar",
    submitting: "Enviando…",
    applicationReceived:
      "¡Gracias! Hemos recibido tu solicitud. Espera nuestra respuesta por correo; te escribiremos en cuanto podamos.",
    alreadyApplied:
      "Ya enviaste una solicitud desde este navegador. Te contestaremos por correo; usa «Volver a solicitar» solo si necesitas mandar otra.",
    applyAgain: "Volver a solicitar",
    errorGeneric: "Algo ha fallado. Prueba otra vez en un momento.",
    errorDuplicate: "Este email ya está registrado.",
    errorSocialRequired: "Añade al menos un enlace a perfil o web.",
    errorInvalidSocialUrl:
      "Uno o más enlaces no son válidos para ese campo (revisa X, LinkedIn, GitHub o tu web).",
    errorInvalidEmail: "Introduce un correo electrónico válido.",
    errorAccessDenied:
      "No hemos podido verificar la solicitud. Recarga la página e inténtalo de nuevo, o usa un navegador normal con JavaScript activado.",
  },
  ambassador: {
    backHome: "← Inicio",
    heroKicker: "Programa de embajadores",
    heroTitle: "Sé la cara de HackSpain en tu campus.",
    heroLead:
      "Junta builders, mueve el boca a boca y empuja hacia el registro — te mantenemos al día con fechas y enlaces oficiales, te aclaramos dudas si las tienes, y tienes contacto directo con el equipo para Madrid 2026.",
    heroCta: "Solicitar abajo",
    dutiesTitle: "Qué hacen l@s embajadores",
    duties: [
      "Hablar de HackSpain en las redes que ya usas. Te damos fechas, enlaces oficiales y lo imprescindible para no equivocarte, pero el post lo escribes y grabas tú, con tu rollo.",
      "Comentarlo en la vida real: el grupo de la asignatura, el Discord del grado, la asociación, amig@s a los que les encaje. Si quieren saber más, que miren hackspain.com o el formulario de registro.",
      "Cuando publiquemos algo gordo—abren plazas, fechas límite, noticias—compártelo o súbelo a historias para que no pase desapercibido.",
    ],
    selectionNoteTitle: "El alcance cuenta en la selección",
    selectionNoteBody:
      "Damos más peso a quien ya mueve cifras en alguna red — audiencia sólida, publicación constante o un perfil que la gente sigue. Indica qué red y un alcance aproximado en la solicitud para que veamos el encaje.",
    perksTitle: "Lo que recibe cada embajador/a",
    perksIntro: "El mismo paquete para tod@s l@s del programa — sin niveles ni excepciones.",
    perksItems: [
      "Participación asegurada en el hackathon",
      "Merch exclusivo",
      "Badge en X (Twitter)",
      "Carta de recomendación del equipo HackSpain",
      "Certificado físico",
      "Reembolso de viaje",
    ],
    perksTravelInfoAria: "Más información sobre el reembolso de viaje",
    perksTravelTooltip:
      "Cubrimos el viaje hasta un tope fijo por embajador/a — la cifra exacta y cómo solicitarlo te lo explicamos al incorporarte, para que las expectativas sean claras y justas para tod@s.",
    formTitle: "Solicitud de embajador/a",
    formSubtitle: "Cuéntanos quién eres, dónde estudias y cómo representarías HackSpain 2026.",
    fullName: "Nombre completo",
    email: "Email",
    institution: "Universidad, bootcamp u organización",
    cityRegion: "Ciudad / región",
    socialsTitle: "Redes y enlaces",
    socialsRequiredHint:
      "Añade al menos un enlace (X, LinkedIn, GitHub o tu web).",
    x: "X (Twitter)",
    linkedin: "LinkedIn",
    github: "GitHub",
    web: "Web",
    socialXPlaceholder: "usuario, @usuario o pega un enlace",
    socialLinkedinPlaceholder: "in/usuario, company/página o pega un enlace",
    socialGithubPlaceholder: "usuario o usuario/repo — o pega un enlace",
    motivation: "¿Por qué quieres ser embajador/a?",
    motivationHint: "Unas frases sobre qué te mueve — comunidad, tech, tu campus, llegar a gente nueva…",
    outreachPlan: "¿Cómo promocionarías HackSpain?",
    outreachPlanHint:
      "Qué redes usarías, por qué chats o círculos moverías el boca a boca y cómo mantendrías HackSpain en la conversación.",
    submit: "Enviar solicitud",
    submitting: "Enviando…",
    applicationReceived:
      "¡Gracias! Hemos recibido tu solicitud de embajador/a. Te escribiremos pronto con los siguientes pasos.",
    alreadyApplied:
      "Ya enviaste una solicitud de embajador/a desde este navegador. Usa «Volver a solicitar» solo si necesitas mandar otra.",
    applyAgain: "Volver a solicitar",
    errorGeneric: "Algo ha fallado. Prueba otra vez en un momento.",
    errorDuplicate: "Este email ya tiene una solicitud de embajador/a.",
    errorSocialRequired: "Añade al menos un enlace a perfil o web.",
    errorInvalidSocialUrl:
      "Uno o más enlaces no son válidos para ese campo (revisa X, LinkedIn, GitHub o tu web).",
    errorInvalidEmail: "Introduce un correo electrónico válido.",
    errorAccessDenied:
      "No hemos podido verificar la solicitud. Recarga la página e inténtalo de nuevo, o usa un navegador normal con JavaScript activado.",
    errorRequiredFields: "Rellena todos los campos obligatorios.",
  },
};

const M: Record<Locale, Copy> = { en, es };

export function getCopy(locale: Locale): Copy {
  return M[locale] ?? M.en;
}
