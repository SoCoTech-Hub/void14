"use server";

import { revalidatePath } from "next/cache";
import {
  createLessonAttempt,
  deleteLessonAttempt,
  updateLessonAttempt,
} from "@/lib/api/lessonAttempts/mutations";
import {
  LessonAttemptId,
  NewLessonAttemptParams,
  UpdateLessonAttemptParams,
  lessonAttemptIdSchema,
  insertLessonAttemptParams,
  updateLessonAttemptParams,
} from "@/lib/db/schema/lessonAttempts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLessonAttempts = () => revalidatePath("/lesson-attempts");

export const createLessonAttemptAction = async (input: NewLessonAttemptParams) => {
  try {
    const payload = insertLessonAttemptParams.parse(input);
    await createLessonAttempt(payload);
    revalidateLessonAttempts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLessonAttemptAction = async (input: UpdateLessonAttemptParams) => {
  try {
    const payload = updateLessonAttemptParams.parse(input);
    await updateLessonAttempt(payload.id, payload);
    revalidateLessonAttempts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLessonAttemptAction = async (input: LessonAttemptId) => {
  try {
    const payload = lessonAttemptIdSchema.parse({ id: input });
    await deleteLessonAttempt(payload.id);
    revalidateLessonAttempts();
  } catch (e) {
    return handleErrors(e);
  }
};