"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionHint,
  deleteQuestionHint,
  updateQuestionHint,
} from "@/lib/api/questionHints/mutations";
import {
  QuestionHintId,
  NewQuestionHintParams,
  UpdateQuestionHintParams,
  questionHintIdSchema,
  insertQuestionHintParams,
  updateQuestionHintParams,
} from "@/lib/db/schema/questionHints";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionHints = () => revalidatePath("/question-hints");

export const createQuestionHintAction = async (input: NewQuestionHintParams) => {
  try {
    const payload = insertQuestionHintParams.parse(input);
    await createQuestionHint(payload);
    revalidateQuestionHints();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionHintAction = async (input: UpdateQuestionHintParams) => {
  try {
    const payload = updateQuestionHintParams.parse(input);
    await updateQuestionHint(payload.id, payload);
    revalidateQuestionHints();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionHintAction = async (input: QuestionHintId) => {
  try {
    const payload = questionHintIdSchema.parse({ id: input });
    await deleteQuestionHint(payload.id);
    revalidateQuestionHints();
  } catch (e) {
    return handleErrors(e);
  }
};