"use server";

import { revalidatePath } from "next/cache";
import {
  createGradeOutcomesHistory,
  deleteGradeOutcomesHistory,
  updateGradeOutcomesHistory,
} from "@/lib/api/gradeOutcomesHistories/mutations";
import {
  GradeOutcomesHistoryId,
  NewGradeOutcomesHistoryParams,
  UpdateGradeOutcomesHistoryParams,
  gradeOutcomesHistoryIdSchema,
  insertGradeOutcomesHistoryParams,
  updateGradeOutcomesHistoryParams,
} from "@/lib/db/schema/gradeOutcomesHistories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradeOutcomesHistories = () => revalidatePath("/grade-outcomes-histories");

export const createGradeOutcomesHistoryAction = async (input: NewGradeOutcomesHistoryParams) => {
  try {
    const payload = insertGradeOutcomesHistoryParams.parse(input);
    await createGradeOutcomesHistory(payload);
    revalidateGradeOutcomesHistories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradeOutcomesHistoryAction = async (input: UpdateGradeOutcomesHistoryParams) => {
  try {
    const payload = updateGradeOutcomesHistoryParams.parse(input);
    await updateGradeOutcomesHistory(payload.id, payload);
    revalidateGradeOutcomesHistories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradeOutcomesHistoryAction = async (input: GradeOutcomesHistoryId) => {
  try {
    const payload = gradeOutcomesHistoryIdSchema.parse({ id: input });
    await deleteGradeOutcomesHistory(payload.id);
    revalidateGradeOutcomesHistories();
  } catch (e) {
    return handleErrors(e);
  }
};