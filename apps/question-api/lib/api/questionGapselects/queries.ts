import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type QuestionGapselectId, questionGapselectIdSchema, questionGapselects } from "@/lib/db/schema/questionGapselects";
import { questions } from "@/lib/db/schema/questions";

export const getQuestionGapselects = async () => {
  const rows = await db.select({ questionGapselect: questionGapselects, question: questions }).from(questionGapselects).leftJoin(questions, eq(questionGapselects.questionId, questions.id));
  const q = rows .map((r) => ({ ...r.questionGapselect, question: r.question})); 
  return { questionGapselects: q };
};

export const getQuestionGapselectById = async (id: QuestionGapselectId) => {
  const { id: questionGapselectId } = questionGapselectIdSchema.parse({ id });
  const [row] = await db.select({ questionGapselect: questionGapselects, question: questions }).from(questionGapselects).where(eq(questionGapselects.id, questionGapselectId)).leftJoin(questions, eq(questionGapselects.questionId, questions.id));
  if (row === undefined) return {};
  const q =  { ...row.questionGapselect, question: row.question } ;
  return { questionGapselect: q };
};


