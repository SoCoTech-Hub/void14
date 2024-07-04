import { eq } from "drizzle-orm";

import type { QuestionCalculatedId } from "../db/schema/questionCalculateds";
import { db } from "../db/index";
import { questionAnswers } from "../db/schema/questionAnswers";
import {
  questionCalculatedIdSchema,
  questionCalculateds,
} from "../db/schema/questionCalculateds";
import { questions } from "../db/schema/questions";

export const getQuestionCalculateds = async () => {
  const rows = await db
    .select({
      questionCalculated: questionCalculateds,
      questionAnswer: questionAnswers,
      question: questions,
    })
    .from(questionCalculateds)
    .leftJoin(
      questionAnswers,
      eq(questionCalculateds.questionAnswerId, questionAnswers.id),
    )
    .leftJoin(questions, eq(questionCalculateds.questionId, questions.id));
  const q = rows.map((r) => ({
    ...r.questionCalculated,
    questionAnswer: r.questionAnswer,
    question: r.question,
  }));
  return { questionCalculateds: q };
};

export const getQuestionCalculatedById = async (id: QuestionCalculatedId) => {
  const { id: questionCalculatedId } = questionCalculatedIdSchema.parse({ id });
  const [row] = await db
    .select({
      questionCalculated: questionCalculateds,
      questionAnswer: questionAnswers,
      question: questions,
    })
    .from(questionCalculateds)
    .where(eq(questionCalculateds.id, questionCalculatedId))
    .leftJoin(
      questionAnswers,
      eq(questionCalculateds.questionAnswerId, questionAnswers.id),
    )
    .leftJoin(questions, eq(questionCalculateds.questionId, questions.id));
  if (row === undefined) return {};
  const q = {
    ...row.questionCalculated,
    questionAnswer: row.questionAnswer,
    question: row.question,
  };
  return { questionCalculated: q };
};
