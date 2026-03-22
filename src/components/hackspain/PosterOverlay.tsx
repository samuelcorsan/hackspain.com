type Props = {
  src: string;
  className?: string;
  blend?: "normal" | "multiply" | "overlay";
  opacity?: number;
};

export function PosterOverlay({ src, className = "", blend = "multiply", opacity = 0.35 }: Props) {
  return (
    <img
      src={src}
      alt=""
      className={className}
      decoding="async"
      fetchPriority="high"
      style={{
        mixBlendMode: blend,
        opacity,
      }}
    />
  );
}
