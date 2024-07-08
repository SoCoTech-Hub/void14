import { type getToolCohortRoles } from "@/lib/api/toolCohortRoles/queries";
import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const toolCohortRoles = pgTable("tool_cohort_roles", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  cohortId: varchar("cohort_id", { length: 256 }),
  roleId: varchar("role_id", { length: 256 }),
  userModified: varchar("user_modified", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for toolCohortRoles - used to validate API requests
const baseSchema = createSelectSchema(toolCohortRoles).omit(timestamps);

export const insertToolCohortRoleSchema =
  createInsertSchema(toolCohortRoles).omit(timestamps);
export const insertToolCohortRoleParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateToolCohortRoleSchema = baseSchema;
export const updateToolCohortRoleParams = baseSchema.extend({}).omit({
  userId: true,
});
export const toolCohortRoleIdSchema = baseSchema.pick({ id: true });

// Types for toolCohortRoles - used to type API request params and within Components
export type ToolCohortRole = typeof toolCohortRoles.$inferSelect;
export type NewToolCohortRole = z.infer<typeof insertToolCohortRoleSchema>;
export type NewToolCohortRoleParams = z.infer<
  typeof insertToolCohortRoleParams
>;
export type UpdateToolCohortRoleParams = z.infer<
  typeof updateToolCohortRoleParams
>;
export type ToolCohortRoleId = z.infer<typeof toolCohortRoleIdSchema>["id"];

// this type infers the return from getToolCohortRoles() - meaning it will include any joins
export type CompleteToolCohortRole = Awaited<
  ReturnType<typeof getToolCohortRoles>
>["toolCohortRoles"][number];
