import { varchar, text, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getGradeSettings } from "@/lib/api/gradeSettings/queries";

import { nanoid } from "@/lib/utils";


export const gradeSettings = pgTable('grade_settings', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  courseId: varchar("course_id", { length: 256 }),
  name: varchar("name", { length: 256 }),
  value: text("value")
});


// Schema for gradeSettings - used to validate API requests
const baseSchema = createSelectSchema(gradeSettings)

export const insertGradeSettingSchema = createInsertSchema(gradeSettings);
export const insertGradeSettingParams = baseSchema.extend({}).omit({ 
  id: true
});

export const updateGradeSettingSchema = baseSchema;
export const updateGradeSettingParams = baseSchema.extend({})
export const gradeSettingIdSchema = baseSchema.pick({ id: true });

// Types for gradeSettings - used to type API request params and within Components
export type GradeSetting = typeof gradeSettings.$inferSelect;
export type NewGradeSetting = z.infer<typeof insertGradeSettingSchema>;
export type NewGradeSettingParams = z.infer<typeof insertGradeSettingParams>;
export type UpdateGradeSettingParams = z.infer<typeof updateGradeSettingParams>;
export type GradeSettingId = z.infer<typeof gradeSettingIdSchema>["id"];
    
// this type infers the return from getGradeSettings() - meaning it will include any joins
export type CompleteGradeSetting = Awaited<ReturnType<typeof getGradeSettings>>["gradeSettings"][number];

