import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getEnrolLtiLti2UserResults } from "../api/enrolLtiLti2UserResults/queries";

export const enrolLtiLti2UserResults = pgTable("enrol_lti_lti2_user_results", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  ltiResultSourcedId: varchar("lti_result_sourced_id", { length: 256 }),
  ltiUserKey: varchar("lti_user_key", { length: 256 }),
  resourceLinkId: varchar("resource_link_id", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for enrolLtiLti2UserResults - used to validate API requests
const baseSchema = createSelectSchema(enrolLtiLti2UserResults).omit(timestamps);

export const insertEnrolLtiLti2UserResultSchema = createInsertSchema(
  enrolLtiLti2UserResults,
).omit(timestamps);
export const insertEnrolLtiLti2UserResultParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateEnrolLtiLti2UserResultSchema = baseSchema;
export const updateEnrolLtiLti2UserResultParams = baseSchema.extend({});
export const enrolLtiLti2UserResultIdSchema = baseSchema.pick({ id: true });

// Types for enrolLtiLti2UserResults - used to type API request params and within Components
export type EnrolLtiLti2UserResult =
  typeof enrolLtiLti2UserResults.$inferSelect;
export type NewEnrolLtiLti2UserResult = z.infer<
  typeof insertEnrolLtiLti2UserResultSchema
>;
export type NewEnrolLtiLti2UserResultParams = z.infer<
  typeof insertEnrolLtiLti2UserResultParams
>;
export type UpdateEnrolLtiLti2UserResultParams = z.infer<
  typeof updateEnrolLtiLti2UserResultParams
>;
export type EnrolLtiLti2UserResultId = z.infer<
  typeof enrolLtiLti2UserResultIdSchema
>["id"];

// this type infers the return from getEnrolLtiLti2UserResults() - meaning it will include any joins
export type CompleteEnrolLtiLti2UserResult = Awaited<
  ReturnType<typeof getEnrolLtiLti2UserResults>
>["enrolLtiLti2UserResults"][number];
