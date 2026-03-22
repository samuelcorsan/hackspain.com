import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

function useOnceReadyVideo(
  videoRef: { current: HTMLVideoElement | null },
  src: string,
  onMediaReady?: () => void,
) {
  const firedRef = useRef(false);
  useEffect(() => {
    if (!onMediaReady) return;
    firedRef.current = false;
    const video = videoRef.current;
    if (!video) return;
    const fire = () => {
      if (firedRef.current) return;
      if (!video.videoWidth) return;
      firedRef.current = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(onMediaReady);
      });
    };
    if (
      video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
      video.videoWidth
    ) {
      fire();
    }
    video.addEventListener("loadeddata", fire, { once: true });
    video.addEventListener("error", () => {
      if (firedRef.current) return;
      firedRef.current = true;
      onMediaReady();
    });
  }, [onMediaReady, src]);
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const v = parseInt(n, 16);
  if (Number.isNaN(v) || n.length !== 6) return [0, 255, 0];
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

type Props = {
  src: string;
  keyColor: string;
  tolerance?: number;
  minLuma?: number;
  greenLeadR?: number;
  greenLeadB?: number;
  className?: string;
  onMediaReady?: () => void;
};

export const ChromaKeyVideo = forwardRef<HTMLVideoElement, Props>(
    function ChromaKeyVideo(
    {
      src,
      keyColor,
      tolerance = 85,
      minLuma = 34,
      greenLeadR = 10,
      greenLeadB = 6,
      className = "",
      onMediaReady,
    }: Props,
    ref,
  ) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useImperativeHandle(ref, () => videoRef.current!, []);
    useOnceReadyVideo(videoRef, src, onMediaReady);

    const [kr, kg, kb] = useMemo(() => hexToRgb(keyColor), [keyColor]);

    useEffect(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      let raf = 0;
      const tol2 = tolerance * tolerance;

      const loop = () => {
        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          const vw = video.videoWidth;
          const vh = video.videoHeight;
          if (vw && vh) {
            if (canvas.width !== vw || canvas.height !== vh) {
              canvas.width = vw;
              canvas.height = vh;
            }
            ctx.drawImage(video, 0, 0, vw, vh);
            const img = ctx.getImageData(0, 0, vw, vh);
            const d = img.data;
            for (let i = 0; i < d.length; i += 4) {
              const r = d[i]!;
              const g = d[i + 1]!;
              const b = d[i + 2]!;
              const luma = 0.299 * r + 0.587 * g + 0.114 * b;
              if (luma < minLuma) continue;
              if (!(g >= r + greenLeadR && g >= b + greenLeadB)) continue;
              const dr = r - kr;
              const dg = g - kg;
              const db = b - kb;
              if (dr * dr + dg * dg + db * db <= tol2) {
                d[i + 3] = 0;
              }
            }
            ctx.putImageData(img, 0, 0);
          }
        }
        raf = requestAnimationFrame(loop);
      };

      raf = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(raf);
    }, [kr, kg, kb, tolerance, minLuma, greenLeadR, greenLeadB]);

    return (
      <span
        className={`relative flex h-full w-full items-end justify-center overflow-hidden ${className}`}
      >
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          className="pointer-events-none absolute h-px w-px opacity-0"
          aria-hidden
        />
        <canvas ref={canvasRef} className="max-h-full max-w-full" />
      </span>
    );
  },
);
