import { db } from "@soco/question-db/client";
import { eq } from "@soco/question-db";
import { type QuestionAttemptStepDataId, questionAttemptStepDataIdSchema, questionAttemptStepDatas } from "@soco/question-db/schema/questionAttemptStepDatas";
import { questionAttemptSteps } from "@soco/question-db/schema/questionAttemptSteps";

export const getQuestionAttemptStepDatas = async () => {
  const rows = await db.select({ questionAttemptStepData: questionAttemptStepDatas, questionAttemptStep: questionAttemptSteps }).from(questionAttemptStepDatas).leftJoin(questionAttemptSteps, eq(questionAttemptStepDatas.questionAttemptStepId, questionAttemptSteps.id));
  const q = rows .map((r) => ({ ...r.questionAttemptStepData, questionAttemptStep: r.questionAttemptStep})); 
  return { questionAttemptStepDatas: q };
};

export const getQuestionAttemptStepDataById = async (id: QuestionAttemptStepDataId) => {
  const { id: questionAttemptStepDataId } = questionAttemptStepDataIdSchema.parse({ id });
  const [row] = await db.select({ questionAttemptStepData: questionAttemptStepDatas, questionAttemptStep: questionAttemptSteps }).from(questionAttemptStepDatas).where(eq(questionAttemptStepDatas.id, questionAttemptStepDataId)).leftJoin(questionAttemptSteps, eq(questionAttemptStepDatas.questionAttemptStepId, questionAttemptSteps.id));
  if (row === undefined) return {};
  const q =  { ...row.questionAttemptStepData, questionAttemptStep: row.questionAttemptStep } ;
  return { questionAttemptStepData: q };
};


