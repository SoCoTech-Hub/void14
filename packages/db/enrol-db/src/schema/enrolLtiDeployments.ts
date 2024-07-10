import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

export const enrolLtiDeployments = pgTable("enrol_lti_deployments", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  deploymentId: varchar("deployment_id", { length: 256 }),
  legacyConsumerKey: varchar("legacy_consumer_key", { length: 256 }),
  name: varchar("name", { length: 256 }),
  platformId: varchar("platform_id", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for enrolLtiDeployments - used to validate API requests
const baseSchema = createSelectSchema(enrolLtiDeployments).omit(timestamps);

export const insertEnrolLtiDeploymentSchema =
  createInsertSchema(enrolLtiDeployments).omit(timestamps);
export const insertEnrolLtiDeploymentParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateEnrolLtiDeploymentSchema = baseSchema;
export const updateEnrolLtiDeploymentParams = baseSchema.extend({});
export const enrolLtiDeploymentIdSchema = baseSchema.pick({ id: true });

// Types for enrolLtiDeployments - used to type API request params and within Components
export type EnrolLtiDeployment = typeof enrolLtiDeployments.$inferSelect;
export type NewEnrolLtiDeployment = z.infer<
  typeof insertEnrolLtiDeploymentSchema
>;
export type NewEnrolLtiDeploymentParams = z.infer<
  typeof insertEnrolLtiDeploymentParams
>;
export type UpdateEnrolLtiDeploymentParams = z.infer<
  typeof updateEnrolLtiDeploymentParams
>;
export type EnrolLtiDeploymentId = z.infer<
  typeof enrolLtiDeploymentIdSchema
>["id"];
