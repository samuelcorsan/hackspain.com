import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const SITE = "https://hackspain.com";

const PALETTE = {
  paper: "#f4ecd8",
  cream: "#f4ecd8",
  sand: "#e8dcc4",
  gold: "#eab619",
  orange: "#d96b2a",
  red: "#cc291f",
  navy: "#1e3958",
  teal: "#35858a",
  ink: "#2a170f",
} as const;

const FONT_BUNGEE =
  "'Bungee', 'Impact', 'Arial Black', system-ui, sans-serif";
const FONT_SANS =
  "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export type SignupConfirmationProps = {
  fullName: string;
  wantsAmbassador?: boolean;
};

export const previewText = (firstName: string) =>
  `¡${firstName}, hemos recibido tu solicitud para HackSpain 2026! Madrid · Junio · 24h.`;

function firstNameFrom(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) return "hacker";
  const first = trimmed.split(/\s+/)[0];
  return first.length > 24 ? first.slice(0, 24) : first;
}

export function SignupConfirmation({
  fullName,
  wantsAmbassador = false,
}: SignupConfirmationProps) {
  const firstName = firstNameFrom(fullName);

  return (
    <Html lang="es">
      <Head>
        <meta charSet="utf-8" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bungee&family=DM+Sans:wght@400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Preview>{previewText(firstName)}</Preview>
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: PALETTE.sand,
          fontFamily: FONT_SANS,
          color: PALETTE.ink,
        }}
      >
        <Container
          style={{
            width: "100%",
            maxWidth: "640px",
            margin: "0 auto",
            padding: "32px 16px",
          }}
        >
          {/* Top bar */}
          <Section
            style={{
              border: `3px solid ${PALETTE.ink}`,
              backgroundColor: PALETTE.paper,
              boxShadow: `8px 8px 0 0 ${PALETTE.ink}`,
            }}
          >
            <table
              width="100%"
              cellPadding={0}
              cellSpacing={0}
              role="presentation"
              style={{ borderCollapse: "collapse" }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      padding: "14px 18px",
                      borderBottom: `3px solid ${PALETTE.ink}`,
                      backgroundColor: PALETTE.gold,
                      fontFamily: FONT_BUNGEE,
                      fontSize: "20px",
                      letterSpacing: "1.5px",
                      color: PALETTE.ink,
                      textTransform: "uppercase",
                    }}
                  >
                    HACKSPAIN
                  </td>
                  <td
                    align="right"
                    style={{
                      padding: "14px 18px",
                      borderBottom: `3px solid ${PALETTE.ink}`,
                      backgroundColor: PALETTE.gold,
                      fontFamily: FONT_SANS,
                      fontSize: "11px",
                      fontWeight: 900,
                      letterSpacing: "2px",
                      color: PALETTE.ink,
                      textTransform: "uppercase",
                    }}
                  >
                    2026 · MADRID
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Hero square */}
            <Section
              style={{
                padding: "36px 28px 28px",
                textAlign: "center" as const,
                borderBottom: `3px solid ${PALETTE.ink}`,
              }}
            >
              <Text
                style={{
                  margin: "0 0 8px",
                  fontFamily: FONT_SANS,
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "3px",
                  color: PALETTE.orange,
                  textTransform: "uppercase",
                }}
              >
                ✓ Solicitud recibida
              </Text>
              <Text
                style={{
                  margin: "0",
                  fontFamily: FONT_BUNGEE,
                  fontSize: "40px",
                  lineHeight: 1.05,
                  color: PALETTE.ink,
                  textTransform: "uppercase",
                }}
              >
                ¡Bienvenido,
                <br />
                {firstName}!
              </Text>
              <Text
                style={{
                  margin: "16px 0 0",
                  fontFamily: FONT_SANS,
                  fontSize: "15px",
                  lineHeight: 1.55,
                  color: PALETTE.ink,
                }}
              >
                Hemos recibido tu solicitud para{" "}
                <strong>HackSpain 2026</strong>. Estás un paso más cerca del
                mayor hackathon para jóvenes builders de España.
              </Text>
            </Section>

            {/* Squares row 1 */}
            <table
              width="100%"
              cellPadding={0}
              cellSpacing={0}
              role="presentation"
              style={{ borderCollapse: "collapse" }}
            >
              <tbody>
                <tr>
                  <td
                    width="50%"
                    style={{
                      padding: "26px 18px",
                      backgroundColor: PALETTE.gold,
                      borderRight: `3px solid ${PALETTE.ink}`,
                      borderBottom: `3px solid ${PALETTE.ink}`,
                      textAlign: "center" as const,
                      verticalAlign: "middle",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: FONT_SANS,
                        fontSize: "10px",
                        fontWeight: 900,
                        letterSpacing: "2px",
                        color: PALETTE.ink,
                        textTransform: "uppercase",
                        marginBottom: "6px",
                      }}
                    >
                      PARTICIPANTES
                    </div>
                    <div
                      style={{
                        fontFamily: FONT_BUNGEE,
                        fontSize: "44px",
                        lineHeight: 1,
                        color: PALETTE.ink,
                      }}
                    >
                      300+
                    </div>
                  </td>
                  <td
                    width="50%"
                    style={{
                      padding: "26px 18px",
                      backgroundColor: PALETTE.red,
                      borderBottom: `3px solid ${PALETTE.ink}`,
                      textAlign: "center" as const,
                      verticalAlign: "middle",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: FONT_SANS,
                        fontSize: "10px",
                        fontWeight: 900,
                        letterSpacing: "2px",
                        color: PALETTE.paper,
                        textTransform: "uppercase",
                        marginBottom: "6px",
                      }}
                    >
                      HORAS
                    </div>
                    <div
                      style={{
                        fontFamily: FONT_BUNGEE,
                        fontSize: "44px",
                        lineHeight: 1,
                        color: PALETTE.paper,
                      }}
                    >
                      24
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    width="50%"
                    style={{
                      padding: "26px 18px",
                      backgroundColor: PALETTE.orange,
                      borderRight: `3px solid ${PALETTE.ink}`,
                      borderBottom: `3px solid ${PALETTE.ink}`,
                      textAlign: "center" as const,
                      verticalAlign: "middle",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: FONT_SANS,
                        fontSize: "10px",
                        fontWeight: 900,
                        letterSpacing: "2px",
                        color: PALETTE.paper,
                        textTransform: "uppercase",
                        marginBottom: "6px",
                      }}
                    >
                      DÓNDE
                    </div>
                    <div
                      style={{
                        fontFamily: FONT_BUNGEE,
                        fontSize: "26px",
                        lineHeight: 1.05,
                        color: PALETTE.paper,
                      }}
                    >
                      MADRID
                    </div>
                  </td>
                  <td
                    width="50%"
                    style={{
                      padding: "26px 18px",
                      backgroundColor: PALETTE.navy,
                      borderBottom: `3px solid ${PALETTE.ink}`,
                      textAlign: "center" as const,
                      verticalAlign: "middle",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: FONT_SANS,
                        fontSize: "10px",
                        fontWeight: 900,
                        letterSpacing: "2px",
                        color: PALETTE.gold,
                        textTransform: "uppercase",
                        marginBottom: "6px",
                      }}
                    >
                      CUÁNDO
                    </div>
                    <div
                      style={{
                        fontFamily: FONT_BUNGEE,
                        fontSize: "26px",
                        lineHeight: 1.05,
                        color: PALETTE.paper,
                      }}
                    >
                      JUNIO 2026
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Next steps square */}
            <Section
              style={{
                padding: "26px 24px",
                backgroundColor: PALETTE.paper,
                borderBottom: `3px solid ${PALETTE.ink}`,
              }}
            >
              <Text
                style={{
                  margin: "0 0 14px",
                  fontFamily: FONT_SANS,
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "3px",
                  color: PALETTE.teal,
                  textTransform: "uppercase",
                }}
              >
                ¿Y AHORA QUÉ?
              </Text>
              <Text
                style={{
                  margin: "0 0 12px",
                  fontFamily: FONT_BUNGEE,
                  fontSize: "22px",
                  lineHeight: 1.15,
                  color: PALETTE.ink,
                  textTransform: "uppercase",
                }}
              >
                Revisamos cada solicitud a mano.
              </Text>
              <Text
                style={{
                  margin: "0 0 14px",
                  fontFamily: FONT_SANS,
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: PALETTE.ink,
                }}
              >
                Te escribiremos a este mismo correo en cuanto tengamos
                novedades. Mientras tanto, síguenos en redes para no perderte
                ningún anuncio.
              </Text>
              {wantsAmbassador ? (
                <Text
                  style={{
                    margin: "10px 0 0",
                    padding: "12px 14px",
                    backgroundColor: PALETTE.gold,
                    border: `2px solid ${PALETTE.ink}`,
                    fontFamily: FONT_SANS,
                    fontSize: "13px",
                    fontWeight: 700,
                    lineHeight: 1.5,
                    color: PALETTE.ink,
                  }}
                >
                  Has marcado que quieres participar como{" "}
                  <strong>embajador/a</strong>. Lo tenemos en cuenta — te
                  contactaremos con los siguientes pasos.
                </Text>
              ) : null}
            </Section>

            {/* Socials row */}
            <table
              width="100%"
              cellPadding={0}
              cellSpacing={0}
              role="presentation"
              style={{ borderCollapse: "collapse" }}
            >
              <tbody>
                <tr>
                  <td
                    width="50%"
                    align="center"
                    style={{
                      padding: "18px 14px",
                      backgroundColor: PALETTE.ink,
                      borderRight: `3px solid ${PALETTE.ink}`,
                      borderBottom: `3px solid ${PALETTE.ink}`,
                    }}
                  >
                    <Link
                      href="https://x.com/hackspain26"
                      style={{
                        fontFamily: FONT_BUNGEE,
                        fontSize: "14px",
                        color: PALETTE.gold,
                        textDecoration: "none",
                        letterSpacing: "1px",
                      }}
                    >
                      X / @hackspain26
                    </Link>
                  </td>
                  <td
                    width="50%"
                    align="center"
                    style={{
                      padding: "18px 14px",
                      backgroundColor: PALETTE.ink,
                      borderBottom: `3px solid ${PALETTE.ink}`,
                    }}
                  >
                    <Link
                      href="https://www.instagram.com/hackspain26/"
                      style={{
                        fontFamily: FONT_BUNGEE,
                        fontSize: "14px",
                        color: PALETTE.gold,
                        textDecoration: "none",
                        letterSpacing: "1px",
                      }}
                    >
                      IG / @hackspain26
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Footer */}
            <Section
              style={{
                padding: "16px 18px",
                backgroundColor: PALETTE.paper,
                textAlign: "center" as const,
              }}
            >
              <Text
                style={{
                  margin: 0,
                  fontFamily: FONT_SANS,
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "2px",
                  color: PALETTE.ink,
                  textTransform: "uppercase",
                  opacity: 0.55,
                }}
              >
                © 2026 HACKSPAIN ·{" "}
                <Link
                  href={`${SITE}/privacy`}
                  style={{ color: PALETTE.ink, textDecoration: "underline" }}
                >
                  Privacidad
                </Link>
              </Text>
            </Section>
          </Section>

          <Text
            style={{
              margin: "20px 8px 0",
              fontFamily: FONT_SANS,
              fontSize: "11px",
              lineHeight: 1.5,
              color: PALETTE.ink,
              opacity: 0.6,
              textAlign: "center" as const,
            }}
          >
            Recibes este correo porque te has apuntado en{" "}
            <Link
              href={SITE}
              style={{ color: PALETTE.ink, textDecoration: "underline" }}
            >
              hackspain.com
            </Link>
            . ¿No has sido tú? Ignora este mensaje.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default SignupConfirmation;
