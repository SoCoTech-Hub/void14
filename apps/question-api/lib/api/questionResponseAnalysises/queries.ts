import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type QuestionResponseAnalysiseId, questionResponseAnalysiseIdSchema, questionResponseAnalysises } from "@/lib/db/schema/questionResponseAnalysises";
import { questions } from "@/lib/db/schema/questions";

export const getQuestionResponseAnalysises = async () => {
  const rows = await db.select({ questionResponseAnalysise: questionResponseAnalysises, question: questions }).from(questionResponseAnalysises).leftJoin(questions, eq(questionResponseAnalysises.questionId, questions.id));
  const q = rows .map((r) => ({ ...r.questionResponseAnalysise, question: r.question})); 
  return { questionResponseAnalysises: q };
};

export const getQuestionResponseAnalysiseById = async (id: QuestionResponseAnalysiseId) => {
  const { id: questionResponseAnalysiseId } = questionResponseAnalysiseIdSchema.parse({ id });
  const [row] = await db.select({ questionResponseAnalysise: questionResponseAnalysises, question: questions }).from(questionResponseAnalysises).where(eq(questionResponseAnalysises.id, questionResponseAnalysiseId)).leftJoin(questions, eq(questionResponseAnalysises.questionId, questions.id));
  if (row === undefined) return {};
  const q =  { ...row.questionResponseAnalysise, question: row.question } ;
  return { questionResponseAnalysise: q };
};


