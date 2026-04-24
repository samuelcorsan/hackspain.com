import { motion } from "motion/react";

type Props = {
  label: string;
  nextSectionAria: string;
  visible: boolean;
  reducedMotion: boolean;
  onNext: () => void;
};

export function ScrollSectionHint({
  label,
  nextSectionAria,
  visible,
  reducedMotion,
  onNext,
}: Props) {
  return (
    <motion.div
      className="fixed bottom-0 left-1/2 z-40 -translate-x-1/2 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.35 }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <motion.button
        type="button"
        disabled={!visible}
        aria-label={nextSectionAria}
        onClick={onNext}
        className="flex cursor-pointer flex-row items-center gap-2.5 border-[3px] border-hs-ink bg-hs-gold px-5 py-2.5 font-bungee text-sm uppercase tracking-[0.1em] text-hs-ink shadow-[0_4px_0_0_rgba(42,23,15,0.2),0_8px_24px_rgba(42,23,15,0.2)] transition-[filter,box-shadow,background-color] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hs-ink disabled:cursor-default disabled:brightness-100 disabled:hover:brightness-100"
        whileTap={reducedMotion || !visible ? undefined : { scale: 0.98 }}
      >
        <motion.span
          className="inline-flex shrink-0 text-hs-ink"
          aria-hidden
          animate={reducedMotion || !visible ? undefined : { y: [0, 5, 0] }}
          transition={
            reducedMotion || !visible
              ? undefined
              : { repeat: Infinity, duration: 1.4, ease: "easeInOut" }
          }
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="miter"
            aria-hidden
          >
            <path d="M6 10l6 6 6-6" />
          </svg>
        </motion.span>
        <span aria-hidden>{label}</span>
      </motion.button>
    </motion.div>
  );
}
