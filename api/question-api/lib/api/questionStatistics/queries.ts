import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type QuestionStatisticId, questionStatisticIdSchema, questionStatistics } from "@/lib/db/schema/questionStatistics";
import { questions } from "@/lib/db/schema/questions";

export const getQuestionStatistics = async () => {
  const rows = await db.select({ questionStatistic: questionStatistics, question: questions }).from(questionStatistics).leftJoin(questions, eq(questionStatistics.questionId, questions.id));
  const q = rows .map((r) => ({ ...r.questionStatistic, question: r.question})); 
  return { questionStatistics: q };
};

export const getQuestionStatisticById = async (id: QuestionStatisticId) => {
  const { id: questionStatisticId } = questionStatisticIdSchema.parse({ id });
  const [row] = await db.select({ questionStatistic: questionStatistics, question: questions }).from(questionStatistics).where(eq(questionStatistics.id, questionStatisticId)).leftJoin(questions, eq(questionStatistics.questionId, questions.id));
  if (row === undefined) return {};
  const q =  { ...row.questionStatistic, question: row.question } ;
  return { questionStatistic: q };
};


