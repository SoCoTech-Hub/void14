import { varchar, text, integer, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getQtypeMatchSubquestions } from "@/lib/api/qtypeMatchSubquestions/queries";

import { nanoid } from "@/lib/utils";


export const qtypeMatchSubquestions = pgTable('qtype_match_subquestions', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  answerText: varchar("answer_text", { length: 256 }).notNull(),
  questionId: varchar("question_id", { length: 256 }).notNull(),
  questionText: text("question_text"),
  questionTextFormat: integer("question_text_format")
}, (qtypeMatchSubquestions) => {
  return {
    questionIdIndex: uniqueIndex('question_id_idx').on(qtypeMatchSubquestions.questionId),
  }
});


// Schema for qtypeMatchSubquestions - used to validate API requests
const baseSchema = createSelectSchema(qtypeMatchSubquestions)

export const insertQtypeMatchSubquestionSchema = createInsertSchema(qtypeMatchSubquestions);
export const insertQtypeMatchSubquestionParams = baseSchema.extend({
  questionTextFormat: z.coerce.number()
}).omit({ 
  id: true
});

export const updateQtypeMatchSubquestionSchema = baseSchema;
export const updateQtypeMatchSubquestionParams = baseSchema.extend({
  questionTextFormat: z.coerce.number()
})
export const qtypeMatchSubquestionIdSchema = baseSchema.pick({ id: true });

// Types for qtypeMatchSubquestions - used to type API request params and within Components
export type QtypeMatchSubquestion = typeof qtypeMatchSubquestions.$inferSelect;
export type NewQtypeMatchSubquestion = z.infer<typeof insertQtypeMatchSubquestionSchema>;
export type NewQtypeMatchSubquestionParams = z.infer<typeof insertQtypeMatchSubquestionParams>;
export type UpdateQtypeMatchSubquestionParams = z.infer<typeof updateQtypeMatchSubquestionParams>;
export type QtypeMatchSubquestionId = z.infer<typeof qtypeMatchSubquestionIdSchema>["id"];
    
// this type infers the return from getQtypeMatchSubquestions() - meaning it will include any joins
export type CompleteQtypeMatchSubquestion = Awaited<ReturnType<typeof getQtypeMatchSubquestions>>["qtypeMatchSubquestions"][number];

