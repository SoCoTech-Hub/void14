"use server";

import { revalidatePath } from "next/cache";

import {
  createCourseRequest,
  deleteCourseRequest,
  updateCourseRequest,
} from "../api/courseRequests/mutations";
import {
  CourseRequestId,
  courseRequestIdSchema,
  insertCourseRequestParams,
  NewCourseRequestParams,
  UpdateCourseRequestParams,
  updateCourseRequestParams,
} from "../db/schema/courseRequests";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCourseRequests = () => revalidatePath("/course-requests");

export const createCourseRequestAction = async (
  input: NewCourseRequestParams,
) => {
  try {
    const payload = insertCourseRequestParams.parse(input);
    await createCourseRequest(payload);
    revalidateCourseRequests();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCourseRequestAction = async (
  input: UpdateCourseRequestParams,
) => {
  try {
    const payload = updateCourseRequestParams.parse(input);
    await updateCourseRequest(payload.id, payload);
    revalidateCourseRequests();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCourseRequestAction = async (input: CourseRequestId) => {
  try {
    const payload = courseRequestIdSchema.parse({ id: input });
    await deleteCourseRequest(payload.id);
    revalidateCourseRequests();
  } catch (e) {
    return handleErrors(e);
  }
};
