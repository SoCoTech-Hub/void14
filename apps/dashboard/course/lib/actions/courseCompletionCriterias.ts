"use server";

import { revalidatePath } from "next/cache";
import {
  createCourseCompletionCriteria,
  deleteCourseCompletionCriteria,
  updateCourseCompletionCriteria,
} from "@/lib/api/courseCompletionCriterias/mutations";
import {
  CourseCompletionCriteriaId,
  NewCourseCompletionCriteriaParams,
  UpdateCourseCompletionCriteriaParams,
  courseCompletionCriteriaIdSchema,
  insertCourseCompletionCriteriaParams,
  updateCourseCompletionCriteriaParams,
} from "@/lib/db/schema/courseCompletionCriterias";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCourseCompletionCriterias = () => revalidatePath("/course-completion-criterias");

export const createCourseCompletionCriteriaAction = async (input: NewCourseCompletionCriteriaParams) => {
  try {
    const payload = insertCourseCompletionCriteriaParams.parse(input);
    await createCourseCompletionCriteria(payload);
    revalidateCourseCompletionCriterias();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCourseCompletionCriteriaAction = async (input: UpdateCourseCompletionCriteriaParams) => {
  try {
    const payload = updateCourseCompletionCriteriaParams.parse(input);
    await updateCourseCompletionCriteria(payload.id, payload);
    revalidateCourseCompletionCriterias();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCourseCompletionCriteriaAction = async (input: CourseCompletionCriteriaId) => {
  try {
    const payload = courseCompletionCriteriaIdSchema.parse({ id: input });
    await deleteCourseCompletionCriteria(payload.id);
    revalidateCourseCompletionCriterias();
  } catch (e) {
    return handleErrors(e);
  }
};
