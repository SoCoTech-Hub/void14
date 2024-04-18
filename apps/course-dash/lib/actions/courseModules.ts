"use server";

import { revalidatePath } from "next/cache";
import {
  createCourseModule,
  deleteCourseModule,
  updateCourseModule,
} from "@/lib/api/courseModules/mutations";
import {
  CourseModuleId,
  NewCourseModuleParams,
  UpdateCourseModuleParams,
  courseModuleIdSchema,
  insertCourseModuleParams,
  updateCourseModuleParams,
} from "@/lib/db/schema/courseModules";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCourseModules = () => revalidatePath("/course-modules");

export const createCourseModuleAction = async (input: NewCourseModuleParams) => {
  try {
    const payload = insertCourseModuleParams.parse(input);
    await createCourseModule(payload);
    revalidateCourseModules();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCourseModuleAction = async (input: UpdateCourseModuleParams) => {
  try {
    const payload = updateCourseModuleParams.parse(input);
    await updateCourseModule(payload.id, payload);
    revalidateCourseModules();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCourseModuleAction = async (input: CourseModuleId) => {
  try {
    const payload = courseModuleIdSchema.parse({ id: input });
    await deleteCourseModule(payload.id);
    revalidateCourseModules();
  } catch (e) {
    return handleErrors(e);
  }
};