import {
  integer,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "@soco/utils";

import { type getQuestionCategories } from "../../api/questionCategories/queries";

export const questionCategories = pgTable(
  "question_categories",
  {
    organizationId: varchar("organization_id", { length: 191 }).notNull(),
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    contextId: varchar("context_id", { length: 256 }).notNull(),
    idNumber: varchar("id_number", { length: 256 }),
    info: text("info"),
    infoFormat: integer("info_format"),
    name: varchar("name", { length: 256 }),
    parentId: varchar("parent_id", { length: 256 }),
    sortOrder: integer("sort_order").notNull(),
    stamp: varchar("stamp", { length: 256 }),
  },
  (questionCategories) => {
    return {
      contextIdIndex: uniqueIndex("question_categories_context_id_idx").on(
        questionCategories.contextId,
      ),
    };
  },
);

// Schema for questionCategories - used to validate API requests
const baseSchema = createSelectSchema(questionCategories);

export const insertQuestionCategorySchema =
  createInsertSchema(questionCategories);
export const insertQuestionCategoryParams = baseSchema
  .extend({
    infoFormat: z.coerce.number(),
    sortOrder: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateQuestionCategorySchema = baseSchema;
export const updateQuestionCategoryParams = baseSchema.extend({
  infoFormat: z.coerce.number(),
  sortOrder: z.coerce.number(),
});
export const questionCategoryIdSchema = baseSchema.pick({ id: true });

// Types for questionCategories - used to type API request params and within Components
export type QuestionCategory = typeof questionCategories.$inferSelect;
export type NewQuestionCategory = z.infer<typeof insertQuestionCategorySchema>;
export type NewQuestionCategoryParams = z.infer<
  typeof insertQuestionCategoryParams
>;
export type UpdateQuestionCategoryParams = z.infer<
  typeof updateQuestionCategoryParams
>;
export type QuestionCategoryId = z.infer<typeof questionCategoryIdSchema>["id"];

// this type infers the return from getQuestionCategories() - meaning it will include any joins
export type CompleteQuestionCategory = Awaited<
  ReturnType<typeof getQuestionCategories>
>["questionCategories"][number];
