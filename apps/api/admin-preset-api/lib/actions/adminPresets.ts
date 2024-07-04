"use server";

import { revalidatePath } from "next/cache";

import {
  createAdminPreset,
  deleteAdminPreset,
  updateAdminPreset,
} from "../api/adminPresets/mutations";
import {
  AdminPresetId,
  adminPresetIdSchema,
  insertAdminPresetParams,
  NewAdminPresetParams,
  UpdateAdminPresetParams,
  updateAdminPresetParams,
} from "../db/schema/adminPresets";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAdminPresets = () => revalidatePath("/admin-presets");

export const createAdminPresetAction = async (input: NewAdminPresetParams) => {
  try {
    const payload = insertAdminPresetParams.parse(input);
    await createAdminPreset(payload);
    revalidateAdminPresets();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAdminPresetAction = async (
  input: UpdateAdminPresetParams,
) => {
  try {
    const payload = updateAdminPresetParams.parse(input);
    await updateAdminPreset(payload.id, payload);
    revalidateAdminPresets();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAdminPresetAction = async (input: AdminPresetId) => {
  try {
    const payload = adminPresetIdSchema.parse({ id: input });
    await deleteAdminPreset(payload.id);
    revalidateAdminPresets();
  } catch (e) {
    return handleErrors(e);
  }
};
