import { z } from "zod";
import { SIGNUP_MAX, socialField } from "./signupValidation";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ambassadorBodySchema = z
  .object({
    fullName: z
      .string()
      .max(SIGNUP_MAX.name)
      .transform((s) => s.trim())
      .refine((s) => s.length > 0, { message: "fullName_required" }),
    email: z
      .string()
      .max(SIGNUP_MAX.email)
      .transform((s) => s.trim().toLowerCase())
      .refine((s) => EMAIL_RE.test(s), { message: "invalid_email" }),
    institution: z
      .string()
      .max(280)
      .transform((s) => s.trim())
      .refine((s) => s.length > 0, { message: "institution_required" }),
    cityRegion: z
      .string()
      .max(200)
      .transform((s) => s.trim())
      .refine((s) => s.length > 0, { message: "city_required" }),
    xUrl: socialField("x"),
    linkedinUrl: socialField("linkedin"),
    githubUrl: socialField("github"),
    webUrl: socialField("web"),
    motivation: z
      .string()
      .max(SIGNUP_MAX.longText)
      .transform((s) => s.trim())
      .refine((s) => s.length > 0, { message: "motivation_required" }),
    outreachPlan: z
      .string()
      .max(SIGNUP_MAX.longText)
      .transform((s) => s.trim())
      .refine((s) => s.length > 0, { message: "outreach_required" }),
  })
  .superRefine((data, ctx) => {
    const has =
      data.xUrl.length > 0 ||
      data.linkedinUrl.length > 0 ||
      data.githubUrl.length > 0 ||
      data.webUrl.length > 0;
    if (!has) {
      ctx.addIssue({
        code: "custom",
        message: "social_required",
        path: ["xUrl"],
      });
    }
  });

export type AmbassadorBodyParsed = z.infer<typeof ambassadorBodySchema>;

export function parseAmbassadorBody(body: unknown):
  | { ok: true; data: AmbassadorBodyParsed }
  | { ok: false; error: string; status: number } {
  const r = ambassadorBodySchema.safeParse(body);
  if (r.success) {
    return { ok: true, data: r.data };
  }
  const msg = r.error.issues[0]?.message ?? "validation_error";
  if (msg === "social_required") {
    return { ok: false, error: "social_required", status: 400 };
  }
  if (msg === "invalid_social_url") {
    return { ok: false, error: "invalid_social_url", status: 400 };
  }
  if (msg === "invalid_email") {
    return { ok: false, error: "Valid email is required", status: 400 };
  }
  if (msg === "fullName_required") {
    return { ok: false, error: "fullName is required", status: 400 };
  }
  if (msg === "institution_required") {
    return { ok: false, error: "institution is required", status: 400 };
  }
  if (msg === "city_required") {
    return { ok: false, error: "cityRegion is required", status: 400 };
  }
  if (msg === "motivation_required") {
    return { ok: false, error: "motivation is required", status: 400 };
  }
  if (msg === "outreach_required") {
    return { ok: false, error: "outreachPlan is required", status: 400 };
  }
  return { ok: false, error: "Invalid request", status: 400 };
}

export function parseAmbassadorBodyClient(body: unknown):
  | { ok: true; data: AmbassadorBodyParsed }
  | {
      ok: false;
      code:
        | "social_required"
        | "invalid_social_url"
        | "invalid_email"
        | "fullName"
        | "required_field"
        | "generic";
    } {
  const r = ambassadorBodySchema.safeParse(body);
  if (r.success) {
    return { ok: true, data: r.data };
  }
  const msg = r.error.issues[0]?.message;
  if (msg === "social_required") return { ok: false, code: "social_required" };
  if (msg === "invalid_social_url") return { ok: false, code: "invalid_social_url" };
  if (msg === "invalid_email") return { ok: false, code: "invalid_email" };
  if (msg === "fullName_required") return { ok: false, code: "fullName" };
  if (
    msg === "institution_required" ||
    msg === "city_required" ||
    msg === "motivation_required" ||
    msg === "outreach_required"
  ) {
    return { ok: false, code: "required_field" };
  }
  return { ok: false, code: "generic" };
}
