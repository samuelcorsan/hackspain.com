import type { ReactNode } from "react";

const linkClass =
  "break-words font-semibold text-hs-navy underline decoration-2 underline-offset-2 hover:text-hs-ink";

const LINK_RE =
  /(https?:\/\/[^\s<>"'\])]+|www\.[^\s<>"'\])]+|[\w.+%-]+@[\w.-]+\.[a-zA-Z]{2,})/gi;

const BOLD_RE = /\*\*(.+?)\*\*/gs;

function linkifyPlain(segment: string, keyBase: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let ki = 0;
  let m: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((m = LINK_RE.exec(segment)) !== null) {
    const idx = m.index;
    if (idx > last) nodes.push(segment.slice(last, idx));
    const token = m[0];
    const isEmail = token.includes("@") && !/^https?:/i.test(token);
    let href = token;
    if (isEmail) href = `mailto:${token}`;
    else if (/^www\./i.test(token)) href = `https://${token}`;
    nodes.push(
      <a
        key={`${keyBase}-a-${ki++}`}
        href={href}
        className={linkClass}
        {...(isEmail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {token}
      </a>,
    );
    last = idx + token.length;
  }
  if (last < segment.length) nodes.push(segment.slice(last));
  return nodes.length ? nodes : [segment];
}

export function formatRichPolicyText(text: string, keyPrefix: string): ReactNode {
  const parts: ReactNode[] = [];
  let pos = 0;
  let bi = 0;
  let foundBold = false;
  for (const m of text.matchAll(BOLD_RE)) {
    foundBold = true;
    const idx = m.index ?? 0;
    if (idx > pos) {
      parts.push(...linkifyPlain(text.slice(pos, idx), `${keyPrefix}-t-${pos}`));
    }
    const inner = m[1] ?? "";
    parts.push(
      <strong key={`${keyPrefix}-b-${bi++}`} className="font-extrabold text-hs-ink">
        {linkifyPlain(inner, `${keyPrefix}-ib-${idx}`)}
      </strong>,
    );
    pos = idx + m[0].length;
  }
  if (!foundBold) {
    return <>{linkifyPlain(text, keyPrefix)}</>;
  }
  if (pos < text.length) {
    parts.push(...linkifyPlain(text.slice(pos), `${keyPrefix}-e-${pos}`));
  }
  return <>{parts}</>;
}
