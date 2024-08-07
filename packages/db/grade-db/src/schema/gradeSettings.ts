import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

export const gradeSettings = pgTable("grade_settings", {
  organizationId: varchar("organization_id", { length: 191 }).notNull(),
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  courseId: varchar("course_id", { length: 256 }),
  name: varchar("name", { length: 256 }),
  value: text("value"),
});

// Schema for gradeSettings - used to validate API requests
const baseSchema = createSelectSchema(gradeSettings);

export const insertGradeSettingSchema = createInsertSchema(gradeSettings);
export const insertGradeSettingParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateGradeSettingSchema = baseSchema;
export const updateGradeSettingParams = baseSchema.extend({});
export const gradeSettingIdSchema = baseSchema.pick({ id: true });

// Types for gradeSettings - used to type API request params and within Components
export type GradeSetting = typeof gradeSettings.$inferSelect;
export type NewGradeSetting = z.infer<typeof insertGradeSettingSchema>;
export type NewGradeSettingParams = z.infer<typeof insertGradeSettingParams>;
export type UpdateGradeSettingParams = z.infer<typeof updateGradeSettingParams>;
export type GradeSettingId = z.infer<typeof gradeSettingIdSchema>["id"];
