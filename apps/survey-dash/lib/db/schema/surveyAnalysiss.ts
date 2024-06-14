import { text, varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { surveys } from "./surveys"
import { type getSurveyAnalysiss } from "@/lib/api/surveyAnalysiss/queries";

import { nanoid } from "@/lib/utils";


export const surveyAnalysiss = pgTable('survey_analysiss', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  notes: text("notes"),
  surveyId: varchar("survey_id", { length: 256 }).references(() => surveys.id, { onDelete: "cascade" }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull()
});


// Schema for surveyAnalysiss - used to validate API requests
const baseSchema = createSelectSchema(surveyAnalysiss)

export const insertSurveyAnalysissSchema = createInsertSchema(surveyAnalysiss);
export const insertSurveyAnalysissParams = baseSchema.extend({
  surveyId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateSurveyAnalysissSchema = baseSchema;
export const updateSurveyAnalysissParams = baseSchema.extend({
  surveyId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const surveyAnalysissIdSchema = baseSchema.pick({ id: true });

// Types for surveyAnalysiss - used to type API request params and within Components
export type SurveyAnalysiss = typeof surveyAnalysiss.$inferSelect;
export type NewSurveyAnalysiss = z.infer<typeof insertSurveyAnalysissSchema>;
export type NewSurveyAnalysissParams = z.infer<typeof insertSurveyAnalysissParams>;
export type UpdateSurveyAnalysissParams = z.infer<typeof updateSurveyAnalysissParams>;
export type SurveyAnalysissId = z.infer<typeof surveyAnalysissIdSchema>["id"];
    
// this type infers the return from getSurveyAnalysiss() - meaning it will include any joins
export type CompleteSurveyAnalysiss = Awaited<ReturnType<typeof getSurveyAnalysiss>>["surveyAnalysiss"][number];

