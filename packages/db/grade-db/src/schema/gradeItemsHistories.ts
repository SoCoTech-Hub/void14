import { type getGradeItemsHistories } from "@/lib/api/gradeItemsHistories/queries";
import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

export const gradeItemsHistories = pgTable(
  "grade_items_histories",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    action: integer("action"),
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
    oldId: varchar("old_id", { length: 256 }),
    outcomeId: varchar("outcome_id", { length: 256 }),
    plusFactor: real("plus_factor"),
    scaleId: varchar("scale_id", { length: 256 }),
    source: varchar("source", { length: 256 }),
    weightOverride: boolean("weight_override"),
    sortOrder: integer("sort_order"),
    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (gradeItemsHistories) => {
    return {
      sortOrderIndex: uniqueIndex("sort_order_idx").on(
        gradeItemsHistories.sortOrder,
      ),
    };
  },
);

// Schema for gradeItemsHistories - used to validate API requests
const baseSchema = createSelectSchema(gradeItemsHistories).omit(timestamps);

export const insertGradeItemsHistorySchema =
  createInsertSchema(gradeItemsHistories).omit(timestamps);
export const insertGradeItemsHistoryParams = baseSchema
  .extend({
    action: z.coerce.number(),
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
    userId: true,
  });

export const updateGradeItemsHistorySchema = baseSchema;
export const updateGradeItemsHistoryParams = baseSchema
  .extend({
    action: z.coerce.number(),
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
    userId: true,
  });
export const gradeItemsHistoryIdSchema = baseSchema.pick({ id: true });

// Types for gradeItemsHistories - used to type API request params and within Components
export type GradeItemsHistory = typeof gradeItemsHistories.$inferSelect;
export type NewGradeItemsHistory = z.infer<
  typeof insertGradeItemsHistorySchema
>;
export type NewGradeItemsHistoryParams = z.infer<
  typeof insertGradeItemsHistoryParams
>;
export type UpdateGradeItemsHistoryParams = z.infer<
  typeof updateGradeItemsHistoryParams
>;
export type GradeItemsHistoryId = z.infer<
  typeof gradeItemsHistoryIdSchema
>["id"];

// this type infers the return from getGradeItemsHistories() - meaning it will include any joins
export type CompleteGradeItemsHistory = Awaited<
  ReturnType<typeof getGradeItemsHistories>
>["gradeItemsHistories"][number];
