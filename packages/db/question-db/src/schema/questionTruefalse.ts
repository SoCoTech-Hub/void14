import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { questionAnswers } from "./questionAnswers";
import { questions } from "./questions";

export const questionTruefalse = pgTable(
  "question_truefalse",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    falseAnswerId: varchar("false_answer", { length: 256 })
      .references(() => questionAnswers.id, { onDelete: "cascade" })
      .notNull(),
    questionId: varchar("question_id", { length: 256 })
      .references(() => questions.id, { onDelete: "cascade" })
      .notNull(),
    trueAnswerId: varchar("true_answer", { length: 256 })
      .references(() => questionAnswers.id, { onDelete: "cascade" })
      .notNull(),
  },
  (questionTruefalse) => {
    return {
      questionIdIndex: uniqueIndex("question_id_idx").on(
        questionTruefalse.questionId,
      ),
    };
  },
);

// Schema for questionTruefalse - used to validate API requests
const baseSchema = createSelectSchema(questionTruefalse);

export const insertQuestionTruefalseSchema =
  createInsertSchema(questionTruefalse);
export const insertQuestionTruefalseParams = baseSchema
  .extend({
    questionId: z.coerce.string().min(1),
    falseAnswerId: z.coerce.string().min(1),
    trueAnswerId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateQuestionTruefalseSchema = baseSchema;
export const updateQuestionTruefalseParams = baseSchema.extend({
  questionId: z.coerce.string().min(1),
  falseAnswerId: z.coerce.string().min(1),
  trueAnswerId: z.coerce.string().min(1),
});
export const questionTruefalseIdSchema = baseSchema.pick({ id: true });

// Types for questionTruefalse - used to type API request params and within Components
export type QuestionTruefalse = typeof questionTruefalse.$inferSelect;
export type NewQuestionTruefalse = z.infer<
  typeof insertQuestionTruefalseSchema
>;
export type NewQuestionTruefalseParams = z.infer<
  typeof insertQuestionTruefalseParams
>;
export type UpdateQuestionTruefalseParams = z.infer<
  typeof updateQuestionTruefalseParams
>;
export type QuestionTruefalseId = z.infer<
  typeof questionTruefalseIdSchema
>["id"];
