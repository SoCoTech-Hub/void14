"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionDdwto,
  deleteQuestionDdwto,
  updateQuestionDdwto,
} from "@/lib/api/questionDdwtos/mutations";
import {
  QuestionDdwtoId,
  NewQuestionDdwtoParams,
  UpdateQuestionDdwtoParams,
  questionDdwtoIdSchema,
  insertQuestionDdwtoParams,
  updateQuestionDdwtoParams,
} from "@/lib/db/schema/questionDdwtos";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionDdwtos = () => revalidatePath("/question-ddwtos");

export const createQuestionDdwtoAction = async (input: NewQuestionDdwtoParams) => {
  try {
    const payload = insertQuestionDdwtoParams.parse(input);
    await createQuestionDdwto(payload);
    revalidateQuestionDdwtos();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionDdwtoAction = async (input: UpdateQuestionDdwtoParams) => {
  try {
    const payload = updateQuestionDdwtoParams.parse(input);
    await updateQuestionDdwto(payload.id, payload);
    revalidateQuestionDdwtos();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionDdwtoAction = async (input: QuestionDdwtoId) => {
  try {
    const payload = questionDdwtoIdSchema.parse({ id: input });
    await deleteQuestionDdwto(payload.id);
    revalidateQuestionDdwtos();
  } catch (e) {
    return handleErrors(e);
  }
};
