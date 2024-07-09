import { and, eq } from "drizzle-orm";

import type { QuestionBankEntryId } from "@soco/question-db/schema/questionBankEntries";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/question-db/index";
import {
  questionBankEntries,
  questionBankEntryIdSchema,
} from "@soco/question-db/schema/questionBankEntries";
import { questionCategories } from "@soco/question-db/schema/questionCategories";

export const getQuestionBankEntries = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      questionBankEntry: questionBankEntries,
      questionCategory: questionCategories,
    })
    .from(questionBankEntries)
    .leftJoin(
      questionCategories,
      eq(questionBankEntries.questionCategoryId, questionCategories.id),
    )
    .where(eq(questionBankEntries.userId, session?.user.id!));
  const q = rows.map((r) => ({
    ...r.questionBankEntry,
    questionCategory: r.questionCategory,
  }));
  return { questionBankEntries: q };
};

export const getQuestionBankEntryById = async (id: QuestionBankEntryId) => {
  const { session } = await getUserAuth();
  const { id: questionBankEntryId } = questionBankEntryIdSchema.parse({ id });
  const [row] = await db
    .select({
      questionBankEntry: questionBankEntries,
      questionCategory: questionCategories,
    })
    .from(questionBankEntries)
    .where(
      and(
        eq(questionBankEntries.id, questionBankEntryId),
        eq(questionBankEntries.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      questionCategories,
      eq(questionBankEntries.questionCategoryId, questionCategories.id),
    );
  if (row === undefined) return {};
  const q = {
    ...row.questionBankEntry,
    questionCategory: row.questionCategory,
  };
  return { questionBankEntry: q };
};
