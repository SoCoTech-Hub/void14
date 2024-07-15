"use server";

import { revalidatePath } from "next/cache";
import {
  createLessonAnswer,
  deleteLessonAnswer,
  updateLessonAnswer,
} from "@/lib/api/lessonAnswers/mutations";
import {
  LessonAnswerId,
  NewLessonAnswerParams,
  UpdateLessonAnswerParams,
  lessonAnswerIdSchema,
  insertLessonAnswerParams,
  updateLessonAnswerParams,
} from "@/lib/db/schema/lessonAnswers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLessonAnswers = () => revalidatePath("/lesson-answers");

export const createLessonAnswerAction = async (input: NewLessonAnswerParams) => {
  try {
    const payload = insertLessonAnswerParams.parse(input);
    await createLessonAnswer(payload);
    revalidateLessonAnswers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLessonAnswerAction = async (input: UpdateLessonAnswerParams) => {
  try {
    const payload = updateLessonAnswerParams.parse(input);
    await updateLessonAnswer(payload.id, payload);
    revalidateLessonAnswers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLessonAnswerAction = async (input: LessonAnswerId) => {
  try {
    const payload = lessonAnswerIdSchema.parse({ id: input });
    await deleteLessonAnswer(payload.id);
    revalidateLessonAnswers();
  } catch (e) {
    return handleErrors(e);
  }
};
