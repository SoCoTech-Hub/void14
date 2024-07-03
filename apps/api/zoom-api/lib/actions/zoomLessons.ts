"use server";

import { revalidatePath } from "next/cache";
import {
  createZoomLesson,
  deleteZoomLesson,
  updateZoomLesson,
} from "@/lib/api/zoomLessons/mutations";
import {
  ZoomLessonId,
  NewZoomLessonParams,
  UpdateZoomLessonParams,
  zoomLessonIdSchema,
  insertZoomLessonParams,
  updateZoomLessonParams,
} from "@/lib/db/schema/zoomLessons";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateZoomLessons = () => revalidatePath("/zoom-lessons");

export const createZoomLessonAction = async (input: NewZoomLessonParams) => {
  try {
    const payload = insertZoomLessonParams.parse(input);
    await createZoomLesson(payload);
    revalidateZoomLessons();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateZoomLessonAction = async (input: UpdateZoomLessonParams) => {
  try {
    const payload = updateZoomLessonParams.parse(input);
    await updateZoomLesson(payload.id, payload);
    revalidateZoomLessons();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteZoomLessonAction = async (input: ZoomLessonId) => {
  try {
    const payload = zoomLessonIdSchema.parse({ id: input });
    await deleteZoomLesson(payload.id);
    revalidateZoomLessons();
  } catch (e) {
    return handleErrors(e);
  }
};