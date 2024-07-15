"use server";

import { revalidatePath } from "next/cache";
import {
  createGradeOutcomesCourse,
  deleteGradeOutcomesCourse,
  updateGradeOutcomesCourse,
} from "@/lib/api/gradeOutcomesCourses/mutations";
import {
  GradeOutcomesCourseId,
  NewGradeOutcomesCourseParams,
  UpdateGradeOutcomesCourseParams,
  gradeOutcomesCourseIdSchema,
  insertGradeOutcomesCourseParams,
  updateGradeOutcomesCourseParams,
} from "@/lib/db/schema/gradeOutcomesCourses";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradeOutcomesCourses = () => revalidatePath("/grade-outcomes-courses");

export const createGradeOutcomesCourseAction = async (input: NewGradeOutcomesCourseParams) => {
  try {
    const payload = insertGradeOutcomesCourseParams.parse(input);
    await createGradeOutcomesCourse(payload);
    revalidateGradeOutcomesCourses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradeOutcomesCourseAction = async (input: UpdateGradeOutcomesCourseParams) => {
  try {
    const payload = updateGradeOutcomesCourseParams.parse(input);
    await updateGradeOutcomesCourse(payload.id, payload);
    revalidateGradeOutcomesCourses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradeOutcomesCourseAction = async (input: GradeOutcomesCourseId) => {
  try {
    const payload = gradeOutcomesCourseIdSchema.parse({ id: input });
    await deleteGradeOutcomesCourse(payload.id);
    revalidateGradeOutcomesCourses();
  } catch (e) {
    return handleErrors(e);
  }
};
