"use server";

import { revalidatePath } from "next/cache";

import {
  createGradeCategoriesHistory,
  deleteGradeCategoriesHistory,
  updateGradeCategoriesHistory,
} from "../api/gradeCategoriesHistories/mutations";
import {
  GradeCategoriesHistoryId,
  gradeCategoriesHistoryIdSchema,
  insertGradeCategoriesHistoryParams,
  NewGradeCategoriesHistoryParams,
  UpdateGradeCategoriesHistoryParams,
  updateGradeCategoriesHistoryParams,
} from "../db/schema/gradeCategoriesHistories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradeCategoriesHistories = () =>
  revalidatePath("/grade-categories-histories");

export const createGradeCategoriesHistoryAction = async (
  input: NewGradeCategoriesHistoryParams,
) => {
  try {
    const payload = insertGradeCategoriesHistoryParams.parse(input);
    await createGradeCategoriesHistory(payload);
    revalidateGradeCategoriesHistories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradeCategoriesHistoryAction = async (
  input: UpdateGradeCategoriesHistoryParams,
) => {
  try {
    const payload = updateGradeCategoriesHistoryParams.parse(input);
    await updateGradeCategoriesHistory(payload.id, payload);
    revalidateGradeCategoriesHistories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradeCategoriesHistoryAction = async (
  input: GradeCategoriesHistoryId,
) => {
  try {
    const payload = gradeCategoriesHistoryIdSchema.parse({ id: input });
    await deleteGradeCategoriesHistory(payload.id);
    revalidateGradeCategoriesHistories();
  } catch (e) {
    return handleErrors(e);
  }
};
