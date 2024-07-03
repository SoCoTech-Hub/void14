"use server";

import { revalidatePath } from "next/cache";
import {
  createSubjectCategory,
  deleteSubjectCategory,
  updateSubjectCategory,
} from "@/lib/api/subjectCategories/mutations";
import {
  SubjectCategoryId,
  NewSubjectCategoryParams,
  UpdateSubjectCategoryParams,
  subjectCategoryIdSchema,
  insertSubjectCategoryParams,
  updateSubjectCategoryParams,
} from "@/lib/db/schema/subjectCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSubjectCategories = () => revalidatePath("/subject-categories");

export const createSubjectCategoryAction = async (input: NewSubjectCategoryParams) => {
  try {
    const payload = insertSubjectCategoryParams.parse(input);
    await createSubjectCategory(payload);
    revalidateSubjectCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSubjectCategoryAction = async (input: UpdateSubjectCategoryParams) => {
  try {
    const payload = updateSubjectCategoryParams.parse(input);
    await updateSubjectCategory(payload.id, payload);
    revalidateSubjectCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSubjectCategoryAction = async (input: SubjectCategoryId) => {
  try {
    const payload = subjectCategoryIdSchema.parse({ id: input });
    await deleteSubjectCategory(payload.id);
    revalidateSubjectCategories();
  } catch (e) {
    return handleErrors(e);
  }
};