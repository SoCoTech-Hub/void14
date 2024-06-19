import { real, varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { questions } from "./questions"
import { type getQuestionNumericalUnits } from "@/lib/api/questionNumericalUnits/queries";

import { nanoid } from "@/lib/utils";


export const questionNumericalUnits = pgTable('question_numerical_units', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  multiplier: real("multiplier"),
  questionId: varchar("question_id", { length: 256 }).references(() => questions.id, { onDelete: "cascade" }).notNull(),
  unit: varchar("unit", { length: 256 })
}, (questionNumericalUnits) => {
  return {
    questionIdIndex: uniqueIndex('question_id_idx').on(questionNumericalUnits.questionId),
  }
});


// Schema for questionNumericalUnits - used to validate API requests
const baseSchema = createSelectSchema(questionNumericalUnits)

export const insertQuestionNumericalUnitSchema = createInsertSchema(questionNumericalUnits);
export const insertQuestionNumericalUnitParams = baseSchema.extend({
  multiplier: z.coerce.number(),
  questionId: z.coerce.string().min(1)
}).omit({ 
  id: true
});

export const updateQuestionNumericalUnitSchema = baseSchema;
export const updateQuestionNumericalUnitParams = baseSchema.extend({
  multiplier: z.coerce.number(),
  questionId: z.coerce.string().min(1)
})
export const questionNumericalUnitIdSchema = baseSchema.pick({ id: true });

// Types for questionNumericalUnits - used to type API request params and within Components
export type QuestionNumericalUnit = typeof questionNumericalUnits.$inferSelect;
export type NewQuestionNumericalUnit = z.infer<typeof insertQuestionNumericalUnitSchema>;
export type NewQuestionNumericalUnitParams = z.infer<typeof insertQuestionNumericalUnitParams>;
export type UpdateQuestionNumericalUnitParams = z.infer<typeof updateQuestionNumericalUnitParams>;
export type QuestionNumericalUnitId = z.infer<typeof questionNumericalUnitIdSchema>["id"];
    
// this type infers the return from getQuestionNumericalUnits() - meaning it will include any joins
export type CompleteQuestionNumericalUnit = Awaited<ReturnType<typeof getQuestionNumericalUnits>>["questionNumericalUnits"][number];

