"use server";

import { revalidatePath } from "next/cache";
import {
  createCourseModulesCompletion,
  deleteCourseModulesCompletion,
  updateCourseModulesCompletion,
} from "@/lib/api/courseModulesCompletions/mutations";
import {
  CourseModulesCompletionId,
  NewCourseModulesCompletionParams,
  UpdateCourseModulesCompletionParams,
  courseModulesCompletionIdSchema,
  insertCourseModulesCompletionParams,
  updateCourseModulesCompletionParams,
} from "@/lib/db/schema/courseModulesCompletions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCourseModulesCompletions = () => revalidatePath("/course-modules-completions");

export const createCourseModulesCompletionAction = async (input: NewCourseModulesCompletionParams) => {
  try {
    const payload = insertCourseModulesCompletionParams.parse(input);
    await createCourseModulesCompletion(payload);
    revalidateCourseModulesCompletions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCourseModulesCompletionAction = async (input: UpdateCourseModulesCompletionParams) => {
  try {
    const payload = updateCourseModulesCompletionParams.parse(input);
    await updateCourseModulesCompletion(payload.id, payload);
    revalidateCourseModulesCompletions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCourseModulesCompletionAction = async (input: CourseModulesCompletionId) => {
  try {
    const payload = courseModulesCompletionIdSchema.parse({ id: input });
    await deleteCourseModulesCompletion(payload.id);
    revalidateCourseModulesCompletions();
  } catch (e) {
    return handleErrors(e);
  }
};
