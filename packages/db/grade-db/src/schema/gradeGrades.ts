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

export const gradeGrades = pgTable("grade_grades", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  aggregationStatus: varchar("aggregation_status", { length: 256 }),
  aggregationWeight: real("aggregation_weight"),
  excluded: boolean("excluded"),
  exported: date("exported"),
  feedback: text("feedback"),
  feedbackFormat: integer("feedback_format"),
  finalGrade: real("final_grade"),
  hidden: boolean("hidden"),
  information: text("information"),
  informationFormat: integer("information_format"),
  itemId: varchar("item_id", { length: 256 }),
  locked: boolean("locked"),
  lockTime: date("lock_time"),
  overridden: boolean("overridden"),
  rawGrade: real("raw_grade"),
  rawGradeMax: real("raw_grade_max"),
  rawGradeMin: real("raw_grade_min"),
  rawScaleId: varchar("raw_scale_id", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
  userModified: varchar("user_modified", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for gradeGrades - used to validate API requests
const baseSchema = createSelectSchema(gradeGrades).omit(timestamps);

export const insertGradeGradeSchema =
  createInsertSchema(gradeGrades).omit(timestamps);
export const insertGradeGradeParams = baseSchema
  .extend({
    aggregationWeight: z.coerce.number(),
    excluded: z.coerce.boolean(),
    exported: z.coerce.string().min(1),
    feedbackFormat: z.coerce.number(),
    finalGrade: z.coerce.number(),
    hidden: z.coerce.boolean(),
    informationFormat: z.coerce.number(),
    locked: z.coerce.boolean(),
    lockTime: z.coerce.string().min(1),
    overridden: z.coerce.boolean(),
    rawGrade: z.coerce.number(),
    rawGradeMax: z.coerce.number(),
    rawGradeMin: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateGradeGradeSchema = baseSchema;
export const updateGradeGradeParams = baseSchema
  .extend({
    aggregationWeight: z.coerce.number(),
    excluded: z.coerce.boolean(),
    exported: z.coerce.string().min(1),
    feedbackFormat: z.coerce.number(),
    finalGrade: z.coerce.number(),
    hidden: z.coerce.boolean(),
    informationFormat: z.coerce.number(),
    locked: z.coerce.boolean(),
    lockTime: z.coerce.string().min(1),
    overridden: z.coerce.boolean(),
    rawGrade: z.coerce.number(),
    rawGradeMax: z.coerce.number(),
    rawGradeMin: z.coerce.number(),
  })
  .omit({
    userId: true,
  });
export const gradeGradeIdSchema = baseSchema.pick({ id: true });

// Types for gradeGrades - used to type API request params and within Components
export type GradeGrade = typeof gradeGrades.$inferSelect;
export type NewGradeGrade = z.infer<typeof insertGradeGradeSchema>;
export type NewGradeGradeParams = z.infer<typeof insertGradeGradeParams>;
export type UpdateGradeGradeParams = z.infer<typeof updateGradeGradeParams>;
export type GradeGradeId = z.infer<typeof gradeGradeIdSchema>["id"];


