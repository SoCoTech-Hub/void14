import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

import { roles } from "./roles";

export const roleCapabilities = pgTable("role_capabilities", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  capability: varchar("capability", { length: 256 }),
  contextId: varchar("context_id", { length: 256 }),
  permission: varchar("permission", { length: 256 }),
  roleId: varchar("role_id", { length: 256 })
    .references(() => roles.id)
    .notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for roleCapabilities - used to validate API requests
const baseSchema = createSelectSchema(roleCapabilities).omit(timestamps);

export const insertRoleCapabilitySchema =
  createInsertSchema(roleCapabilities).omit(timestamps);
export const insertRoleCapabilityParams = baseSchema
  .extend({
    roleId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateRoleCapabilitySchema = baseSchema;
export const updateRoleCapabilityParams = baseSchema
  .extend({
    roleId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const roleCapabilityIdSchema = baseSchema.pick({ id: true });

// Types for roleCapabilities - used to type API request params and within Components
export type RoleCapability = typeof roleCapabilities.$inferSelect;
export type NewRoleCapability = z.infer<typeof insertRoleCapabilitySchema>;
export type NewRoleCapabilityParams = z.infer<
  typeof insertRoleCapabilityParams
>;
export type UpdateRoleCapabilityParams = z.infer<
  typeof updateRoleCapabilityParams
>;
export type RoleCapabilityId = z.infer<typeof roleCapabilityIdSchema>["id"];
