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

export type AmbassadorDiscordPayload = {
  fullName: string;
  email: string;
  institution: string;
  cityRegion: string;
  xUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  webUrl: string;
  motivation: string;
  outreachPlan: string;
};

export async function notifyDiscordAmbassadorApplication(data: AmbassadorDiscordPayload): Promise<void> {
  const url = getWebhookUrl();
  if (!url) return;

  const max = 1024;
  const embed = {
    title: "New HackSpain ambassador application",
    color: 0x2dd4bf,
    fields: [
      { name: "Name", value: fieldVal(data.fullName, max), inline: true },
      { name: "Email", value: fieldVal(data.email, max), inline: true },
      { name: "Institution", value: fieldVal(data.institution, max), inline: false },
      { name: "City / region", value: fieldVal(data.cityRegion, max), inline: false },
      { name: "X", value: fieldVal(data.xUrl, max), inline: false },
      { name: "LinkedIn", value: fieldVal(data.linkedinUrl, max), inline: false },
      { name: "GitHub", value: fieldVal(data.githubUrl, max), inline: false },
      { name: "Web", value: fieldVal(data.webUrl, max), inline: false },
      { name: "Why ambassador", value: fieldVal(data.motivation, max), inline: false },
      { name: "Outreach plan", value: fieldVal(data.outreachPlan, max), inline: false },
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
      console.error("Discord ambassador webhook failed:", res.status, t.slice(0, 500));
    }
  } catch (e) {
    console.error("Discord ambassador webhook error:", e);
  } finally {
    clearTimeout(timer);
  }
}
