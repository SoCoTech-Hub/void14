"use server";

import { revalidatePath } from "next/cache";

import {
  createCourseCompletion,
  deleteCourseCompletion,
  updateCourseCompletion,
} from "../api/courseCompletions/mutations";
import {
  CourseCompletionId,
  courseCompletionIdSchema,
  insertCourseCompletionParams,
  NewCourseCompletionParams,
  UpdateCourseCompletionParams,
  updateCourseCompletionParams,
} from "../db/schema/courseCompletions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCourseCompletions = () => revalidatePath("/course-completions");

export const createCourseCompletionAction = async (
  input: NewCourseCompletionParams,
) => {
  try {
    const payload = insertCourseCompletionParams.parse(input);
    await createCourseCompletion(payload);
    revalidateCourseCompletions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCourseCompletionAction = async (
  input: UpdateCourseCompletionParams,
) => {
  try {
    const payload = updateCourseCompletionParams.parse(input);
    await updateCourseCompletion(payload.id, payload);
    revalidateCourseCompletions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCourseCompletionAction = async (
  input: CourseCompletionId,
) => {
  try {
    const payload = courseCompletionIdSchema.parse({ id: input });
    await deleteCourseCompletion(payload.id);
    revalidateCourseCompletions();
  } catch (e) {
    return handleErrors(e);
  }
};
