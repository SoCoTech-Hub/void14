import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getAssignmentUpgrades } from "../api/assignmentUpgrades/queries";

export const assignmentUpgrades = pgTable("assignment_upgrades", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  newCmId: varchar("new_cm_id", { length: 256 }),
  oldCmId: varchar("old_cm_id", { length: 256 }),
  newInstance: varchar("new_instance", { length: 256 }),
  oldInstance: varchar("old_instance", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for assignmentUpgrades - used to validate API requests
const baseSchema = createSelectSchema(assignmentUpgrades).omit(timestamps);

export const insertAssignmentUpgradeSchema =
  createInsertSchema(assignmentUpgrades).omit(timestamps);
export const insertAssignmentUpgradeParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateAssignmentUpgradeSchema = baseSchema;
export const updateAssignmentUpgradeParams = baseSchema.extend({});
export const assignmentUpgradeIdSchema = baseSchema.pick({ id: true });

// Types for assignmentUpgrades - used to type API request params and within Components
export type AssignmentUpgrade = typeof assignmentUpgrades.$inferSelect;
export type NewAssignmentUpgrade = z.infer<
  typeof insertAssignmentUpgradeSchema
>;
export type NewAssignmentUpgradeParams = z.infer<
  typeof insertAssignmentUpgradeParams
>;
export type UpdateAssignmentUpgradeParams = z.infer<
  typeof updateAssignmentUpgradeParams
>;
export type AssignmentUpgradeId = z.infer<
  typeof assignmentUpgradeIdSchema
>["id"];

// this type infers the return from getAssignmentUpgrades() - meaning it will include any joins
export type CompleteAssignmentUpgrade = Awaited<
  ReturnType<typeof getAssignmentUpgrades>
>["assignmentUpgrades"][number];
