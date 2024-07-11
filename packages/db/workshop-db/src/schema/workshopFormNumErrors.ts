import {
  integer,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { workshops } from "./workshops";

export const workshopFormNumErrors = pgTable(
  "workshop_form_num_errors",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    description: text("description"),
    descriptionFormat: integer("description_format"),
    descriptionTrust: integer("description_trust"),
    grade0: varchar("grade_0", { length: 256 }),
    grade1: varchar("grade_1", { length: 256 }),
    sort: integer("sort"),
    weight: integer("weight"),
    workshopId: varchar("workshop_id", { length: 256 })
      .references(() => workshops.id, { onDelete: "cascade" })
      .notNull(),
  },
  (workshopFormNumErrors) => {
    return {
      workshopIdIndex: uniqueIndex("workshop_id_idx").on(
        workshopFormNumErrors.workshopId,
      ),
    };
  },
);

// Schema for workshopFormNumErrors - used to validate API requests
const baseSchema = createSelectSchema(workshopFormNumErrors);

export const insertWorkshopFormNumErrorSchema = createInsertSchema(
  workshopFormNumErrors,
);
export const insertWorkshopFormNumErrorParams = baseSchema
  .extend({
    descriptionFormat: z.coerce.number(),
    descriptionTrust: z.coerce.number(),
    sort: z.coerce.number(),
    weight: z.coerce.number(),
    workshopId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateWorkshopFormNumErrorSchema = baseSchema;
export const updateWorkshopFormNumErrorParams = baseSchema.extend({
  descriptionFormat: z.coerce.number(),
  descriptionTrust: z.coerce.number(),
  sort: z.coerce.number(),
  weight: z.coerce.number(),
  workshopId: z.coerce.string().min(1),
});
export const workshopFormNumErrorIdSchema = baseSchema.pick({ id: true });

// Types for workshopFormNumErrors - used to type API request params and within Components
export type WorkshopFormNumError = typeof workshopFormNumErrors.$inferSelect;
export type NewWorkshopFormNumError = z.infer<
  typeof insertWorkshopFormNumErrorSchema
>;
export type NewWorkshopFormNumErrorParams = z.infer<
  typeof insertWorkshopFormNumErrorParams
>;
export type UpdateWorkshopFormNumErrorParams = z.infer<
  typeof updateWorkshopFormNumErrorParams
>;
export type WorkshopFormNumErrorId = z.infer<
  typeof workshopFormNumErrorIdSchema
>["id"];
