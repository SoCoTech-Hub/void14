"use server";

import { revalidatePath } from "next/cache";
import {
  createCourseCompletionAggrMethd,
  deleteCourseCompletionAggrMethd,
  updateCourseCompletionAggrMethd,
} from "@/lib/api/courseCompletionAggrMethds/mutations";
import {
  CourseCompletionAggrMethdId,
  NewCourseCompletionAggrMethdParams,
  UpdateCourseCompletionAggrMethdParams,
  courseCompletionAggrMethdIdSchema,
  insertCourseCompletionAggrMethdParams,
  updateCourseCompletionAggrMethdParams,
} from "@/lib/db/schema/courseCompletionAggrMethds";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCourseCompletionAggrMethds = () => revalidatePath("/course-completion-aggr-methds");

export const createCourseCompletionAggrMethdAction = async (input: NewCourseCompletionAggrMethdParams) => {
  try {
    const payload = insertCourseCompletionAggrMethdParams.parse(input);
    await createCourseCompletionAggrMethd(payload);
    revalidateCourseCompletionAggrMethds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCourseCompletionAggrMethdAction = async (input: UpdateCourseCompletionAggrMethdParams) => {
  try {
    const payload = updateCourseCompletionAggrMethdParams.parse(input);
    await updateCourseCompletionAggrMethd(payload.id, payload);
    revalidateCourseCompletionAggrMethds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCourseCompletionAggrMethdAction = async (input: CourseCompletionAggrMethdId) => {
  try {
    const payload = courseCompletionAggrMethdIdSchema.parse({ id: input });
    await deleteCourseCompletionAggrMethd(payload.id);
    revalidateCourseCompletionAggrMethds();
  } catch (e) {
    return handleErrors(e);
  }
};
