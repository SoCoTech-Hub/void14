import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid, timestamps } from "@soco/utils";

import { questions } from "./questions";
import { questionUsages } from "./questionUsages";

export const questionAttempts = pgTable(
  "question_attempts",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    behaviour: varchar("behaviour", { length: 256 }),
    flagged: boolean("flagged"),
    maxFraction: real("max_fraction"),
    maxMark: real("max_mark"),
    minFraction: real("min_fraction"),
    questionId: varchar("question_id", { length: 256 })
      .references(() => questions.id, { onDelete: "cascade" })
      .notNull(),
    questionSummary: text("question_summary"),
    questionUsageId: varchar("question_usage_id", { length: 256 })
      .references(() => questionUsages.id)
      .notNull(),
    responseSummary: text("response_summary"),
    rightAnswer: text("right_answer"),
    slot: integer("slot"),
    variant: integer("variant"),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (questionAttempts) => {
    return {
      questionIdIndex: uniqueIndex("question_id_idx").on(
        questionAttempts.questionId,
      ),
    };
  },
);

// Schema for questionAttempts - used to validate API requests
const baseSchema = createSelectSchema(questionAttempts).omit(timestamps);

export const insertQuestionAttemptSchema =
  createInsertSchema(questionAttempts).omit(timestamps);
export const insertQuestionAttemptParams = baseSchema
  .extend({
    flagged: z.coerce.boolean(),
    maxFraction: z.coerce.number(),
    maxMark: z.coerce.number(),
    minFraction: z.coerce.number(),
    questionId: z.coerce.string().min(1),
    questionUsageId: z.coerce.string().min(1),
    slot: z.coerce.number(),
    variant: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateQuestionAttemptSchema = baseSchema;
export const updateQuestionAttemptParams = baseSchema.extend({
  flagged: z.coerce.boolean(),
  maxFraction: z.coerce.number(),
  maxMark: z.coerce.number(),
  minFraction: z.coerce.number(),
  questionId: z.coerce.string().min(1),
  questionUsageId: z.coerce.string().min(1),
  slot: z.coerce.number(),
  variant: z.coerce.number(),
});
export const questionAttemptIdSchema = baseSchema.pick({ id: true });

// Types for questionAttempts - used to type API request params and within Components
export type QuestionAttempt = typeof questionAttempts.$inferSelect;
export type NewQuestionAttempt = z.infer<typeof insertQuestionAttemptSchema>;
export type NewQuestionAttemptParams = z.infer<
  typeof insertQuestionAttemptParams
>;
export type UpdateQuestionAttemptParams = z.infer<
  typeof updateQuestionAttemptParams
>;
export type QuestionAttemptId = z.infer<typeof questionAttemptIdSchema>["id"];


