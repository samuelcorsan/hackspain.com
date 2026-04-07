import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { InlineSvg } from "./InlineSvg";
import { MosaicBackground } from "./MosaicBackground";
import { vp } from "./Panel";
import { ScrollSectionHint } from "./ScrollSectionHint";
import {
  HORSE_CELL_FAR_RIGHT_X,
  HORSE_CELL_FAR_RIGHT_X_COMPACT,
  HORSE_CELL_LATE_PULL_MAX_ARTBOARD_PX,
  HORSE_CELL_LATE_PULL_X0,
  HORSE_CELL_LATE_PULL_X0_COMPACT,
  HORSE_CELL_LATE_PULL_X1,
  HORSE_CELL_LATE_PULL_X1_COMPACT,
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
import { artboardFor, horseArtboardFor } from "./artboard";
import { HorseMissionTransition } from "./HorseMissionTransition";
import { cellsForProfile, type CellDef } from "./cells";
import { illustrationsForSection } from "./illustrationThemes";
import { useLayoutProfile } from "./useLayoutProfile";
import { buildSections } from "./sections";
import { keywordsForSectionIndex, seoForSectionIndex } from "../../data/landingMeta";
import { parsePath, pathRootFromSectionIndex } from "../../data/sectionRoutes";

const SECTION_NAV = [
  "Inicio",
  "Misión",
  "Qué nos hace únicos",
  "Tracks originales",
  "Patrocinadores",
  "Visión",
] as const;

const REGION_ARIA =
  "HackSpain 2026 — cambia de sección con la rueda del ratón, deslizamiento o flechas";

function horseRevealLatePullArtboard(x: number, compact: boolean): number {
  const x0 = compact ? HORSE_CELL_LATE_PULL_X0_COMPACT : HORSE_CELL_LATE_PULL_X0;
  const x1 = compact ? HORSE_CELL_LATE_PULL_X1_COMPACT : HORSE_CELL_LATE_PULL_X1;
  if (x <= x0) return 0;
  const span = x1 - x0;
  const t = Math.min(1, Math.max(0, (x - x0) / span));
  return t * HORSE_CELL_LATE_PULL_MAX_ARTBOARD_PX;
}

function horseCellRevealThresholdPx(
  cell: CellDef,
  scale: number,
  margin: number,
  compact: boolean,
): number {
  const pull = horseRevealLatePullArtboard(cell.x, compact) * scale;
  return cell.x * scale - margin + pull;
}

function horseCellRevealDelayMs(cell: CellDef, compact: boolean): number {
  const far = compact ? HORSE_CELL_FAR_RIGHT_X_COMPACT : HORSE_CELL_FAR_RIGHT_X;
  return cell.x >= far
    ? HORSE_CELL_REVEAL_DELAY_FAR_RIGHT_MS
    : HORSE_CELL_REVEAL_DELAY_MS;
}

function applySeoToDocument(sectionIdx: number) {
  if (typeof document === "undefined") return;
  const { title, description, ogImageAlt } = seoForSectionIndex(sectionIdx);
  const keywords = keywordsForSectionIndex(sectionIdx);
  document.title = title;
  document.documentElement.lang = "es";
  const setMeta = (sel: string, attr: string, val: string) => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  };
  setMeta('meta[name="description"]', "content", description);
  setMeta('meta[name="keywords"]', "content", keywords);
  setMeta('meta[property="og:title"]', "content", title);
  setMeta('meta[property="og:description"]', "content", description);
  const path = pathRootFromSectionIndex(sectionIdx);
  const pageUrl = `${window.location.origin}${path}`;
  setMeta('meta[property="og:url"]', "content", pageUrl);
  setMeta('meta[property="og:image:alt"]', "content", ogImageAlt);
  setMeta('meta[property="og:locale"]', "content", "es_ES");
  setMeta('meta[name="twitter:title"]', "content", title);
  setMeta('meta[name="twitter:description"]', "content", description);
  setMeta('meta[name="twitter:image:alt"]', "content", ogImageAlt);
  const link = document.querySelector('link[rel="canonical"]');
  if (link) link.setAttribute("href", pageUrl);
}

type Props = { initialSection?: number };

export function LandingPage({ initialSection = 0 }: Props) {
  const [section, setSection] = useState(initialSection);
  const [dir, setDir] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);
  type HorseToUnique = false | "horse_video";
  const [horseToUnique, setHorseToUnique] = useState<HorseToUnique>(false);
  const [horseRevealed, setHorseRevealed] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [skipUniqueGridEnter, setSkipUniqueGridEnter] = useState(false);
  const [horseChromaSvgHidden, setHorseChromaSvgHidden] = useState(false);
  const [compactHomeGridVisible, setCompactHomeGridVisible] = useState(
    () => initialSection !== 0,
  );
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
  const layoutProfile = useLayoutProfile();

  const artboard = useMemo(() => artboardFor(layoutProfile), [layoutProfile]);
  const cells = useMemo(() => cellsForProfile(layoutProfile), [layoutProfile]);
  const horseBox = useMemo(() => horseArtboardFor(layoutProfile), [layoutProfile]);

  const sections = useMemo(() => buildSections(), []);
  const ills = useMemo(
    () => illustrationsForSection(section, layoutProfile),
    [section, layoutProfile],
  );

  useEffect(() => {
    applySeoToDocument(initialSection);
  }, [initialSection]);

  useEffect(() => {
    if (section !== 0) setCompactHomeGridVisible(true);
  }, [section]);

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
      const path = pathRootFromSectionIndex(next);
      if (typeof window !== "undefined" && window.location.pathname !== path) {
        window.history.pushState({ section: next }, "", path);
      }
      applySeoToDocument(next);
      const unlockMs = opts?.unlockMs ?? 700;
      setTimeout(() => {
        locked.current = false;
      }, unlockMs);
    },
    [],
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

  const isCompact = layoutProfile === "compact";
  const compactHomeIntroActive =
    isCompact && section === 0 && !compactHomeGridVisible;

  const revealCompactHomeGrid = useCallback(() => {
    setCompactHomeGridVisible(true);
    locked.current = true;
    window.setTimeout(() => {
      locked.current = false;
    }, 550);
  }, []);

  const onScrollHintNext = useCallback(() => {
    if (compactHomeIntroActive) {
      revealCompactHomeGrid();
      return;
    }
    advance(1);
  }, [compactHomeIntroActive, revealCompactHomeGrid, advance]);

  const onHorseRideX = useCallback(
    (tx: number, travelTotal: number) => {
      if (travelTotal <= 0) return;
      const iw = window.innerWidth;
      const scale = iw / artboard.w;
      const hb = horseArtboardFor(layoutProfile);
      const horseL = hb.x * scale;
      const horseW = hb.w * scale;
      const leading = horseL + tx + horseW;
      const margin = Math.max(6, 16 * scale);
      const compact = layoutProfile === "compact";
      for (const c of cellsForProfile(layoutProfile)) {
        if (horseRevealedRef.current.has(c.id)) continue;
        if (horseRevealTimeoutsRef.current.has(c.id)) continue;
        const thresh = horseCellRevealThresholdPx(c, scale, margin, compact);
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
        }, horseCellRevealDelayMs(c, compact));
        horseRevealTimeoutsRef.current.set(cellId, tid);
      }
    },
    [layoutProfile, artboard.w],
  );

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
      const scale = iw / artboard.w;
      const margin = Math.max(6, 16 * scale);
      const hb = horseArtboardFor(layoutProfile);
      const horseL = hb.x * scale;
      const horseW = hb.w * scale;
      const leadingEnd = horseL + travelTotal + horseW;
      const compact = layoutProfile === "compact";
      const layoutCells = cellsForProfile(layoutProfile);

      const missed: string[] = [];
      for (const c of layoutCells) {
        if (horseRevealedRef.current.has(c.id)) continue;
        if (pending.includes(c.id)) continue;
        const thresh = horseCellRevealThresholdPx(c, scale, margin, compact);
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
    [goToSection, clearHorseRevealTimeouts, layoutProfile, artboard.w],
  );

  useEffect(() => {
    const compactIntro =
      layoutProfile === "compact" &&
      section === 0 &&
      !compactHomeGridVisible;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) <= 5) return;
      const down = e.deltaY > 0;
      if (compactIntro) {
        if (down) revealCompactHomeGrid();
        return;
      }
      advance(down ? 1 : -1);
    };
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) <= 40) return;
      const down = dy > 0;
      if (compactIntro) {
        if (down) revealCompactHomeGrid();
        return;
      }
      advance(down ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        if (compactIntro) {
          revealCompactHomeGrid();
          return;
        }
        advance(1);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (compactIntro) return;
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
  }, [advance, layoutProfile, revealCompactHomeGrid, section, compactHomeGridVisible]);

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
      setSection(parsed.sectionIndex);
      applySeoToDocument(parsed.sectionIndex);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const current = sections[section] ?? {};
  const missionCells = sections[SECTION_MISSION_INDEX] ?? {};
  const uniqueCells = sections[SECTION_UNIQUE_INDEX] ?? {};
  const liveLabel = SECTION_NAV[section] ?? SECTION_NAV[0];

  const tileMotionClass = "absolute inset-0";

  const stageContent = (
    <>
      <MosaicBackground
        className="absolute inset-0 h-full w-full"
        variant={layoutProfile}
        aria-hidden
      />

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

      {!compactHomeIntroActive &&
        ills.map((ill, i) =>
        ill.svg ? (
          <div
            key={ill.id}
            className="pointer-events-none absolute overflow-hidden"
            style={{
              ...vp(ill.x, ill.y, ill.w, ill.h, artboard),
              ...(ill.clip && !isCompact ? { clipPath: ill.clip } : {}),
            }}
            aria-hidden
          >
            <AnimatePresence mode="popLayout" custom={dir} initial={false}>
              <motion.div
                key={`${ill.id}-${section}`}
                className={`absolute inset-0 flex min-h-0 ${ill.box}`}
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

      {cells.map((cell) => {
        if (compactHomeIntroActive && cell.id !== "hero") return null;
        if (isCompact && cell.w === 0 && cell.h === 0) return null;

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

        if (isCompact && !missionPhase && !uniqueHorsePhase && !defaultTile) return null;

        const cellFrameClass =
          cell.id === "r2c"
            ? "absolute overflow-visible z-10 @container"
            : "absolute overflow-hidden @container";

        const cellInner = (
          <AnimatePresence mode="popLayout" custom={dir} initial={false}>
            {missionPhase ? (
              <motion.div
                key={`${cell.id}-${SECTION_MISSION_INDEX}`}
                className={tileMotionClass}
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
                key={`${cell.id}-${SECTION_UNIQUE_INDEX}`}
                className={tileMotionClass}
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
                key={`${cell.id}-${section}`}
                className={tileMotionClass}
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
        );

        if (isCompact && cell.id === "hero") {
          return (
            <motion.div
              key={cell.id}
              className={`${cellFrameClass}${compactHomeIntroActive ? " z-20" : ""}`}
              initial={false}
              animate={{
                left: compactHomeIntroActive ? "0%" : `${(cell.x / artboard.w) * 100}%`,
                top: compactHomeIntroActive ? "0%" : `${(cell.y / artboard.h) * 100}%`,
                width: compactHomeIntroActive
                  ? "100%"
                  : `${(cell.w / artboard.w) * 100}%`,
                height: compactHomeIntroActive
                  ? "100%"
                  : `${(cell.h / artboard.h) * 100}%`,
              }}
              transition={
                reducedMotion
                  ? { type: "tween" as const, duration: 0.25 }
                  : SPRING
              }
              style={{
                position: "absolute",
                ...(cell.clip ? { clipPath: cell.clip } : {}),
              }}
            >
              {cellInner}
            </motion.div>
          );
        }

        return (
          <div
            key={cell.id}
            className={cellFrameClass}
            style={{
              ...vp(cell.x, cell.y, cell.w, cell.h, artboard),
              ...(cell.clip ? { clipPath: cell.clip } : {}),
            }}
          >
            {cellInner}
          </div>
        );
      })}

      <MosaicBackground
        className="pointer-events-none absolute inset-0 h-full w-full"
        strokeOnly
        variant={layoutProfile}
        aria-hidden
      />

      {horseToUnique === "horse_video" ? (
        <HorseMissionTransition
          horseBox={horseBox}
          artboard={artboard}
          onComplete={onHorseMissionTransitionComplete}
          onRideX={onHorseRideX}
          onVideoReady={() => setHorseChromaSvgHidden(true)}
        />
      ) : null}
    </>
  );

  return (
    <div
      className="fixed inset-0 font-sans"
      style={{ background: INK }}
      role="region"
      aria-label={REGION_ARIA}
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {liveLabel}
      </p>
      <div className="absolute inset-0 overflow-hidden">{stageContent}</div>

      <ScrollSectionHint
        label="Scroll"
        nextSectionAria={
          compactHomeIntroActive
            ? "Ver mosaico completo de inicio"
            : "Ir a la siguiente sección"
        }
        visible={section < NUM_SECTIONS - 1 && !horseToUnique}
        reducedMotion={reducedMotion}
        onNext={onScrollHintNext}
      />
    </div>
  );
}
