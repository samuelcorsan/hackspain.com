import type { ClipboardEvent } from "react";
import { cleanProfilePasteText, type ProfileFieldKind } from "../../../lib/signupValidation";

const socialComboWrapClass =
  "flex w-full min-w-0 rounded-sm border-[3px] border-hs-ink bg-hs-paper transition-[border-color] duration-150 ease-out focus-within:border-hs-navy [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_var(--color-hs-paper)]";

const socialPrefixClass =
  "inline-flex shrink-0 items-center self-stretch whitespace-nowrap border-r-[3px] border-hs-ink bg-hs-sand/45 px-2 font-mono text-[clamp(0.62rem,2.2vw,0.8125rem)] font-bold leading-tight tracking-tight text-hs-ink select-none sm:px-2.5 sm:text-sm";

const socialInnerInputClass =
  "font-sans min-w-0 flex-1 border-0 bg-transparent px-2 py-2 text-base text-hs-ink outline-none focus:outline-none focus-visible:outline-none [color-scheme:light] placeholder:text-hs-ink/42 selection:bg-hs-gold/50 selection:text-hs-ink focus:ring-0 focus-visible:ring-0 [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-hs-ink)]";

export type SocialPrefixInputProps = {
  id?: string;
  name: string;
  prefix: string;
  profileKind: ProfileFieldKind;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export function SocialPrefixInput({
  id,
  name,
  prefix,
  profileKind,
  value,
  onChange,
  placeholder,
}: SocialPrefixInputProps) {
  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const raw = e.clipboardData.getData("text/plain");
    onChange(cleanProfilePasteText(raw, profileKind));
  }

  return (
    <div className={socialComboWrapClass}>
      <span className={socialPrefixClass} aria-hidden="true">
        {prefix}
      </span>
      <input
        id={id ?? undefined}
        className={socialInnerInputClass}
        name={name}
        type="text"
        inputMode="text"
        autoComplete="off"
        spellCheck={false}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onPaste={onPaste}
      />
    </div>
  );
}
