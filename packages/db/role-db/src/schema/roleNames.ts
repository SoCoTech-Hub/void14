import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { roles } from "./roles";

export const roleNames = pgTable("role_names", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  contextId: varchar("context_id", { length: 256 }),
  name: varchar("name", { length: 256 }),
  roleId: varchar("role_id", { length: 256 })
    .references(() => roles.id)
    .notNull(),
});

// Schema for roleNames - used to validate API requests
const baseSchema = createSelectSchema(roleNames);

export const insertRoleNameSchema = createInsertSchema(roleNames);
export const insertRoleNameParams = baseSchema
  .extend({
    roleId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateRoleNameSchema = baseSchema;
export const updateRoleNameParams = baseSchema.extend({
  roleId: z.coerce.string().min(1),
});
export const roleNameIdSchema = baseSchema.pick({ id: true });

// Types for roleNames - used to type API request params and within Components
export type RoleName = typeof roleNames.$inferSelect;
export type NewRoleName = z.infer<typeof insertRoleNameSchema>;
export type NewRoleNameParams = z.infer<typeof insertRoleNameParams>;
export type UpdateRoleNameParams = z.infer<typeof updateRoleNameParams>;
export type RoleNameId = z.infer<typeof roleNameIdSchema>["id"];


