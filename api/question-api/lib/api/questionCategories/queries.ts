import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type QuestionCategoryId, questionCategoryIdSchema, questionCategories } from "@/lib/db/schema/questionCategories";

export const getQuestionCategories = async () => {
  const rows = await db.select().from(questionCategories);
  const q = rows
  return { questionCategories: q };
};

export const getQuestionCategoryById = async (id: QuestionCategoryId) => {
  const { id: questionCategoryId } = questionCategoryIdSchema.parse({ id });
  const [row] = await db.select().from(questionCategories).where(eq(questionCategories.id, questionCategoryId));
  if (row === undefined) return {};
  const q = row;
  return { questionCategory: q };
};


