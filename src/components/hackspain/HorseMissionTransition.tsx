import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import { ChromaKeyVideo } from "./ChromaKeyVideo";
import { vp } from "./Panel";
import {
  HORSE_ARTBOARD,
  HORSE_RETURN_DURATION_S,
  HORSE_RETURN_TELEPORT_FADE_IN_S,
  HORSE_RETURN_TELEPORT_FADE_OUT_S,
  HORSE_VIDEO_CHROMA_GREEN_LEAD_B,
  HORSE_VIDEO_CHROMA_GREEN_LEAD_R,
  HORSE_VIDEO_CHROMA_KEY_HEX,
  HORSE_VIDEO_CHROMA_MIN_LUMA,
  HORSE_VIDEO_CHROMA_TOLERANCE,
  HORSE_VIDEO_SRC,
} from "./constants";

const HORSE = HORSE_ARTBOARD;

const OPACITY_IN_S = 0.22;
const X_DELAY_S = 0.1;
const X_DURATION_S = 3.05;

const EASE_IN_RIDE: [number, number, number, number] = [0.42, 0, 1, 1];
const EASE_RETURN: [number, number, number, number] = [0.22, 1, 0.36, 1];

const OFF_LEFT_MARGIN_PX = 28;

const chromaEnabled = Boolean(HORSE_VIDEO_CHROMA_KEY_HEX);

type Props = {
  onComplete: (travelTotal: number) => void;
  onRideX?: (tx: number, travelTotal: number) => void;
  onVideoReady?: () => void;
};

export function HorseMissionTransition({
  onComplete,
  onRideX,
  onVideoReady,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const onRideXRef = useRef(onRideX);
  onRideXRef.current = onRideX;
  const onVideoReadyRef = useRef(onVideoReady);
  onVideoReadyRef.current = onVideoReady;
  const travelTotalRef = useRef(0);
  const xOffLeftRef = useRef(0);
  const mediaReadyRef = useRef(false);
  const rideAnimsRef = useRef<ReturnType<typeof animate>[]>([]);

  const x = useMotionValue(0);
  const opacity = useMotionValue(0);

  const fireComplete = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    const t = travelTotalRef.current;
    x.set(0);
    onRideXRef.current?.(t, t);
    onCompleteRef.current(t);
  };

  const [travelX, setTravelX] = useState<number | null>(null);
  const [mediaReady, setMediaReady] = useState(false);

  const signalMediaReady = useCallback(() => {
    if (mediaReadyRef.current) return;
    mediaReadyRef.current = true;
    setMediaReady(true);
  }, []);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    const w = typeof window !== "undefined" ? window.innerWidth : 0;
    if (!el) {
      travelTotalRef.current = w;
      xOffLeftRef.current = -w;
      setTravelX(w);
      return;
    }
    const rect = el.getBoundingClientRect();
    const tx = Math.max(0, w - rect.left);
    travelTotalRef.current = tx;
    xOffLeftRef.current = -(rect.left + rect.width + OFF_LEFT_MARGIN_PX);
    setTravelX(tx);
  }, []);

  useMotionValueEvent(x, "change", (latest) => {
    const total = travelTotalRef.current;
    if (total <= 0) return;
    onRideXRef.current?.(latest, total);
  });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    void v.play().catch(() => {});
  }, []);

  useEffect(() => {
    const id = window.setTimeout(signalMediaReady, 2800);
    return () => window.clearTimeout(id);
  }, [signalMediaReady]);

  useLayoutEffect(() => {
    if (chromaEnabled) return;
    const v = videoRef.current;
    if (!v) return;
    const fire = () => signalMediaReady();
    if (
      v.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
      v.videoWidth
    ) {
      requestAnimationFrame(() => requestAnimationFrame(fire));
      return;
    }
    v.addEventListener("loadeddata", fire, { once: true });
    v.addEventListener("error", fire, { once: true });
  }, [signalMediaReady]);

  useEffect(() => {
    const id = window.setTimeout(fireComplete, 16000);
    return () => window.clearTimeout(id);
  }, []);

  useLayoutEffect(() => {
    if (travelX === null || !mediaReady) return;
    let cancelled = false;
    rideAnimsRef.current = [];
    const track = (a: ReturnType<typeof animate>) => {
      rideAnimsRef.current.push(a);
      return a;
    };

    const run = async () => {
      x.set(0);
      let animO: ReturnType<typeof animate> | null = null;
      if (chromaEnabled) {
        flushSync(() => {
          onVideoReadyRef.current?.();
        });
        opacity.set(1);
      } else {
        opacity.set(0);
        animO = track(
          animate(opacity, 1, {
            duration: OPACITY_IN_S,
            ease: [0.24, 0.82, 0.28, 1],
          }),
        );
      }
      const animX1 = track(
        animate(x, travelX, {
          duration: X_DURATION_S,
          delay: X_DELAY_S,
          ease: EASE_IN_RIDE,
        }),
      );
      try {
        if (chromaEnabled) {
          await animX1.finished;
        } else {
          await Promise.all([animO!.finished, animX1.finished]);
        }
      } catch {
        return;
      }
      if (cancelled) return;

      const xLeft = xOffLeftRef.current;
      const fadeOut = track(
        animate(opacity, 0, {
          duration: HORSE_RETURN_TELEPORT_FADE_OUT_S,
          ease: "linear",
        }),
      );
      try {
        await fadeOut.finished;
      } catch {
        return;
      }
      if (cancelled) return;
      x.set(xLeft);
      const fadeIn = track(
        animate(opacity, 1, {
          duration: HORSE_RETURN_TELEPORT_FADE_IN_S,
          ease: "linear",
        }),
      );
      try {
        await fadeIn.finished;
      } catch {
        return;
      }
      if (cancelled) return;
      const animX2 = track(
        animate(x, 0, {
          duration: HORSE_RETURN_DURATION_S,
          ease: EASE_RETURN,
        }),
      );
      try {
        await animX2.finished;
      } catch {
        return;
      }
      if (!cancelled) fireComplete();
    };

    void run();

    return () => {
      cancelled = true;
      rideAnimsRef.current.forEach((a) => a.stop());
      rideAnimsRef.current = [];
    };
  }, [travelX, mediaReady, x, opacity]);

  return (
    <motion.div
      ref={wrapRef}
      className="pointer-events-none absolute z-40 overflow-visible"
      style={{
        ...vp(HORSE.x, HORSE.y, HORSE.w, HORSE.h),
        x,
        opacity,
      }}
      aria-hidden
    >
      {HORSE_VIDEO_CHROMA_KEY_HEX ? (
        <ChromaKeyVideo
          ref={videoRef}
          src={HORSE_VIDEO_SRC}
          keyColor={HORSE_VIDEO_CHROMA_KEY_HEX}
          tolerance={HORSE_VIDEO_CHROMA_TOLERANCE}
          minLuma={HORSE_VIDEO_CHROMA_MIN_LUMA}
          greenLeadR={HORSE_VIDEO_CHROMA_GREEN_LEAD_R}
          greenLeadB={HORSE_VIDEO_CHROMA_GREEN_LEAD_B}
          onMediaReady={signalMediaReady}
        />
      ) : (
        <video
          ref={videoRef}
          src={HORSE_VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-contain object-bottom"
        />
      )}
    </motion.div>
  );
}
