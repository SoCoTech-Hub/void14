import { sql } from "drizzle-orm";
import { real, text, integer, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getQuestions } from "@/lib/api/questions/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const questions = pgTable('questions', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  defaultMark: real("default_mark"),
  generalFeedback: text("general_feedback"),
  generalFeedbackFormat: integer("general_feedback_format"),
  length: integer("length"),
  name: varchar("name", { length: 256 }),
  parentId: varchar("parent_id", { length: 256 }),
  penalty: real("penalty"),
  qtype: varchar("qtype", { length: 256 }).notNull(),
  questionText: text("question_text"),
  questionTextFormat: integer("question_text_format"),
  stamp: varchar("stamp", { length: 256 }),
  modifiedBy: varchar("modified_by", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

}, (questions) => {
  return {
    parentIdIndex: uniqueIndex('parent_id_idx').on(questions.parentId),
  }
});


// Schema for questions - used to validate API requests
const baseSchema = createSelectSchema(questions).omit(timestamps)

export const insertQuestionSchema = createInsertSchema(questions).omit(timestamps);
export const insertQuestionParams = baseSchema.extend({
  defaultMark: z.coerce.number(),
  generalFeedbackFormat: z.coerce.number(),
  length: z.coerce.number(),
  penalty: z.coerce.number(),
  questionTextFormat: z.coerce.number()
}).omit({ 
  id: true,
  userId: true
});

export const updateQuestionSchema = baseSchema;
export const updateQuestionParams = baseSchema.extend({
  defaultMark: z.coerce.number(),
  generalFeedbackFormat: z.coerce.number(),
  length: z.coerce.number(),
  penalty: z.coerce.number(),
  questionTextFormat: z.coerce.number()
}).omit({ 
  userId: true
});
export const questionIdSchema = baseSchema.pick({ id: true });

// Types for questions - used to type API request params and within Components
export type Question = typeof questions.$inferSelect;
export type NewQuestion = z.infer<typeof insertQuestionSchema>;
export type NewQuestionParams = z.infer<typeof insertQuestionParams>;
export type UpdateQuestionParams = z.infer<typeof updateQuestionParams>;
export type QuestionId = z.infer<typeof questionIdSchema>["id"];
    
// this type infers the return from getQuestions() - meaning it will include any joins
export type CompleteQuestion = Awaited<ReturnType<typeof getQuestions>>["questions"][number];

