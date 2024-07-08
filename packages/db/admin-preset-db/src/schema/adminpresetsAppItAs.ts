import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";


import { adminPresetsApps } from "./adminPresetsApps";

export const adminpresetsAppItAs = pgTable("adminpresets_app_it_as", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  adminPresetsAppId: varchar("admin_presets_app_id", { length: 256 })
    .references(() => adminPresetsApps.id)
    .notNull(),
  configLogId: varchar("config_log_id", { length: 256 }),
});

// Schema for adminpresetsAppItAs - used to validate API requests
const baseSchema = createSelectSchema(adminpresetsAppItAs);

export const insertAdminpresetsAppItASchema =
  createInsertSchema(adminpresetsAppItAs);
export const insertAdminpresetsAppItAParams = baseSchema
  .extend({
    adminPresetsAppId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateAdminpresetsAppItASchema = baseSchema;
export const updateAdminpresetsAppItAParams = baseSchema.extend({
  adminPresetsAppId: z.coerce.string().min(1),
});
export const adminpresetsAppItAIdSchema = baseSchema.pick({ id: true });

// Types for adminpresetsAppItAs - used to type API request params and within Components
export type AdminpresetsAppItA = typeof adminpresetsAppItAs.$inferSelect;
export type NewAdminpresetsAppItA = z.infer<
  typeof insertAdminpresetsAppItASchema
>;
export type NewAdminpresetsAppItAParams = z.infer<
  typeof insertAdminpresetsAppItAParams
>;
export type UpdateAdminpresetsAppItAParams = z.infer<
  typeof updateAdminpresetsAppItAParams
>;
export type AdminpresetsAppItAId = z.infer<
  typeof adminpresetsAppItAIdSchema
>["id"];


