import { type getQuestionMultianswers } from "@/lib/api/questionMultianswers/queries";
import { pgTable, text, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { questions } from "./questions";

export const questionMultianswers = pgTable(
  "question_multianswers",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    questionId: varchar("question_id", { length: 256 })
      .references(() => questions.id, { onDelete: "cascade" })
      .notNull(),
    sequence: text("sequence"),
  },
  (questionMultianswers) => {
    return {
      questionIdIndex: uniqueIndex("question_multianswers_question_id_idx").on(
        questionMultianswers.questionId,
      ),
    };
  },
);

// Schema for questionMultianswers - used to validate API requests
const baseSchema = createSelectSchema(questionMultianswers);

export const insertQuestionMultianswerSchema =
  createInsertSchema(questionMultianswers);
export const insertQuestionMultianswerParams = baseSchema
  .extend({
    questionId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateQuestionMultianswerSchema = baseSchema;
export const updateQuestionMultianswerParams = baseSchema.extend({
  questionId: z.coerce.string().min(1),
});
export const questionMultianswerIdSchema = baseSchema.pick({ id: true });

// Types for questionMultianswers - used to type API request params and within Components
export type QuestionMultianswer = typeof questionMultianswers.$inferSelect;
export type NewQuestionMultianswer = z.infer<
  typeof insertQuestionMultianswerSchema
>;
export type NewQuestionMultianswerParams = z.infer<
  typeof insertQuestionMultianswerParams
>;
export type UpdateQuestionMultianswerParams = z.infer<
  typeof updateQuestionMultianswerParams
>;
export type QuestionMultianswerId = z.infer<
  typeof questionMultianswerIdSchema
>["id"];

// this type infers the return from getQuestionMultianswers() - meaning it will include any joins
export type CompleteQuestionMultianswer = Awaited<
  ReturnType<typeof getQuestionMultianswers>
>["questionMultianswers"][number];
