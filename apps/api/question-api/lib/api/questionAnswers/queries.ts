import { eq } from "drizzle-orm";

import type { QuestionAnswerId } from "../../db/schema/questionAnswers";
import { db } from "../../db/index";
import {
  questionAnswerIdSchema,
  questionAnswers,
} from "../../db/schema/questionAnswers";
import { questions } from "../../db/schema/questions";

export const getQuestionAnswers = async () => {
  const rows = await db
    .select({ questionAnswer: questionAnswers, question: questions })
    .from(questionAnswers)
    .leftJoin(questions, eq(questionAnswers.questionId, questions.id));
  const q = rows.map((r) => ({ ...r.questionAnswer, question: r.question }));
  return { questionAnswers: q };
};

export const getQuestionAnswerById = async (id: QuestionAnswerId) => {
  const { id: questionAnswerId } = questionAnswerIdSchema.parse({ id });
  const [row] = await db
    .select({ questionAnswer: questionAnswers, question: questions })
    .from(questionAnswers)
    .where(eq(questionAnswers.id, questionAnswerId))
    .leftJoin(questions, eq(questionAnswers.questionId, questions.id));
  if (row === undefined) return {};
  const q = { ...row.questionAnswer, question: row.question };
  return { questionAnswer: q };
};
