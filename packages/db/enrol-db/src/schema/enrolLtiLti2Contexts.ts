import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const enrolLtiLti2Contexts = pgTable("enrol_lti_lti2_contexts", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  consumerId: varchar("consumer_id", { length: 256 }),
  settings: text("settings"),
  ltiContextKey: varchar("lti_context_key", { length: 256 }),
  type: varchar("type", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for enrolLtiLti2Contexts - used to validate API requests
const baseSchema = createSelectSchema(enrolLtiLti2Contexts).omit(timestamps);

export const insertEnrolLtiLti2ContextSchema =
  createInsertSchema(enrolLtiLti2Contexts).omit(timestamps);
export const insertEnrolLtiLti2ContextParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateEnrolLtiLti2ContextSchema = baseSchema;
export const updateEnrolLtiLti2ContextParams = baseSchema.extend({});
export const enrolLtiLti2ContextIdSchema = baseSchema.pick({ id: true });

// Types for enrolLtiLti2Contexts - used to type API request params and within Components
export type EnrolLtiLti2Context = typeof enrolLtiLti2Contexts.$inferSelect;
export type NewEnrolLtiLti2Context = z.infer<
  typeof insertEnrolLtiLti2ContextSchema
>;
export type NewEnrolLtiLti2ContextParams = z.infer<
  typeof insertEnrolLtiLti2ContextParams
>;
export type UpdateEnrolLtiLti2ContextParams = z.infer<
  typeof updateEnrolLtiLti2ContextParams
>;
export type EnrolLtiLti2ContextId = z.infer<
  typeof enrolLtiLti2ContextIdSchema
>["id"];
