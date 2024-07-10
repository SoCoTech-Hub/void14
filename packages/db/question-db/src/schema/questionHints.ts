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

import { nanoid } from "@soco/utils/nanoid";

import { questions } from "./questions";

export const questionHints = pgTable(
  "question_hints",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    clearWrong: boolean("clear_wrong").notNull(),
    hint: text("hint"),
    hintFormat: integer("hint_format"),
    options: varchar("options", { length: 256 }),
    questionId: varchar("question_id", { length: 256 })
      .references(() => questions.id, { onDelete: "cascade" })
      .notNull(),
    showNumCorrect: boolean("show_num_correct").notNull(),
  },
  (questionHints) => {
    return {
      questionIdIndex: uniqueIndex("question_id_idx").on(
        questionHints.questionId,
      ),
    };
  },
);

// Schema for questionHints - used to validate API requests
const baseSchema = createSelectSchema(questionHints);

export const insertQuestionHintSchema = createInsertSchema(questionHints);
export const insertQuestionHintParams = baseSchema
  .extend({
    clearWrong: z.coerce.boolean(),
    hintFormat: z.coerce.number(),
    questionId: z.coerce.string().min(1),
    showNumCorrect: z.coerce.boolean(),
  })
  .omit({
    id: true,
  });

export const updateQuestionHintSchema = baseSchema;
export const updateQuestionHintParams = baseSchema.extend({
  clearWrong: z.coerce.boolean(),
  hintFormat: z.coerce.number(),
  questionId: z.coerce.string().min(1),
  showNumCorrect: z.coerce.boolean(),
});
export const questionHintIdSchema = baseSchema.pick({ id: true });

// Types for questionHints - used to type API request params and within Components
export type QuestionHint = typeof questionHints.$inferSelect;
export type NewQuestionHint = z.infer<typeof insertQuestionHintSchema>;
export type NewQuestionHintParams = z.infer<typeof insertQuestionHintParams>;
export type UpdateQuestionHintParams = z.infer<typeof updateQuestionHintParams>;
export type QuestionHintId = z.infer<typeof questionHintIdSchema>["id"];
