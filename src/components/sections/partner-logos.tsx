import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  cursorLogo,
  exaLogo,
  falLogo,
  googleLogo,
  happyrobotLogo,
  // kfundLogo,
  // mozartLogo,
  onecoworkLogo,
} from "../theme/assets";
import { P } from "../ui/panel";

interface Partner {
  alt: string;
  /** Tailwind height class — sets the on-screen logo height. */
  size: string;
  src: string;
}

/** Shared logo height (container query units inside mosaic cells). */
const LOGO_SIZE = "h-[26cqh]";
/** Squarer or wider marks need more height than wordmarks. */
const LARGE_LOGO_SIZE = "h-[44cqh]";

const LARGE_GRID_HEIGHT = "h-[clamp(2.1rem,10.5vw,4rem)]";
const DEFAULT_GRID_HEIGHT = "h-[clamp(1.75rem,9vw,3.25rem)]";
const LARGE_REEL_HEIGHT = "h-[clamp(1.4rem,6.75vw,2.35rem)]";
const DEFAULT_REEL_HEIGHT = "h-[clamp(1.1rem,5.5vw,1.85rem)]";

// Cursor and OneCoWork marks are squarer/wider than wordmarks; the mobile grid
// and footer reel pick taller clamps for these srcs (desktop uses LARGE_LOGO_SIZE
// on each Partner.size in the mosaic open-row cells).
const LARGE_PARTNER_SRC = new Set([cursorLogo.src, onecoworkLogo.src]);

/** The list order doubles as the rotation order. */
const PARTNERS: Partner[] = [
  {
    alt: "Google — partner de HackSpain",
    size: LOGO_SIZE,
    src: googleLogo.src,
  },
  { alt: "Exa — partner de HackSpain", size: LOGO_SIZE, src: exaLogo.src },
  {
    alt: "fal.ai — partner de HackSpain",
    size: LOGO_SIZE,
    src: falLogo.src,
  },
  {
    alt: "HappyRobot — partner de HackSpain",
    size: LOGO_SIZE,
    src: happyrobotLogo.src,
  },
  // {
  //   alt: "K Fund — partner de HackSpain",
  //   size: LOGO_SIZE,
  //   src: kfundLogo.src,
  // },
  {
    alt: "Cursor — partner de HackSpain",
    size: LARGE_LOGO_SIZE,
    src: cursorLogo.src,
  },
  // {
  //   alt: "Mozart AI — partner de HackSpain",
  //   size: LOGO_SIZE,
  //   src: mozartLogo.src,
  // },
  {
    alt: "OneCoWork — partner de HackSpain",
    size: LARGE_LOGO_SIZE,
    src: onecoworkLogo.src,
  },
];

/** Number of open-row cells (o1..o5) the logos rotate through. */
export const PARTNER_CELL_COUNT = 5;
const SWAP_INTERVAL_MS = 2800;

interface RotationState {
  nextCell: number;
  onScreen: Partner[];
  queue: Partner[];
}

/**
 * Round-robin sliding window over PARTNERS. Each tick the next cell (round
 * robin) swaps its logo for the one waiting at the front of the off-screen
 * queue and sends its own to the back. On-screen logos and the queue always
 * partition PARTNERS, so the same logo can never appear twice at once. Fully
 * deterministic — no randomness, repeats on a fixed cycle.
 */
export function usePartnerRotation(count = PARTNER_CELL_COUNT): Partner[] {
  const [state, setState] = useState<RotationState>(() => ({
    nextCell: 0,
    onScreen: PARTNERS.slice(0, count),
    queue: PARTNERS.slice(count),
  }));

  useEffect(() => {
    if (PARTNERS.length <= count) {
      return;
    }
    const id = setInterval(() => {
      setState((s) => {
        const incoming = s.queue[0];
        if (!incoming) {
          return s;
        }
        const onScreen = [...s.onScreen];
        const outgoing = onScreen[s.nextCell];
        onScreen[s.nextCell] = incoming;
        const queue = outgoing
          ? [...s.queue.slice(1), outgoing]
          : s.queue.slice(1);
        return {
          nextCell: (s.nextCell + 1) % count,
          onScreen,
          queue,
        };
      });
    }, SWAP_INTERVAL_MS);
    return () => clearInterval(id);
  }, [count]);

  return state.onScreen;
}

/** 2×3 grid of partner logos with round-robin rotation, for mobile sections. */
export function PartnerLogoGrid() {
  const partners = usePartnerRotation(6);
  return (
    <div className="grid w-full grid-cols-2 gap-6 px-4">
      {partners.map((p) => (
        <AnimatePresence initial={false} key={p.src} mode="wait">
          <motion.span
            animate={{ opacity: 1 }}
            aria-label={p.alt}
            className={`block w-full bg-hs-ink/60 ${
              LARGE_PARTNER_SRC.has(p.src)
                ? LARGE_GRID_HEIGHT
                : DEFAULT_GRID_HEIGHT
            }`}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            role="img"
            style={{
              maskImage: `url(${p.src})`,
              maskPosition: "center",
              maskRepeat: "no-repeat",
              maskSize: "contain",
              WebkitMaskImage: `url(${p.src})`,
              WebkitMaskPosition: "center",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
            }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      ))}
    </div>
  );
}

/**
 * Infinite scrolling logo reel for mobile. Renders all logos twice in a flat
 * flex row and uses a CSS translate animation to scroll left continuously —
 * when the first copy exits the left edge, the second copy is already in place,
 * creating a seamless loop. No JS state needed.
 */
export function PartnerLogoReel() {
  const logoRow = PARTNERS.map((p) => (
    <span
      aria-label={p.alt}
      className={`mx-4 block w-[clamp(3.5rem,16vw,6rem)] shrink-0 bg-hs-ink/60 ${
        LARGE_PARTNER_SRC.has(p.src) ? LARGE_REEL_HEIGHT : DEFAULT_REEL_HEIGHT
      }`}
      key={p.src}
      role="img"
      style={{
        maskImage: `url(${p.src})`,
        maskPosition: "center",
        maskRepeat: "no-repeat",
        maskSize: "contain",
        WebkitMaskImage: `url(${p.src})`,
        WebkitMaskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
      }}
    />
  ));

  return (
    <div aria-hidden className="w-full overflow-hidden">
      <div className="hs-logo-reel flex items-center">
        {logoRow}
        {/* Duplicate for seamless loop */}
        {logoRow}
      </div>
    </div>
  );
}

export function PartnerLogoCell({ partner }: { partner: Partner }) {
  // The logos are white silhouettes; mask + bg tints them to the warm brand
  // ink (instead of harsh pure black) and keeps the tint color easy to change.
  return (
    <P bg="bg-hs-paper">
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          animate={{ opacity: 1 }}
          aria-label={partner.alt}
          className={`block w-full bg-hs-ink ${partner.size}`}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          key={partner.src}
          role="img"
          style={{
            maskImage: `url(${partner.src})`,
            maskPosition: "center",
            maskRepeat: "no-repeat",
            maskSize: "contain",
            WebkitMaskImage: `url(${partner.src})`,
            WebkitMaskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
          }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>
    </P>
  );
}
