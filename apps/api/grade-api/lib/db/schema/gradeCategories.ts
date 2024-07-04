import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { type getGradeCategories } from "../../api/gradeCategories/queries";

export const gradeCategories = pgTable("grade_categories", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  aggregateOnlyGraded: boolean("aggregate_only_graded"),
  aggregateOutcomes: boolean("aggregate_outcomes"),
  aggregation: integer("aggregation"),
  courseId: varchar("course_id", { length: 256 }),
  depth: integer("depth"),
  dropLow: integer("drop_low"),
  fullName: varchar("full_name", { length: 256 }),
  hidden: boolean("hidden"),
  keepHigh: integer("keep_high"),
  parent: varchar("parent", { length: 256 }),
  path: varchar("path", { length: 256 }),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for gradeCategories - used to validate API requests
const baseSchema = createSelectSchema(gradeCategories).omit(timestamps);

export const insertGradeCategorySchema =
  createInsertSchema(gradeCategories).omit(timestamps);
export const insertGradeCategoryParams = baseSchema
  .extend({
    aggregateOnlyGraded: z.coerce.boolean(),
    aggregateOutcomes: z.coerce.boolean(),
    aggregation: z.coerce.number(),
    depth: z.coerce.number(),
    dropLow: z.coerce.number(),
    hidden: z.coerce.boolean(),
    keepHigh: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateGradeCategorySchema = baseSchema;
export const updateGradeCategoryParams = baseSchema.extend({
  aggregateOnlyGraded: z.coerce.boolean(),
  aggregateOutcomes: z.coerce.boolean(),
  aggregation: z.coerce.number(),
  depth: z.coerce.number(),
  dropLow: z.coerce.number(),
  hidden: z.coerce.boolean(),
  keepHigh: z.coerce.number(),
});
export const gradeCategoryIdSchema = baseSchema.pick({ id: true });

// Types for gradeCategories - used to type API request params and within Components
export type GradeCategory = typeof gradeCategories.$inferSelect;
export type NewGradeCategory = z.infer<typeof insertGradeCategorySchema>;
export type NewGradeCategoryParams = z.infer<typeof insertGradeCategoryParams>;
export type UpdateGradeCategoryParams = z.infer<
  typeof updateGradeCategoryParams
>;
export type GradeCategoryId = z.infer<typeof gradeCategoryIdSchema>["id"];

// this type infers the return from getGradeCategories() - meaning it will include any joins
export type CompleteGradeCategory = Awaited<
  ReturnType<typeof getGradeCategories>
>["gradeCategories"][number];
