import { eq } from "drizzle-orm";

import type { QuestionStatisticId } from "../db/schema/questionStatistics";
import { db } from "../db/index";
import { questions } from "../db/schema/questions";
import {
  questionStatisticIdSchema,
  questionStatistics,
} from "../db/schema/questionStatistics";

export const getQuestionStatistics = async () => {
  const rows = await db
    .select({ questionStatistic: questionStatistics, question: questions })
    .from(questionStatistics)
    .leftJoin(questions, eq(questionStatistics.questionId, questions.id));
  const q = rows.map((r) => ({ ...r.questionStatistic, question: r.question }));
  return { questionStatistics: q };
};

export const getQuestionStatisticById = async (id: QuestionStatisticId) => {
  const { id: questionStatisticId } = questionStatisticIdSchema.parse({ id });
  const [row] = await db
    .select({ questionStatistic: questionStatistics, question: questions })
    .from(questionStatistics)
    .where(eq(questionStatistics.id, questionStatisticId))
    .leftJoin(questions, eq(questionStatistics.questionId, questions.id));
  if (row === undefined) return {};
  const q = { ...row.questionStatistic, question: row.question };
  return { questionStatistic: q };
};
