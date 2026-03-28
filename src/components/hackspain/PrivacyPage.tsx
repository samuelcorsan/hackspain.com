import { getCopy } from "../../i18n/copy";
import type { Locale } from "../../i18n/locales";
import { formatRichPolicyText } from "./formatRichPolicyText";
import { MosaicBackground } from "./MosaicBackground";
import { useLayoutProfile } from "./useLayoutProfile";

type Props = { locale: Locale };

export function PrivacyPage({ locale }: Props) {
  const t = getCopy(locale).privacy;
  const profile = useLayoutProfile();

  return (
    <div className="relative z-0 min-h-dvh w-full">
      <MosaicBackground
        className="pointer-events-none fixed inset-0 -z-10 h-full min-h-dvh w-full"
        variant={profile}
      />
      <div className="relative z-0 mx-auto max-w-3xl px-3 pb-10 sm:px-4">
        <article className="border-[3px] border-hs-ink bg-hs-ink">
          <header className="border-b-[3px] border-hs-ink bg-hs-orange px-4 py-5 sm:px-6">
            <h1
              id="privacy-policy"
              className="scroll-mt-28 font-bungee text-2xl leading-tight text-hs-ink sm:text-3xl"
            >
              {t.pageTitle}
            </h1>
            <p className="mt-2 font-sans text-sm font-bold text-hs-ink sm:text-base">{t.updatedLine}</p>
          </header>
          <div className="border-t-[3px] border-hs-ink bg-hs-paper px-4 py-6 sm:px-8 sm:py-10">
            <p className="border-b-[3px] border-hs-ink pb-6 font-sans text-sm font-semibold leading-snug text-hs-brown sm:text-base">
              {formatRichPolicyText(t.disclaimer, "disclaimer")}
            </p>
            <div className="border-b-[3px] border-hs-ink bg-hs-teal/10 px-3 py-5 sm:px-4 sm:py-6">
              <h2 className="font-bungee text-base leading-snug text-hs-ink sm:text-lg">
                {t.goodFaithTitle}
              </h2>
              <p className="mt-2 font-sans text-sm font-semibold leading-relaxed text-hs-ink sm:text-[0.95rem]">
                {formatRichPolicyText(t.goodFaithBody, "good-faith")}
              </p>
            </div>
            <div className="divide-y-[3px] divide-hs-ink">
              {t.sections.map((s) => (
                <section
                  key={s.id}
                  className="scroll-mt-28 pt-8 first:pt-6"
                  aria-labelledby={s.id === "processors-ai" ? "data-processing" : s.id}
                >
                  <h2
                    id={s.id === "processors-ai" ? "data-processing" : s.id}
                    className="font-bungee text-lg leading-snug text-hs-ink sm:text-xl"
                  >
                    {s.title}
                  </h2>
                  <div className="mt-3 space-y-3 font-sans text-sm font-semibold leading-relaxed text-hs-ink sm:text-[0.95rem]">
                    {s.paragraphs.map((p, i) => (
                      <p key={i}>{formatRichPolicyText(p, `${s.id}-${i}`)}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
