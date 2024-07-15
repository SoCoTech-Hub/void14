"use server";

import { revalidatePath } from "next/cache";
import {
  createMnetServiceEnrolCourse,
  deleteMnetServiceEnrolCourse,
  updateMnetServiceEnrolCourse,
} from "@/lib/api/mnetServiceEnrolCourses/mutations";
import {
  MnetServiceEnrolCourseId,
  NewMnetServiceEnrolCourseParams,
  UpdateMnetServiceEnrolCourseParams,
  mnetServiceEnrolCourseIdSchema,
  insertMnetServiceEnrolCourseParams,
  updateMnetServiceEnrolCourseParams,
} from "@/lib/db/schema/mnetServiceEnrolCourses";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMnetServiceEnrolCourses = () => revalidatePath("/mnet-service-enrol-courses");

export const createMnetServiceEnrolCourseAction = async (input: NewMnetServiceEnrolCourseParams) => {
  try {
    const payload = insertMnetServiceEnrolCourseParams.parse(input);
    await createMnetServiceEnrolCourse(payload);
    revalidateMnetServiceEnrolCourses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMnetServiceEnrolCourseAction = async (input: UpdateMnetServiceEnrolCourseParams) => {
  try {
    const payload = updateMnetServiceEnrolCourseParams.parse(input);
    await updateMnetServiceEnrolCourse(payload.id, payload);
    revalidateMnetServiceEnrolCourses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMnetServiceEnrolCourseAction = async (input: MnetServiceEnrolCourseId) => {
  try {
    const payload = mnetServiceEnrolCourseIdSchema.parse({ id: input });
    await deleteMnetServiceEnrolCourse(payload.id);
    revalidateMnetServiceEnrolCourses();
  } catch (e) {
    return handleErrors(e);
  }
};
