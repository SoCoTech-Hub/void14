import { db } from "@soco/question-db/index";
import { eq } from "drizzle-orm";
import { type QuestionReferenceId, questionReferenceIdSchema, questionReferences } from "@soco/question-db/schema/questionReferences";
import { questionBankEntries } from "@soco/question-db/schema/questionBankEntries";

export const getQuestionReferences = async () => {
  const rows = await db.select({ questionReference: questionReferences, questionBankEntry: questionBankEntries }).from(questionReferences).leftJoin(questionBankEntries, eq(questionReferences.questionBankEntryId, questionBankEntries.id));
  const q = rows .map((r) => ({ ...r.questionReference, questionBankEntry: r.questionBankEntry})); 
  return { questionReferences: q };
};

export const getQuestionReferenceById = async (id: QuestionReferenceId) => {
  const { id: questionReferenceId } = questionReferenceIdSchema.parse({ id });
  const [row] = await db.select({ questionReference: questionReferences, questionBankEntry: questionBankEntries }).from(questionReferences).where(eq(questionReferences.id, questionReferenceId)).leftJoin(questionBankEntries, eq(questionReferences.questionBankEntryId, questionBankEntries.id));
  if (row === undefined) return {};
  const q =  { ...row.questionReference, questionBankEntry: row.questionBankEntry } ;
  return { questionReference: q };
};


