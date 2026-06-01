import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  cursorLogo,
  exaLogo,
  falLogo,
  googleLogo,
  kfundLogo,
  mozartLogo,
  onecoworkLogo,
} from "../theme/assets";
import { P } from "../ui/panel";

interface Partner {
  alt: string;
  /** Tailwind height class — sets the on-screen logo height. */
  size: string;
  src: string;
}

/** Shared logo height. */
const LOGO_SIZE = "h-[16cqh]";
/** Cursor's mark is squarer than the wordmarks, so it needs more height. */
const CURSOR_SIZE = "h-[22cqh]";

function toPartner(
  logo: { src: string },
  alt: string,
  size: string = LOGO_SIZE
): Partner {
  return { alt, size, src: logo.src };
}

/** The list order doubles as the rotation order. */
const PARTNERS: Partner[] = [
  toPartner(googleLogo, "Google — partner de HackSpain"),
  toPartner(exaLogo, "Exa — partner de HackSpain"),
  toPartner(falLogo, "fal.ai — partner de HackSpain"),
  toPartner(kfundLogo, "K Fund — partner de HackSpain"),
  toPartner(cursorLogo, "Cursor — partner de HackSpain", CURSOR_SIZE),
  toPartner(mozartLogo, "Mozart AI — partner de HackSpain"),
  toPartner(onecoworkLogo, "OneCoWork — partner de HackSpain"),
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
export function usePartnerRotation(): Partner[] {
  const [state, setState] = useState<RotationState>(() => ({
    nextCell: 0,
    onScreen: PARTNERS.slice(0, PARTNER_CELL_COUNT),
    queue: PARTNERS.slice(PARTNER_CELL_COUNT),
  }));

  useEffect(() => {
    if (PARTNERS.length <= PARTNER_CELL_COUNT) {
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
          nextCell: (s.nextCell + 1) % PARTNER_CELL_COUNT,
          onScreen,
          queue,
        };
      });
    }, SWAP_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return state.onScreen;
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
      className="mx-4 block h-[clamp(0.9rem,4.5vw,1.4rem)] w-[clamp(3rem,14vw,5rem)] shrink-0 bg-hs-ink/60"
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
