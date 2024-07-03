"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionMultianswer,
  deleteQuestionMultianswer,
  updateQuestionMultianswer,
} from "@/lib/api/questionMultianswers/mutations";
import {
  QuestionMultianswerId,
  NewQuestionMultianswerParams,
  UpdateQuestionMultianswerParams,
  questionMultianswerIdSchema,
  insertQuestionMultianswerParams,
  updateQuestionMultianswerParams,
} from "@/lib/db/schema/questionMultianswers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionMultianswers = () => revalidatePath("/question-multianswers");

export const createQuestionMultianswerAction = async (input: NewQuestionMultianswerParams) => {
  try {
    const payload = insertQuestionMultianswerParams.parse(input);
    await createQuestionMultianswer(payload);
    revalidateQuestionMultianswers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionMultianswerAction = async (input: UpdateQuestionMultianswerParams) => {
  try {
    const payload = updateQuestionMultianswerParams.parse(input);
    await updateQuestionMultianswer(payload.id, payload);
    revalidateQuestionMultianswers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionMultianswerAction = async (input: QuestionMultianswerId) => {
  try {
    const payload = questionMultianswerIdSchema.parse({ id: input });
    await deleteQuestionMultianswer(payload.id);
    revalidateQuestionMultianswers();
  } catch (e) {
    return handleErrors(e);
  }
};