"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionUsage,
  deleteQuestionUsage,
  updateQuestionUsage,
} from "@/lib/api/questionUsages/mutations";
import {
  QuestionUsageId,
  NewQuestionUsageParams,
  UpdateQuestionUsageParams,
  questionUsageIdSchema,
  insertQuestionUsageParams,
  updateQuestionUsageParams,
} from "@/lib/db/schema/questionUsages";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionUsages = () => revalidatePath("/question-usages");

export const createQuestionUsageAction = async (input: NewQuestionUsageParams) => {
  try {
    const payload = insertQuestionUsageParams.parse(input);
    await createQuestionUsage(payload);
    revalidateQuestionUsages();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionUsageAction = async (input: UpdateQuestionUsageParams) => {
  try {
    const payload = updateQuestionUsageParams.parse(input);
    await updateQuestionUsage(payload.id, payload);
    revalidateQuestionUsages();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionUsageAction = async (input: QuestionUsageId) => {
  try {
    const payload = questionUsageIdSchema.parse({ id: input });
    await deleteQuestionUsage(payload.id);
    revalidateQuestionUsages();
  } catch (e) {
    return handleErrors(e);
  }
};
