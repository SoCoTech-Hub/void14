import { sql } from "drizzle-orm";
import { pgTable, real, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getEnrolLtiUsers } from "../api/enrolLtiUsers/queries";
import { enrolLtiDeployments } from "./enrolLtiDeployments";

export const enrolLtiUsers = pgTable("enrol_lti_users", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  consumerKey: text("consumer_key"),
  consumerSecret: text("consumer_secret"),
  lastAccess: timestamp("last_access"),
  lastGrade: real("last_grade"),
  enrolLtiDeploymentId: varchar("enrol_lti_deployment_id", { length: 256 })
    .references(() => enrolLtiDeployments.id, { onDelete: "cascade" })
    .notNull(),
  membershipsId: text("memberships_id"),
  membershipsUrl: text("memberships_url"),
  serviceUrl: text("service_url"),
  sourceId: text("source_id"),
  toolId: varchar("tool_id", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for enrolLtiUsers - used to validate API requests
const baseSchema = createSelectSchema(enrolLtiUsers).omit(timestamps);

export const insertEnrolLtiUserSchema =
  createInsertSchema(enrolLtiUsers).omit(timestamps);
export const insertEnrolLtiUserParams = baseSchema
  .extend({
    lastAccess: z.coerce.string().min(1),
    lastGrade: z.coerce.number(),
    enrolLtiDeploymentId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateEnrolLtiUserSchema = baseSchema;
export const updateEnrolLtiUserParams = baseSchema
  .extend({
    lastAccess: z.coerce.string().min(1),
    lastGrade: z.coerce.number(),
    enrolLtiDeploymentId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const enrolLtiUserIdSchema = baseSchema.pick({ id: true });

// Types for enrolLtiUsers - used to type API request params and within Components
export type EnrolLtiUser = typeof enrolLtiUsers.$inferSelect;
export type NewEnrolLtiUser = z.infer<typeof insertEnrolLtiUserSchema>;
export type NewEnrolLtiUserParams = z.infer<typeof insertEnrolLtiUserParams>;
export type UpdateEnrolLtiUserParams = z.infer<typeof updateEnrolLtiUserParams>;
export type EnrolLtiUserId = z.infer<typeof enrolLtiUserIdSchema>["id"];

// this type infers the return from getEnrolLtiUsers() - meaning it will include any joins
export type CompleteEnrolLtiUser = Awaited<
  ReturnType<typeof getEnrolLtiUsers>
>["enrolLtiUsers"][number];
