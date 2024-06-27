import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  QuizFeedbackId, 
  NewQuizFeedbackParams,
  UpdateQuizFeedbackParams, 
  updateQuizFeedbackSchema,
  insertQuizFeedbackSchema, 
  quizFeedbacks,
  quizFeedbackIdSchema 
} from "@/lib/db/schema/quizFeedbacks";

export const createQuizFeedback = async (quizFeedback: NewQuizFeedbackParams) => {
  const newQuizFeedback = insertQuizFeedbackSchema.parse(quizFeedback);
  try {
    const [q] =  await db.insert(quizFeedbacks).values(newQuizFeedback).returning();
    return { quizFeedback: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuizFeedback = async (id: QuizFeedbackId, quizFeedback: UpdateQuizFeedbackParams) => {
  const { id: quizFeedbackId } = quizFeedbackIdSchema.parse({ id });
  const newQuizFeedback = updateQuizFeedbackSchema.parse(quizFeedback);
  try {
    const [q] =  await db
     .update(quizFeedbacks)
     .set(newQuizFeedback)
     .where(eq(quizFeedbacks.id, quizFeedbackId!))
     .returning();
    return { quizFeedback: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuizFeedback = async (id: QuizFeedbackId) => {
  const { id: quizFeedbackId } = quizFeedbackIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(quizFeedbacks).where(eq(quizFeedbacks.id, quizFeedbackId!))
    .returning();
    return { quizFeedback: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

