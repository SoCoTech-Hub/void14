"use server";

import { revalidatePath } from "next/cache";

import {
  createCourseCompletionDefault,
  deleteCourseCompletionDefault,
  updateCourseCompletionDefault,
} from "../api/courseCompletionDefaults/mutations";
import {
  CourseCompletionDefaultId,
  courseCompletionDefaultIdSchema,
  insertCourseCompletionDefaultParams,
  NewCourseCompletionDefaultParams,
  UpdateCourseCompletionDefaultParams,
  updateCourseCompletionDefaultParams,
} from "../db/schema/courseCompletionDefaults";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCourseCompletionDefaults = () =>
  revalidatePath("/course-completion-defaults");

export const createCourseCompletionDefaultAction = async (
  input: NewCourseCompletionDefaultParams,
) => {
  try {
    const payload = insertCourseCompletionDefaultParams.parse(input);
    await createCourseCompletionDefault(payload);
    revalidateCourseCompletionDefaults();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCourseCompletionDefaultAction = async (
  input: UpdateCourseCompletionDefaultParams,
) => {
  try {
    const payload = updateCourseCompletionDefaultParams.parse(input);
    await updateCourseCompletionDefault(payload.id, payload);
    revalidateCourseCompletionDefaults();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCourseCompletionDefaultAction = async (
  input: CourseCompletionDefaultId,
) => {
  try {
    const payload = courseCompletionDefaultIdSchema.parse({ id: input });
    await deleteCourseCompletionDefault(payload.id);
    revalidateCourseCompletionDefaults();
  } catch (e) {
    return handleErrors(e);
  }
};
