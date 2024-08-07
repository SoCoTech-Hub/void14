import {
  integer,
  pgTable,
  real,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { questions } from "./questions";

export const questionAnswers = pgTable(
  "question_answers",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    answer: text("answer"),
    answerFormat: integer("answer_format"),
    feedback: text("feedback"),
    feedbackFormat: integer("feedback_format"),
    fraction: real("fraction"),
    questionId: varchar("question_id", { length: 256 })
      .references(() => questions.id, { onDelete: "cascade" })
      .notNull(),
  },
  (questionAnswers) => {
    return {
      questionIdIndex: uniqueIndex("question_id_idx").on(
        questionAnswers.questionId,
      ),
    };
  },
);

// Schema for questionAnswers - used to validate API requests
const baseSchema = createSelectSchema(questionAnswers);

export const insertQuestionAnswerSchema = createInsertSchema(questionAnswers);
export const insertQuestionAnswerParams = baseSchema
  .extend({
    answerFormat: z.coerce.number(),
    feedbackFormat: z.coerce.number(),
    fraction: z.coerce.number(),
    questionId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateQuestionAnswerSchema = baseSchema;
export const updateQuestionAnswerParams = baseSchema.extend({
  answerFormat: z.coerce.number(),
  feedbackFormat: z.coerce.number(),
  fraction: z.coerce.number(),
  questionId: z.coerce.string().min(1),
});
export const questionAnswerIdSchema = baseSchema.pick({ id: true });

// Types for questionAnswers - used to type API request params and within Components
export type QuestionAnswer = typeof questionAnswers.$inferSelect;
export type NewQuestionAnswer = z.infer<typeof insertQuestionAnswerSchema>;
export type NewQuestionAnswerParams = z.infer<
  typeof insertQuestionAnswerParams
>;
export type UpdateQuestionAnswerParams = z.infer<
  typeof updateQuestionAnswerParams
>;
export type QuestionAnswerId = z.infer<typeof questionAnswerIdSchema>["id"];
