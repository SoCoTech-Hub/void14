import type {
  NewQuestionCategoryParams,
  QuestionCategoryId,
  UpdateQuestionCategoryParams,
} from "@soco/question-db/schema/questionCategories";
import { eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import {
  insertQuestionCategorySchema,
  questionCategories,
  questionCategoryIdSchema,
  updateQuestionCategorySchema,
} from "@soco/question-db/schema/questionCategories";

export const createQuestionCategory = async (
  questionCategory: NewQuestionCategoryParams,
) => {
  const newQuestionCategory =
    insertQuestionCategorySchema.parse(questionCategory);
  try {
    const [q] = await db
      .insert(questionCategories)
      .values(newQuestionCategory)
      .returning();
    return { questionCategory: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionCategory = async (
  id: QuestionCategoryId,
  questionCategory: UpdateQuestionCategoryParams,
) => {
  const { id: questionCategoryId } = questionCategoryIdSchema.parse({ id });
  const newQuestionCategory =
    updateQuestionCategorySchema.parse(questionCategory);
  try {
    const [q] = await db
      .update(questionCategories)
      .set(newQuestionCategory)
      .where(eq(questionCategories.id, questionCategoryId!))
      .returning();
    return { questionCategory: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionCategory = async (id: QuestionCategoryId) => {
  const { id: questionCategoryId } = questionCategoryIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(questionCategories)
      .where(eq(questionCategories.id, questionCategoryId!))
      .returning();
    return { questionCategory: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
