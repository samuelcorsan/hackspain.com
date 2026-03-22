import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { InlineSvg } from "./InlineSvg";
import { MosaicBackground } from "./MosaicBackground";
import { vp } from "./Panel";
import { INK, NUM_SECTIONS, SPRING, slideVariants } from "./constants";
import { CELLS } from "./cells";
import { ILLS } from "./assets";
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
  const locked = useRef(false);
  const activeLocaleRef = useRef(activeLocale);
  activeLocaleRef.current = activeLocale;

  const sections = useMemo(() => buildSections(activeLocale), [activeLocale]);
  const copy = useMemo(() => getCopy(activeLocale), [activeLocale]);

  useEffect(() => {
    setActiveLocale(locale);
  }, [locale]);

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
    (next: number, d: 1 | -1) => {
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
      setTimeout(() => {
        locked.current = false;
      }, 700);
    },
    [activeLocale, urlMode],
  );

  const advance = useCallback(
    (d: 1 | -1) => {
      const next = Math.max(0, Math.min(NUM_SECTIONS - 1, section + d));
      if (next === section) return;
      goToSection(next, d);
    },
    [section, goToSection],
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

      {ILLS.map((ill, i) => (
        <div
          key={i}
          className={`absolute overflow-hidden flex ${ill.box}`}
          style={vp(ill.x, ill.y, ill.w, ill.h)}
          aria-hidden
        >
          <InlineSvg svg={ill.svg} className={ill.img} decorative />
        </div>
      ))}

      {CELLS.map((cell) => (
        <div
          key={cell.id}
          className="absolute overflow-hidden"
          style={{
            ...vp(cell.x, cell.y, cell.w, cell.h),
            ...(cell.clip ? { clipPath: cell.clip } : {}),
          }}
        >
          <AnimatePresence mode="popLayout" custom={dir} initial={false}>
            {current[cell.id] && (
              <motion.div
                key={`${cell.id}-${section}-${activeLocale}`}
                className="absolute inset-0"
                custom={dir}
                variants={variants}
                initial="enter"
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
            )}
          </AnimatePresence>
        </div>
      ))}

      <MosaicBackground className="absolute inset-0 h-full w-full pointer-events-none" strokeOnly aria-hidden />
    </div>
  );
}
