import type {
  NewQuizSlotParams,
  QuizSlotId,
  UpdateQuizSlotParams,
} from "@soco/quiz-db/schema/quizSlots";
import { eq } from "@soco/quiz-db";
import { db } from "@soco/quiz-db/client";
import {
  insertQuizSlotSchema,
  quizSlotIdSchema,
  quizSlots,
  updateQuizSlotSchema,
} from "@soco/quiz-db/schema/quizSlots";

export const createQuizSlot = async (quizSlot: NewQuizSlotParams) => {
  const newQuizSlot = insertQuizSlotSchema.parse(quizSlot);
  try {
    const [q] = await db.insert(quizSlots).values(newQuizSlot).returning();
    return { quizSlot: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuizSlot = async (
  id: QuizSlotId,
  quizSlot: UpdateQuizSlotParams,
) => {
  const { id: quizSlotId } = quizSlotIdSchema.parse({ id });
  const newQuizSlot = updateQuizSlotSchema.parse(quizSlot);
  try {
    const [q] = await db
      .update(quizSlots)
      .set(newQuizSlot)
      .where(eq(quizSlots.id, quizSlotId!))
      .returning();
    return { quizSlot: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuizSlot = async (id: QuizSlotId) => {
  const { id: quizSlotId } = quizSlotIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(quizSlots)
      .where(eq(quizSlots.id, quizSlotId!))
      .returning();
    return { quizSlot: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
