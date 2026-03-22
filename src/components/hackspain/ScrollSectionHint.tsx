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
      className="fixed bottom-0 left-1/2 z-30 -translate-x-1/2 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2"
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
        className="flex cursor-pointer flex-row items-center gap-2 border-[3px] border-hs-ink bg-hs-paper px-3 py-2 font-sans text-xs font-black uppercase tracking-widest text-hs-ink transition-colors hover:bg-hs-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hs-ink disabled:cursor-default disabled:hover:bg-hs-paper"
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
            width="22"
            height="22"
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
