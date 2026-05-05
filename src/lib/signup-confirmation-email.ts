import { render } from "@react-email/render";
import nodemailer, { type Transporter } from "nodemailer";
import { SignupConfirmation } from "../emails/signup-confirmation";

function envFromRuntime(name: string): string | undefined {
  const proc = (
    globalThis as unknown as {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process;
  const v = proc?.env?.[name];
  if (typeof v === "string" && v.trim()) {
    return v.trim();
  }
  const ime = (
    import.meta as unknown as { env?: Record<string, string | undefined> }
  ).env;
  const w = ime?.[name];
  return typeof w === "string" && w.trim() ? w.trim() : undefined;
}

interface SmtpConfig {
  fromAddress: string;
  fromName: string;
  host: string;
  pass: string;
  port: number;
  secure: boolean;
  user: string;
}

function readSmtpConfig(): SmtpConfig | null {
  const host = envFromRuntime("SMTP_HOST");
  const user = envFromRuntime("SMTP_USER");
  const pass = envFromRuntime("SMTP_PASS");
  if (!(host && user && pass)) {
    return null;
  }
  const portRaw = envFromRuntime("SMTP_PORT") ?? "465";
  const port = Number.parseInt(portRaw, 10);
  if (!Number.isFinite(port) || port <= 0 || port > 65_535) {
    return null;
  }
  const secure =
    (envFromRuntime("SMTP_SECURE") ?? (port === 465 ? "true" : "false")) ===
    "true";
  const fromAddress = envFromRuntime("SMTP_FROM") ?? user;
  const fromName = envFromRuntime("SMTP_FROM_NAME") ?? "HackSpain";
  return { host, port, secure, user, pass, fromName, fromAddress };
}

let cachedTransporter: Transporter | null = null;
let cachedKey = "";

function getTransporter(cfg: SmtpConfig): Transporter {
  const key = `${cfg.host}|${cfg.port}|${cfg.secure}|${cfg.user}`;
  if (cachedTransporter && cachedKey === key) {
    return cachedTransporter;
  }
  cachedTransporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass },
  });
  cachedKey = key;
  return cachedTransporter;
}

export interface ConfirmationEmailInput {
  email: string;
  fullName: string;
  wantsAmbassador: boolean;
}

export type ConfirmationEmailResult =
  | { ok: true; messageId: string }
  | { ok: false; reason: "smtp_disabled" | "send_failed"; detail?: string };

export async function renderSignupConfirmationHtml(
  input: Pick<ConfirmationEmailInput, "fullName" | "wantsAmbassador">
): Promise<{ html: string; text: string }> {
  const node = SignupConfirmation({
    fullName: input.fullName,
    wantsAmbassador: input.wantsAmbassador,
  });
  const [html, text] = await Promise.all([
    render(node),
    render(node, { plainText: true }),
  ]);
  return { html, text };
}

export async function sendSignupConfirmationEmail(
  input: ConfirmationEmailInput
): Promise<ConfirmationEmailResult> {
  const cfg = readSmtpConfig();
  if (!cfg) {
    return { ok: false, reason: "smtp_disabled" };
  }

  try {
    const { html, text } = await renderSignupConfirmationHtml(input);
    const transporter = getTransporter(cfg);
    const info = await transporter.sendMail({
      from: { name: cfg.fromName, address: cfg.fromAddress },
      to: input.email,
      subject: "Hemos recibido tu solicitud — HackSpain 2026",
      html,
      text,
      headers: {
        "X-Entity-Ref-ID": `hackspain-signup-${Date.now()}`,
      },
    });
    return { ok: true, messageId: info.messageId };
  } catch (e) {
    const detail =
      e instanceof Error ? `${e.name}: ${e.message}` : String(e).slice(0, 256);
    return { ok: false, reason: "send_failed", detail };
  }
}
