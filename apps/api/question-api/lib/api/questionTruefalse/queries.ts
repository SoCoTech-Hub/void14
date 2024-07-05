import { eq } from "drizzle-orm";

import type { QuestionTruefalseId } from "../../db/schema/questionTruefalse";
import { db } from "../../db/index";
import { questionAnswers } from "../../db/schema/questionAnswers";
import { questions } from "../../db/schema/questions";
import {
  questionTruefalse,
  questionTruefalseIdSchema,
} from "../../db/schema/questionTruefalse";

export const getQuestionTruefalses = async () => {
  const rows = await db
    .select({
      questionTruefalse: questionTruefalse,
      falseAnswer: questionAnswers,
      question: questions,
      trueAnswer: questionAnswers,
    })
    .from(questionTruefalse)
    .leftJoin(
      questionAnswers,
      eq(questionTruefalse.falseAnswerId, questionAnswers.id),
    )
    .leftJoin(questions, eq(questionTruefalse.questionId, questions.id))
    .leftJoin(
      questionAnswers,
      eq(questionTruefalse.trueAnswerId, questionAnswers.id),
    );

  const q = rows.map(
    (r: {
      questionTruefalse: any;
      falseAnswer: any;
      question: any;
      trueAnswer: any;
    }) => ({
      ...r.questionTruefalse,
      falseAnswer: r.falseAnswer,
      question: r.question,
      trueAnswer: r.trueAnswer,
    }),
  );
  return { questionTruefalse: q };
};

export const getQuestionTruefalseById = async (id: QuestionTruefalseId) => {
  const { id: questionTruefalseId } = questionTruefalseIdSchema.parse({ id });
  const [row] = await db
    .select({
      questionTruefalse: questionTruefalse,
      falseAnswer: questionAnswers,
      question: questions,
      trueAnswer: questionAnswers,
    })
    .from(questionTruefalse)
    .where(eq(questionTruefalse.id, questionTruefalseId))
    .leftJoin(
      questionAnswers,
      eq(questionTruefalse.falseAnswerId, questionAnswers.id),
    )
    .leftJoin(questions, eq(questionTruefalse.questionId, questions.id))
    .leftJoin(
      questionAnswers,
      eq(questionTruefalse.trueAnswerId, questionAnswers.id),
    );

  if (row === undefined) return {};
  const q = {
    ...row.questionTruefalse,
    falseAnswer: row.falseAnswer,
    question: row.question,
    trueAnswer: row.trueAnswer,
  };
  return { questionTruefalse: q };
};
