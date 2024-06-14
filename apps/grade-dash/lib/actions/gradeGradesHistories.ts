"use server";

import { revalidatePath } from "next/cache";
import {
  createGradeGradesHistory,
  deleteGradeGradesHistory,
  updateGradeGradesHistory,
} from "@/lib/api/gradeGradesHistories/mutations";
import {
  GradeGradesHistoryId,
  NewGradeGradesHistoryParams,
  UpdateGradeGradesHistoryParams,
  gradeGradesHistoryIdSchema,
  insertGradeGradesHistoryParams,
  updateGradeGradesHistoryParams,
} from "@/lib/db/schema/gradeGradesHistories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradeGradesHistories = () => revalidatePath("/grade-grades-histories");

export const createGradeGradesHistoryAction = async (input: NewGradeGradesHistoryParams) => {
  try {
    const payload = insertGradeGradesHistoryParams.parse(input);
    await createGradeGradesHistory(payload);
    revalidateGradeGradesHistories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradeGradesHistoryAction = async (input: UpdateGradeGradesHistoryParams) => {
  try {
    const payload = updateGradeGradesHistoryParams.parse(input);
    await updateGradeGradesHistory(payload.id, payload);
    revalidateGradeGradesHistories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradeGradesHistoryAction = async (input: GradeGradesHistoryId) => {
  try {
    const payload = gradeGradesHistoryIdSchema.parse({ id: input });
    await deleteGradeGradesHistory(payload.id);
    revalidateGradeGradesHistories();
  } catch (e) {
    return handleErrors(e);
  }
};