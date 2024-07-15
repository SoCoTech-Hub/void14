"use server";

import { revalidatePath } from "next/cache";
import {
  createWorkshopEvalBestSetting,
  deleteWorkshopEvalBestSetting,
  updateWorkshopEvalBestSetting,
} from "@/lib/api/workshopEvalBestSettings/mutations";
import {
  WorkshopEvalBestSettingId,
  NewWorkshopEvalBestSettingParams,
  UpdateWorkshopEvalBestSettingParams,
  workshopEvalBestSettingIdSchema,
  insertWorkshopEvalBestSettingParams,
  updateWorkshopEvalBestSettingParams,
} from "@/lib/db/schema/workshopEvalBestSettings";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWorkshopEvalBestSettings = () => revalidatePath("/workshop-eval-best-settings");

export const createWorkshopEvalBestSettingAction = async (input: NewWorkshopEvalBestSettingParams) => {
  try {
    const payload = insertWorkshopEvalBestSettingParams.parse(input);
    await createWorkshopEvalBestSetting(payload);
    revalidateWorkshopEvalBestSettings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWorkshopEvalBestSettingAction = async (input: UpdateWorkshopEvalBestSettingParams) => {
  try {
    const payload = updateWorkshopEvalBestSettingParams.parse(input);
    await updateWorkshopEvalBestSetting(payload.id, payload);
    revalidateWorkshopEvalBestSettings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWorkshopEvalBestSettingAction = async (input: WorkshopEvalBestSettingId) => {
  try {
    const payload = workshopEvalBestSettingIdSchema.parse({ id: input });
    await deleteWorkshopEvalBestSetting(payload.id);
    revalidateWorkshopEvalBestSettings();
  } catch (e) {
    return handleErrors(e);
  }
};
