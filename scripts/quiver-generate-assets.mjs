import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
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
    if (m) return m[1].trim();
  }
  throw new Error("Add QUIVER_API_KEY or QUIVERAI_API_KEY to .env");
}

const API = "https://api.quiver.ai/v1/svgs/generations";

const jobs = [
  {
    out: "illustration-windmill.svg",
    prompt:
      "Spanish Don Quixote windmill in strict cubist stained-glass poster style: tall tapered tower in cream and ochre, four sails are printed circuit boards with visible traces, vias as small circles, orthogonal lines only, no curves on PCB areas. Flat color fills terracotta red burnt orange golden yellow slate blue navy accents. Every shape separated by heavy uniform black stroke 3px equivalent, miter joins, no gradients, no drop shadows, no text, no watermark. Isolated illustration centered, view from slight three-quarter angle, SVG-friendly simplified geometry for web hero asset, aspect ratio roughly 3:4 portrait.",
    instructions:
      "Output valid compact SVG only: flat vector, geometric primitives, thick black outlines matching HACKSPAIN event poster, warm Spanish palette plus teal-blue PCB details on sails.",
  },
  {
    out: "illustration-horse.svg",
    prompt:
      "Geometric horse Rocinante facing right, cubist mosaic patchwork body built from triangles rectangles and trapezoids only, color blocks in burnt orange terracotta red navy blue teal cream beige, thick black outlines on every facet, flat vector Spanish hackathon poster style, no text, isolated transparent background, side profile mid-gallop, simplified legs and head, SVG geometric shapes only, stained glass cubism.",
    instructions:
      "Valid SVG, flat fills, heavy black strokes 3px feel, no gradients, no text, poster composition horizontal 5:3.",
  },
  {
    out: "illustration-sun.svg",
    prompt:
      "Stylized sun icon top-right poster style: circle divided into four quadrants alternating golden yellow and burnt orange, sharp triangular rays around perimeter like saw teeth, thick black outline on all shapes, flat vector cubist stained glass, optional small gear-like notches at rim, no text, isolated, SVG simple paths.",
    instructions: "Compact SVG sun for web hero, flat colors, black strokes, warm palette, no gradients.",
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
  if (!svg) throw new Error("Quiver API returned no SVG");
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

process.stdout.write(JSON.stringify({ saved: jobs.map((j) => `src/assets/${j.out}`) }) + "\n");
