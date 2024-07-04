import {
  integer,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getWorkshopFormAccumulatives } from "../../api/workshopFormAccumulatives/queries";
import { workshops } from "./workshops";

export const workshopFormAccumulatives = pgTable(
  "workshop_form_accumulatives",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    description: text("description"),
    descriptionFormat: integer("description_format"),
    grade: integer("grade"),
    sort: integer("sort"),
    weight: integer("weight"),
    workshopId: varchar("workshop_id", { length: 256 })
      .references(() => workshops.id, { onDelete: "cascade" })
      .notNull(),
  },
  (workshopFormAccumulatives) => {
    return {
      workshopIdIndex: uniqueIndex(
        "workshop_form_accumulatives_workshop_id_idx",
      ).on(workshopFormAccumulatives.workshopId),
    };
  },
);

// Schema for workshopFormAccumulatives - used to validate API requests
const baseSchema = createSelectSchema(workshopFormAccumulatives);

export const insertWorkshopFormAccumulativeSchema = createInsertSchema(
  workshopFormAccumulatives,
);
export const insertWorkshopFormAccumulativeParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
    grade: z.coerce.number(),
    sort: z.coerce.number(),
    weight: z.coerce.number(),
    workshopId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateWorkshopFormAccumulativeSchema = baseSchema;
export const updateWorkshopFormAccumulativeParams = baseSchema.extend({
  descriptionFormat: z.coerce.number(),
  grade: z.coerce.number(),
  sort: z.coerce.number(),
  weight: z.coerce.number(),
  workshopId: z.coerce.string().min(1),
});
export const workshopFormAccumulativeIdSchema = baseSchema.pick({ id: true });

// Types for workshopFormAccumulatives - used to type API request params and within Components
export type WorkshopFormAccumulative =
  typeof workshopFormAccumulatives.$inferSelect;
export type NewWorkshopFormAccumulative = z.infer<
  typeof insertWorkshopFormAccumulativeSchema
>;
export type NewWorkshopFormAccumulativeParams = z.infer<
  typeof insertWorkshopFormAccumulativeParams
>;
export type UpdateWorkshopFormAccumulativeParams = z.infer<
  typeof updateWorkshopFormAccumulativeParams
>;
export type WorkshopFormAccumulativeId = z.infer<
  typeof workshopFormAccumulativeIdSchema
>["id"];

// this type infers the return from getWorkshopFormAccumulatives() - meaning it will include any joins
export type CompleteWorkshopFormAccumulative = Awaited<
  ReturnType<typeof getWorkshopFormAccumulatives>
>["workshopFormAccumulatives"][number];
