"use server";

import { revalidatePath } from "next/cache";
import {
  createGradeCategory,
  deleteGradeCategory,
  updateGradeCategory,
} from "@/lib/api/gradeCategories/mutations";
import {
  GradeCategoryId,
  NewGradeCategoryParams,
  UpdateGradeCategoryParams,
  gradeCategoryIdSchema,
  insertGradeCategoryParams,
  updateGradeCategoryParams,
} from "@/lib/db/schema/gradeCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradeCategories = () => revalidatePath("/grade-categories");

export const createGradeCategoryAction = async (input: NewGradeCategoryParams) => {
  try {
    const payload = insertGradeCategoryParams.parse(input);
    await createGradeCategory(payload);
    revalidateGradeCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradeCategoryAction = async (input: UpdateGradeCategoryParams) => {
  try {
    const payload = updateGradeCategoryParams.parse(input);
    await updateGradeCategory(payload.id, payload);
    revalidateGradeCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradeCategoryAction = async (input: GradeCategoryId) => {
  try {
    const payload = gradeCategoryIdSchema.parse({ id: input });
    await deleteGradeCategory(payload.id);
    revalidateGradeCategories();
  } catch (e) {
    return handleErrors(e);
  }
};