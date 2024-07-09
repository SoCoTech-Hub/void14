import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { questionDatasetDefinitions } from "./questionDatasetDefinitions";
import { questions } from "./questions";

export const questionDatasets = pgTable(
  "question_datasets",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    questionDatasetDefinitionId: varchar("question_dataset_definition_id", {
      length: 256,
    })
      .references(() => questionDatasetDefinitions.id)
      .notNull(),
    questionId: varchar("question_id", { length: 256 })
      .references(() => questions.id, { onDelete: "cascade" })
      .notNull(),
  },
  (questionDatasets) => {
    return {
      questionIdIndex: uniqueIndex("question_id_idx").on(
        questionDatasets.questionId,
      ),
    };
  },
);

// Schema for questionDatasets - used to validate API requests
const baseSchema = createSelectSchema(questionDatasets);

export const insertQuestionDatasetSchema = createInsertSchema(questionDatasets);
export const insertQuestionDatasetParams = baseSchema
  .extend({
    questionDatasetDefinitionId: z.coerce.string().min(1),
    questionId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  });

export const updateQuestionDatasetSchema = baseSchema;
export const updateQuestionDatasetParams = baseSchema.extend({
  questionDatasetDefinitionId: z.coerce.string().min(1),
  questionId: z.coerce.string().min(1),
});
export const questionDatasetIdSchema = baseSchema.pick({ id: true });

// Types for questionDatasets - used to type API request params and within Components
export type QuestionDataset = typeof questionDatasets.$inferSelect;
export type NewQuestionDataset = z.infer<typeof insertQuestionDatasetSchema>;
export type NewQuestionDatasetParams = z.infer<
  typeof insertQuestionDatasetParams
>;
export type UpdateQuestionDatasetParams = z.infer<
  typeof updateQuestionDatasetParams
>;
export type QuestionDatasetId = z.infer<typeof questionDatasetIdSchema>["id"];

