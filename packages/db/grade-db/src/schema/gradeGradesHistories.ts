import { type getGradeGradesHistories } from "@/lib/api/gradeGradesHistories/queries";
import { sql } from "drizzle-orm";
import {
  boolean,
  date,
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

export const gradeGradesHistories = pgTable("grade_grades_histories", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  action: integer("action"),
  excluded: integer("excluded"),
  exported: date("exported"),
  feedback: text("feedback"),
  feedbackFormat: integer("feedback_format"),
  finalGrade: real("final_grade"),
  hidden: boolean("hidden"),
  information: text("information"),
  informationFormat: integer("information_format"),
  itemId: varchar("item_id", { length: 256 }),
  locked: integer("locked"),
  lockTime: date("lock_time"),
  loggedUser: varchar("logged_user", { length: 256 }),
  oldId: varchar("old_id", { length: 256 }),
  overridden: integer("overridden"),
  rawGrade: real("raw_grade"),
  rawGradeMax: real("raw_grade_max"),
  rawGradeMin: real("raw_grade_min"),
  rawScaleId: varchar("raw_scale_id", { length: 256 }),
  source: varchar("source", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
  userModified: varchar("user_modified", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for gradeGradesHistories - used to validate API requests
const baseSchema = createSelectSchema(gradeGradesHistories).omit(timestamps);

export const insertGradeGradesHistorySchema =
  createInsertSchema(gradeGradesHistories).omit(timestamps);
export const insertGradeGradesHistoryParams = baseSchema
  .extend({
    action: z.coerce.number(),
    excluded: z.coerce.number(),
    exported: z.coerce.string().min(1),
    feedbackFormat: z.coerce.number(),
    finalGrade: z.coerce.number(),
    hidden: z.coerce.boolean(),
    informationFormat: z.coerce.number(),
    locked: z.coerce.number(),
    lockTime: z.coerce.string().min(1),
    overridden: z.coerce.number(),
    rawGrade: z.coerce.number(),
    rawGradeMax: z.coerce.number(),
    rawGradeMin: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateGradeGradesHistorySchema = baseSchema;
export const updateGradeGradesHistoryParams = baseSchema
  .extend({
    action: z.coerce.number(),
    excluded: z.coerce.number(),
    exported: z.coerce.string().min(1),
    feedbackFormat: z.coerce.number(),
    finalGrade: z.coerce.number(),
    hidden: z.coerce.boolean(),
    informationFormat: z.coerce.number(),
    locked: z.coerce.number(),
    lockTime: z.coerce.string().min(1),
    overridden: z.coerce.number(),
    rawGrade: z.coerce.number(),
    rawGradeMax: z.coerce.number(),
    rawGradeMin: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const gradeGradesHistoryIdSchema = baseSchema.pick({ id: true });

// Types for gradeGradesHistories - used to type API request params and within Components
export type GradeGradesHistory = typeof gradeGradesHistories.$inferSelect;
export type NewGradeGradesHistory = z.infer<
  typeof insertGradeGradesHistorySchema
>;
export type NewGradeGradesHistoryParams = z.infer<
  typeof insertGradeGradesHistoryParams
>;
export type UpdateGradeGradesHistoryParams = z.infer<
  typeof updateGradeGradesHistoryParams
>;
export type GradeGradesHistoryId = z.infer<
  typeof gradeGradesHistoryIdSchema
>["id"];

// this type infers the return from getGradeGradesHistories() - meaning it will include any joins
export type CompleteGradeGradesHistory = Awaited<
  ReturnType<typeof getGradeGradesHistories>
>["gradeGradesHistories"][number];
