"use server";

import { revalidatePath } from "next/cache";
import {
  createScaleHistory,
  deleteScaleHistory,
  updateScaleHistory,
} from "@/lib/api/scaleHistories/mutations";
import {
  ScaleHistoryId,
  NewScaleHistoryParams,
  UpdateScaleHistoryParams,
  scaleHistoryIdSchema,
  insertScaleHistoryParams,
  updateScaleHistoryParams,
} from "@/lib/db/schema/scaleHistories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateScaleHistories = () => revalidatePath("/scale-histories");

export const createScaleHistoryAction = async (input: NewScaleHistoryParams) => {
  try {
    const payload = insertScaleHistoryParams.parse(input);
    await createScaleHistory(payload);
    revalidateScaleHistories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateScaleHistoryAction = async (input: UpdateScaleHistoryParams) => {
  try {
    const payload = updateScaleHistoryParams.parse(input);
    await updateScaleHistory(payload.id, payload);
    revalidateScaleHistories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteScaleHistoryAction = async (input: ScaleHistoryId) => {
  try {
    const payload = scaleHistoryIdSchema.parse({ id: input });
    await deleteScaleHistory(payload.id);
    revalidateScaleHistories();
  } catch (e) {
    return handleErrors(e);
  }
};