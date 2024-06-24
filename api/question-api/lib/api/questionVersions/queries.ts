import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type QuestionVersionId, questionVersionIdSchema, questionVersions } from "@/lib/db/schema/questionVersions";
import { questionBankEntries } from "@/lib/db/schema/questionBankEntries";
import { questions } from "@/lib/db/schema/questions";

export const getQuestionVersions = async () => {
  const rows = await db.select({ questionVersion: questionVersions, questionBankEntry: questionBankEntries, question: questions }).from(questionVersions).leftJoin(questionBankEntries, eq(questionVersions.questionBankEntryId, questionBankEntries.id)).leftJoin(questions, eq(questionVersions.questionId, questions.id));
  const q = rows .map((r) => ({ ...r.questionVersion, questionBankEntry: r.questionBankEntry, question: r.question})); 
  return { questionVersions: q };
};

export const getQuestionVersionById = async (id: QuestionVersionId) => {
  const { id: questionVersionId } = questionVersionIdSchema.parse({ id });
  const [row] = await db.select({ questionVersion: questionVersions, questionBankEntry: questionBankEntries, question: questions }).from(questionVersions).where(eq(questionVersions.id, questionVersionId)).leftJoin(questionBankEntries, eq(questionVersions.questionBankEntryId, questionBankEntries.id)).leftJoin(questions, eq(questionVersions.questionId, questions.id));
  if (row === undefined) return {};
  const q =  { ...row.questionVersion, questionBankEntry: row.questionBankEntry, question: row.question } ;
  return { questionVersion: q };
};


