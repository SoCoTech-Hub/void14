import {
  integer,
  pgTable,
  real,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

export const ltiSubmissions = pgTable("lti_submissions", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  dateSubmitted: timestamp("date_submitted"),
  dateUpdated: timestamp("date_updated"),
  gradePercent: real("grade_percent"),
  launchId: varchar("launch_id", { length: 256 }),
  ltiId: varchar("lti_id", { length: 256 }),
  originalGrade: real("original_grade"),
  state: integer("state"),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

// Schema for ltiSubmissions - used to validate API requests
const baseSchema = createSelectSchema(ltiSubmissions);

export const insertLtiSubmissionSchema = createInsertSchema(ltiSubmissions);
export const insertLtiSubmissionParams = baseSchema
  .extend({
    dateSubmitted: z.coerce.string().min(1),
    dateUpdated: z.coerce.string().min(1),
    gradePercent: z.coerce.number(),
    originalGrade: z.coerce.number(),
    state: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateLtiSubmissionSchema = baseSchema;
export const updateLtiSubmissionParams = baseSchema
  .extend({
    dateSubmitted: z.coerce.string().min(1),
    dateUpdated: z.coerce.string().min(1),
    gradePercent: z.coerce.number(),
    originalGrade: z.coerce.number(),
    state: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const ltiSubmissionIdSchema = baseSchema.pick({ id: true });

// Types for ltiSubmissions - used to type API request params and within Components
export type LtiSubmission = typeof ltiSubmissions.$inferSelect;
export type NewLtiSubmission = z.infer<typeof insertLtiSubmissionSchema>;
export type NewLtiSubmissionParams = z.infer<typeof insertLtiSubmissionParams>;
export type UpdateLtiSubmissionParams = z.infer<
  typeof updateLtiSubmissionParams
>;
export type LtiSubmissionId = z.infer<typeof ltiSubmissionIdSchema>["id"];
