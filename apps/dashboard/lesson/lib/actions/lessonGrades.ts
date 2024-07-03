"use server";

import { revalidatePath } from "next/cache";
import {
  createLessonGrade,
  deleteLessonGrade,
  updateLessonGrade,
} from "@/lib/api/lessonGrades/mutations";
import {
  LessonGradeId,
  NewLessonGradeParams,
  UpdateLessonGradeParams,
  lessonGradeIdSchema,
  insertLessonGradeParams,
  updateLessonGradeParams,
} from "@/lib/db/schema/lessonGrades";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLessonGrades = () => revalidatePath("/lesson-grades");

export const createLessonGradeAction = async (input: NewLessonGradeParams) => {
  try {
    const payload = insertLessonGradeParams.parse(input);
    await createLessonGrade(payload);
    revalidateLessonGrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLessonGradeAction = async (input: UpdateLessonGradeParams) => {
  try {
    const payload = updateLessonGradeParams.parse(input);
    await updateLessonGrade(payload.id, payload);
    revalidateLessonGrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLessonGradeAction = async (input: LessonGradeId) => {
  try {
    const payload = lessonGradeIdSchema.parse({ id: input });
    await deleteLessonGrade(payload.id);
    revalidateLessonGrades();
  } catch (e) {
    return handleErrors(e);
  }
};