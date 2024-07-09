import { pgTable, text, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

export const questionSetReferences = pgTable(
  "question_set_references",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    component: varchar("component", { length: 256 }),
    filterCondition: text("filter_condition"),
    itemId: varchar("item_id", { length: 256 }),
    questionArea: varchar("question_area", { length: 256 }),
    questionsContextId: varchar("questions_context_id", { length: 256 }),
    usingContextId: varchar("using_context_id", { length: 256 }),
  },
  (questionSetReferences) => {
    return {
      questionsContextIdIndex: uniqueIndex("questions_context_id_idx").on(
        questionSetReferences.questionsContextId,
      ),
    };
  },
);

// Schema for questionSetReferences - used to validate API requests
const baseSchema = createSelectSchema(questionSetReferences);

export const insertQuestionSetReferenceSchema = createInsertSchema(
  questionSetReferences,
);
export const insertQuestionSetReferenceParams = baseSchema.extend({}).omit({
  id: true,
});

export const updateQuestionSetReferenceSchema = baseSchema;
export const updateQuestionSetReferenceParams = baseSchema.extend({});
export const questionSetReferenceIdSchema = baseSchema.pick({ id: true });

// Types for questionSetReferences - used to type API request params and within Components
export type QuestionSetReference = typeof questionSetReferences.$inferSelect;
export type NewQuestionSetReference = z.infer<
  typeof insertQuestionSetReferenceSchema
>;
export type NewQuestionSetReferenceParams = z.infer<
  typeof insertQuestionSetReferenceParams
>;
export type UpdateQuestionSetReferenceParams = z.infer<
  typeof updateQuestionSetReferenceParams
>;
export type QuestionSetReferenceId = z.infer<
  typeof questionSetReferenceIdSchema
>["id"];


