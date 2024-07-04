import { type getQtypeMultichoiceOptions } from "@/lib/api/qtypeMultichoiceOptions/queries";
import {
  boolean,
  integer,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const qtypeMultichoiceOptions = pgTable(
  "qtype_multichoice_options",
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
    partiallyCorrectFeedback: text("partially_correct_feedback"),
    partiallyCorrectFeedbackFormat: integer(
      "partially_correct_feedback_format",
    ),
    questionId: varchar("question_id", { length: 256 }).notNull(),
    showNumCorrect: boolean("show_num_correct").notNull(),
    showStandardInstruction: boolean("show_standard_instruction").notNull(),
    shuffleAnswers: boolean("shuffle_answers").notNull(),
    single: boolean("single").notNull(),
  },
  (qtypeMultichoiceOptions) => {
    return {
      questionIdIndex: uniqueIndex(
        "qtype_multichoice_options_question_id_idx",
      ).on(qtypeMultichoiceOptions.questionId),
    };
  },
);

// Schema for qtypeMultichoiceOptions - used to validate API requests
const baseSchema = createSelectSchema(qtypeMultichoiceOptions);

export const insertQtypeMultichoiceOptionSchema = createInsertSchema(
  qtypeMultichoiceOptions,
);
export const insertQtypeMultichoiceOptionParams = baseSchema
  .extend({
    correctFeedbackFormat: z.coerce.number(),
    incorrectFeedbackFormat: z.coerce.number(),
    partiallyCorrectFeedbackFormat: z.coerce.number(),
    showNumCorrect: z.coerce.boolean(),
    showStandardInstruction: z.coerce.boolean(),
    shuffleAnswers: z.coerce.boolean(),
    single: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateQtypeMultichoiceOptionSchema = baseSchema;
export const updateQtypeMultichoiceOptionParams = baseSchema.extend({
  correctFeedbackFormat: z.coerce.number(),
  incorrectFeedbackFormat: z.coerce.number(),
  partiallyCorrectFeedbackFormat: z.coerce.number(),
  showNumCorrect: z.coerce.boolean(),
  showStandardInstruction: z.coerce.boolean(),
  shuffleAnswers: z.coerce.boolean(),
  single: z.coerce.boolean(),
});
export const qtypeMultichoiceOptionIdSchema = baseSchema.pick({ id: true });

// Types for qtypeMultichoiceOptions - used to type API request params and within Components
export type QtypeMultichoiceOption =
  typeof qtypeMultichoiceOptions.$inferSelect;
export type NewQtypeMultichoiceOption = z.infer<
  typeof insertQtypeMultichoiceOptionSchema
>;
export type NewQtypeMultichoiceOptionParams = z.infer<
  typeof insertQtypeMultichoiceOptionParams
>;
export type UpdateQtypeMultichoiceOptionParams = z.infer<
  typeof updateQtypeMultichoiceOptionParams
>;
export type QtypeMultichoiceOptionId = z.infer<
  typeof qtypeMultichoiceOptionIdSchema
>["id"];

// this type infers the return from getQtypeMultichoiceOptions() - meaning it will include any joins
export type CompleteQtypeMultichoiceOption = Awaited<
  ReturnType<typeof getQtypeMultichoiceOptions>
>["qtypeMultichoiceOptions"][number];
