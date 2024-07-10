import { db } from "@soco/question-db/client";
import { eq } from "@soco/question-db";
import { type QuestionHintId, questionHintIdSchema, questionHints } from "@soco/question-db/schema/questionHints";
import { questions } from "@soco/question-db/schema/questions";

export const getQuestionHints = async () => {
  const rows = await db.select({ questionHint: questionHints, question: questions }).from(questionHints).leftJoin(questions, eq(questionHints.questionId, questions.id));
  const q = rows .map((r) => ({ ...r.questionHint, question: r.question})); 
  return { questionHints: q };
};

export const getQuestionHintById = async (id: QuestionHintId) => {
  const { id: questionHintId } = questionHintIdSchema.parse({ id });
  const [row] = await db.select({ questionHint: questionHints, question: questions }).from(questionHints).where(eq(questionHints.id, questionHintId)).leftJoin(questions, eq(questionHints.questionId, questions.id));
  if (row === undefined) return {};
  const q =  { ...row.questionHint, question: row.question } ;
  return { questionHint: q };
};


