import codeRaw       from "../../assets/illustration-code.svg?raw";
import communityRaw  from "../../assets/illustration-community.svg?raw";
import compassRaw    from "../../assets/illustration-compass.svg?raw";
import horseRaw      from "../../assets/illustration-horse.svg?raw";
import medalRaw      from "../../assets/illustration-medal.svg?raw";
import quixoteRaw    from "../../assets/illustration-quixote.svg?raw";
import sparkRaw      from "../../assets/illustration-spark.svg?raw";
import sunRaw        from "../../assets/illustration-sun.svg?raw";
import trophyRaw     from "../../assets/illustration-trophy.svg?raw";
import windmillRaw   from "../../assets/illustration-windmill.svg?raw";
import logoRaw     from "../../assets/logo.svg?raw";
import googlePng   from "../../assets/sponsors/google.png";
import mozartPng   from "../../assets/sponsors/mozart.png";
import exaPng      from "../../assets/sponsors/exa.png";
import falPng      from "../../assets/sponsors/fal.png";
import kfundPng    from "../../assets/sponsors/kfund.png";
import { prepareIllustrationSvg } from "./svg/prepareIllustrationSvg";
import { prepareLogoSvg }         from "./svg/prepareLogoSvg";

export const windmillSvg   = prepareIllustrationSvg(windmillRaw);
export const horseSvg      = prepareIllustrationSvg(horseRaw);
export const sunSvg        = prepareIllustrationSvg(sunRaw);
export const quixoteSvg    = prepareIllustrationSvg(quixoteRaw);
export const sparkSvg      = prepareIllustrationSvg(sparkRaw);
export const codeSvg       = prepareIllustrationSvg(codeRaw);
export const communitySvg  = prepareIllustrationSvg(communityRaw);
export const trophySvg     = prepareIllustrationSvg(trophyRaw);
export const compassSvg    = prepareIllustrationSvg(compassRaw);
export const medalSvg      = prepareIllustrationSvg(medalRaw);
export const logoSvg     = prepareLogoSvg(logoRaw);
export const googleLogo = googlePng;

export const exaLogo   = exaPng;
export const falLogo   = falPng;
export const kfundLogo = kfundPng;
export const mozartLogo = mozartPng;

