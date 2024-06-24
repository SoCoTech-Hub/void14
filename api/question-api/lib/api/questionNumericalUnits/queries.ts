import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type QuestionNumericalUnitId, questionNumericalUnitIdSchema, questionNumericalUnits } from "@/lib/db/schema/questionNumericalUnits";
import { questions } from "@/lib/db/schema/questions";

export const getQuestionNumericalUnits = async () => {
  const rows = await db.select({ questionNumericalUnit: questionNumericalUnits, question: questions }).from(questionNumericalUnits).leftJoin(questions, eq(questionNumericalUnits.questionId, questions.id));
  const q = rows .map((r) => ({ ...r.questionNumericalUnit, question: r.question})); 
  return { questionNumericalUnits: q };
};

export const getQuestionNumericalUnitById = async (id: QuestionNumericalUnitId) => {
  const { id: questionNumericalUnitId } = questionNumericalUnitIdSchema.parse({ id });
  const [row] = await db.select({ questionNumericalUnit: questionNumericalUnits, question: questions }).from(questionNumericalUnits).where(eq(questionNumericalUnits.id, questionNumericalUnitId)).leftJoin(questions, eq(questionNumericalUnits.questionId, questions.id));
  if (row === undefined) return {};
  const q =  { ...row.questionNumericalUnit, question: row.question } ;
  return { questionNumericalUnit: q };
};


