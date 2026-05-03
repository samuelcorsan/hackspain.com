import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const logoPath = join(root, "src/assets/logo.svg");

const paper = { r: 244, g: 236, b: 216 };

const logoBuf = await readFile(logoPath);
const logoPng = await sharp(logoBuf).resize(440).png().toBuffer();
const metaSvg = Buffer.from(
  `<svg width="1200" height="120" xmlns="http://www.w3.org/2000/svg">
  <text x="600" y="72" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="700" font-size="36" fill="#2a170f">hackspain.com</text>
  <text x="600" y="110" text-anchor="middle" font-family="system-ui,sans-serif" font-size="26" fill="#eab619">@hackspain26 · Madrid · 2026</text>
</svg>`
);
const metaPng = await sharp(metaSvg).png().toBuffer();

await sharp({
  create: { width: 1200, height: 630, channels: 3, background: paper },
})
  .composite([
    { input: logoPng, left: Math.round((1200 - 440) / 2), top: 100 },
    { input: metaPng, left: 0, top: 480 },
  ])
  .png()
  .toFile(join(publicDir, "og.png"));

await sharp(logoBuf)
  .resize(180, 180, { fit: "contain", background: paper })
  .png()
  .toFile(join(publicDir, "apple-touch-icon.png"));

console.log("Wrote public/og.png and public/apple-touch-icon.png");
