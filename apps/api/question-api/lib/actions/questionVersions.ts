"use server";

import { revalidatePath } from "next/cache";

import {
  createQuestionVersion,
  deleteQuestionVersion,
  updateQuestionVersion,
} from "../api/questionVersions/mutations";
import {
  insertQuestionVersionParams,
  NewQuestionVersionParams,
  QuestionVersionId,
  questionVersionIdSchema,
  UpdateQuestionVersionParams,
  updateQuestionVersionParams,
} from "../db/schema/questionVersions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionVersions = () => revalidatePath("/question-versions");

export const createQuestionVersionAction = async (
  input: NewQuestionVersionParams,
) => {
  try {
    const payload = insertQuestionVersionParams.parse(input);
    await createQuestionVersion(payload);
    revalidateQuestionVersions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionVersionAction = async (
  input: UpdateQuestionVersionParams,
) => {
  try {
    const payload = updateQuestionVersionParams.parse(input);
    await updateQuestionVersion(payload.id, payload);
    revalidateQuestionVersions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionVersionAction = async (input: QuestionVersionId) => {
  try {
    const payload = questionVersionIdSchema.parse({ id: input });
    await deleteQuestionVersion(payload.id);
    revalidateQuestionVersions();
  } catch (e) {
    return handleErrors(e);
  }
};
