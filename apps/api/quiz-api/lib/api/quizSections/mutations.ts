import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  insertQuizSectionSchema,
  NewQuizSectionParams,
  QuizSectionId,
  quizSectionIdSchema,
  quizSections,
  UpdateQuizSectionParams,
  updateQuizSectionSchema,
} from "../../db/schema/quizSections";

export const createQuizSection = async (quizSection: NewQuizSectionParams) => {
  const newQuizSection = insertQuizSectionSchema.parse(quizSection);
  try {
    const [q] = await db
      .insert(quizSections)
      .values(newQuizSection)
      .returning();
    return { quizSection: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuizSection = async (
  id: QuizSectionId,
  quizSection: UpdateQuizSectionParams,
) => {
  const { id: quizSectionId } = quizSectionIdSchema.parse({ id });
  const newQuizSection = updateQuizSectionSchema.parse(quizSection);
  try {
    const [q] = await db
      .update(quizSections)
      .set(newQuizSection)
      .where(eq(quizSections.id, quizSectionId!))
      .returning();
    return { quizSection: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuizSection = async (id: QuizSectionId) => {
  const { id: quizSectionId } = quizSectionIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(quizSections)
      .where(eq(quizSections.id, quizSectionId!))
      .returning();
    return { quizSection: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
