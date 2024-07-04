"use server";

import { revalidatePath } from "next/cache";

import {
  createCourseCompletionCritCompl,
  deleteCourseCompletionCritCompl,
  updateCourseCompletionCritCompl,
} from "../api/courseCompletionCritCompls/mutations";
import {
  CourseCompletionCritComplId,
  courseCompletionCritComplIdSchema,
  insertCourseCompletionCritComplParams,
  NewCourseCompletionCritComplParams,
  UpdateCourseCompletionCritComplParams,
  updateCourseCompletionCritComplParams,
} from "../db/schema/courseCompletionCritCompls";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCourseCompletionCritCompls = () =>
  revalidatePath("/course-completion-crit-compls");

export const createCourseCompletionCritComplAction = async (
  input: NewCourseCompletionCritComplParams,
) => {
  try {
    const payload = insertCourseCompletionCritComplParams.parse(input);
    await createCourseCompletionCritCompl(payload);
    revalidateCourseCompletionCritCompls();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCourseCompletionCritComplAction = async (
  input: UpdateCourseCompletionCritComplParams,
) => {
  try {
    const payload = updateCourseCompletionCritComplParams.parse(input);
    await updateCourseCompletionCritCompl(payload.id, payload);
    revalidateCourseCompletionCritCompls();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCourseCompletionCritComplAction = async (
  input: CourseCompletionCritComplId,
) => {
  try {
    const payload = courseCompletionCritComplIdSchema.parse({ id: input });
    await deleteCourseCompletionCritCompl(payload.id);
    revalidateCourseCompletionCritCompls();
  } catch (e) {
    return handleErrors(e);
  }
};
