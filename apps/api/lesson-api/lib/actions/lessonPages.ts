"use server";

import { revalidatePath } from "next/cache";

import {
  createLessonPage,
  deleteLessonPage,
  updateLessonPage,
} from "../api/lessonPages/mutations";
import {
  insertLessonPageParams,
  LessonPageId,
  lessonPageIdSchema,
  NewLessonPageParams,
  UpdateLessonPageParams,
  updateLessonPageParams,
} from "../db/schema/lessonPages";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLessonPages = () => revalidatePath("/lesson-pages");

export const createLessonPageAction = async (input: NewLessonPageParams) => {
  try {
    const payload = insertLessonPageParams.parse(input);
    await createLessonPage(payload);
    revalidateLessonPages();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLessonPageAction = async (input: UpdateLessonPageParams) => {
  try {
    const payload = updateLessonPageParams.parse(input);
    await updateLessonPage(payload.id, payload);
    revalidateLessonPages();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLessonPageAction = async (input: LessonPageId) => {
  try {
    const payload = lessonPageIdSchema.parse({ id: input });
    await deleteLessonPage(payload.id);
    revalidateLessonPages();
  } catch (e) {
    return handleErrors(e);
  }
};
