import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils/nanoid";

import { questionCategories } from "./questionCategories";

export const questionBankEntries = pgTable(
  "question_bank_entries",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    idNumber: varchar("id_number", { length: 256 }),
    questionCategoryId: varchar("question_category_id", { length: 256 })
      .references(() => questionCategories.id)
      .notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (questionBankEntries) => {
    return {
      questionCategoryIdIndex: uniqueIndex("question_category_id_idx").on(
        questionBankEntries.questionCategoryId,
      ),
    };
  },
);

// Schema for questionBankEntries - used to validate API requests
const baseSchema = createSelectSchema(questionBankEntries);

export const insertQuestionBankEntrySchema =
  createInsertSchema(questionBankEntries);
export const insertQuestionBankEntryParams = baseSchema
  .extend({
    questionCategoryId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateQuestionBankEntrySchema = baseSchema;
export const updateQuestionBankEntryParams = baseSchema
  .extend({
    questionCategoryId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  });
export const questionBankEntryIdSchema = baseSchema.pick({ id: true });

// Types for questionBankEntries - used to type API request params and within Components
export type QuestionBankEntry = typeof questionBankEntries.$inferSelect;
export type NewQuestionBankEntry = z.infer<
  typeof insertQuestionBankEntrySchema
>;
export type NewQuestionBankEntryParams = z.infer<
  typeof insertQuestionBankEntryParams
>;
export type UpdateQuestionBankEntryParams = z.infer<
  typeof updateQuestionBankEntryParams
>;
export type QuestionBankEntryId = z.infer<
  typeof questionBankEntryIdSchema
>["id"];
