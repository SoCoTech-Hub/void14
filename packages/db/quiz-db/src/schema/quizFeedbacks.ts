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

import { quizes } from "./quizes";

export const quizFeedbacks = pgTable(
  "quiz_feedbacks",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    feedbackText: text("feedback_text"),
    feedbackTextFormat: integer("feedback_text_format").notNull(),
    maxGrade: real("max_grade").notNull(),
    minGrade: real("min_grade").notNull(),
    quizId: varchar("quiz_id", { length: 256 })
      .references(() => quizes.id, { onDelete: "cascade" })
      .notNull(),
  },
  (quizFeedbacks) => {
    return {
      quizIdIndex: uniqueIndex("quiz_id_idx").on(quizFeedbacks.quizId),
    };
  },
);

// Schema for quizFeedbacks - used to validate API requests
const baseSchema = createSelectSchema(quizFeedbacks);

export const insertQuizFeedbackSchema = createInsertSchema(quizFeedbacks);
export const insertQuizFeedbackParams = baseSchema
  .extend({
    feedbackTextFormat: z.coerce.number(),
    maxGrade: z.coerce.number(),
    minGrade: z.coerce.number(),
    quizId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateQuizFeedbackSchema = baseSchema;
export const updateQuizFeedbackParams = baseSchema.extend({
  feedbackTextFormat: z.coerce.number(),
  maxGrade: z.coerce.number(),
  minGrade: z.coerce.number(),
  quizId: z.coerce.string().min(1),
});
export const quizFeedbackIdSchema = baseSchema.pick({ id: true });

// Types for quizFeedbacks - used to type API request params and within Components
export type QuizFeedback = typeof quizFeedbacks.$inferSelect;
export type NewQuizFeedback = z.infer<typeof insertQuizFeedbackSchema>;
export type NewQuizFeedbackParams = z.infer<typeof insertQuizFeedbackParams>;
export type UpdateQuizFeedbackParams = z.infer<typeof updateQuizFeedbackParams>;
export type QuizFeedbackId = z.infer<typeof quizFeedbackIdSchema>["id"];
