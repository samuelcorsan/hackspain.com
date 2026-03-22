import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { InlineSvg } from "./InlineSvg";
import { MosaicBackground } from "./MosaicBackground";
import { vp } from "./Panel";
import { ScrollSectionHint } from "./ScrollSectionHint";
import {
  HORSE_ARTBOARD,
  HORSE_CELL_FAR_RIGHT_X,
  HORSE_CELL_LATE_PULL_MAX_ARTBOARD_PX,
  HORSE_CELL_LATE_PULL_X0,
  HORSE_CELL_LATE_PULL_X1,
  HORSE_CELL_REVEAL_DELAY_FAR_RIGHT_MS,
  HORSE_CELL_REVEAL_DELAY_MS,
  HORSE_ILLUSTRATION_INDEX,
  HORSE_VIDEO_CHROMA_KEY_HEX,
  HORSE_VIDEO_SRC,
  INK,
  NUM_SECTIONS,
  SECTION_MISSION_INDEX,
  SECTION_UNIQUE_INDEX,
  SPRING,
  slideVariants,
} from "./constants";
import { HorseMissionTransition } from "./HorseMissionTransition";
import { CELLS, type CellDef } from "./cells";
import { illustrationsForSection } from "./illustrationThemes";
import { buildSections } from "./sections";
import { keywordsForSectionIndex, seoForSectionIndex } from "../../data/landingMeta";
import {
  parsePath,
  pathFromSectionIndex,
  pathRootFromSectionIndex,
} from "../../data/sectionRoutes";
import { getCopy } from "../../i18n/copy";
import type { Locale } from "../../i18n/locales";
import { localeFromNavigator } from "../../i18n/locales";

function horseRevealLatePullArtboard(x: number): number {
  if (x <= HORSE_CELL_LATE_PULL_X0) return 0;
  const span = HORSE_CELL_LATE_PULL_X1 - HORSE_CELL_LATE_PULL_X0;
  const t = Math.min(1, Math.max(0, (x - HORSE_CELL_LATE_PULL_X0) / span));
  return t * HORSE_CELL_LATE_PULL_MAX_ARTBOARD_PX;
}

function horseCellRevealThresholdPx(
  cell: CellDef,
  scale: number,
  margin: number,
): number {
  const pull = horseRevealLatePullArtboard(cell.x) * scale;
  return cell.x * scale - margin + pull;
}

function horseCellRevealDelayMs(cell: CellDef): number {
  return cell.x >= HORSE_CELL_FAR_RIGHT_X
    ? HORSE_CELL_REVEAL_DELAY_FAR_RIGHT_MS
    : HORSE_CELL_REVEAL_DELAY_MS;
}

function applySeoToDocument(
  loc: Locale,
  sectionIdx: number,
  pathStrategy: "prefixed" | "root",
) {
  if (typeof document === "undefined") return;
  const { title, description, ogImageAlt } = seoForSectionIndex(loc, sectionIdx);
  const keywords = keywordsForSectionIndex(loc, sectionIdx);
  document.title = title;
  document.documentElement.lang = loc;
  const setMeta = (sel: string, attr: string, val: string) => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  };
  setMeta('meta[name="description"]', "content", description);
  setMeta('meta[name="keywords"]', "content", keywords);
  setMeta('meta[property="og:title"]', "content", title);
  setMeta('meta[property="og:description"]', "content", description);
  const path =
    pathStrategy === "root"
      ? pathRootFromSectionIndex(sectionIdx)
      : pathFromSectionIndex(loc, sectionIdx);
  const pageUrl = `${window.location.origin}${path}`;
  setMeta('meta[property="og:url"]', "content", pageUrl);
  setMeta('meta[property="og:image:alt"]', "content", ogImageAlt);
  setMeta('meta[property="og:locale"]', "content", loc === "es" ? "es_ES" : "en_US");
  setMeta('meta[property="og:locale:alternate"]', "content", loc === "es" ? "en_US" : "es_ES");
  setMeta('meta[name="twitter:title"]', "content", title);
  setMeta('meta[name="twitter:description"]', "content", description);
  setMeta('meta[name="twitter:image:alt"]', "content", ogImageAlt);
  const link = document.querySelector('link[rel="canonical"]');
  if (link) link.setAttribute("href", pageUrl);
  const origin = window.location.origin;
  const enPath = pathFromSectionIndex("en", sectionIdx);
  const esPath = pathFromSectionIndex("es", sectionIdx);
  document.querySelectorAll('link[rel="alternate"][hreflang="en"]').forEach((el) => {
    el.setAttribute("href", `${origin}${enPath}`);
  });
  document.querySelectorAll('link[rel="alternate"][hreflang="es"]').forEach((el) => {
    el.setAttribute("href", `${origin}${esPath}`);
  });
  const xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
  if (xDefault) {
    const defPath =
      pathStrategy === "root" ? pathRootFromSectionIndex(sectionIdx) : enPath;
    xDefault.setAttribute("href", `${origin}${defPath}`);
  }
}

type UrlMode = "prefixed" | "root";

type Props = { locale: Locale; initialSection?: number; urlMode?: UrlMode };

export function LandingPage({ locale, initialSection = 0, urlMode = "prefixed" }: Props) {
  const [section, setSection] = useState(initialSection);
  const [activeLocale, setActiveLocale] = useState(locale);
  const [dir, setDir] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);
  type HorseToUnique = false | "horse_video";
  const [horseToUnique, setHorseToUnique] = useState<HorseToUnique>(false);
  const [horseRevealed, setHorseRevealed] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [skipUniqueGridEnter, setSkipUniqueGridEnter] = useState(false);
  const [horseChromaSvgHidden, setHorseChromaSvgHidden] = useState(false);
  const horseRevealedRef = useRef<ReadonlySet<string>>(horseRevealed);
  horseRevealedRef.current = horseRevealed;
  const horseRevealTimeoutsRef = useRef(
    new Map<string, ReturnType<typeof window.setTimeout>>(),
  );
  const horseFinishOutRef = useRef<ReturnType<typeof window.setTimeout> | null>(
    null,
  );
  const locked = useRef(false);

  const clearHorseRevealTimeouts = useCallback(() => {
    horseRevealTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
    horseRevealTimeoutsRef.current.clear();
  }, []);
  const activeLocaleRef = useRef(activeLocale);
  activeLocaleRef.current = activeLocale;

  const sections = useMemo(() => buildSections(activeLocale), [activeLocale]);
  const copy = useMemo(() => getCopy(activeLocale), [activeLocale]);
  const ills = useMemo(() => illustrationsForSection(section), [section]);

  useEffect(() => {
    if (urlMode === "root") return;
    setActiveLocale(locale);
  }, [locale, urlMode]);

  useEffect(() => {
    if (urlMode !== "root") return;
    const d = localeFromNavigator();
    setActiveLocale(d);
    applySeoToDocument(d, initialSection, "root");
  }, [urlMode, initialSection]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const fn = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  const variants = useMemo(
    () =>
      reducedMotion
        ? {
            enter: { opacity: 0 },
            center: { opacity: 1 },
            exit: { opacity: 0 },
          }
        : slideVariants,
    [reducedMotion],
  );

  const goToSection = useCallback(
    (next: number, d: 1 | -1, opts?: { unlockMs?: number }) => {
      if (locked.current) return;
      locked.current = true;
      setDir(d);
      setSection(next);
      const path =
        urlMode === "root"
          ? pathRootFromSectionIndex(next)
          : pathFromSectionIndex(activeLocale, next);
      if (typeof window !== "undefined" && window.location.pathname !== path) {
        window.history.pushState({ section: next, locale: activeLocale }, "", path);
      }
      applySeoToDocument(activeLocale, next, urlMode);
      const unlockMs = opts?.unlockMs ?? 700;
      setTimeout(() => {
        locked.current = false;
      }, unlockMs);
    },
    [activeLocale, urlMode],
  );

  const advance = useCallback(
    (d: 1 | -1) => {
      const next = Math.max(0, Math.min(NUM_SECTIONS - 1, section + d));
      if (next === section) return;
      if (
        d === 1 &&
        section === SECTION_MISSION_INDEX &&
        next === SECTION_UNIQUE_INDEX &&
        !reducedMotion
      ) {
        if (locked.current) return;
        locked.current = true;
        setDir(1);
        clearHorseRevealTimeouts();
        setHorseRevealed(new Set());
        setHorseToUnique("horse_video");
        return;
      }
      goToSection(next, d);
    },
    [section, goToSection, reducedMotion, clearHorseRevealTimeouts],
  );

  const onHorseRideX = useCallback((tx: number, travelTotal: number) => {
    if (travelTotal <= 0) return;
    const iw = window.innerWidth;
    const scale = iw / 1440;
    const horseL = HORSE_ARTBOARD.x * scale;
    const horseW = HORSE_ARTBOARD.w * scale;
    const leading = horseL + tx + horseW;
    const margin = Math.max(6, 16 * scale);
    for (const c of CELLS) {
      if (horseRevealedRef.current.has(c.id)) continue;
      if (horseRevealTimeoutsRef.current.has(c.id)) continue;
      const thresh = horseCellRevealThresholdPx(c, scale, margin);
      if (leading < thresh) continue;
      const cellId = c.id;
      const tid = window.setTimeout(() => {
        horseRevealTimeoutsRef.current.delete(cellId);
        setHorseRevealed((prev) => {
          if (prev.has(cellId)) return prev;
          const next = new Set(prev);
          next.add(cellId);
          return next;
        });
      }, horseCellRevealDelayMs(c));
      horseRevealTimeoutsRef.current.set(cellId, tid);
    }
  }, []);

  useEffect(() => {
    if (horseToUnique !== "horse_video") return;
    clearHorseRevealTimeouts();
    setHorseRevealed(new Set());
  }, [horseToUnique, clearHorseRevealTimeouts]);

  useEffect(() => {
    if (horseToUnique !== "horse_video") setHorseChromaSvgHidden(false);
  }, [horseToUnique]);

  useEffect(() => {
    if (!skipUniqueGridEnter) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setSkipUniqueGridEnter(false));
    });
    return () => cancelAnimationFrame(id);
  }, [skipUniqueGridEnter]);

  const HORSE_FLUSH_SETTLE_MS = 680;

  const onHorseMissionTransitionComplete = useCallback(
    (travelTotal: number) => {
      const pending = [...horseRevealTimeoutsRef.current.keys()];
      clearHorseRevealTimeouts();

      const iw = window.innerWidth;
      const scale = iw / 1440;
      const margin = Math.max(6, 16 * scale);
      const horseL = HORSE_ARTBOARD.x * scale;
      const horseW = HORSE_ARTBOARD.w * scale;
      const leadingEnd = horseL + travelTotal + horseW;

      const missed: string[] = [];
      for (const c of CELLS) {
        if (horseRevealedRef.current.has(c.id)) continue;
        if (pending.includes(c.id)) continue;
        const thresh = horseCellRevealThresholdPx(c, scale, margin);
        if (leadingEnd >= thresh) missed.push(c.id);
      }

      const flush = new Set<string>([...pending, ...missed]);

      const finishOut = () => {
        setSkipUniqueGridEnter(true);
        setHorseToUnique(false);
        setHorseRevealed(new Set());
        locked.current = false;
        goToSection(SECTION_UNIQUE_INDEX, 1, { unlockMs: 420 });
      };

      if (flush.size > 0) {
        setHorseRevealed((prev) => {
          const next = new Set(prev);
          flush.forEach((id) => next.add(id));
          return next;
        });
        if (horseFinishOutRef.current) window.clearTimeout(horseFinishOutRef.current);
        horseFinishOutRef.current = window.setTimeout(() => {
          horseFinishOutRef.current = null;
          finishOut();
        }, HORSE_FLUSH_SETTLE_MS);
      } else {
        finishOut();
      }
    },
    [goToSection, clearHorseRevealTimeouts],
  );

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 5) advance(e.deltaY > 0 ? 1 : -1);
    };
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) advance(dy > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        advance(1);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        advance(-1);
      }
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

  useEffect(() => {
    const onPop = () => {
      if (horseFinishOutRef.current) {
        window.clearTimeout(horseFinishOutRef.current);
        horseFinishOutRef.current = null;
      }
      horseRevealTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
      horseRevealTimeoutsRef.current.clear();
      setHorseToUnique(false);
      setSkipUniqueGridEnter(false);
      setHorseRevealed(new Set());
      locked.current = false;
      const parsed = parsePath(window.location.pathname);
      setDir(1);
      if (parsed.mode === "prefixed") {
        setActiveLocale(parsed.locale);
        setSection(parsed.sectionIndex);
        applySeoToDocument(parsed.locale, parsed.sectionIndex, "prefixed");
      } else {
        setSection(parsed.sectionIndex);
        applySeoToDocument(activeLocaleRef.current, parsed.sectionIndex, "root");
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const current = sections[section] ?? {};
  const missionCells = sections[SECTION_MISSION_INDEX] ?? {};
  const uniqueCells = sections[SECTION_UNIQUE_INDEX] ?? {};
  const liveLabel = copy.sectionNav[section] ?? copy.sectionNav[0];

  return (
    <div
      className="fixed inset-0 font-sans"
      style={{ background: INK }}
      role="region"
      aria-label={copy.regionAria}
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {liveLabel}
      </p>
      <MosaicBackground className="absolute inset-0 h-full w-full" aria-hidden />

      {section === SECTION_MISSION_INDEX && horseToUnique !== "horse_video" ? (
        <video
          className="pointer-events-none fixed left-0 top-0 h-px w-px opacity-0"
          aria-hidden
          muted
          playsInline
          preload="auto"
          src={HORSE_VIDEO_SRC}
        />
      ) : null}

      {ills.map((ill, i) =>
        ill.svg ? (
          <div
            key={ill.id}
            className="pointer-events-none absolute overflow-hidden"
            style={{
              ...vp(ill.x, ill.y, ill.w, ill.h),
              ...(ill.clip ? { clipPath: ill.clip } : {}),
            }}
            aria-hidden
          >
            <AnimatePresence mode="popLayout" custom={dir} initial={false}>
              <motion.div
                key={`${ill.id}-${section}-${activeLocale}`}
                className={`absolute inset-0 flex ${ill.box}`}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={
                  reducedMotion
                    ? { type: "tween", duration: 0.2, delay: ill.delay * 0.2 }
                    : { ...SPRING, delay: ill.delay }
                }
                hidden={
                  horseToUnique === "horse_video" &&
                  !!HORSE_VIDEO_CHROMA_KEY_HEX &&
                  horseChromaSvgHidden &&
                  i === HORSE_ILLUSTRATION_INDEX
                }
              >
                <InlineSvg
                  svg={ill.svg}
                  className={ill.img}
                  fill={ill.fill}
                  decorative
                />
              </motion.div>
            </AnimatePresence>
          </div>
        ) : null,
      )}

      {CELLS.map((cell) => {
        const horse = horseToUnique === "horse_video";
        const revealed = horseRevealed.has(cell.id);
        const missionPhase =
          !!missionCells[cell.id] &&
          ((!horse && section === SECTION_MISSION_INDEX) ||
            (horse && !revealed));
        const uniqueHorsePhase =
          horse && revealed && !!uniqueCells[cell.id];
        const defaultTile =
          !horse &&
          !!current[cell.id] &&
          !(
            section === SECTION_MISSION_INDEX && !!missionCells[cell.id]
          );

        return (
          <div
            key={cell.id}
            className="absolute overflow-hidden"
            style={{
              ...vp(cell.x, cell.y, cell.w, cell.h),
              ...(cell.clip ? { clipPath: cell.clip } : {}),
            }}
            onClick={() => {
              console.log(cell.id);
            }}
          >
            <AnimatePresence mode="popLayout" custom={dir} initial={false}>
              {missionPhase ? (
                <motion.div
                  key={`${cell.id}-${SECTION_MISSION_INDEX}-${activeLocale}`}
                  className="absolute inset-0"
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={
                    reducedMotion
                      ? { type: "tween", duration: 0.2, delay: cell.delay * 0.2 }
                      : { ...SPRING, delay: cell.delay * 0.35 }
                  }
                >
                  {missionCells[cell.id]}
                </motion.div>
              ) : null}
              {uniqueHorsePhase ? (
                <motion.div
                  key={`${cell.id}-${SECTION_UNIQUE_INDEX}-${activeLocale}`}
                  className="absolute inset-0"
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={
                    reducedMotion
                      ? { type: "tween", duration: 0.2, delay: cell.delay * 0.2 }
                      : { ...SPRING, delay: cell.delay * 0.35 }
                  }
                >
                  {uniqueCells[cell.id]}
                </motion.div>
              ) : null}
              {defaultTile ? (
                <motion.div
                  key={`${cell.id}-${section}-${activeLocale}`}
                  className="absolute inset-0"
                  custom={dir}
                  variants={variants}
                  initial={
                    section === SECTION_UNIQUE_INDEX && skipUniqueGridEnter
                      ? false
                      : "enter"
                  }
                  animate="center"
                  exit="exit"
                  transition={
                    reducedMotion
                      ? { type: "tween", duration: 0.2, delay: cell.delay * 0.3 }
                      : { ...SPRING, delay: cell.delay }
                  }
                >
                  {current[cell.id]}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}

      <MosaicBackground className="absolute inset-0 h-full w-full pointer-events-none" strokeOnly aria-hidden />

      <ScrollSectionHint
        label={copy.scrollHint}
        nextSectionAria={copy.scrollHintNextAria}
        visible={section < NUM_SECTIONS - 1 && !horseToUnique}
        reducedMotion={reducedMotion}
        onNext={() => advance(1)}
      />

      {horseToUnique === "horse_video" ? (
        <HorseMissionTransition
          onComplete={onHorseMissionTransitionComplete}
          onRideX={onHorseRideX}
          onVideoReady={() => setHorseChromaSvgHidden(true)}
        />
      ) : null}
    </div>
  );
}
