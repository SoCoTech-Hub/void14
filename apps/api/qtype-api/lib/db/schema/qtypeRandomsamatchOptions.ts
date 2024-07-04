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

import { type getQtypeRandomsamatchOptions } from "../../api/qtypeRandomsamatchOptions/queries";

export const qtypeRandomsamatchOptions = pgTable(
  "qtype_randomsamatch_options",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    choose: integer("choose"),
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
    subCats: boolean("sub_cats").notNull(),
  },
  (qtypeRandomsamatchOptions) => {
    return {
      questionIdIndex: uniqueIndex(
        "qtype_randomsamatch_options_question_id_idx",
      ).on(qtypeRandomsamatchOptions.questionId),
    };
  },
);

// Schema for qtypeRandomsamatchOptions - used to validate API requests
const baseSchema = createSelectSchema(qtypeRandomsamatchOptions);

export const insertQtypeRandomsamatchOptionSchema = createInsertSchema(
  qtypeRandomsamatchOptions,
);
export const insertQtypeRandomsamatchOptionParams = baseSchema
  .extend({
    choose: z.coerce.number(),
    correctFeedbackFormat: z.coerce.number(),
    incorrectFeedbackFormat: z.coerce.number(),
    partiallyCorrectFeedbackFormat: z.coerce.number(),
    showNumCorrect: z.coerce.boolean(),
    subCats: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateQtypeRandomsamatchOptionSchema = baseSchema;
export const updateQtypeRandomsamatchOptionParams = baseSchema.extend({
  choose: z.coerce.number(),
  correctFeedbackFormat: z.coerce.number(),
  incorrectFeedbackFormat: z.coerce.number(),
  partiallyCorrectFeedbackFormat: z.coerce.number(),
  showNumCorrect: z.coerce.boolean(),
  subCats: z.coerce.boolean(),
});
export const qtypeRandomsamatchOptionIdSchema = baseSchema.pick({ id: true });

// Types for qtypeRandomsamatchOptions - used to type API request params and within Components
export type QtypeRandomsamatchOption =
  typeof qtypeRandomsamatchOptions.$inferSelect;
export type NewQtypeRandomsamatchOption = z.infer<
  typeof insertQtypeRandomsamatchOptionSchema
>;
export type NewQtypeRandomsamatchOptionParams = z.infer<
  typeof insertQtypeRandomsamatchOptionParams
>;
export type UpdateQtypeRandomsamatchOptionParams = z.infer<
  typeof updateQtypeRandomsamatchOptionParams
>;
export type QtypeRandomsamatchOptionId = z.infer<
  typeof qtypeRandomsamatchOptionIdSchema
>["id"];

// this type infers the return from getQtypeRandomsamatchOptions() - meaning it will include any joins
export type CompleteQtypeRandomsamatchOption = Awaited<
  ReturnType<typeof getQtypeRandomsamatchOptions>
>["qtypeRandomsamatchOptions"][number];
