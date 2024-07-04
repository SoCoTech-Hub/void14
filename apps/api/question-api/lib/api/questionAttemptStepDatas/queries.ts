import { eq } from "drizzle-orm";

import type { QuestionAttemptStepDataId } from "../db/schema/questionAttemptStepDatas";
import { db } from "../db/index";
import {
  questionAttemptStepDataIdSchema,
  questionAttemptStepDatas,
} from "../db/schema/questionAttemptStepDatas";
import { questionAttemptSteps } from "../db/schema/questionAttemptSteps";

export const getQuestionAttemptStepDatas = async () => {
  const rows = await db
    .select({
      questionAttemptStepData: questionAttemptStepDatas,
      questionAttemptStep: questionAttemptSteps,
    })
    .from(questionAttemptStepDatas)
    .leftJoin(
      questionAttemptSteps,
      eq(
        questionAttemptStepDatas.questionAttemptStepId,
        questionAttemptSteps.id,
      ),
    );
  const q = rows.map((r) => ({
    ...r.questionAttemptStepData,
    questionAttemptStep: r.questionAttemptStep,
  }));
  return { questionAttemptStepDatas: q };
};

export const getQuestionAttemptStepDataById = async (
  id: QuestionAttemptStepDataId,
) => {
  const { id: questionAttemptStepDataId } =
    questionAttemptStepDataIdSchema.parse({ id });
  const [row] = await db
    .select({
      questionAttemptStepData: questionAttemptStepDatas,
      questionAttemptStep: questionAttemptSteps,
    })
    .from(questionAttemptStepDatas)
    .where(eq(questionAttemptStepDatas.id, questionAttemptStepDataId))
    .leftJoin(
      questionAttemptSteps,
      eq(
        questionAttemptStepDatas.questionAttemptStepId,
        questionAttemptSteps.id,
      ),
    );
  if (row === undefined) return {};
  const q = {
    ...row.questionAttemptStepData,
    questionAttemptStep: row.questionAttemptStep,
  };
  return { questionAttemptStepData: q };
};
