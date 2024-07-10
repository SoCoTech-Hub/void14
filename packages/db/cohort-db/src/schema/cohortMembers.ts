import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

import { cohorts } from "./cohorts";

export const cohortMembers = pgTable("cohort_members", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  cohortId: varchar("cohort_id", { length: 256 })
    .references(() => cohorts.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for cohortMembers - used to validate API requests
const baseSchema = createSelectSchema(cohortMembers).omit(timestamps);

export const insertCohortMemberSchema =
  createInsertSchema(cohortMembers).omit(timestamps);
export const insertCohortMemberParams = baseSchema
  .extend({
    cohortId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateCohortMemberSchema = baseSchema;
export const updateCohortMemberParams = baseSchema
  .extend({
    cohortId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const cohortMemberIdSchema = baseSchema.pick({ id: true });

// Types for cohortMembers - used to type API request params and within Components
export type CohortMember = typeof cohortMembers.$inferSelect;
export type NewCohortMember = z.infer<typeof insertCohortMemberSchema>;
export type NewCohortMemberParams = z.infer<typeof insertCohortMemberParams>;
export type UpdateCohortMemberParams = z.infer<typeof updateCohortMemberParams>;
export type CohortMemberId = z.infer<typeof cohortMemberIdSchema>["id"];
