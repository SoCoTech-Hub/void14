"use server";

import { revalidatePath } from "next/cache";

import {
  createLessonOverride,
  deleteLessonOverride,
  updateLessonOverride,
} from "../api/lessonOverrides/mutations";
import {
  insertLessonOverrideParams,
  LessonOverrideId,
  lessonOverrideIdSchema,
  NewLessonOverrideParams,
  UpdateLessonOverrideParams,
  updateLessonOverrideParams,
} from "../db/schema/lessonOverrides";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLessonOverrides = () => revalidatePath("/lesson-overrides");

export const createLessonOverrideAction = async (
  input: NewLessonOverrideParams,
) => {
  try {
    const payload = insertLessonOverrideParams.parse(input);
    await createLessonOverride(payload);
    revalidateLessonOverrides();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLessonOverrideAction = async (
  input: UpdateLessonOverrideParams,
) => {
  try {
    const payload = updateLessonOverrideParams.parse(input);
    await updateLessonOverride(payload.id, payload);
    revalidateLessonOverrides();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLessonOverrideAction = async (input: LessonOverrideId) => {
  try {
    const payload = lessonOverrideIdSchema.parse({ id: input });
    await deleteLessonOverride(payload.id);
    revalidateLessonOverrides();
  } catch (e) {
    return handleErrors(e);
  }
};
