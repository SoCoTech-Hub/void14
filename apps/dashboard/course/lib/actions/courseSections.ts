"use server";

import { revalidatePath } from "next/cache";
import {
  createCourseSection,
  deleteCourseSection,
  updateCourseSection,
} from "@/lib/api/courseSections/mutations";
import {
  CourseSectionId,
  NewCourseSectionParams,
  UpdateCourseSectionParams,
  courseSectionIdSchema,
  insertCourseSectionParams,
  updateCourseSectionParams,
} from "@/lib/db/schema/courseSections";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCourseSections = () => revalidatePath("/course-sections");

export const createCourseSectionAction = async (input: NewCourseSectionParams) => {
  try {
    const payload = insertCourseSectionParams.parse(input);
    await createCourseSection(payload);
    revalidateCourseSections();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCourseSectionAction = async (input: UpdateCourseSectionParams) => {
  try {
    const payload = updateCourseSectionParams.parse(input);
    await updateCourseSection(payload.id, payload);
    revalidateCourseSections();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCourseSectionAction = async (input: CourseSectionId) => {
  try {
    const payload = courseSectionIdSchema.parse({ id: input });
    await deleteCourseSection(payload.id);
    revalidateCourseSections();
  } catch (e) {
    return handleErrors(e);
  }
};
