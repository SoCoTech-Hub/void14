import type { QuestionNumericalId } from "@soco/question-db/schema/questionNumericals";
import { eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import { questionAnswers } from "@soco/question-db/schema/questionAnswers";
import {
  questionNumericalIdSchema,
  questionNumericals,
} from "@soco/question-db/schema/questionNumericals";
import { questions } from "@soco/question-db/schema/questions";

export const getQuestionNumericals = async () => {
  const rows = await db
    .select({
      questionNumerical: questionNumericals,
      questionAnswer: questionAnswers,
      question: questions,
    })
    .from(questionNumericals)
    .leftJoin(
      questionAnswers,
      eq(questionNumericals.questionAnswerId, questionAnswers.id),
    )
    .leftJoin(questions, eq(questionNumericals.questionId, questions.id));
  const q = rows.map((r) => ({
    ...r.questionNumerical,
    questionAnswer: r.questionAnswer,
    question: r.question,
  }));
  return { questionNumericals: q };
};

export const getQuestionNumericalById = async (id: QuestionNumericalId) => {
  const { id: questionNumericalId } = questionNumericalIdSchema.parse({ id });
  const [row] = await db
    .select({
      questionNumerical: questionNumericals,
      questionAnswer: questionAnswers,
      question: questions,
    })
    .from(questionNumericals)
    .where(eq(questionNumericals.id, questionNumericalId))
    .leftJoin(
      questionAnswers,
      eq(questionNumericals.questionAnswerId, questionAnswers.id),
    )
    .leftJoin(questions, eq(questionNumericals.questionId, questions.id));
  if (row === undefined) return {};
  const q = {
    ...row.questionNumerical,
    questionAnswer: row.questionAnswer,
    question: row.question,
  };
  return { questionNumerical: q };
};
