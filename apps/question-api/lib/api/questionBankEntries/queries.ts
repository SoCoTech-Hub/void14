import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type QuestionBankEntryId, questionBankEntryIdSchema, questionBankEntries } from "@/lib/db/schema/questionBankEntries";
import { questionCategories } from "@/lib/db/schema/questionCategories";

export const getQuestionBankEntries = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ questionBankEntry: questionBankEntries, questionCategory: questionCategories }).from(questionBankEntries).leftJoin(questionCategories, eq(questionBankEntries.questionCategoryId, questionCategories.id)).where(eq(questionBankEntries.userId, session?.user.id!));
  const q = rows .map((r) => ({ ...r.questionBankEntry, questionCategory: r.questionCategory})); 
  return { questionBankEntries: q };
};

export const getQuestionBankEntryById = async (id: QuestionBankEntryId) => {
  const { session } = await getUserAuth();
  const { id: questionBankEntryId } = questionBankEntryIdSchema.parse({ id });
  const [row] = await db.select({ questionBankEntry: questionBankEntries, questionCategory: questionCategories }).from(questionBankEntries).where(and(eq(questionBankEntries.id, questionBankEntryId), eq(questionBankEntries.userId, session?.user.id!))).leftJoin(questionCategories, eq(questionBankEntries.questionCategoryId, questionCategories.id));
  if (row === undefined) return {};
  const q =  { ...row.questionBankEntry, questionCategory: row.questionCategory } ;
  return { questionBankEntry: q };
};


