import { formatHeardFromStored } from "./signupValidation";

const DISCORD_WEBHOOK_PREFIXES = [
  "https://discord.com/api/webhooks/",
  "https://discordapp.com/api/webhooks/",
] as const;

function getWebhookUrl(): string | null {
  const raw = import.meta.env.DISCORD_WEBHOOK_URL;
  if (typeof raw !== "string" || !raw.trim()) return null;
  const u = raw.trim();
  if (!DISCORD_WEBHOOK_PREFIXES.some((p) => u.startsWith(p))) {
    console.warn("DISCORD_WEBHOOK_URL ignored: must be a discord.com webhook URL");
    return null;
  }
  return u;
}

function fieldVal(s: string, max: number): string {
  if (!s) return "—";
  const t = s.replace(/`/g, "'").slice(0, max);
  return t.length === 0 ? "—" : t;
}

export type SignupDiscordPayload = {
  fullName: string;
  email: string;
  xUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  webUrl: string;
  achievements: string;
  freeTime: string;
  wantsAmbassador: boolean;
  ambassadorMotivation: string;
  ambassadorStudyWhere: string;
  heardFrom: string;
};

export async function notifyDiscordNewSignup(data: SignupDiscordPayload): Promise<void> {
  const url = getWebhookUrl();
  if (!url) return;

  const max = 1024;
  const embed = {
    title: "New HackSpain application",
    color: 0xeab619,
    fields: [
      { name: "Name", value: fieldVal(data.fullName, max), inline: true },
      { name: "Email", value: fieldVal(data.email, max), inline: true },
      {
        name: "How they found us",
        value: fieldVal(formatHeardFromStored(data.heardFrom), max),
        inline: false,
      },
      { name: "X", value: fieldVal(data.xUrl, max), inline: false },
      { name: "LinkedIn", value: fieldVal(data.linkedinUrl, max), inline: false },
      { name: "GitHub", value: fieldVal(data.githubUrl, max), inline: false },
      { name: "Web", value: fieldVal(data.webUrl, max), inline: false },
      { name: "Achievements", value: fieldVal(data.achievements, max), inline: false },
      { name: "Free time / hobbies", value: fieldVal(data.freeTime, max), inline: false },
      {
        name: "Ambassador interest",
        value: data.wantsAmbassador ? "Yes" : "No",
        inline: true,
      },
      ...(data.wantsAmbassador
        ? [
            {
              name: "Why ambassador",
              value: fieldVal(data.ambassadorMotivation, max),
              inline: false,
            },
            {
              name: "Where they study",
              value: fieldVal(data.ambassadorStudyWhere, max),
              inline: false,
            },
          ]
        : []),
    ],
    timestamp: new Date().toISOString(),
  };

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12_000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      console.error("Discord webhook failed:", res.status, t.slice(0, 500));
    }
  } catch (e) {
    console.error("Discord webhook error:", e);
  } finally {
    clearTimeout(timer);
  }
}
