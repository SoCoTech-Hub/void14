
import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const jobApplications = pgTable("job_applications", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  institution: varchar("institution", { length: 256 }),
  term: varchar("term", { length: 256 }),
  body: text("body"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for jobApplications - used to validate API requests
const baseSchema = createSelectSchema(jobApplications).omit(timestamps);

export const insertJobApplicationSchema =
  createInsertSchema(jobApplications).omit(timestamps);
export const insertJobApplicationParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateJobApplicationSchema = baseSchema;
export const updateJobApplicationParams = baseSchema.extend({}).omit({
  userId: true,
});
export const jobApplicationIdSchema = baseSchema.pick({ id: true });

// Types for jobApplications - used to type API request params and within Components
export type JobApplication = typeof jobApplications.$inferSelect;
export type NewJobApplication = z.infer<typeof insertJobApplicationSchema>;
export type NewJobApplicationParams = z.infer<
  typeof insertJobApplicationParams
>;
export type UpdateJobApplicationParams = z.infer<
  typeof updateJobApplicationParams
>;
export type JobApplicationId = z.infer<typeof jobApplicationIdSchema>["id"];

