import { pgTable, text, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getQuestionAttemptStepDatas } from "../api/questionAttemptStepDatas/queries";
import { questionAttemptSteps } from "./questionAttemptSteps";

export const questionAttemptStepDatas = pgTable(
  "question_attempt_step_datas",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    questionAttemptStepId: varchar("question_attempt_step_id", { length: 256 })
      .references(() => questionAttemptSteps.id, { onDelete: "cascade" })
      .notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    value: text("value"),
  },
  (questionAttemptStepDatas) => {
    return {
      questionAttemptStepIdIndex: uniqueIndex(
        "question_attempt_step_datas_question_attempt_step_id_idx",
      ).on(questionAttemptStepDatas.questionAttemptStepId),
    };
  },
);

// Schema for questionAttemptStepDatas - used to validate API requests
const baseSchema = createSelectSchema(questionAttemptStepDatas);

export const insertQuestionAttemptStepDataSchema = createInsertSchema(
  questionAttemptStepDatas,
);
export const insertQuestionAttemptStepDataParams = baseSchema
  .extend({
    questionAttemptStepId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateQuestionAttemptStepDataSchema = baseSchema;
export const updateQuestionAttemptStepDataParams = baseSchema.extend({
  questionAttemptStepId: z.coerce.string().min(1),
});
export const questionAttemptStepDataIdSchema = baseSchema.pick({ id: true });

// Types for questionAttemptStepDatas - used to type API request params and within Components
export type QuestionAttemptStepData =
  typeof questionAttemptStepDatas.$inferSelect;
export type NewQuestionAttemptStepData = z.infer<
  typeof insertQuestionAttemptStepDataSchema
>;
export type NewQuestionAttemptStepDataParams = z.infer<
  typeof insertQuestionAttemptStepDataParams
>;
export type UpdateQuestionAttemptStepDataParams = z.infer<
  typeof updateQuestionAttemptStepDataParams
>;
export type QuestionAttemptStepDataId = z.infer<
  typeof questionAttemptStepDataIdSchema
>["id"];

// this type infers the return from getQuestionAttemptStepDatas() - meaning it will include any joins
export type CompleteQuestionAttemptStepData = Awaited<
  ReturnType<typeof getQuestionAttemptStepDatas>
>["questionAttemptStepDatas"][number];
