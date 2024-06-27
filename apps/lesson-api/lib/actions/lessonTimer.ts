"use server";

import { revalidatePath } from "next/cache";
import {
  createLessonTimer,
  deleteLessonTimer,
  updateLessonTimer,
} from "@/lib/api/lessonTimer/mutations";
import {
  LessonTimerId,
  NewLessonTimerParams,
  UpdateLessonTimerParams,
  lessonTimerIdSchema,
  insertLessonTimerParams,
  updateLessonTimerParams,
} from "@/lib/db/schema/lessonTimer";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLessonTimers = () => revalidatePath("/lesson-timer");

export const createLessonTimerAction = async (input: NewLessonTimerParams) => {
  try {
    const payload = insertLessonTimerParams.parse(input);
    await createLessonTimer(payload);
    revalidateLessonTimers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLessonTimerAction = async (input: UpdateLessonTimerParams) => {
  try {
    const payload = updateLessonTimerParams.parse(input);
    await updateLessonTimer(payload.id, payload);
    revalidateLessonTimers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLessonTimerAction = async (input: LessonTimerId) => {
  try {
    const payload = lessonTimerIdSchema.parse({ id: input });
    await deleteLessonTimer(payload.id);
    revalidateLessonTimers();
  } catch (e) {
    return handleErrors(e);
  }
};