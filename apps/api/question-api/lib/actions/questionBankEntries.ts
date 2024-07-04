"use server";

import { revalidatePath } from "next/cache";

import {
  createQuestionBankEntry,
  deleteQuestionBankEntry,
  updateQuestionBankEntry,
} from "../api/questionBankEntries/mutations";
import {
  insertQuestionBankEntryParams,
  NewQuestionBankEntryParams,
  QuestionBankEntryId,
  questionBankEntryIdSchema,
  UpdateQuestionBankEntryParams,
  updateQuestionBankEntryParams,
} from "../db/schema/questionBankEntries";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionBankEntries = () =>
  revalidatePath("/question-bank-entries");

export const createQuestionBankEntryAction = async (
  input: NewQuestionBankEntryParams,
) => {
  try {
    const payload = insertQuestionBankEntryParams.parse(input);
    await createQuestionBankEntry(payload);
    revalidateQuestionBankEntries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionBankEntryAction = async (
  input: UpdateQuestionBankEntryParams,
) => {
  try {
    const payload = updateQuestionBankEntryParams.parse(input);
    await updateQuestionBankEntry(payload.id, payload);
    revalidateQuestionBankEntries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionBankEntryAction = async (
  input: QuestionBankEntryId,
) => {
  try {
    const payload = questionBankEntryIdSchema.parse({ id: input });
    await deleteQuestionBankEntry(payload.id);
    revalidateQuestionBankEntries();
  } catch (e) {
    return handleErrors(e);
  }
};
