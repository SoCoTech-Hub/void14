import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertQuizeSchema,
  NewQuizeParams,
  quizes,
  QuizId,
  quizIdSchema,
  UpdateQuizeParams,
  updateQuizeSchema,
} from "../db/schema/quizes";

export const createQuize = async (quize: NewQuizeParams) => {
  const newQuize = insertQuizeSchema.parse(quize);
  try {
    const [q] = await db.insert(quizes).values(newQuize).returning();
    return { quize: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuize = async (id: QuizId, quize: UpdateQuizeParams) => {
  const { id: quizId } = quizIdSchema.parse({ id });
  const newQuize = updateQuizeSchema.parse(quize);
  try {
    const [q] = await db
      .update(quizes)
      .set({ ...newQuize, updatedAt: new Date() })
      .where(eq(quizes.id, quizId!))
      .returning();
    return { quize: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuize = async (id: QuizId) => {
  const { id: quizId } = quizIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(quizes)
      .where(eq(quizes.id, quizId!))
      .returning();
    return { quize: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
