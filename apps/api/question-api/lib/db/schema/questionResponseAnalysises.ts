import { sql } from "drizzle-orm";
import {
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

import { type getQuestionResponseAnalysises } from "../api/questionResponseAnalysises/queries";
import { questions } from "./questions";

export const questionResponseAnalysises = pgTable(
  "question_response_analysises",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    aId: varchar("a_id", { length: 256 }).notNull(),
    credit: real("credit"),
    hashCode: varchar("hash_code", { length: 256 }),
    questionId: varchar("question_id", { length: 256 })
      .references(() => questions.id, { onDelete: "cascade" })
      .notNull(),
    response: text("response"),
    subqId: varchar("subq_id", { length: 256 }),
    variant: varchar("variant", { length: 256 }),
    whichTries: varchar("which_tries", { length: 256 }),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (questionResponseAnalysises) => {
    return {
      questionIdIndex: uniqueIndex(
        "question_response_analysises_question_id_idx",
      ).on(questionResponseAnalysises.questionId),
    };
  },
);

// Schema for questionResponseAnalysises - used to validate API requests
const baseSchema = createSelectSchema(questionResponseAnalysises).omit(
  timestamps,
);

export const insertQuestionResponseAnalysiseSchema = createInsertSchema(
  questionResponseAnalysises,
).omit(timestamps);
export const insertQuestionResponseAnalysiseParams = baseSchema
  .extend({
    credit: z.coerce.number(),
    questionId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateQuestionResponseAnalysiseSchema = baseSchema;
export const updateQuestionResponseAnalysiseParams = baseSchema.extend({
  credit: z.coerce.number(),
  questionId: z.coerce.string().min(1),
});
export const questionResponseAnalysiseIdSchema = baseSchema.pick({ id: true });

// Types for questionResponseAnalysises - used to type API request params and within Components
export type QuestionResponseAnalysise =
  typeof questionResponseAnalysises.$inferSelect;
export type NewQuestionResponseAnalysise = z.infer<
  typeof insertQuestionResponseAnalysiseSchema
>;
export type NewQuestionResponseAnalysiseParams = z.infer<
  typeof insertQuestionResponseAnalysiseParams
>;
export type UpdateQuestionResponseAnalysiseParams = z.infer<
  typeof updateQuestionResponseAnalysiseParams
>;
export type QuestionResponseAnalysiseId = z.infer<
  typeof questionResponseAnalysiseIdSchema
>["id"];

// this type infers the return from getQuestionResponseAnalysises() - meaning it will include any joins
export type CompleteQuestionResponseAnalysise = Awaited<
  ReturnType<typeof getQuestionResponseAnalysises>
>["questionResponseAnalysises"][number];
