"use server";

import { revalidatePath } from "next/cache";
import {
  createCourseCategory,
  deleteCourseCategory,
  updateCourseCategory,
} from "@/lib/api/courseCategories/mutations";
import {
  CourseCategoryId,
  NewCourseCategoryParams,
  UpdateCourseCategoryParams,
  courseCategoryIdSchema,
  insertCourseCategoryParams,
  updateCourseCategoryParams,
} from "@/lib/db/schema/courseCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCourseCategories = () => revalidatePath("/course-categories");

export const createCourseCategoryAction = async (input: NewCourseCategoryParams) => {
  try {
    const payload = insertCourseCategoryParams.parse(input);
    await createCourseCategory(payload);
    revalidateCourseCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCourseCategoryAction = async (input: UpdateCourseCategoryParams) => {
  try {
    const payload = updateCourseCategoryParams.parse(input);
    await updateCourseCategory(payload.id, payload);
    revalidateCourseCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCourseCategoryAction = async (input: CourseCategoryId) => {
  try {
    const payload = courseCategoryIdSchema.parse({ id: input });
    await deleteCourseCategory(payload.id);
    revalidateCourseCategories();
  } catch (e) {
    return handleErrors(e);
  }
};