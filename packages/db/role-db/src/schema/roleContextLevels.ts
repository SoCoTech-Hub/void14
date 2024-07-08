import { type getRoleContextLevels } from "@/lib/api/roleContextLevels/queries";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { roles } from "./roles";

export const roleContextLevels = pgTable("role_context_levels", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  contextLevel: varchar("context_level", { length: 256 }),
  roleId: varchar("role_id", { length: 256 })
    .references(() => roles.id)
    .notNull(),
});

// Schema for roleContextLevels - used to validate API requests
const baseSchema = createSelectSchema(roleContextLevels);

export const insertRoleContextLevelSchema =
  createInsertSchema(roleContextLevels);
export const insertRoleContextLevelParams = baseSchema
  .extend({
    roleId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateRoleContextLevelSchema = baseSchema;
export const updateRoleContextLevelParams = baseSchema.extend({
  roleId: z.coerce.string().min(1),
});
export const roleContextLevelIdSchema = baseSchema.pick({ id: true });

// Types for roleContextLevels - used to type API request params and within Components
export type RoleContextLevel = typeof roleContextLevels.$inferSelect;
export type NewRoleContextLevel = z.infer<typeof insertRoleContextLevelSchema>;
export type NewRoleContextLevelParams = z.infer<
  typeof insertRoleContextLevelParams
>;
export type UpdateRoleContextLevelParams = z.infer<
  typeof updateRoleContextLevelParams
>;
export type RoleContextLevelId = z.infer<typeof roleContextLevelIdSchema>["id"];

// this type infers the return from getRoleContextLevels() - meaning it will include any joins
export type CompleteRoleContextLevel = Awaited<
  ReturnType<typeof getRoleContextLevels>
>["roleContextLevels"][number];
