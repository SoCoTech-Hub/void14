import type {
  NewQuizOverrideParams,
  QuizOverrideId,
  UpdateQuizOverrideParams,
} from "@soco/quiz-db/schema/quizOverrides";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/quiz-db";
import { db } from "@soco/quiz-db/client";
import {
  insertQuizOverrideSchema,
  quizOverrideIdSchema,
  quizOverrides,
  updateQuizOverrideSchema,
} from "@soco/quiz-db/schema/quizOverrides";

export const createQuizOverride = async (
  quizOverride: NewQuizOverrideParams,
) => {
  const { session } = await getUserAuth();
  const newQuizOverride = insertQuizOverrideSchema.parse({
    ...quizOverride,
    userId: session?.user.id!,
  });
  try {
    const [q] = await db
      .insert(quizOverrides)
      .values(newQuizOverride)
      .returning();
    return { quizOverride: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuizOverride = async (
  id: QuizOverrideId,
  quizOverride: UpdateQuizOverrideParams,
) => {
  const { session } = await getUserAuth();
  const { id: quizOverrideId } = quizOverrideIdSchema.parse({ id });
  const newQuizOverride = updateQuizOverrideSchema.parse({
    ...quizOverride,
    userId: session?.user.id!,
  });
  try {
    const [q] = await db
      .update(quizOverrides)
      .set(newQuizOverride)
      .where(
        and(
          eq(quizOverrides.id, quizOverrideId!),
          eq(quizOverrides.userId, session?.user.id!),
        ),
      )
      .returning();
    return { quizOverride: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuizOverride = async (id: QuizOverrideId) => {
  const { session } = await getUserAuth();
  const { id: quizOverrideId } = quizOverrideIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(quizOverrides)
      .where(
        and(
          eq(quizOverrides.id, quizOverrideId!),
          eq(quizOverrides.userId, session?.user.id!),
        ),
      )
      .returning();
    return { quizOverride: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
