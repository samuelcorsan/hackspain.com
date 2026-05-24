import { motion } from "motion/react";

interface Props {
  label: string;
  nextSectionAria: string;
  onNext: () => void;
  reducedMotion: boolean;
  visible: boolean;
}

export function ScrollSectionHint({
  label,
  nextSectionAria,
  visible,
  reducedMotion,
  onNext,
}: Props) {
  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0 }}
      className="fixed bottom-0 left-1/2 z-40 -translate-x-1/2 px-4 pt-2 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
      initial={false}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: reducedMotion ? 0 : 0.35 }}
    >
      <motion.button
        aria-label={nextSectionAria}
        className="flex cursor-pointer flex-row items-center gap-2.5 border-[3px] border-hs-ink bg-hs-gold px-5 py-2.5 font-bungee text-hs-ink text-sm uppercase tracking-[0.1em] shadow-[0_4px_0_0_rgba(42,23,15,0.2),0_8px_24px_rgba(42,23,15,0.2)] transition-[filter,box-shadow,background-color] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-hs-ink focus-visible:outline-offset-2 disabled:cursor-default disabled:brightness-100 disabled:hover:brightness-100"
        disabled={!visible}
        onClick={onNext}
        type="button"
        whileTap={reducedMotion || !visible ? undefined : { scale: 0.98 }}
      >
        <motion.span
          animate={reducedMotion || !visible ? undefined : { y: [0, 5, 0] }}
          aria-hidden
          className="inline-flex shrink-0 text-hs-ink"
          transition={
            reducedMotion || !visible
              ? undefined
              : {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.4,
                  ease: "easeInOut",
                }
          }
        >
          <svg
            aria-hidden
            fill="none"
            height="28"
            stroke="currentColor"
            strokeLinejoin="miter"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            width="28"
          >
            <title>Indicador de desplazamiento</title>
            <path d="M6 10l6 6 6-6" />
          </svg>
        </motion.span>
        <span aria-hidden>{label}</span>
      </motion.button>
    </motion.div>
  );
}
