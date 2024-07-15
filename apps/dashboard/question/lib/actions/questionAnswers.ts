"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionAnswer,
  deleteQuestionAnswer,
  updateQuestionAnswer,
} from "@/lib/api/questionAnswers/mutations";
import {
  QuestionAnswerId,
  NewQuestionAnswerParams,
  UpdateQuestionAnswerParams,
  questionAnswerIdSchema,
  insertQuestionAnswerParams,
  updateQuestionAnswerParams,
} from "@/lib/db/schema/questionAnswers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionAnswers = () => revalidatePath("/question-answers");

export const createQuestionAnswerAction = async (input: NewQuestionAnswerParams) => {
  try {
    const payload = insertQuestionAnswerParams.parse(input);
    await createQuestionAnswer(payload);
    revalidateQuestionAnswers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionAnswerAction = async (input: UpdateQuestionAnswerParams) => {
  try {
    const payload = updateQuestionAnswerParams.parse(input);
    await updateQuestionAnswer(payload.id, payload);
    revalidateQuestionAnswers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionAnswerAction = async (input: QuestionAnswerId) => {
  try {
    const payload = questionAnswerIdSchema.parse({ id: input });
    await deleteQuestionAnswer(payload.id);
    revalidateQuestionAnswers();
  } catch (e) {
    return handleErrors(e);
  }
};
