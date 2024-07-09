import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { roles } from "./roles";

export const roleAllowOverrides = pgTable("role_allow_overrides", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  roleId: varchar("role_id", { length: 256 })
    .references(() => roles.id)
    .notNull(),
  allowOverrideId: varchar("allow_override_id", { length: 256 })
    .references(() => roles.id)
    .notNull(),
});

// Schema for roleAllowOverrides - used to validate API requests
const baseSchema = createSelectSchema(roleAllowOverrides);

export const insertRoleAllowOverrideSchema =
  createInsertSchema(roleAllowOverrides);
export const insertRoleAllowOverrideParams = baseSchema
  .extend({
    roleId: z.coerce.string().min(1),
    allowOverrideId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateRoleAllowOverrideSchema = baseSchema;
export const updateRoleAllowOverrideParams = baseSchema.extend({
  roleId: z.coerce.string().min(1),
  allowOverrideId: z.coerce.string().min(1),
});
export const roleAllowOverrideIdSchema = baseSchema.pick({ id: true });

// Types for roleAllowOverrides - used to type API request params and within Components
export type RoleAllowOverride = typeof roleAllowOverrides.$inferSelect;
export type NewRoleAllowOverride = z.infer<
  typeof insertRoleAllowOverrideSchema
>;
export type NewRoleAllowOverrideParams = z.infer<
  typeof insertRoleAllowOverrideParams
>;
export type UpdateRoleAllowOverrideParams = z.infer<
  typeof updateRoleAllowOverrideParams
>;
export type RoleAllowOverrideId = z.infer<
  typeof roleAllowOverrideIdSchema
>["id"];


