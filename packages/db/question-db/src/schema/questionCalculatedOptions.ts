import { boolean, integer, pgTable, text, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { questions } from "./questions";

export const questionCalculatedOptions = pgTable(
  "question_calculated_options",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    answerNumbering: varchar("answer_numbering", { length: 256 }),
    correctFeedback: text("correct_feedback"),
    correctFeedbackFormat: integer("correct_feedback_format"),
    incorrectFeedback: text("incorrect_feedback"),
    incorrectFeedbackFormat: integer("incorrect_feedback_format"),
    partiallycorrectFeedback: text("partiallycorrect_feedback"),
    partiallycorrectFeedbackFormat: integer("partiallycorrect_feedback_format"),
    questionId: varchar("question_id", { length: 256 })
      .references(() => questions.id, { onDelete: "cascade" })
      .notNull(),
    showNumCorrect: boolean("show_num_correct").notNull(),
    shuffleAnswers: boolean("shuffle_answers").notNull(),
    single: boolean("single").notNull(),
    synchronize: boolean("synchronize").notNull(),
  },
  (questionCalculatedOptions) => {
    return {
      questionIdIndex: uniqueIndex("question_id_idx").on(
        questionCalculatedOptions.questionId,
      ),
    };
  },
);

// Schema for questionCalculatedOptions - used to validate API requests
const baseSchema = createSelectSchema(questionCalculatedOptions);

export const insertQuestionCalculatedOptionSchema = createInsertSchema(
  questionCalculatedOptions,
);
export const insertQuestionCalculatedOptionParams = baseSchema
  .extend({
    correctFeedbackFormat: z.coerce.number(),
    incorrectFeedbackFormat: z.coerce.number(),
    partiallycorrectFeedbackFormat: z.coerce.number(),
    questionId: z.coerce.string().min(1),
    showNumCorrect: z.coerce.boolean(),
    shuffleAnswers: z.coerce.boolean(),
    single: z.coerce.boolean(),
    synchronize: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateQuestionCalculatedOptionSchema = baseSchema;
export const updateQuestionCalculatedOptionParams = baseSchema.extend({
  correctFeedbackFormat: z.coerce.number(),
  incorrectFeedbackFormat: z.coerce.number(),
  partiallycorrectFeedbackFormat: z.coerce.number(),
  questionId: z.coerce.string().min(1),
  showNumCorrect: z.coerce.boolean(),
  shuffleAnswers: z.coerce.boolean(),
  single: z.coerce.boolean(),
  synchronize: z.coerce.boolean(),
});
export const questionCalculatedOptionIdSchema = baseSchema.pick({ id: true });

// Types for questionCalculatedOptions - used to type API request params and within Components
export type QuestionCalculatedOption =
  typeof questionCalculatedOptions.$inferSelect;
export type NewQuestionCalculatedOption = z.infer<
  typeof insertQuestionCalculatedOptionSchema
>;
export type NewQuestionCalculatedOptionParams = z.infer<
  typeof insertQuestionCalculatedOptionParams
>;
export type UpdateQuestionCalculatedOptionParams = z.infer<
  typeof updateQuestionCalculatedOptionParams
>;
export type QuestionCalculatedOptionId = z.infer<
  typeof questionCalculatedOptionIdSchema
>["id"];

