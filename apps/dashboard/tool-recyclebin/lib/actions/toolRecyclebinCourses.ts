"use server";

import { revalidatePath } from "next/cache";
import {
  createToolRecyclebinCourse,
  deleteToolRecyclebinCourse,
  updateToolRecyclebinCourse,
} from "@/lib/api/toolRecyclebinCourses/mutations";
import {
  ToolRecyclebinCourseId,
  NewToolRecyclebinCourseParams,
  UpdateToolRecyclebinCourseParams,
  toolRecyclebinCourseIdSchema,
  insertToolRecyclebinCourseParams,
  updateToolRecyclebinCourseParams,
} from "@/lib/db/schema/toolRecyclebinCourses";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolRecyclebinCourses = () => revalidatePath("/tool-recyclebin-courses");

export const createToolRecyclebinCourseAction = async (input: NewToolRecyclebinCourseParams) => {
  try {
    const payload = insertToolRecyclebinCourseParams.parse(input);
    await createToolRecyclebinCourse(payload);
    revalidateToolRecyclebinCourses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolRecyclebinCourseAction = async (input: UpdateToolRecyclebinCourseParams) => {
  try {
    const payload = updateToolRecyclebinCourseParams.parse(input);
    await updateToolRecyclebinCourse(payload.id, payload);
    revalidateToolRecyclebinCourses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolRecyclebinCourseAction = async (input: ToolRecyclebinCourseId) => {
  try {
    const payload = toolRecyclebinCourseIdSchema.parse({ id: input });
    await deleteToolRecyclebinCourse(payload.id);
    revalidateToolRecyclebinCourses();
  } catch (e) {
    return handleErrors(e);
  }
};
