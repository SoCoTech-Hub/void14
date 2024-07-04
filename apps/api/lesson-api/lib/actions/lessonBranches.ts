"use server";

import { revalidatePath } from "next/cache";

import {
  createLessonBranch,
  deleteLessonBranch,
  updateLessonBranch,
} from "../api/lessonBranches/mutations";
import {
  insertLessonBranchParams,
  LessonBranchId,
  lessonBranchIdSchema,
  NewLessonBranchParams,
  UpdateLessonBranchParams,
  updateLessonBranchParams,
} from "../db/schema/lessonBranches";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLessonBranches = () => revalidatePath("/lesson-branches");

export const createLessonBranchAction = async (
  input: NewLessonBranchParams,
) => {
  try {
    const payload = insertLessonBranchParams.parse(input);
    await createLessonBranch(payload);
    revalidateLessonBranches();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLessonBranchAction = async (
  input: UpdateLessonBranchParams,
) => {
  try {
    const payload = updateLessonBranchParams.parse(input);
    await updateLessonBranch(payload.id, payload);
    revalidateLessonBranches();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLessonBranchAction = async (input: LessonBranchId) => {
  try {
    const payload = lessonBranchIdSchema.parse({ id: input });
    await deleteLessonBranch(payload.id);
    revalidateLessonBranches();
  } catch (e) {
    return handleErrors(e);
  }
};
