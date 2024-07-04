import { integer, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getQuestionReferences } from "../../api/questionReferences/queries";
import { questionBankEntries } from "./questionBankEntries";

export const questionReferences = pgTable(
  "question_references",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    component: varchar("component", { length: 256 }),
    itemId: varchar("item_id", { length: 256 }),
    questionArea: varchar("question_area", { length: 256 }),
    questionBankEntryId: varchar("question_bank_entry_id", { length: 256 })
      .references(() => questionBankEntries.id, { onDelete: "cascade" })
      .notNull(),
    usingContextId: varchar("using_context_id", { length: 256 }),
    version: integer("version"),
  },
  (questionReferences) => {
    return {
      questionBankEntryIdIndex: uniqueIndex(
        "question_references_question_bank_entry_id_idx",
      ).on(questionReferences.questionBankEntryId),
    };
  },
);

// Schema for questionReferences - used to validate API requests
const baseSchema = createSelectSchema(questionReferences);

export const insertQuestionReferenceSchema =
  createInsertSchema(questionReferences);
export const insertQuestionReferenceParams = baseSchema
  .extend({
    questionBankEntryId: z.coerce.string().min(1),
    version: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateQuestionReferenceSchema = baseSchema;
export const updateQuestionReferenceParams = baseSchema.extend({
  questionBankEntryId: z.coerce.string().min(1),
  version: z.coerce.number(),
});
export const questionReferenceIdSchema = baseSchema.pick({ id: true });

// Types for questionReferences - used to type API request params and within Components
export type QuestionReference = typeof questionReferences.$inferSelect;
export type NewQuestionReference = z.infer<
  typeof insertQuestionReferenceSchema
>;
export type NewQuestionReferenceParams = z.infer<
  typeof insertQuestionReferenceParams
>;
export type UpdateQuestionReferenceParams = z.infer<
  typeof updateQuestionReferenceParams
>;
export type QuestionReferenceId = z.infer<
  typeof questionReferenceIdSchema
>["id"];

// this type infers the return from getQuestionReferences() - meaning it will include any joins
export type CompleteQuestionReference = Awaited<
  ReturnType<typeof getQuestionReferences>
>["questionReferences"][number];
