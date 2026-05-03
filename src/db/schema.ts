import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const hackathonSignups = pgTable("hackathon_signups", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  xUrl: text("x_url"),
  linkedinUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  webUrl: text("web_url"),
  achievements: text("achievements"),
  freeTime: text("free_time"),
  wantsAmbassador: boolean("wants_ambassador").default(false).notNull(),
  ambassadorMotivation: text("ambassador_motivation"),
  ambassadorStudyWhere: text("ambassador_study_where"),
  heardFrom: text("heard_from"),
});

export type HackathonSignup = typeof hackathonSignups.$inferSelect;
export type NewHackathonSignup = typeof hackathonSignups.$inferInsert;

export const ambassadorApplications = pgTable("ambassador_applications", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  institution: text("institution").notNull(),
  cityRegion: text("city_region").notNull(),
  xUrl: text("x_url"),
  linkedinUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  webUrl: text("web_url"),
  motivation: text("motivation").notNull(),
  outreachPlan: text("outreach_plan").notNull(),
});

export type AmbassadorApplication = typeof ambassadorApplications.$inferSelect;
export type NewAmbassadorApplication =
  typeof ambassadorApplications.$inferInsert;
