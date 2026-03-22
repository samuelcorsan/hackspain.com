import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const envPath = resolve(root, ".env");
const assetsDir = resolve(root, "src", "assets");

function loadKey() {
  try {
    const raw = readFileSync(envPath, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^(?:QUIVERAI_API_KEY|QUIVER_API_KEY)=(.*)$/);
      if (m) return m[1].trim().replace(/^["']|["']$/g, "");
    }
  } catch {
    /* no .env */
  }
  if (process.env.QUIVERAI_API_KEY) return process.env.QUIVERAI_API_KEY;
  if (process.env.QUIVER_API_KEY) return process.env.QUIVER_API_KEY;
  throw new Error("Set QUIVER_API_KEY or QUIVERAI_API_KEY in .env or env");
}

const API = "https://api.quiver.ai/v1/svgs/generations";

const TILE_STYLE = `HackSpain mosaic GRID TILE illustration for a multi-panel landing page (like ceramic patchwork). Rules: cubist stained-glass poster look; every region is a triangle, rectangle, or trapezoid; flat fills only; thick uniform dark ink strokes (#000000 or #4a2c1f) on ALL shared edges like grout lines, miter joins; no gradients, no glow, no drop shadows, no watermark. Palette limited to warm Spanish hackathon: cream #f4ecd8, sand #e8dcc4, gold #eab619, orange #d96b2a, red #cc291f, teal #35858a, navy #1e3958. Subject centered, valid SVG, aspect ratio as given in prompt. No text except if prompt explicitly allows one short label.`;

const heroJobs = [
  {
    out: "illustration-windmill.svg",
    prompt:
      "Spanish Don Quixote windmill in strict cubist stained-glass poster style: tall tapered tower in cream and ochre, four sails are printed circuit boards with visible traces, vias as small circles, orthogonal lines only, no curves on PCB areas. Flat color fills terracotta red burnt orange golden yellow slate blue navy accents. Every shape separated by heavy uniform black stroke 3px equivalent, miter joins, no gradients, no drop shadows, no text, no watermark. Isolated illustration centered, view from slight three-quarter angle, SVG-friendly simplified geometry for web hero asset, aspect ratio roughly 3:4 portrait.",
    instructions:
      `${TILE_STYLE} Output valid compact SVG only: flat vector, geometric primitives, thick outlines matching HACKSPAIN event poster, warm Spanish palette plus teal-blue PCB details on sails.`,
  },
  {
    out: "illustration-horse.svg",
    prompt:
      "Geometric horse Rocinante facing right, cubist mosaic patchwork body built from triangles rectangles and trapezoids only, color blocks in burnt orange terracotta red navy blue teal cream beige, thick black outlines on every facet, flat vector Spanish hackathon poster style, no text, isolated transparent background, side profile mid-gallop, simplified legs and head, SVG geometric shapes only, stained glass cubism.",
    instructions: `${TILE_STYLE} Valid SVG, flat fills, heavy strokes 3px feel, no gradients, no text, poster composition horizontal 5:3.`,
  },
  {
    out: "illustration-sun.svg",
    prompt:
      "Stylized sun icon top-right poster style: circle divided into four quadrants alternating golden yellow and burnt orange, sharp triangular rays around perimeter like saw teeth, thick black outline on all shapes, flat vector cubist stained glass, optional small gear-like notches at rim, no text, isolated, SVG simple paths.",
    instructions: `${TILE_STYLE} Compact SVG sun for web hero, flat colors, black strokes, warm palette, no gradients.`,
  },
  {
    out: "illustration-quixote.svg",
    prompt:
      "Don Quixote standing tall holding a long spear/lance vertically, cubist geometric mosaic style matching a Spanish hackathon poster. Body built from triangles rectangles trapezoids in burnt orange terracotta red navy blue teal cream beige brown. Thin angular body, pointed beard, simple helmet or basin on head. Flat color fills, thick dark brown outlines on every facet. Stained glass cubism, no gradients, no text, isolated figure on transparent background, facing slightly left, full body view from mid-thigh up, SVG geometric shapes only. Aspect ratio roughly 2:3 portrait.",
    instructions: `${TILE_STYLE} Valid SVG, flat fills, heavy strokes, geometric cubist poster style: cream, sand, orange, red, teal, navy, gold, brown ink outlines. No gradients, no text.`,
  },
];

const jobs = [
  {
    out: "illustration-spark.svg",
    prompt:
      "Horizontal wide tile (~2.3:1). Subject: a bright idea / spark / starburst made of geometric shards suggesting innovation and uniqueness. Fits top banner triangle-adjacent slot. Cubist mosaic tile style.",
    instructions: TILE_STYLE,
  },
  {
    out: "illustration-code.svg",
    prompt:
      "Tall narrow portrait tile (~1:1.6). Subject: coding / hackathon: angle brackets, curly braces, or simple laptop silhouette built from tiled polygons. Suggests ML and software tracks. Cubist mosaic tile style.",
    instructions: TILE_STYLE,
  },
  {
    out: "illustration-community.svg",
    prompt:
      "Nearly square tile. Subject: three abstract people or nodes connected by short thick lines — community, ambassadors, social reach. Cubist mosaic tile style, friendly not corporate.",
    instructions: TILE_STYLE,
  },
  {
    out: "illustration-trophy.svg",
    prompt:
      "Nearly square tile. Subject: trophy cup or winner podium built from faceted geometric blocks — sponsors and prizes. Cubist mosaic tile style.",
    instructions: TILE_STYLE,
  },
  {
    out: "illustration-compass.svg",
    prompt:
      "Nearly square tile. Subject: compass rose or map direction marker suggesting long-term vision and Madrid to the world. Optional single letter N allowed. Cubist mosaic tile style.",
    instructions: TILE_STYLE,
  },
  {
    out: "illustration-medal.svg",
    prompt:
      "Horizontal wide tile (~2.3:1). Subject: medal, ribbon, or rosette award — recognition and partners. Cubist mosaic tile style.",
    instructions: TILE_STYLE,
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

const withHeroes = process.argv.includes("--with-heroes");
const runJobs = withHeroes ? [...jobs, ...heroJobs] : jobs;

for (const job of runJobs) {
  process.stderr.write(`Generating ${job.out}...\n`);
  const svg = await generate(key, job);
  writeFileSync(resolve(assetsDir, job.out), svg, "utf8");
  process.stderr.write(`Saved src/assets/${job.out}\n`);
}

process.stdout.write(
  JSON.stringify({ saved: runJobs.map((j) => `src/assets/${j.out}`), withHeroes }) + "\n",
);
