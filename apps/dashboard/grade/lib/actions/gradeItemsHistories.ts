"use server";

import { revalidatePath } from "next/cache";
import {
  createGradeItemsHistory,
  deleteGradeItemsHistory,
  updateGradeItemsHistory,
} from "@/lib/api/gradeItemsHistories/mutations";
import {
  GradeItemsHistoryId,
  NewGradeItemsHistoryParams,
  UpdateGradeItemsHistoryParams,
  gradeItemsHistoryIdSchema,
  insertGradeItemsHistoryParams,
  updateGradeItemsHistoryParams,
} from "@/lib/db/schema/gradeItemsHistories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradeItemsHistories = () => revalidatePath("/grade-items-histories");

export const createGradeItemsHistoryAction = async (input: NewGradeItemsHistoryParams) => {
  try {
    const payload = insertGradeItemsHistoryParams.parse(input);
    await createGradeItemsHistory(payload);
    revalidateGradeItemsHistories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradeItemsHistoryAction = async (input: UpdateGradeItemsHistoryParams) => {
  try {
    const payload = updateGradeItemsHistoryParams.parse(input);
    await updateGradeItemsHistory(payload.id, payload);
    revalidateGradeItemsHistories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradeItemsHistoryAction = async (input: GradeItemsHistoryId) => {
  try {
    const payload = gradeItemsHistoryIdSchema.parse({ id: input });
    await deleteGradeItemsHistory(payload.id);
    revalidateGradeItemsHistories();
  } catch (e) {
    return handleErrors(e);
  }
};
