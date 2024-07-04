import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getGradeItems } from "../api/gradeItems/queries";

export const gradeItems = pgTable(
  "grade_items",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    aggregationCoef: real("aggregation_coef"),
    aggregationCoef2: real("aggregation_coef2"),
    calculation: text("calculation"),
    categoryId: varchar("category_id", { length: 256 }),
    courseId: varchar("course_id", { length: 256 }),
    decimals: boolean("decimals"),
    display: integer("display"),
    gradeMax: real("grade_max"),
    gradeMin: real("grade_min"),
    gradePass: real("grade_pass"),
    gradeType: integer("grade_type"),
    hidden: boolean("hidden"),
    idNumber: varchar("id_number", { length: 256 }),
    itemInfo: text("item_info"),
    itemInstance: varchar("item_instance", { length: 256 }),
    itemModule: varchar("item_module", { length: 256 }),
    itemName: varchar("item_name", { length: 256 }),
    itemNumber: integer("item_number"),
    itemType: varchar("item_type", { length: 256 }),
    locked: boolean("locked"),
    lockTime: timestamp("lock_time"),
    multFactor: real("mult_factor"),
    needsUpdate: integer("needs_update"),
    outcomeId: varchar("outcome_id", { length: 256 }),
    plusFactor: real("plus_factor"),
    scaleId: varchar("scale_id", { length: 256 }),
    weightOverride: boolean("weight_override"),
    sortOrder: integer("sort_order"),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (gradeItems) => {
    return {
      sortOrderIndex: uniqueIndex("grade_items_sort_order_idx").on(
        gradeItems.sortOrder,
      ),
    };
  },
);

// Schema for gradeItems - used to validate API requests
const baseSchema = createSelectSchema(gradeItems).omit(timestamps);

export const insertGradeItemSchema =
  createInsertSchema(gradeItems).omit(timestamps);
export const insertGradeItemParams = baseSchema
  .extend({
    aggregationCoef: z.coerce.number(),
    aggregationCoef2: z.coerce.number(),
    decimals: z.coerce.boolean(),
    display: z.coerce.number(),
    gradeMax: z.coerce.number(),
    gradeMin: z.coerce.number(),
    gradePass: z.coerce.number(),
    gradeType: z.coerce.number(),
    hidden: z.coerce.boolean(),
    itemNumber: z.coerce.number(),
    locked: z.coerce.boolean(),
    lockTime: z.coerce.string().min(1),
    multFactor: z.coerce.number(),
    needsUpdate: z.coerce.number(),
    plusFactor: z.coerce.number(),
    weightOverride: z.coerce.boolean(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateGradeItemSchema = baseSchema;
export const updateGradeItemParams = baseSchema.extend({
  aggregationCoef: z.coerce.number(),
  aggregationCoef2: z.coerce.number(),
  decimals: z.coerce.boolean(),
  display: z.coerce.number(),
  gradeMax: z.coerce.number(),
  gradeMin: z.coerce.number(),
  gradePass: z.coerce.number(),
  gradeType: z.coerce.number(),
  hidden: z.coerce.boolean(),
  itemNumber: z.coerce.number(),
  locked: z.coerce.boolean(),
  lockTime: z.coerce.string().min(1),
  multFactor: z.coerce.number(),
  needsUpdate: z.coerce.number(),
  plusFactor: z.coerce.number(),
  weightOverride: z.coerce.boolean(),
  sortOrder: z.coerce.number(),
});
export const gradeItemIdSchema = baseSchema.pick({ id: true });

// Types for gradeItems - used to type API request params and within Components
export type GradeItem = typeof gradeItems.$inferSelect;
export type NewGradeItem = z.infer<typeof insertGradeItemSchema>;
export type NewGradeItemParams = z.infer<typeof insertGradeItemParams>;
export type UpdateGradeItemParams = z.infer<typeof updateGradeItemParams>;
export type GradeItemId = z.infer<typeof gradeItemIdSchema>["id"];

// this type infers the return from getGradeItems() - meaning it will include any joins
export type CompleteGradeItem = Awaited<
  ReturnType<typeof getGradeItems>
>["gradeItems"][number];
