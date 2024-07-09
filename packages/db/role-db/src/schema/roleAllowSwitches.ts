import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { roles } from "./roles";

export const roleAllowSwitches = pgTable("role_allow_switches", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  roleId: varchar("role_id", { length: 256 })
    .references(() => roles.id, { onDelete: "cascade" })
    .notNull(),
  allowSwitchId: varchar("allow_switch_id", { length: 256 })
    .references(() => roles.id)
    .notNull(),
});

// Schema for roleAllowSwitches - used to validate API requests
const baseSchema = createSelectSchema(roleAllowSwitches);

export const insertRoleAllowSwitchSchema =
  createInsertSchema(roleAllowSwitches);
export const insertRoleAllowSwitchParams = baseSchema
  .extend({
    roleId: z.coerce.string().min(1),
    allowSwitchId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateRoleAllowSwitchSchema = baseSchema;
export const updateRoleAllowSwitchParams = baseSchema.extend({
  roleId: z.coerce.string().min(1),
  allowSwitchId: z.coerce.string().min(1),
});
export const roleAllowSwitchIdSchema = baseSchema.pick({ id: true });

// Types for roleAllowSwitches - used to type API request params and within Components
export type RoleAllowSwitch = typeof roleAllowSwitches.$inferSelect;
export type NewRoleAllowSwitch = z.infer<typeof insertRoleAllowSwitchSchema>;
export type NewRoleAllowSwitchParams = z.infer<
  typeof insertRoleAllowSwitchParams
>;
export type UpdateRoleAllowSwitchParams = z.infer<
  typeof updateRoleAllowSwitchParams
>;
export type RoleAllowSwitchId = z.infer<typeof roleAllowSwitchIdSchema>["id"];

