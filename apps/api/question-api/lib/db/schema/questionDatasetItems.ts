import { integer, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getQuestionDatasetItems } from "../../api/questionDatasetItems/queries";
import { questionDatasetDefinitions } from "./questionDatasetDefinitions";

export const questionDatasetItems = pgTable(
  "question_dataset_items",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    questionDatasetDefinitionId: varchar("question_dataset_definition_id", {
      length: 256,
    })
      .references(() => questionDatasetDefinitions.id, { onDelete: "cascade" })
      .notNull(),
    itemNumber: integer("item_number"),
    value: varchar("value", { length: 256 }).notNull(),
  },
  (questionDatasetItems) => {
    return {
      questionDatasetDefinitionIdIndex: uniqueIndex(
        "question_dataset_items_question_dataset_definition_id_idx",
      ).on(questionDatasetItems.questionDatasetDefinitionId),
    };
  },
);

// Schema for questionDatasetItems - used to validate API requests
const baseSchema = createSelectSchema(questionDatasetItems);

export const insertQuestionDatasetItemSchema =
  createInsertSchema(questionDatasetItems);
export const insertQuestionDatasetItemParams = baseSchema
  .extend({
    questionDatasetDefinitionId: z.coerce.string().min(1),
    itemNumber: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateQuestionDatasetItemSchema = baseSchema;
export const updateQuestionDatasetItemParams = baseSchema.extend({
  questionDatasetDefinitionId: z.coerce.string().min(1),
  itemNumber: z.coerce.number(),
});
export const questionDatasetItemIdSchema = baseSchema.pick({ id: true });

// Types for questionDatasetItems - used to type API request params and within Components
export type QuestionDatasetItem = typeof questionDatasetItems.$inferSelect;
export type NewQuestionDatasetItem = z.infer<
  typeof insertQuestionDatasetItemSchema
>;
export type NewQuestionDatasetItemParams = z.infer<
  typeof insertQuestionDatasetItemParams
>;
export type UpdateQuestionDatasetItemParams = z.infer<
  typeof updateQuestionDatasetItemParams
>;
export type QuestionDatasetItemId = z.infer<
  typeof questionDatasetItemIdSchema
>["id"];

// this type infers the return from getQuestionDatasetItems() - meaning it will include any joins
export type CompleteQuestionDatasetItem = Awaited<
  ReturnType<typeof getQuestionDatasetItems>
>["questionDatasetItems"][number];
