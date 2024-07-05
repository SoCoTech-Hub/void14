import { eq } from "drizzle-orm";

import type { QuestionMultianswerId } from "../../db/schema/questionMultianswers";
import { db } from "../../db/index";
import {
  questionMultianswerIdSchema,
  questionMultianswers,
} from "../../db/schema/questionMultianswers";
import { questions } from "../../db/schema/questions";

export const getQuestionMultianswers = async () => {
  const rows = await db
    .select({ questionMultianswer: questionMultianswers, question: questions })
    .from(questionMultianswers)
    .leftJoin(questions, eq(questionMultianswers.questionId, questions.id));
  const q = rows.map((r) => ({
    ...r.questionMultianswer,
    question: r.question,
  }));
  return { questionMultianswers: q };
};

export const getQuestionMultianswerById = async (id: QuestionMultianswerId) => {
  const { id: questionMultianswerId } = questionMultianswerIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({ questionMultianswer: questionMultianswers, question: questions })
    .from(questionMultianswers)
    .where(eq(questionMultianswers.id, questionMultianswerId))
    .leftJoin(questions, eq(questionMultianswers.questionId, questions.id));
  if (row === undefined) return {};
  const q = { ...row.questionMultianswer, question: row.question };
  return { questionMultianswer: q };
};
