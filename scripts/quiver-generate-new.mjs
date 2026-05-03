import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const envPath = resolve(root, ".env");
const assetsDir = resolve(root, "src", "assets");

function loadKey() {
  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^(?:QUIVERAI_API_KEY|QUIVER_API_KEY)=(.*)$/);
    if (m) {
      return m[1].trim();
    }
  }
  throw new Error("Add QUIVER_API_KEY or QUIVERAI_API_KEY to .env");
}

const API = "https://api.quiver.ai/v1/svgs/generations";

const jobs = [
  {
    out: "illustration-quixote.svg",
    prompt:
      "Don Quixote standing tall holding a long spear/lance vertically, cubist geometric mosaic style matching a Spanish hackathon poster. Body built from triangles rectangles trapezoids in burnt orange terracotta red navy blue teal cream beige brown. Thin angular body, pointed beard, simple helmet or basin on head. Flat color fills, thick dark brown outlines on every facet (not black, use #4a2c1f). Stained glass cubism, no gradients, no text, isolated figure on transparent background, facing slightly left, full body view from mid-thigh up, SVG geometric shapes only. Aspect ratio roughly 2:3 portrait.",
    instructions:
      "Valid SVG, flat fills, heavy #4a2c1f strokes (NOT black), geometric cubist poster style matching warm Spanish palette: cream #ebe3bf, sand #e5d9b8, orange #d96b2a, red #b83228, teal #35858a, navy #1e3958, gold #e6a42e, brown #4a2c1f. No gradients, no text.",
  },
  {
    out: "illustration-sancho.svg",
    prompt:
      "Sancho Panza as a modern coder: round stocky figure sitting/crouching with an open laptop showing a terminal prompt '>_' on screen. Wearing a green hat/beret. Cubist geometric mosaic style matching a Spanish hackathon poster. Body built from triangles rectangles trapezoids in cream beige brown terracotta orange teal. Laptop in light gray with dark screen. Flat color fills, thick dark brown outlines on every facet (not black, use #4a2c1f). Stained glass cubism, no gradients, no text except '>_' on laptop screen, isolated figure on transparent background, slight three-quarter view, SVG geometric shapes only. Aspect ratio roughly 4:3 landscape.",
    instructions:
      "Valid SVG, flat fills, heavy #4a2c1f strokes (NOT black), geometric cubist poster style matching warm Spanish palette: cream #ebe3bf, sand #e5d9b8, orange #d96b2a, red #b83228, teal #35858a, navy #1e3958, gold #e6a42e, brown #4a2c1f. No gradients, small '>_' text on laptop screen allowed.",
  },
];

async function generate(key, { prompt, instructions }) {
  const body = {
    model: "arrow-preview",
    prompt,
    n: 1,
    stream: false,
    ...(instructions ? { instructions } : {}),
  };
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok || json?.code) {
    const msg = json?.message ?? res.statusText;
    throw new Error(`Quiver API: ${msg}`);
  }
  const svg = json?.data?.[0]?.svg;
  if (!svg) {
    throw new Error("Quiver API returned no SVG");
  }
  return svg;
}

mkdirSync(assetsDir, { recursive: true });
const key = loadKey();

for (const job of jobs) {
  process.stderr.write(`Generating ${job.out}...\n`);
  const svg = await generate(key, job);
  writeFileSync(resolve(assetsDir, job.out), svg, "utf8");
  process.stderr.write(`Saved src/assets/${job.out}\n`);
}

process.stdout.write(
  `${JSON.stringify({ saved: jobs.map((j) => `src/assets/${j.out}`) })}\n`
);
