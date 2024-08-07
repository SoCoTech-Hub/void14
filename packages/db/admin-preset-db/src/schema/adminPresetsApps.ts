import { sql } from "drizzle-orm";
import { pgTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";
import { timestamps } from "@soco/utils/timestamps";

import { adminPresets } from "./adminPresets";

export const adminPresetsApps = pgTable(
  "admin_presets_apps",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    time: timestamp("time").notNull(),
    adminPresetId: varchar("admin_preset_id", { length: 256 })
      .references(() => adminPresets.id)
      .notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (adminPresetsApps) => {
    return {
      adminPresetIdIndex: uniqueIndex("admin_preset_id_idx").on(
        adminPresetsApps.adminPresetId,
      ),
    };
  },
);

// Schema for adminPresetsApps - used to validate API requests
const baseSchema = createSelectSchema(adminPresetsApps).omit(timestamps);

export const insertAdminPresetsAppSchema =
  createInsertSchema(adminPresetsApps).omit(timestamps);
export const insertAdminPresetsAppParams = baseSchema
  .extend({
    time: z.coerce.string().min(1),
    adminPresetId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateAdminPresetsAppSchema = baseSchema;
export const updateAdminPresetsAppParams = baseSchema
  .extend({
    time: z.coerce.string().min(1),
    adminPresetId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const adminPresetsAppIdSchema = baseSchema.pick({ id: true });

// Types for adminPresetsApps - used to type API request params and within Components
export type AdminPresetsApp = typeof adminPresetsApps.$inferSelect;
export type NewAdminPresetsApp = z.infer<typeof insertAdminPresetsAppSchema>;
export type NewAdminPresetsAppParams = z.infer<
  typeof insertAdminPresetsAppParams
>;
export type UpdateAdminPresetsAppParams = z.infer<
  typeof updateAdminPresetsAppParams
>;
export type AdminPresetsAppId = z.infer<typeof adminPresetsAppIdSchema>["id"];
