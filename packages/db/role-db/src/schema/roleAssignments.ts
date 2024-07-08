import { type getRoleAssignments } from "@/lib/api/roleAssignments/queries";
import { sql } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { roles } from "./roles";

export const roleAssignments = pgTable("role_assignments", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  component: varchar("component", { length: 256 }),
  contextId: varchar("context_id", { length: 256 }),
  itemId: varchar("item_id", { length: 256 }),
  modifierUserId: varchar("modifier_user_id", { length: 256 }),
  roleId: varchar("role_id", { length: 256 })
    .references(() => roles.id)
    .notNull(),
  sortOrder: integer("sort_order"),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for roleAssignments - used to validate API requests
const baseSchema = createSelectSchema(roleAssignments).omit(timestamps);

export const insertRoleAssignmentSchema =
  createInsertSchema(roleAssignments).omit(timestamps);
export const insertRoleAssignmentParams = baseSchema
  .extend({
    roleId: z.coerce.string().min(1),
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateRoleAssignmentSchema = baseSchema;
export const updateRoleAssignmentParams = baseSchema
  .extend({
    roleId: z.coerce.string().min(1),
    sortOrder: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const roleAssignmentIdSchema = baseSchema.pick({ id: true });

// Types for roleAssignments - used to type API request params and within Components
export type RoleAssignment = typeof roleAssignments.$inferSelect;
export type NewRoleAssignment = z.infer<typeof insertRoleAssignmentSchema>;
export type NewRoleAssignmentParams = z.infer<
  typeof insertRoleAssignmentParams
>;
export type UpdateRoleAssignmentParams = z.infer<
  typeof updateRoleAssignmentParams
>;
export type RoleAssignmentId = z.infer<typeof roleAssignmentIdSchema>["id"];

// this type infers the return from getRoleAssignments() - meaning it will include any joins
export type CompleteRoleAssignment = Awaited<
  ReturnType<typeof getRoleAssignments>
>["roleAssignments"][number];
