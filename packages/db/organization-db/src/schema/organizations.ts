import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

export const organizations = pgTable("organizations", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  shortName: varchar("short_name", { length: 256 }),
  logo: varchar("logo", { length: 256 }),
  favicon: varchar("favicon", { length: 256 }),
  avatar: varchar("avatar", { length: 256 }),
  banner: varchar("banner", { length: 256 }),
});

// Schema for organizations - used to validate API requests
const baseSchema = createSelectSchema(organizations);

export const insertOrganizationSchema = createInsertSchema(organizations);
export const insertOrganizationParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateOrganizationSchema = baseSchema;
export const updateOrganizationParams = baseSchema.extend({});
export const organizationIdSchema = baseSchema.pick({ id: true });

// Types for organizations - used to type API request params and within Components
export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = z.infer<typeof insertOrganizationSchema>;
export type NewOrganizationParams = z.infer<typeof insertOrganizationParams>;
export type UpdateOrganizationParams = z.infer<typeof updateOrganizationParams>;
export type OrganizationId = z.infer<typeof organizationIdSchema>["id"];
