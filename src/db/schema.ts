import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const hackathonSignups = pgTable("hackathon_signups", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  xUrl: text("x_url"),
  linkedinUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  webUrl: text("web_url"),
  achievements: text("achievements"),
  freeTime: text("free_time"),
});

export type HackathonSignup = typeof hackathonSignups.$inferSelect;
export type NewHackathonSignup = typeof hackathonSignups.$inferInsert;
