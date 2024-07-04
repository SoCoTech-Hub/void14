import { type getQtypeMatchOptions } from "@/lib/api/qtypeMatchOptions/queries";
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

export const qtypeMatchOptions = pgTable(
  "qtype_match_options",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    correctFeedback: text("correct_feedback"),
    correctFeedbackFormat: integer("correct_feedback_format"),
    incorrectFeedback: text("incorrect_feedback"),
    incorrectFeedbackFormat: integer("incorrect_feedback_format"),
    partiallyCorrectFeedback: text("partially_correct_feedback"),
    partiallyCorrectFeedbackFormat: integer(
      "partially_correct_feedback_format",
    ),
    questionId: varchar("question_id", { length: 256 }),
    showNumCorrect: boolean("show_num_correct"),
    shuffleAnswers: boolean("shuffle_answers").notNull(),
  },
  (qtypeMatchOptions) => {
    return {
      questionIdIndex: uniqueIndex("qtype_match_options_question_id_idx").on(
        qtypeMatchOptions.questionId,
      ),
    };
  },
);

// Schema for qtypeMatchOptions - used to validate API requests
const baseSchema = createSelectSchema(qtypeMatchOptions);

export const insertQtypeMatchOptionSchema =
  createInsertSchema(qtypeMatchOptions);
export const insertQtypeMatchOptionParams = baseSchema
  .extend({
    correctFeedbackFormat: z.coerce.number(),
    incorrectFeedbackFormat: z.coerce.number(),
    partiallyCorrectFeedbackFormat: z.coerce.number(),
    showNumCorrect: z.coerce.boolean(),
    shuffleAnswers: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateQtypeMatchOptionSchema = baseSchema;
export const updateQtypeMatchOptionParams = baseSchema.extend({
  correctFeedbackFormat: z.coerce.number(),
  incorrectFeedbackFormat: z.coerce.number(),
  partiallyCorrectFeedbackFormat: z.coerce.number(),
  showNumCorrect: z.coerce.boolean(),
  shuffleAnswers: z.coerce.boolean(),
});
export const qtypeMatchOptionIdSchema = baseSchema.pick({ id: true });

// Types for qtypeMatchOptions - used to type API request params and within Components
export type QtypeMatchOption = typeof qtypeMatchOptions.$inferSelect;
export type NewQtypeMatchOption = z.infer<typeof insertQtypeMatchOptionSchema>;
export type NewQtypeMatchOptionParams = z.infer<
  typeof insertQtypeMatchOptionParams
>;
export type UpdateQtypeMatchOptionParams = z.infer<
  typeof updateQtypeMatchOptionParams
>;
export type QtypeMatchOptionId = z.infer<typeof qtypeMatchOptionIdSchema>["id"];

// this type infers the return from getQtypeMatchOptions() - meaning it will include any joins
export type CompleteQtypeMatchOption = Awaited<
  ReturnType<typeof getQtypeMatchOptions>
>["qtypeMatchOptions"][number];
