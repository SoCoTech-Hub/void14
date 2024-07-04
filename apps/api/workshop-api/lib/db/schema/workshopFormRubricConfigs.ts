import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getWorkshopFormRubricConfigs } from "../api/workshopFormRubricConfigs/queries";
import { workshops } from "./workshops";

export const workshopFormRubricConfigs = pgTable(
  "workshop_form_rubric_configs",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    layout: varchar("layout", { length: 256 }),
    workshopId: varchar("workshop_id", { length: 256 })
      .references(() => workshops.id, { onDelete: "cascade" })
      .notNull(),
  },
  (workshopFormRubricConfigs) => {
    return {
      workshopIdIndex: uniqueIndex(
        "workshop_form_rubric_configs_workshop_id_idx",
      ).on(workshopFormRubricConfigs.workshopId),
    };
  },
);

// Schema for workshopFormRubricConfigs - used to validate API requests
const baseSchema = createSelectSchema(workshopFormRubricConfigs);

export const insertWorkshopFormRubricConfigSchema = createInsertSchema(
  workshopFormRubricConfigs,
);
export const insertWorkshopFormRubricConfigParams = baseSchema
  .extend({
    workshopId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateWorkshopFormRubricConfigSchema = baseSchema;
export const updateWorkshopFormRubricConfigParams = baseSchema.extend({
  workshopId: z.coerce.string().min(1),
});
export const workshopFormRubricConfigIdSchema = baseSchema.pick({ id: true });

// Types for workshopFormRubricConfigs - used to type API request params and within Components
export type WorkshopFormRubricConfig =
  typeof workshopFormRubricConfigs.$inferSelect;
export type NewWorkshopFormRubricConfig = z.infer<
  typeof insertWorkshopFormRubricConfigSchema
>;
export type NewWorkshopFormRubricConfigParams = z.infer<
  typeof insertWorkshopFormRubricConfigParams
>;
export type UpdateWorkshopFormRubricConfigParams = z.infer<
  typeof updateWorkshopFormRubricConfigParams
>;
export type WorkshopFormRubricConfigId = z.infer<
  typeof workshopFormRubricConfigIdSchema
>["id"];

// this type infers the return from getWorkshopFormRubricConfigs() - meaning it will include any joins
export type CompleteWorkshopFormRubricConfig = Awaited<
  ReturnType<typeof getWorkshopFormRubricConfigs>
>["workshopFormRubricConfigs"][number];
