import { db } from "@soco/question-db/client";
import { eq, and } from "@soco/question-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type QuestionAttemptStepId, questionAttemptStepIdSchema, questionAttemptSteps } from "@soco/question-db/schema/questionAttemptSteps";
import { questionAttempts } from "@soco/question-db/schema/questionAttempts";

export const getQuestionAttemptSteps = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ questionAttemptStep: questionAttemptSteps, questionAttempt: questionAttempts }).from(questionAttemptSteps).leftJoin(questionAttempts, eq(questionAttemptSteps.questionAttemptId, questionAttempts.id)).where(eq(questionAttemptSteps.userId, session?.user.id!));
  const q = rows .map((r) => ({ ...r.questionAttemptStep, questionAttempt: r.questionAttempt})); 
  return { questionAttemptSteps: q };
};

export const getQuestionAttemptStepById = async (id: QuestionAttemptStepId) => {
  const { session } = await getUserAuth();
  const { id: questionAttemptStepId } = questionAttemptStepIdSchema.parse({ id });
  const [row] = await db.select({ questionAttemptStep: questionAttemptSteps, questionAttempt: questionAttempts }).from(questionAttemptSteps).where(and(eq(questionAttemptSteps.id, questionAttemptStepId), eq(questionAttemptSteps.userId, session?.user.id!))).leftJoin(questionAttempts, eq(questionAttemptSteps.questionAttemptId, questionAttempts.id));
  if (row === undefined) return {};
  const q =  { ...row.questionAttemptStep, questionAttempt: row.questionAttempt } ;
  return { questionAttemptStep: q };
};


