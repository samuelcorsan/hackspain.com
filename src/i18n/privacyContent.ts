export type PrivacySection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type PrivacyDocument = {
  pageTitle: string;
  updatedLine: string;
  disclaimer: string;
  goodFaithTitle: string;
  goodFaithBody: string;
  sections: PrivacySection[];
};

export const privacyContentEn: PrivacyDocument = {
  pageTitle: "Privacy policy",
  updatedLine: "Last updated: 28 March 2026",
  disclaimer:
    "This information is provided for transparency. It does not replace legal advice. **Asociación HackSpain** may update this document; the date above will change when we do.",
  goodFaithTitle: "Good faith",
  goodFaithBody:
    "**Asociación HackSpain** commits to acting at all times in **good faith** toward participants, sponsors, and partners when we process personal data and organise HackSpain. Everything in this privacy policy is written and must be read and applied in **good faith** — with honest intent, fairness, and proportionality, together with strict compliance with the law.",
  sections: [
    {
      id: "controller",
      title: "1. Data controller",
      paragraphs: [
        "The data controller is **Asociación HackSpain** (“we”, “us”, “HackSpain”), a non-profit association registered in Spain, acting in connection with the HackSpain 2026 initiative and related activities.",
        "For data-protection queries and to exercise your rights: leo@hackspain.com.",
        "We process personal data in accordance with Regulation (EU) 2016/679 (General Data Protection Regulation, **GDPR**) and, where applicable, Organic Law 3/2018 on Personal Data Protection and guarantee of digital rights (Spain, **LOPDGDD**).",
      ],
    },
    {
      id: "data-we-collect",
      title: "2. Categories of data",
      paragraphs: [
        "Through the signup / interest form we may collect: identification and contact data (e.g. name, email), professional or academic context you choose to share, links to public profiles or websites, free-text answers (e.g. achievements, interests, ambassador motivation and place of study where relevant), and technical data typical of web requests (e.g. IP address, user agent) processed by our hosting and security providers.",
        "We do not ask for special categories of data (e.g. health, political opinions). Please do not include them in free-text fields.",
      ],
    },
    {
      id: "purposes",
      title: "3. Purposes",
      paragraphs: [
        "We use your data to: manage expressions of interest and applications; communicate with you about HackSpain; organise and improve the event; comply with legal obligations; ensure security and prevent abuse; produce aggregate statistics that do not identify you; and communicate personal data to official sponsors and partners of HackSpain as described in section 4.",
      ],
    },
    {
      id: "sponsors",
      title: "4. Sponsors and partners (recipients of your data)",
      paragraphs: [
        "We may communicate personal data to official sponsors and partners of HackSpain 2026. The current list of sponsors and partners may be published on https://hackspain.com and updated from time to time.",
        "Sharing is limited to what is necessary for event-related purposes, such as: delivering prizes, challenges or technical content offered by a sponsor; coordinating logistics or promotion agreed with sponsors; providing sponsors with aggregated or individual participant information where relevant to talent, recruitment or outreach activities linked to the hackathon; fulfilling sponsorship agreements; and similar purposes directly connected to HackSpain.",
        "Sponsors and partners that receive your data may act as **independent data controllers** for their own processing. Their use of the data will be governed by their own privacy notices and legal bases. We select sponsors and require contractual or practical commitments, where appropriate, to respect confidentiality and data-protection standards, but we are not responsible for their independent processing beyond applicable law.",
        "The legal basis for us to communicate your data to sponsors and partners includes: your **consent**, given when you submit the form after reading this policy; and, where applicable, our **legitimate interests** in operating a sponsored hackathon and meeting commitments to partners, provided your interests and fundamental rights do not override those interests. Where processing by a sponsor relies on legitimate interest, you may have a **right to object** to that processing under the sponsor’s policy and applicable law.",
        "If a sponsor or partner is established outside the European Economic Area, transfers are subject to Chapter V GDPR (e.g. adequacy decisions, standard contractual clauses, or other appropriate safeguards). The sponsor’s documentation should describe any such transfers.",
      ],
    },
    {
      id: "legal-basis",
      title: "5. Legal basis (GDPR)",
      paragraphs: [
        "Processing by **Asociación HackSpain** is based on: your **consent** when you submit the form and accept this policy (including communication to sponsors as described in section 4, where consent applies); our **legitimate interests** in organising HackSpain, assessing suitability for participation or ambassador roles, securing our services, and operating the event with sponsors, where those interests are not overridden by your rights; and **legal obligations** where applicable.",
        "You may withdraw consent at any time; withdrawal does not affect the lawfulness of processing before withdrawal. For rights relating to a sponsor’s independent processing, you may also contact that sponsor or ask us to clarify the recipient.",
      ],
    },
    {
      id: "storage-retention",
      title: "6. Storage and retention",
      paragraphs: [
        "Data is stored on infrastructure appropriate for our operations. Where servers are located in the European Economic Area (EEA) or in countries with an adequacy decision, transfers are covered accordingly. Further international transfers are addressed below.",
        "We keep data only as long as needed for the purposes above, including legal claims and legitimate organisational needs, and then delete or anonymise it unless a longer period is required by law.",
      ],
    },
    {
      id: "processors-ai",
      title: "7. Processors, algorithms and third-party tools (including AI)",
      paragraphs: [
        "We may use service providers (processors) for hosting, databases, email, analytics, security, and similar functions. They process data only on our instructions and under a contract that meets GDPR requirements.",
        "We may use automated means—including algorithms and third-party artificial intelligence or machine-learning services—to assist in reviewing, classifying, summarising or scoring application content (for example to prioritise outreach, assess fit for ambassador programmes, or detect spam). Such processing may involve transferring the minimum necessary content to providers established outside the EEA. Where required, we rely on appropriate safeguards under GDPR (such as the European Commission’s standard contractual clauses) in addition to technical and organisational measures.",
        "Decisions that significantly affect you are not taken solely by automated means without human review where GDPR requires it; you may request human intervention as explained in the rights section.",
      ],
    },
    {
      id: "rights",
      title: "8. Your rights",
      paragraphs: [
        "Under the GDPR and LOPDGDD you may, subject to conditions: access your data; rectify inaccurate data; erase data (“right to be forgotten”) where applicable; restrict processing; object to processing based on legitimate interests (including certain sponsor-related flows where that basis applies); receive your data in a structured format (portability) where processing is based on consent or contract and automated; and withdraw consent.",
        "To exercise rights against **Asociación HackSpain**, contact leo@hackspain.com. If your request concerns processing by a sponsor or partner as an **independent controller**, you should also contact them directly using the information in their privacy notice; we will assist where we are required to under **GDPR** (e.g. informing you of recipients).",
        "You may lodge a complaint with a supervisory authority; in Spain, the Spanish Data Protection Agency (AEPD — https://www.aepd.es).",
      ],
    },
    {
      id: "security",
      title: "9. Security",
      paragraphs: [
        "We implement appropriate technical and organisational measures to protect personal data against unauthorised access, loss or alteration. No method of transmission over the Internet is completely secure.",
      ],
    },
    {
      id: "changes",
      title: "10. Changes",
      paragraphs: [
        "We may update this document to reflect changes in processing or in law (including changes to sponsors or sharing practices). We will adjust the “last updated” date and, where appropriate, notify you or ask for renewed consent.",
      ],
    },
  ],
};

export const privacyContentEs: PrivacyDocument = {
  pageTitle: "Política de privacidad",
  updatedLine: "Última actualización: 28 de marzo de 2026",
  disclaimer:
    "Esta información se ofrece con fines de transparencia y no sustituye asesoramiento jurídico. La **Asociación HackSpain** puede actualizar este documento; la fecha indicada arriba cambiará cuando lo hagamos.",
  goodFaithTitle: "Buena fe",
  goodFaithBody:
    "La **Asociación HackSpain** se compromete a actuar en todo momento de **buena fe** hacia participantes, patrocinadores y colaboradores cuando tratamos datos personales y organizamos HackSpain. Todo lo recogido en esta política de privacidad está redactado y debe interpretarse y aplicarse de **buena fe**, con intención honesta, equidad y proporcionalidad, junto con el cumplimiento estricto de la ley.",
  sections: [
    {
      id: "controller",
      title: "1. Responsable del tratamiento",
      paragraphs: [
        "El responsable del tratamiento es la **Asociación HackSpain** («nosotros», «HackSpain»), asociación sin ánimo de lucro inscrita en España, en el marco de la iniciativa HackSpain 2026 y actividades relacionadas.",
        "Para consultas sobre protección de datos y ejercicio de derechos: leo@hackspain.com.",
        "Tratamos los datos personales de conformidad con el Reglamento (UE) 2016/679 (**RGPD**) y, en su caso, con la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (**LOPDGDD**).",
      ],
    },
    {
      id: "data-we-collect",
      title: "2. Categorías de datos",
      paragraphs: [
        "A través del formulario de registro / interés podemos recopilar: datos identificativos y de contacto (p. ej. nombre, email), contexto profesional o académico que decidas aportar, enlaces a perfiles o webs públicos, respuestas en texto libre (p. ej. logros, intereses, motivación como embajador/a y lugar de estudios si aplica), y datos técnicos habituales en peticiones web (p. ej. dirección IP, user agent) tratados por nuestro alojamiento y proveedores de seguridad.",
        "No solicitamos datos de categorías especiales (p. ej. salud, opiniones políticas). Por favor, no los incluyas en campos de texto libre.",
      ],
    },
    {
      id: "purposes",
      title: "3. Finalidades",
      paragraphs: [
        "Utilizamos tus datos para: gestionar manifestaciones de interés y solicitudes; comunicarnos contigo sobre HackSpain; organizar y mejorar el evento; cumplir obligaciones legales; garantizar la seguridad y prevenir abusos; elaborar estadísticas agregadas que no te identifiquen; y comunicar datos personales a patrocinadores y colaboradores oficiales de HackSpain según el apartado 4.",
      ],
    },
    {
      id: "sponsors",
      title: "4. Patrocinadores y colaboradores (destinatarios de tus datos)",
      paragraphs: [
        "Podemos comunicar datos personales a patrocinadores y colaboradores oficiales de HackSpain 2026. El listado actual puede publicarse en https://hackspain.com y actualizarse con el tiempo.",
        "La comunicación se limita a lo necesario para finalidades vinculadas al evento, como: entrega de premios, retos o contenido técnico ofrecido por un patrocinador; coordinación logística o promocional acordada con patrocinadores; facilitar a patrocinadores información agregada o, cuando proceda, información de participantes relacionada con talento, selección o contacto vinculado al hackathon; cumplimiento de acuerdos de patrocinio; y finalidades análogas directamente relacionadas con HackSpain.",
        "Los patrocinadores y colaboradores que reciban tus datos pueden actuar como **responsables del tratamiento independientes** para sus propias finalidades. El uso que hagan de los datos se regirá por sus propias políticas de privacidad y bases jurídicas. Seleccionamos patrocinadores y, cuando corresponde, exigimos compromisos contractuales o prácticos de confidencialidad y protección de datos, pero no somos responsables de su tratamiento independiente más allá de lo exigido por la normativa aplicable.",
        "La base jurídica para comunicar tus datos a patrocinadores y colaboradores incluye: tu **consentimiento**, prestado al enviar el formulario tras leer esta política; y, cuando proceda, nuestro **interés legítimo** en organizar un hackathon con patrocinio y cumplir compromisos con partners, siempre que no prevalezcan tus intereses y derechos fundamentales. Si el patrocinador se basa en interés legítimo, puedes tener **derecho de oposición** según su política y la ley aplicable.",
        "Si un patrocinador o colaborador está establecido fuera del Espacio Económico Europeo, las transferencias quedan sujetas al capítulo V del RGPD (p. ej. decisiones de adecuación, cláusulas contractuales tipo u otras garantías apropiadas). La documentación del patrocinador debe describir dichas transferencias cuando existan.",
      ],
    },
    {
      id: "legal-basis",
      title: "5. Base jurídica (RGPD)",
      paragraphs: [
        "El tratamiento por la **Asociación HackSpain** se basa en: tu **consentimiento** al enviar el formulario y aceptar esta política (incluida la comunicación a patrocinadores según el apartado 4, cuando aplique el consentimiento); nuestros **intereses legítimos** en organizar HackSpain, valorar la participación o el programa de embajadores/as, asegurar nuestros servicios y desarrollar el evento con patrocinadores, cuando dichos intereses no prevalezcan sobre tus derechos; y **obligaciones legales** cuando corresponda.",
        "Puedes retirar el consentimiento en cualquier momento; la retirada no afecta a la licitud del tratamiento previo. Para derechos frente al tratamiento independiente de un patrocinador, también puedes dirigirte a dicho patrocinador o solicitarnos aclaración sobre el destinatario.",
      ],
    },
    {
      id: "storage-retention",
      title: "6. Conservación y almacenamiento",
      paragraphs: [
        "Los datos se almacenan en infraestructura acorde con nuestra actividad. Cuando los servidores estén en el Espacio Económico Europeo (EEE) o en países con decisión de adecuación, las transferencias quedan cubiertas en esos términos. Las transferencias internacionales adicionales se detallan en el apartado siguiente.",
        "Conservamos los datos solo el tiempo necesario para las finalidades indicadas, incluidas reclamaciones legales y necesidades organizativas legítimas, y después los suprimimos o anonimizamos salvo que la ley exija un plazo mayor.",
      ],
    },
    {
      id: "processors-ai",
      title: "7. Encargados, algoritmos y herramientas de terceros (incluida IA)",
      paragraphs: [
        "Podemos utilizar proveedores (encargados del tratamiento) para alojamiento, bases de datos, correo, analítica, seguridad y funciones similares. Tratan los datos solo siguiendo nuestras instrucciones y con un contrato acorde al RGPD.",
        "Podemos utilizar medios automatizados —incluidos algoritmos y servicios de inteligencia artificial o aprendizaje automático de terceros— para ayudar a revisar, clasificar, resumir o puntuar el contenido de las solicitudes (por ejemplo para priorizar contactos, valorar el encaje en el programa de embajadores/as o detectar spam). Este tratamiento puede implicar la transferencia del contenido estrictamente necesario a proveedores establecidos fuera del EEE. Cuando proceda, nos basamos en garantías apropiadas del RGPD (como las cláusulas contractuales tipo de la Comisión Europea), además de medidas técnicas y organizativas.",
        "No se adoptan decisiones que te afecten significativamente únicamente de forma automatizada sin revisión humana cuando el RGPD lo exija; puedes solicitar intervención humana según el apartado de derechos.",
      ],
    },
    {
      id: "rights",
      title: "8. Tus derechos",
      paragraphs: [
        "En virtud del RGPD y la LOPDGDD puedes, con los límites legales: acceder a tus datos; rectificar los inexactos; suprimirlos («derecho al olvido») cuando proceda; limitar el tratamiento; oponerte al basado en interés legítimo (incluidos ciertos supuestos de comunicación a patrocinadores cuando esa sea la base); recibir tus datos en formato estructurado (portabilidad) cuando el tratamiento se base en consentimiento o contrato y sea automatizado; y retirar el consentimiento.",
        "Para ejercer derechos frente a la **Asociación HackSpain**, escribe a leo@hackspain.com. Si tu solicitud se refiere al tratamiento por un patrocinador o colaborador como **responsable independiente**, también debes dirigirte a ellos mediante la información de su política de privacidad; te asistiremos cuando el **RGPD** nos obligue (p. ej. información sobre destinatarios).",
        "Puedes presentar reclamación ante una autoridad de control; en España, la Agencia Española de Protección de Datos (AEPD — https://www.aepd.es).",
      ],
    },
    {
      id: "security",
      title: "9. Seguridad",
      paragraphs: [
        "Aplicamos medidas técnicas y organizativas apropiadas para proteger los datos personales frente a accesos no autorizados, pérdida o alteración. Ningún sistema en Internet es completamente seguro.",
      ],
    },
    {
      id: "changes",
      title: "10. Cambios",
      paragraphs: [
        "Podemos actualizar este documento para reflejar cambios en el tratamiento o en la normativa (incluidos cambios en patrocinadores o en las prácticas de comunicación de datos). Actualizaremos la fecha de «última actualización» y, cuando corresponda, te informaremos o solicitaremos un nuevo consentimiento.",
      ],
    },
  ],
};
