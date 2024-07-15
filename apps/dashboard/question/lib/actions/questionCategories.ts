"use server";

import { revalidatePath } from "next/cache";
import {
  createQuestionCategory,
  deleteQuestionCategory,
  updateQuestionCategory,
} from "@/lib/api/questionCategories/mutations";
import {
  QuestionCategoryId,
  NewQuestionCategoryParams,
  UpdateQuestionCategoryParams,
  questionCategoryIdSchema,
  insertQuestionCategoryParams,
  updateQuestionCategoryParams,
} from "@/lib/db/schema/questionCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuestionCategories = () => revalidatePath("/question-categories");

export const createQuestionCategoryAction = async (input: NewQuestionCategoryParams) => {
  try {
    const payload = insertQuestionCategoryParams.parse(input);
    await createQuestionCategory(payload);
    revalidateQuestionCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuestionCategoryAction = async (input: UpdateQuestionCategoryParams) => {
  try {
    const payload = updateQuestionCategoryParams.parse(input);
    await updateQuestionCategory(payload.id, payload);
    revalidateQuestionCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuestionCategoryAction = async (input: QuestionCategoryId) => {
  try {
    const payload = questionCategoryIdSchema.parse({ id: input });
    await deleteQuestionCategory(payload.id);
    revalidateQuestionCategories();
  } catch (e) {
    return handleErrors(e);
  }
};
