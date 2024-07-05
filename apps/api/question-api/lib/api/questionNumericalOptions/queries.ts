import { eq } from "drizzle-orm";

import type { QuestionNumericalOptionId } from "../../db/schema/questionNumericalOptions";
import { db } from "../../db/index";
import {
  questionNumericalOptionIdSchema,
  questionNumericalOptions,
} from "../../db/schema/questionNumericalOptions";
import { questions } from "../../db/schema/questions";

export const getQuestionNumericalOptions = async () => {
  const rows = await db
    .select({
      questionNumericalOption: questionNumericalOptions,
      question: questions,
    })
    .from(questionNumericalOptions)
    .leftJoin(questions, eq(questionNumericalOptions.questionId, questions.id));
  const q = rows.map((r) => ({
    ...r.questionNumericalOption,
    question: r.question,
  }));
  return { questionNumericalOptions: q };
};

export const getQuestionNumericalOptionById = async (
  id: QuestionNumericalOptionId,
) => {
  const { id: questionNumericalOptionId } =
    questionNumericalOptionIdSchema.parse({ id });
  const [row] = await db
    .select({
      questionNumericalOption: questionNumericalOptions,
      question: questions,
    })
    .from(questionNumericalOptions)
    .where(eq(questionNumericalOptions.id, questionNumericalOptionId))
    .leftJoin(questions, eq(questionNumericalOptions.questionId, questions.id));
  if (row === undefined) return {};
  const q = { ...row.questionNumericalOption, question: row.question };
  return { questionNumericalOption: q };
};
