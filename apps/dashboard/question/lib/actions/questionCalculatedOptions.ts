"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionCalculatedOption,
  deleteQuestionCalculatedOption,
  updateQuestionCalculatedOption,
} from "@/lib/api/questionCalculatedOptions/mutations";
import {
  QuestionCalculatedOptionId,
  NewQuestionCalculatedOptionParams,
  UpdateQuestionCalculatedOptionParams,
  questionCalculatedOptionIdSchema,
  insertQuestionCalculatedOptionParams,
  updateQuestionCalculatedOptionParams,
} from "@/lib/db/schema/questionCalculatedOptions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionCalculatedOptions = () => revalidatePath("/question-calculated-options");

export const createQuestionCalculatedOptionAction = async (input: NewQuestionCalculatedOptionParams) => {
  try {
    const payload = insertQuestionCalculatedOptionParams.parse(input);
    await createQuestionCalculatedOption(payload);
    revalidateQuestionCalculatedOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionCalculatedOptionAction = async (input: UpdateQuestionCalculatedOptionParams) => {
  try {
    const payload = updateQuestionCalculatedOptionParams.parse(input);
    await updateQuestionCalculatedOption(payload.id, payload);
    revalidateQuestionCalculatedOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionCalculatedOptionAction = async (input: QuestionCalculatedOptionId) => {
  try {
    const payload = questionCalculatedOptionIdSchema.parse({ id: input });
    await deleteQuestionCalculatedOption(payload.id);
    revalidateQuestionCalculatedOptions();
  } catch (e) {
    return handleErrors(e);
  }
};
