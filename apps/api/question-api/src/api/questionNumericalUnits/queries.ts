import type { QuestionNumericalUnitId } from "@soco/question-db/schema/questionNumericalUnits";
import { eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import {
  questionNumericalUnitIdSchema,
  questionNumericalUnits,
} from "@soco/question-db/schema/questionNumericalUnits";
import { questions } from "@soco/question-db/schema/questions";

export const getQuestionNumericalUnits = async () => {
  const rows = await db
    .select({
      questionNumericalUnit: questionNumericalUnits,
      question: questions,
    })
    .from(questionNumericalUnits)
    .leftJoin(questions, eq(questionNumericalUnits.questionId, questions.id));
  const q = rows.map((r) => ({
    ...r.questionNumericalUnit,
    question: r.question,
  }));
  return { questionNumericalUnits: q };
};

export const getQuestionNumericalUnitById = async (
  id: QuestionNumericalUnitId,
) => {
  const { id: questionNumericalUnitId } = questionNumericalUnitIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({
      questionNumericalUnit: questionNumericalUnits,
      question: questions,
    })
    .from(questionNumericalUnits)
    .where(eq(questionNumericalUnits.id, questionNumericalUnitId))
    .leftJoin(questions, eq(questionNumericalUnits.questionId, questions.id));
  if (row === undefined) return {};
  const q = { ...row.questionNumericalUnit, question: row.question };
  return { questionNumericalUnit: q };
};
