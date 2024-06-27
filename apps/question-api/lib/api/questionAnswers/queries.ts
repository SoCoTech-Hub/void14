import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type QuestionAnswerId, questionAnswerIdSchema, questionAnswers } from "@/lib/db/schema/questionAnswers";
import { questions } from "@/lib/db/schema/questions";

export const getQuestionAnswers = async () => {
  const rows = await db.select({ questionAnswer: questionAnswers, question: questions }).from(questionAnswers).leftJoin(questions, eq(questionAnswers.questionId, questions.id));
  const q = rows .map((r) => ({ ...r.questionAnswer, question: r.question})); 
  return { questionAnswers: q };
};

export const getQuestionAnswerById = async (id: QuestionAnswerId) => {
  const { id: questionAnswerId } = questionAnswerIdSchema.parse({ id });
  const [row] = await db.select({ questionAnswer: questionAnswers, question: questions }).from(questionAnswers).where(eq(questionAnswers.id, questionAnswerId)).leftJoin(questions, eq(questionAnswers.questionId, questions.id));
  if (row === undefined) return {};
  const q =  { ...row.questionAnswer, question: row.question } ;
  return { questionAnswer: q };
};


