import { eq } from "drizzle-orm";

import type { QuestionReferenceId } from "../db/schema/questionReferences";
import { db } from "../db/index";
import { questionBankEntries } from "../db/schema/questionBankEntries";
import {
  questionReferenceIdSchema,
  questionReferences,
} from "../db/schema/questionReferences";

export const getQuestionReferences = async () => {
  const rows = await db
    .select({
      questionReference: questionReferences,
      questionBankEntry: questionBankEntries,
    })
    .from(questionReferences)
    .leftJoin(
      questionBankEntries,
      eq(questionReferences.questionBankEntryId, questionBankEntries.id),
    );
  const q = rows.map((r) => ({
    ...r.questionReference,
    questionBankEntry: r.questionBankEntry,
  }));
  return { questionReferences: q };
};

export const getQuestionReferenceById = async (id: QuestionReferenceId) => {
  const { id: questionReferenceId } = questionReferenceIdSchema.parse({ id });
  const [row] = await db
    .select({
      questionReference: questionReferences,
      questionBankEntry: questionBankEntries,
    })
    .from(questionReferences)
    .where(eq(questionReferences.id, questionReferenceId))
    .leftJoin(
      questionBankEntries,
      eq(questionReferences.questionBankEntryId, questionBankEntries.id),
    );
  if (row === undefined) return {};
  const q = {
    ...row.questionReference,
    questionBankEntry: row.questionBankEntry,
  };
  return { questionReference: q };
};
