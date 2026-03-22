import logoRaw from "../../assets/logo.svg?raw";
import { InlineSvg } from "./InlineSvg";
import { prepareLogoSvg } from "./svg/prepareLogoSvg";
import { TriangleDivider } from "./TriangleDivider";

const logoSvg = prepareLogoSvg(logoRaw);

type Props = { className?: string };

export function LogoGroup({ className = "" }: Props) {
  return (
    <div className={`flex w-full max-w-[min(96vw,52rem)] flex-col items-center gap-2 ${className}`}>
      <div className="aspect-242/72 w-full max-w-[min(96vw,720px)] drop-shadow-[0_6px_0_var(--color-hs-ink)]">
        <InlineSvg svg={logoSvg} className="h-full w-full" />
      </div>
      <TriangleDivider className="h-6 w-[min(22rem,88vw)] opacity-95" />
      <svg
        viewBox="0 0 360 120"
        className="h-[clamp(3rem,11vw,6.25rem)] w-[min(100%,24rem)] shrink-0 drop-shadow-[0_5px_0_var(--color-hs-ink)]"
        role="img"
        aria-label="2026"
      >
        <text
          x="180"
          y="90"
          textAnchor="middle"
          fontSize="92"
          fontFamily="Bungee, system-ui, sans-serif"
          fill="var(--color-hs-paper)"
          stroke="var(--color-hs-ink)"
          strokeWidth="9"
          paintOrder="stroke fill"
        >
          2026
        </text>
      </svg>
      <div className="mt-2 rounded-full border-[3px] border-hs-ink bg-hs-ink px-8 py-2.5 shadow-[6px_6px_0_var(--color-hs-gold)]">
        <p className="font-['DM_Sans'] text-[0.7rem] font-extrabold tracking-[0.24em] text-white sm:text-sm">
          MADRID, JUNE
        </p>
      </div>
    </div>
  );
}
