import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type QuestionResponseCountId, questionResponseCountIdSchema, questionResponseCounts } from "@/lib/db/schema/questionResponseCounts";
import { questionResponseAnalysises } from "@/lib/db/schema/questionResponseAnalysises";

export const getQuestionResponseCounts = async () => {
  const rows = await db.select({ questionResponseCount: questionResponseCounts, questionResponseAnalysise: questionResponseAnalysises }).from(questionResponseCounts).leftJoin(questionResponseAnalysises, eq(questionResponseCounts.questionResponseAnalysiseId, questionResponseAnalysises.id));
  const q = rows .map((r) => ({ ...r.questionResponseCount, questionResponseAnalysise: r.questionResponseAnalysise})); 
  return { questionResponseCounts: q };
};

export const getQuestionResponseCountById = async (id: QuestionResponseCountId) => {
  const { id: questionResponseCountId } = questionResponseCountIdSchema.parse({ id });
  const [row] = await db.select({ questionResponseCount: questionResponseCounts, questionResponseAnalysise: questionResponseAnalysises }).from(questionResponseCounts).where(eq(questionResponseCounts.id, questionResponseCountId)).leftJoin(questionResponseAnalysises, eq(questionResponseCounts.questionResponseAnalysiseId, questionResponseAnalysises.id));
  if (row === undefined) return {};
  const q =  { ...row.questionResponseCount, questionResponseAnalysise: row.questionResponseAnalysise } ;
  return { questionResponseCount: q };
};


