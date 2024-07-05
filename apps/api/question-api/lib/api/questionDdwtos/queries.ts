import { eq } from "drizzle-orm";

import type { QuestionDdwtoId } from "../../db/schema/questionDdwtos";
import { db } from "../../db/index";
import {
  questionDdwtoIdSchema,
  questionDdwtos,
} from "../../db/schema/questionDdwtos";
import { questions } from "../../db/schema/questions";

export const getQuestionDdwtos = async () => {
  const rows = await db
    .select({ questionDdwto: questionDdwtos, question: questions })
    .from(questionDdwtos)
    .leftJoin(questions, eq(questionDdwtos.questionId, questions.id));
  const q = rows.map((r) => ({ ...r.questionDdwto, question: r.question }));
  return { questionDdwtos: q };
};

export const getQuestionDdwtoById = async (id: QuestionDdwtoId) => {
  const { id: questionDdwtoId } = questionDdwtoIdSchema.parse({ id });
  const [row] = await db
    .select({ questionDdwto: questionDdwtos, question: questions })
    .from(questionDdwtos)
    .where(eq(questionDdwtos.id, questionDdwtoId))
    .leftJoin(questions, eq(questionDdwtos.questionId, questions.id));
  if (row === undefined) return {};
  const q = { ...row.questionDdwto, question: row.question };
  return { questionDdwto: q };
};
