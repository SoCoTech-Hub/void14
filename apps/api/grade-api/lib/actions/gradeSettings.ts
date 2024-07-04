"use server";

import { revalidatePath } from "next/cache";

import {
  createGradeSetting,
  deleteGradeSetting,
  updateGradeSetting,
} from "../api/gradeSettings/mutations";
import {
  GradeSettingId,
  gradeSettingIdSchema,
  insertGradeSettingParams,
  NewGradeSettingParams,
  UpdateGradeSettingParams,
  updateGradeSettingParams,
} from "../db/schema/gradeSettings";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradeSettings = () => revalidatePath("/grade-settings");

export const createGradeSettingAction = async (
  input: NewGradeSettingParams,
) => {
  try {
    const payload = insertGradeSettingParams.parse(input);
    await createGradeSetting(payload);
    revalidateGradeSettings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradeSettingAction = async (
  input: UpdateGradeSettingParams,
) => {
  try {
    const payload = updateGradeSettingParams.parse(input);
    await updateGradeSetting(payload.id, payload);
    revalidateGradeSettings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradeSettingAction = async (input: GradeSettingId) => {
  try {
    const payload = gradeSettingIdSchema.parse({ id: input });
    await deleteGradeSetting(payload.id);
    revalidateGradeSettings();
  } catch (e) {
    return handleErrors(e);
  }
};
