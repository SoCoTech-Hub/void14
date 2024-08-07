import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const enrolLtiContexts = pgTable("enrol_lti_contexts", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  contextId: varchar("context_id", { length: 256 }),
  ltiDeploymentId: varchar("lti_deployment_id", { length: 256 }),
  type: text("type"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for enrolLtiContexts - used to validate API requests
const baseSchema = createSelectSchema(enrolLtiContexts).omit(timestamps);

export const insertEnrolLtiContextSchema =
  createInsertSchema(enrolLtiContexts).omit(timestamps);
export const insertEnrolLtiContextParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateEnrolLtiContextSchema = baseSchema;
export const updateEnrolLtiContextParams = baseSchema.extend({});
export const enrolLtiContextIdSchema = baseSchema.pick({ id: true });

// Types for enrolLtiContexts - used to type API request params and within Components
export type EnrolLtiContext = typeof enrolLtiContexts.$inferSelect;
export type NewEnrolLtiContext = z.infer<typeof insertEnrolLtiContextSchema>;
export type NewEnrolLtiContextParams = z.infer<
  typeof insertEnrolLtiContextParams
>;
export type UpdateEnrolLtiContextParams = z.infer<
  typeof updateEnrolLtiContextParams
>;
export type EnrolLtiContextId = z.infer<typeof enrolLtiContextIdSchema>["id"];
