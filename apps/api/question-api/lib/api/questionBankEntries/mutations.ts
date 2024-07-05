import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  insertQuestionBankEntrySchema,
  NewQuestionBankEntryParams,
  questionBankEntries,
  QuestionBankEntryId,
  questionBankEntryIdSchema,
  UpdateQuestionBankEntryParams,
  updateQuestionBankEntrySchema,
} from "../../db/schema/questionBankEntries";

export const createQuestionBankEntry = async (
  questionBankEntry: NewQuestionBankEntryParams,
) => {
  const { session } = await getUserAuth();
  const newQuestionBankEntry = insertQuestionBankEntrySchema.parse({
    ...questionBankEntry,
    userId: session?.user.id!,
  });
  try {
    const [q] = await db
      .insert(questionBankEntries)
      .values(newQuestionBankEntry)
      .returning();
    return { questionBankEntry: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionBankEntry = async (
  id: QuestionBankEntryId,
  questionBankEntry: UpdateQuestionBankEntryParams,
) => {
  const { session } = await getUserAuth();
  const { id: questionBankEntryId } = questionBankEntryIdSchema.parse({ id });
  const newQuestionBankEntry = updateQuestionBankEntrySchema.parse({
    ...questionBankEntry,
    userId: session?.user.id!,
  });
  try {
    const [q] = await db
      .update(questionBankEntries)
      .set(newQuestionBankEntry)
      .where(
        and(
          eq(questionBankEntries.id, questionBankEntryId!),
          eq(questionBankEntries.userId, session?.user.id!),
        ),
      )
      .returning();
    return { questionBankEntry: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionBankEntry = async (id: QuestionBankEntryId) => {
  const { session } = await getUserAuth();
  const { id: questionBankEntryId } = questionBankEntryIdSchema.parse({ id });
  try {
    const [q] = await db
      .delete(questionBankEntries)
      .where(
        and(
          eq(questionBankEntries.id, questionBankEntryId!),
          eq(questionBankEntries.userId, session?.user.id!),
        ),
      )
      .returning();
    return { questionBankEntry: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
