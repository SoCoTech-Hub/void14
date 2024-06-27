"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionGapselect,
  deleteQuestionGapselect,
  updateQuestionGapselect,
} from "@/lib/api/questionGapselects/mutations";
import {
  QuestionGapselectId,
  NewQuestionGapselectParams,
  UpdateQuestionGapselectParams,
  questionGapselectIdSchema,
  insertQuestionGapselectParams,
  updateQuestionGapselectParams,
} from "@/lib/db/schema/questionGapselects";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionGapselects = () => revalidatePath("/question-gapselects");

export const createQuestionGapselectAction = async (input: NewQuestionGapselectParams) => {
  try {
    const payload = insertQuestionGapselectParams.parse(input);
    await createQuestionGapselect(payload);
    revalidateQuestionGapselects();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionGapselectAction = async (input: UpdateQuestionGapselectParams) => {
  try {
    const payload = updateQuestionGapselectParams.parse(input);
    await updateQuestionGapselect(payload.id, payload);
    revalidateQuestionGapselects();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionGapselectAction = async (input: QuestionGapselectId) => {
  try {
    const payload = questionGapselectIdSchema.parse({ id: input });
    await deleteQuestionGapselect(payload.id);
    revalidateQuestionGapselects();
  } catch (e) {
    return handleErrors(e);
  }
};