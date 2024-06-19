import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type QuestionDdwtoId, questionDdwtoIdSchema, questionDdwtos } from "@/lib/db/schema/questionDdwtos";
import { questions } from "@/lib/db/schema/questions";

export const getQuestionDdwtos = async () => {
  const rows = await db.select({ questionDdwto: questionDdwtos, question: questions }).from(questionDdwtos).leftJoin(questions, eq(questionDdwtos.questionId, questions.id));
  const q = rows .map((r) => ({ ...r.questionDdwto, question: r.question})); 
  return { questionDdwtos: q };
};

export const getQuestionDdwtoById = async (id: QuestionDdwtoId) => {
  const { id: questionDdwtoId } = questionDdwtoIdSchema.parse({ id });
  const [row] = await db.select({ questionDdwto: questionDdwtos, question: questions }).from(questionDdwtos).where(eq(questionDdwtos.id, questionDdwtoId)).leftJoin(questions, eq(questionDdwtos.questionId, questions.id));
  if (row === undefined) return {};
  const q =  { ...row.questionDdwto, question: row.question } ;
  return { questionDdwto: q };
};


