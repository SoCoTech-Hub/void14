"use server";

import { revalidatePath } from "next/cache";
import {
  createCourseFormatOption,
  deleteCourseFormatOption,
  updateCourseFormatOption,
} from "@/lib/api/courseFormatOptions/mutations";
import {
  CourseFormatOptionId,
  NewCourseFormatOptionParams,
  UpdateCourseFormatOptionParams,
  courseFormatOptionIdSchema,
  insertCourseFormatOptionParams,
  updateCourseFormatOptionParams,
} from "@/lib/db/schema/courseFormatOptions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCourseFormatOptions = () => revalidatePath("/course-format-options");

export const createCourseFormatOptionAction = async (input: NewCourseFormatOptionParams) => {
  try {
    const payload = insertCourseFormatOptionParams.parse(input);
    await createCourseFormatOption(payload);
    revalidateCourseFormatOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCourseFormatOptionAction = async (input: UpdateCourseFormatOptionParams) => {
  try {
    const payload = updateCourseFormatOptionParams.parse(input);
    await updateCourseFormatOption(payload.id, payload);
    revalidateCourseFormatOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCourseFormatOptionAction = async (input: CourseFormatOptionId) => {
  try {
    const payload = courseFormatOptionIdSchema.parse({ id: input });
    await deleteCourseFormatOption(payload.id);
    revalidateCourseFormatOptions();
  } catch (e) {
    return handleErrors(e);
  }
};