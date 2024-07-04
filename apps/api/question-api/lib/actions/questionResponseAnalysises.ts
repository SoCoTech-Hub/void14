"use server";

import { revalidatePath } from "next/cache";

import {
  createQuestionResponseAnalysise,
  deleteQuestionResponseAnalysise,
  updateQuestionResponseAnalysise,
} from "../api/questionResponseAnalysises/mutations";
import {
  insertQuestionResponseAnalysiseParams,
  NewQuestionResponseAnalysiseParams,
  QuestionResponseAnalysiseId,
  questionResponseAnalysiseIdSchema,
  UpdateQuestionResponseAnalysiseParams,
  updateQuestionResponseAnalysiseParams,
} from "../db/schema/questionResponseAnalysises";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionResponseAnalysises = () =>
  revalidatePath("/question-response-analysises");

export const createQuestionResponseAnalysiseAction = async (
  input: NewQuestionResponseAnalysiseParams,
) => {
  try {
    const payload = insertQuestionResponseAnalysiseParams.parse(input);
    await createQuestionResponseAnalysise(payload);
    revalidateQuestionResponseAnalysises();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionResponseAnalysiseAction = async (
  input: UpdateQuestionResponseAnalysiseParams,
) => {
  try {
    const payload = updateQuestionResponseAnalysiseParams.parse(input);
    await updateQuestionResponseAnalysise(payload.id, payload);
    revalidateQuestionResponseAnalysises();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionResponseAnalysiseAction = async (
  input: QuestionResponseAnalysiseId,
) => {
  try {
    const payload = questionResponseAnalysiseIdSchema.parse({ id: input });
    await deleteQuestionResponseAnalysise(payload.id);
    revalidateQuestionResponseAnalysises();
  } catch (e) {
    return handleErrors(e);
  }
};
