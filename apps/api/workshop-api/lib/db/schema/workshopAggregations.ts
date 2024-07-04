import { sql } from "drizzle-orm";
import {
  pgTable,
  real,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getWorkshopAggregations } from "../../api/workshopAggregations/queries";
import { workshops } from "./workshops";

export const workshopAggregations = pgTable(
  "workshop_aggregations",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    gradingGrade: real("grading_grade"),
    workshopId: varchar("workshop_id", { length: 256 })
      .references(() => workshops.id, { onDelete: "cascade" })
      .notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (workshopAggregations) => {
    return {
      workshopIdIndex: uniqueIndex("workshop_aggregations_workshop_id_idx").on(
        workshopAggregations.workshopId,
      ),
    };
  },
);

// Schema for workshopAggregations - used to validate API requests
const baseSchema = createSelectSchema(workshopAggregations).omit(timestamps);

export const insertWorkshopAggregationSchema =
  createInsertSchema(workshopAggregations).omit(timestamps);
export const insertWorkshopAggregationParams = baseSchema
  .extend({
    gradingGrade: z.coerce.number(),
    workshopId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateWorkshopAggregationSchema = baseSchema;
export const updateWorkshopAggregationParams = baseSchema
  .extend({
    gradingGrade: z.coerce.number(),
    workshopId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const workshopAggregationIdSchema = baseSchema.pick({ id: true });

// Types for workshopAggregations - used to type API request params and within Components
export type WorkshopAggregation = typeof workshopAggregations.$inferSelect;
export type NewWorkshopAggregation = z.infer<
  typeof insertWorkshopAggregationSchema
>;
export type NewWorkshopAggregationParams = z.infer<
  typeof insertWorkshopAggregationParams
>;
export type UpdateWorkshopAggregationParams = z.infer<
  typeof updateWorkshopAggregationParams
>;
export type WorkshopAggregationId = z.infer<
  typeof workshopAggregationIdSchema
>["id"];

// this type infers the return from getWorkshopAggregations() - meaning it will include any joins
export type CompleteWorkshopAggregation = Awaited<
  ReturnType<typeof getWorkshopAggregations>
>["workshopAggregations"][number];
