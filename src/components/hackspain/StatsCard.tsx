type Props = { className?: string };

export function StatsCard({ className = "" }: Props) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <div className="mx-auto flex w-[min(92vw,24rem)] perspective-[900px]">
        <div
          className="flex w-full border-[3px] border-hs-ink shadow-[8px_8px_0_var(--color-hs-ink)] transform-3d"
          style={{ transform: "rotateX(16deg) rotateY(-12deg) rotateZ(-1deg)" }}
        >
          <div className="flex w-[38%] items-center justify-center border-r-[3px] border-hs-ink bg-hs-orange px-3 py-5">
            <span className="font-['DM_Sans'] text-3xl font-black tracking-tight text-hs-ink sm:text-4xl">
              +300
            </span>
          </div>
          <div className="flex flex-1 items-center bg-hs-gold px-4 py-5">
            <span className="font-['DM_Sans'] text-[0.7rem] font-black leading-snug tracking-[0.18em] text-hs-ink sm:text-xs">
              PARTICIPANTS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
