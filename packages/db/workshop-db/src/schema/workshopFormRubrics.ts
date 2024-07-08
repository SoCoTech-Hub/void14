import { type getWorkshopFormRubrics } from "@/lib/api/workshopFormRubrics/queries";
import {
  integer,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { workshops } from "./workshops";

export const workshopFormRubrics = pgTable(
  "workshop_form_rubrics",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    description: text("description"),
    descriptionFormat: integer("description_format"),
    sort: integer("sort"),
    workshopId: varchar("workshop_id", { length: 256 })
      .references(() => workshops.id, { onDelete: "cascade" })
      .notNull(),
  },
  (workshopFormRubrics) => {
    return {
      workshopIdIndex: uniqueIndex("workshop_id_idx").on(
        workshopFormRubrics.workshopId,
      ),
    };
  },
);

// Schema for workshopFormRubrics - used to validate API requests
const baseSchema = createSelectSchema(workshopFormRubrics).omit(timestamps);

export const insertWorkshopFormRubricSchema =
  createInsertSchema(workshopFormRubrics).omit(timestamps);
export const insertWorkshopFormRubricParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
    sort: z.coerce.number(),
    workshopId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateWorkshopFormRubricSchema = baseSchema;
export const updateWorkshopFormRubricParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
    sort: z.coerce.number(),
    workshopId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const workshopFormRubricIdSchema = baseSchema.pick({ id: true });

// Types for workshopFormRubrics - used to type API request params and within Components
export type WorkshopFormRubric = typeof workshopFormRubrics.$inferSelect;
export type NewWorkshopFormRubric = z.infer<
  typeof insertWorkshopFormRubricSchema
>;
export type NewWorkshopFormRubricParams = z.infer<
  typeof insertWorkshopFormRubricParams
>;
export type UpdateWorkshopFormRubricParams = z.infer<
  typeof updateWorkshopFormRubricParams
>;
export type WorkshopFormRubricId = z.infer<
  typeof workshopFormRubricIdSchema
>["id"];

// this type infers the return from getWorkshopFormRubrics() - meaning it will include any joins
export type CompleteWorkshopFormRubric = Awaited<
  ReturnType<typeof getWorkshopFormRubrics>
>["workshopFormRubrics"][number];
