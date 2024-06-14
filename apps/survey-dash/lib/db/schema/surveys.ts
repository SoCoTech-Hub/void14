import { sql } from "drizzle-orm";
import { varchar, boolean, integer, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getSurveys } from "@/lib/api/surveys/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const surveys = pgTable('surveys', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }),
  completionSubmit: boolean("completion_submit"),
  courseId: varchar("course_id", { length: 256 }),
  days: integer("days"),
  intro: text("intro"),
  introFormat: integer("intro_format"),
  questions: varchar("questions", { length: 256 }),
  templateId: varchar("template_id", { length: 256 }),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for surveys - used to validate API requests
const baseSchema = createSelectSchema(surveys).omit(timestamps)

export const insertSurveySchema = createInsertSchema(surveys).omit(timestamps);
export const insertSurveyParams = baseSchema.extend({
  completionSubmit: z.coerce.boolean(),
  days: z.coerce.number(),
  introFormat: z.coerce.number()
}).omit({ 
  id: true
});

export const updateSurveySchema = baseSchema;
export const updateSurveyParams = baseSchema.extend({
  completionSubmit: z.coerce.boolean(),
  days: z.coerce.number(),
  introFormat: z.coerce.number()
})
export const surveyIdSchema = baseSchema.pick({ id: true });

// Types for surveys - used to type API request params and within Components
export type Survey = typeof surveys.$inferSelect;
export type NewSurvey = z.infer<typeof insertSurveySchema>;
export type NewSurveyParams = z.infer<typeof insertSurveyParams>;
export type UpdateSurveyParams = z.infer<typeof updateSurveyParams>;
export type SurveyId = z.infer<typeof surveyIdSchema>["id"];
    
// this type infers the return from getSurveys() - meaning it will include any joins
export type CompleteSurvey = Awaited<ReturnType<typeof getSurveys>>["surveys"][number];

