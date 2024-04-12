"use server";

import { revalidatePath } from "next/cache";
import {
  createSubjectsSubjectCategory,
  deleteSubjectsSubjectCategory,
  updateSubjectsSubjectCategory,
} from "@/lib/api/subjectsSubjectCategories/mutations";
import {
  SubjectsSubjectCategoryId,
  NewSubjectsSubjectCategoryParams,
  UpdateSubjectsSubjectCategoryParams,
  subjectsSubjectCategoryIdSchema,
  insertSubjectsSubjectCategoryParams,
  updateSubjectsSubjectCategoryParams,
} from "@/lib/db/schema/subjectsSubjectCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSubjectsSubjectCategories = () => revalidatePath("/subjects-subject-categories");

export const createSubjectsSubjectCategoryAction = async (input: NewSubjectsSubjectCategoryParams) => {
  try {
    const payload = insertSubjectsSubjectCategoryParams.parse(input);
    await createSubjectsSubjectCategory(payload);
    revalidateSubjectsSubjectCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSubjectsSubjectCategoryAction = async (input: UpdateSubjectsSubjectCategoryParams) => {
  try {
    const payload = updateSubjectsSubjectCategoryParams.parse(input);
    await updateSubjectsSubjectCategory(payload.id, payload);
    revalidateSubjectsSubjectCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSubjectsSubjectCategoryAction = async (input: SubjectsSubjectCategoryId) => {
  try {
    const payload = subjectsSubjectCategoryIdSchema.parse({ id: input });
    await deleteSubjectsSubjectCategory(payload.id);
    revalidateSubjectsSubjectCategories();
  } catch (e) {
    return handleErrors(e);
  }
};