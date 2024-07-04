import { eq } from "drizzle-orm";

import type { QuestionCategoryId } from "../db/schema/questionCategories";
import { db } from "../db/index";
import {
  questionCategories,
  questionCategoryIdSchema,
} from "../db/schema/questionCategories";

export const getQuestionCategories = async () => {
  const rows = await db.select().from(questionCategories);
  const q = rows;
  return { questionCategories: q };
};

export const getQuestionCategoryById = async (id: QuestionCategoryId) => {
  const { id: questionCategoryId } = questionCategoryIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(questionCategories)
    .where(eq(questionCategories.id, questionCategoryId));
  if (row === undefined) return {};
  const q = row;
  return { questionCategory: q };
};
