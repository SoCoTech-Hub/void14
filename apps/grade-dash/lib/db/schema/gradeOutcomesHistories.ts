import { sql } from "drizzle-orm";
import { integer, varchar, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getGradeOutcomesHistories } from "@/lib/api/gradeOutcomesHistories/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const gradeOutcomesHistories = pgTable('grade_outcomes_histories', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  action: integer("action"),
  courseId: varchar("course_id", { length: 256 }),
  description: text("description"),
  descriptionFormat: integer("description_format"),
  fullName: text("full_name"),
  oldId: varchar("old_id", { length: 256 }),
  scaleId: varchar("scale_id", { length: 256 }),
  shortName: varchar("short_name", { length: 256 }),
  source: varchar("source", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for gradeOutcomesHistories - used to validate API requests
const baseSchema = createSelectSchema(gradeOutcomesHistories).omit(timestamps)

export const insertGradeOutcomesHistorySchema = createInsertSchema(gradeOutcomesHistories).omit(timestamps);
export const insertGradeOutcomesHistoryParams = baseSchema.extend({
  action: z.coerce.number(),
  descriptionFormat: z.coerce.number()
}).omit({ 
  id: true,
  userId: true
});

export const updateGradeOutcomesHistorySchema = baseSchema;
export const updateGradeOutcomesHistoryParams = baseSchema.extend({
  action: z.coerce.number(),
  descriptionFormat: z.coerce.number()
}).omit({ 
  userId: true
});
export const gradeOutcomesHistoryIdSchema = baseSchema.pick({ id: true });

// Types for gradeOutcomesHistories - used to type API request params and within Components
export type GradeOutcomesHistory = typeof gradeOutcomesHistories.$inferSelect;
export type NewGradeOutcomesHistory = z.infer<typeof insertGradeOutcomesHistorySchema>;
export type NewGradeOutcomesHistoryParams = z.infer<typeof insertGradeOutcomesHistoryParams>;
export type UpdateGradeOutcomesHistoryParams = z.infer<typeof updateGradeOutcomesHistoryParams>;
export type GradeOutcomesHistoryId = z.infer<typeof gradeOutcomesHistoryIdSchema>["id"];
    
// this type infers the return from getGradeOutcomesHistories() - meaning it will include any joins
export type CompleteGradeOutcomesHistory = Awaited<ReturnType<typeof getGradeOutcomesHistories>>["gradeOutcomesHistories"][number];

