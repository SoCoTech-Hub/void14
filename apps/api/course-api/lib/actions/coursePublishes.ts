"use server";

import { revalidatePath } from "next/cache";

import {
  createCoursePublish,
  deleteCoursePublish,
  updateCoursePublish,
} from "../api/coursePublishes/mutations";
import {
  CoursePublishId,
  coursePublishIdSchema,
  insertCoursePublishParams,
  NewCoursePublishParams,
  UpdateCoursePublishParams,
  updateCoursePublishParams,
} from "../db/schema/coursePublishes";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCoursePublishes = () => revalidatePath("/course-publishes");

export const createCoursePublishAction = async (
  input: NewCoursePublishParams,
) => {
  try {
    const payload = insertCoursePublishParams.parse(input);
    await createCoursePublish(payload);
    revalidateCoursePublishes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCoursePublishAction = async (
  input: UpdateCoursePublishParams,
) => {
  try {
    const payload = updateCoursePublishParams.parse(input);
    await updateCoursePublish(payload.id, payload);
    revalidateCoursePublishes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCoursePublishAction = async (input: CoursePublishId) => {
  try {
    const payload = coursePublishIdSchema.parse({ id: input });
    await deleteCoursePublish(payload.id);
    revalidateCoursePublishes();
  } catch (e) {
    return handleErrors(e);
  }
};
