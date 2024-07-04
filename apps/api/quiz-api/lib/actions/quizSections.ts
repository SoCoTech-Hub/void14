"use server";

import { revalidatePath } from "next/cache";

import {
  createQuizSection,
  deleteQuizSection,
  updateQuizSection,
} from "../api/quizSections/mutations";
import {
  insertQuizSectionParams,
  NewQuizSectionParams,
  QuizSectionId,
  quizSectionIdSchema,
  UpdateQuizSectionParams,
  updateQuizSectionParams,
} from "../db/schema/quizSections";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuizSections = () => revalidatePath("/quiz-sections");

export const createQuizSectionAction = async (input: NewQuizSectionParams) => {
  try {
    const payload = insertQuizSectionParams.parse(input);
    await createQuizSection(payload);
    revalidateQuizSections();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuizSectionAction = async (
  input: UpdateQuizSectionParams,
) => {
  try {
    const payload = updateQuizSectionParams.parse(input);
    await updateQuizSection(payload.id, payload);
    revalidateQuizSections();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuizSectionAction = async (input: QuizSectionId) => {
  try {
    const payload = quizSectionIdSchema.parse({ id: input });
    await deleteQuizSection(payload.id);
    revalidateQuizSections();
  } catch (e) {
    return handleErrors(e);
  }
};
