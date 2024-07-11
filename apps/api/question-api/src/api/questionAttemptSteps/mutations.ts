import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import {
  insertQuestionAttemptStepSchema,
  NewQuestionAttemptStepParams,
  QuestionAttemptStepId,
  questionAttemptStepIdSchema,
  questionAttemptSteps,
  UpdateQuestionAttemptStepParams,
  updateQuestionAttemptStepSchema,
} from "@soco/question-db/schema/questionAttemptSteps";

export const createQuestionAttemptStep = async (
  questionAttemptStep: NewQuestionAttemptStepParams,
) => {
  const { session } = await getUserAuth();
  const newQuestionAttemptStep = insertQuestionAttemptStepSchema.parse({
    ...questionAttemptStep,
    userId: session?.user.id!,
  });
  try {
    const [q] = await db
      .insert(questionAttemptSteps)
      .values(newQuestionAttemptStep)
      .returning();
    return { questionAttemptStep: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionAttemptStep = async (
  id: QuestionAttemptStepId,
  questionAttemptStep: UpdateQuestionAttemptStepParams,
) => {
  const { session } = await getUserAuth();
  const { id: questionAttemptStepId } = questionAttemptStepIdSchema.parse({
    id,
  });
  const newQuestionAttemptStep = updateQuestionAttemptStepSchema.parse({
    ...questionAttemptStep,
    userId: session?.user.id!,
  });
  try {
    const [q] = await db
      .update(questionAttemptSteps)
      .set({ ...newQuestionAttemptStep, updatedAt: new Date() })
      .where(
        and(
          eq(questionAttemptSteps.id, questionAttemptStepId!),
          eq(questionAttemptSteps.userId, session?.user.id!),
        ),
      )
      .returning();
    return { questionAttemptStep: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionAttemptStep = async (id: QuestionAttemptStepId) => {
  const { session } = await getUserAuth();
  const { id: questionAttemptStepId } = questionAttemptStepIdSchema.parse({
    id,
  });
  try {
    const [q] = await db
      .delete(questionAttemptSteps)
      .where(
        and(
          eq(questionAttemptSteps.id, questionAttemptStepId!),
          eq(questionAttemptSteps.userId, session?.user.id!),
        ),
      )
      .returning();
    return { questionAttemptStep: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
