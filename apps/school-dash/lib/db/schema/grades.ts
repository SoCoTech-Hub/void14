import { varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getGrades } from "@/lib/api/grades/queries";

import { nanoid } from "@/lib/utils";


export const grades = pgTable('grades', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 })
});


// Schema for grades - used to validate API requests
const baseSchema = createSelectSchema(grades)

export const insertGradeSchema = createInsertSchema(grades);
export const insertGradeParams = baseSchema.extend({}).omit({ 
  id: true
});

export const updateGradeSchema = baseSchema;
export const updateGradeParams = baseSchema.extend({})
export const gradeIdSchema = baseSchema.pick({ id: true });

// Types for grades - used to type API request params and within Components
export type Grade = typeof grades.$inferSelect;
export type NewGrade = z.infer<typeof insertGradeSchema>;
export type NewGradeParams = z.infer<typeof insertGradeParams>;
export type UpdateGradeParams = z.infer<typeof updateGradeParams>;
export type GradeId = z.infer<typeof gradeIdSchema>["id"];
    
// this type infers the return from getGrades() - meaning it will include any joins
export type CompleteGrade = Awaited<ReturnType<typeof getGrades>>["grades"][number];

