import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

export const roles = pgTable("roles", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  archeType: varchar("arche_type", { length: 256 }),
  description: text("description"),
  name: varchar("name", { length: 256 }),
  shortName: varchar("short_name", { length: 256 }),
  sortOrder: integer("sort_order"),
});

// Schema for roles - used to validate API requests
const baseSchema = createSelectSchema(roles);

export const insertRoleSchema = createInsertSchema(roles);
export const insertRoleParams = baseSchema
  .extend({
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateRoleSchema = baseSchema;
export const updateRoleParams = baseSchema.extend({
  sortOrder: z.coerce.number(),
});
export const roleIdSchema = baseSchema.pick({ id: true });

// Types for roles - used to type API request params and within Components
export type Role = typeof roles.$inferSelect;
export type NewRole = z.infer<typeof insertRoleSchema>;
export type NewRoleParams = z.infer<typeof insertRoleParams>;
export type UpdateRoleParams = z.infer<typeof updateRoleParams>;
export type RoleId = z.infer<typeof roleIdSchema>["id"];
