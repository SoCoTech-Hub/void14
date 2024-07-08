import { type getWorkshopEvalBestSettings } from "@/lib/api/workshopEvalBestSettings/queries";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { workshops } from "./workshops";

export const workshopEvalBestSettings = pgTable(
  "workshop_eval_best_settings",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    comparison: integer("comparison"),
    workshopId: varchar("workshop_id", { length: 256 })
      .references(() => workshops.id, { onDelete: "cascade" })
      .notNull(),
  },
  (workshopEvalBestSettings) => {
    return {
      workshopIdIndex: uniqueIndex("workshop_id_idx").on(
        workshopEvalBestSettings.workshopId,
      ),
    };
  },
);

// Schema for workshopEvalBestSettings - used to validate API requests
const baseSchema = createSelectSchema(workshopEvalBestSettings);

export const insertWorkshopEvalBestSettingSchema = createInsertSchema(
  workshopEvalBestSettings,
);
export const insertWorkshopEvalBestSettingParams = baseSchema
  .extend({
    comparison: z.coerce.number(),
    workshopId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateWorkshopEvalBestSettingSchema = baseSchema;
export const updateWorkshopEvalBestSettingParams = baseSchema.extend({
  comparison: z.coerce.number(),
  workshopId: z.coerce.string().min(1),
});
export const workshopEvalBestSettingIdSchema = baseSchema.pick({ id: true });

// Types for workshopEvalBestSettings - used to type API request params and within Components
export type WorkshopEvalBestSetting =
  typeof workshopEvalBestSettings.$inferSelect;
export type NewWorkshopEvalBestSetting = z.infer<
  typeof insertWorkshopEvalBestSettingSchema
>;
export type NewWorkshopEvalBestSettingParams = z.infer<
  typeof insertWorkshopEvalBestSettingParams
>;
export type UpdateWorkshopEvalBestSettingParams = z.infer<
  typeof updateWorkshopEvalBestSettingParams
>;
export type WorkshopEvalBestSettingId = z.infer<
  typeof workshopEvalBestSettingIdSchema
>["id"];

// this type infers the return from getWorkshopEvalBestSettings() - meaning it will include any joins
export type CompleteWorkshopEvalBestSetting = Awaited<
  ReturnType<typeof getWorkshopEvalBestSettings>
>["workshopEvalBestSettings"][number];
