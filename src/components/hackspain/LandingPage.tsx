import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { InlineSvg } from "./InlineSvg";
import { MosaicBackground } from "./MosaicBackground";
import { vp } from "./Panel";
import { INK, NUM_SECTIONS, SPRING, slideVariants } from "./constants";
import { CELLS } from "./cells";
import { ILLS } from "./assets";
import { buildSections } from "./sections";

export function LandingPage() {
  const [section, setSection] = useState(0);
  const [dir, setDir] = useState(1);
  const locked = useRef(false);
  const sections = useMemo(buildSections, []);

  const advance = useCallback((d: 1 | -1) => {
    if (locked.current) return;
    locked.current = true;
    setDir(d);
    setSection(s => Math.max(0, Math.min(NUM_SECTIONS - 1, s + d)));
    setTimeout(() => { locked.current = false; }, 700);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 5) advance(e.deltaY > 0 ? 1 : -1);
    };
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) advance(dy > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); advance(1); }
      if (e.key === "ArrowUp")                     { e.preventDefault(); advance(-1); }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [advance]);

  const current = sections[section] ?? {};

  return (
    <div className="fixed inset-0" style={{ background: INK }}>
      <MosaicBackground className="absolute inset-0 h-full w-full" />

      {ILLS.map((ill, i) => (
        <div key={i} className={`absolute overflow-hidden flex ${ill.box}`} style={vp(ill.x, ill.y, ill.w, ill.h)}>
          <InlineSvg svg={ill.svg} className={ill.img} />
        </div>
      ))}

      {CELLS.map(cell => (
        <div key={cell.id} className="absolute overflow-hidden" style={{ ...vp(cell.x, cell.y, cell.w, cell.h), ...(cell.clip ? { clipPath: cell.clip } : {}) }}>
          <AnimatePresence mode="popLayout" custom={dir} initial={false}>
            {current[cell.id] && (
              <motion.div
                key={`${cell.id}-${section}`}
                className="absolute inset-0"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ ...SPRING, delay: cell.delay }}
              >
                {current[cell.id]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      <MosaicBackground className="absolute inset-0 h-full w-full pointer-events-none" strokeOnly />

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {Array.from({ length: NUM_SECTIONS }, (_, i) => (
          <button
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === section ? "w-6 bg-hs-gold" : "w-2 bg-hs-ink/30"
            }`}
            onClick={() => { setDir(i > section ? 1 : -1); setSection(i); }}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
