import { useSyncExternalStore } from "react";
import { COMPACT_MEDIA_QUERY, type LayoutProfile } from "./artboard";

function getSnapshot(): LayoutProfile {
  if (typeof window === "undefined") {
    return "desktop";
  }
  return window.matchMedia(COMPACT_MEDIA_QUERY).matches ? "compact" : "desktop";
}

function subscribe(onChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  const mq = window.matchMedia(COMPACT_MEDIA_QUERY);
  mq.addEventListener("change", onChange);
  window.addEventListener("resize", onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    window.removeEventListener("resize", onChange);
  };
}

export function useLayoutProfile(): LayoutProfile {
  return useSyncExternalStore(subscribe, getSnapshot, () => "desktop");
}
